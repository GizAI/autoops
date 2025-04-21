import { prisma } from '../index';
import { logger } from './logger';
import { generateEmbedding } from '../services/openai.service';
import { detectLanguage } from './language';

/**
 * Interface for knowledge base entry
 */
export interface KnowledgeBaseEntry {
  id?: number;
  content: string;
  embedding?: number[];
  source: string;
  sourceId?: string;
  category?: string;
  language?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Interface for search options
 */
export interface SearchOptions {
  query: string;
  language?: string;
  category?: string;
  limit?: number;
  threshold?: number;
  useHybridSearch?: boolean;
}

/**
 * Interface for search result
 */
export interface SearchResult {
  id: number;
  content: string;
  source: string;
  sourceId?: string;
  category?: string;
  language?: string;
  createdAt: Date;
  updatedAt: Date;
  distance: number;
  score: number;
  relevance: number;
}

/**
 * Calculate BM25 score for keyword search
 * @param doc Document text
 * @param query Query text
 * @param avgDocLength Average document length
 * @param k1 BM25 parameter (1.2-2.0)
 * @param b BM25 parameter (0.75)
 * @returns BM25 score
 */
function calculateBM25Score(
  doc: string,
  query: string,
  avgDocLength: number,
  k1 = 1.5,
  b = 0.75
): number {
  // Tokenize document and query
  const docTokens = doc.toLowerCase().split(/\\s+/);
  const queryTokens = query.toLowerCase().split(/\\s+/);
  const docLength = docTokens.length;
  
  // Calculate document frequency
  const docFreq: Record<string, number> = {};
  for (const token of docTokens) {
    docFreq[token] = (docFreq[token] || 0) + 1;
  }
  
  // Calculate BM25 score
  let score = 0;
  for (const token of queryTokens) {
    if (docFreq[token]) {
      const tf = docFreq[token];
      const idf = Math.log(1 + Math.abs(1 / (docFreq[token] || 0.5)));
      const numerator = tf * (k1 + 1);
      const denominator = tf + k1 * (1 - b + b * (docLength / avgDocLength));
      score += idf * (numerator / denominator);
    }
  }
  
  return score;
}

/**
 * Calculate recency score based on creation date
 * @param createdAt Creation date
 * @param maxAge Maximum age in days to consider (default: 365)
 * @returns Recency score between 0 and 1
 */
function calculateRecencyScore(createdAt: Date, maxAge = 365): number {
  const now = new Date();
  const ageInDays = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  return Math.max(0, 1 - (ageInDays / maxAge));
}

/**
 * Calculate category relevance score
 * @param category Entry category
 * @param targetCategory Target category
 * @returns Category relevance score between 0 and 1
 */
function calculateCategoryScore(category?: string, targetCategory?: string): number {
  if (!category || !targetCategory) return 0.5;
  return category === targetCategory ? 1 : 0;
}

/**
 * Calculate language relevance score
 * @param language Entry language
 * @param targetLanguage Target language
 * @returns Language relevance score between 0 and 1
 */
function calculateLanguageScore(language?: string, targetLanguage?: string): number {
  if (!language || !targetLanguage) return 0.5;
  return language === targetLanguage ? 1 : 0.2;
}

/**
 * Calculate combined relevance score
 * @param vectorScore Vector similarity score (0-1, lower is better)
 * @param keywordScore Keyword search score (higher is better)
 * @param recencyScore Recency score (0-1, higher is better)
 * @param categoryScore Category relevance score (0-1, higher is better)
 * @param languageScore Language relevance score (0-1, higher is better)
 * @param weights Weights for each score component
 * @returns Combined relevance score between 0 and 1
 */
function calculateRelevanceScore(
  vectorScore: number,
  keywordScore: number,
  recencyScore: number,
  categoryScore: number,
  languageScore: number,
  weights = {
    vector: 0.5,
    keyword: 0.2,
    recency: 0.1,
    category: 0.1,
    language: 0.1
  }
): number {
  // Normalize vector score (convert distance to similarity)
  const vectorSimilarity = 1 - Math.min(1, vectorScore);
  
  // Normalize keyword score (assuming max score of 10)
  const normalizedKeywordScore = Math.min(1, keywordScore / 10);
  
  // Calculate weighted sum
  const relevance =
    vectorSimilarity * weights.vector +
    normalizedKeywordScore * weights.keyword +
    recencyScore * weights.recency +
    categoryScore * weights.category +
    languageScore * weights.language;
  
  return relevance;
}

/**
 * Create a new knowledge base entry
 * @param entry Knowledge base entry data
 * @returns Created knowledge base entry
 */
export async function createKnowledgeEntry(entry: KnowledgeBaseEntry): Promise<any> {
  try {
    // Generate embedding if not provided
    const embedding = entry.embedding || await generateEmbedding(entry.content);
    
    // Detect language if not provided
    const language = entry.language || detectLanguage(entry.content);
    
    // Create knowledge entry
    const knowledge = await prisma.$queryRaw`
      INSERT INTO "knowledge_base" (
        content, 
        embedding, 
        source, 
        source_id, 
        category, 
        language, 
        created_at, 
        updated_at
      )
      VALUES (
        ${entry.content}, 
        ${embedding}::vector, 
        ${entry.source}, 
        ${entry.sourceId}, 
        ${entry.category}, 
        ${language}, 
        NOW(), 
        NOW()
      )
      RETURNING *
    `;
    
    logger.info(`Created knowledge base entry: ${entry.content.substring(0, 50)}...`);
    return knowledge[0];
  } catch (error) {
    logger.error('Error creating knowledge base entry:', error);
    throw error;
  }
}

/**
 * Create multiple knowledge base entries
 * @param entries Array of knowledge base entry data
 * @returns Array of created knowledge base entries
 */
export async function createKnowledgeEntries(entries: KnowledgeBaseEntry[]): Promise<any[]> {
  try {
    const results = [];
    
    for (const entry of entries) {
      const result = await createKnowledgeEntry(entry);
      results.push(result);
    }
    
    return results;
  } catch (error) {
    logger.error('Error creating multiple knowledge base entries:', error);
    throw error;
  }
}

/**
 * Update a knowledge base entry
 * @param id Entry ID
 * @param entry Knowledge base entry data
 * @returns Updated knowledge base entry
 */
export async function updateKnowledgeEntry(id: number, entry: Partial<KnowledgeBaseEntry>): Promise<any> {
  try {
    // Check if knowledge entry exists
    const existingKnowledge = await prisma.knowledgeBase.findUnique({
      where: { id }
    });
    
    if (!existingKnowledge) {
      throw new Error(`Knowledge entry with ID ${id} not found`);
    }
    
    // Generate new embedding if content changed
    let embedding = null;
    if (entry.content && entry.content !== existingKnowledge.content) {
      embedding = await generateEmbedding(entry.content);
    }
    
    // Update knowledge entry
    if (embedding) {
      const knowledge = await prisma.$queryRaw`
        UPDATE "knowledge_base"
        SET 
          content = ${entry.content || existingKnowledge.content},
          embedding = ${embedding}::vector,
          source = ${entry.source || existingKnowledge.source},
          source_id = ${entry.sourceId || existingKnowledge.sourceId},
          category = ${entry.category || existingKnowledge.category},
          language = ${entry.language || existingKnowledge.language},
          updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `;
      
      logger.info(`Updated knowledge base entry ${id} with new embedding`);
      return knowledge[0];
    } else {
      const knowledge = await prisma.knowledgeBase.update({
        where: { id },
        data: {
          content: entry.content,
          source: entry.source,
          sourceId: entry.sourceId,
          category: entry.category,
          language: entry.language,
          updatedAt: new Date()
        }
      });
      
      logger.info(`Updated knowledge base entry ${id}`);
      return knowledge;
    }
  } catch (error) {
    logger.error(`Error updating knowledge base entry ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a knowledge base entry
 * @param id Entry ID
 * @returns Success status
 */
export async function deleteKnowledgeEntry(id: number): Promise<boolean> {
  try {
    // Check if knowledge entry exists
    const existingKnowledge = await prisma.knowledgeBase.findUnique({
      where: { id }
    });
    
    if (!existingKnowledge) {
      throw new Error(`Knowledge entry with ID ${id} not found`);
    }
    
    // Delete knowledge entry
    await prisma.knowledgeBase.delete({
      where: { id }
    });
    
    logger.info(`Deleted knowledge base entry ${id}`);
    return true;
  } catch (error) {
    logger.error(`Error deleting knowledge base entry ${id}:`, error);
    throw error;
  }
}

/**
 * Search knowledge base using vector similarity
 * @param options Search options
 * @returns Array of search results
 */
export async function searchKnowledgeBase(options: SearchOptions): Promise<SearchResult[]> {
  try {
    const {
      query,
      language,
      category,
      limit = 5,
      threshold = 0.7,
      useHybridSearch = true
    } = options;
    
    // Generate embedding for the query
    const embedding = await generateEmbedding(query);
    
    // Search knowledge base using vector similarity
    let results: any[] = [];
    
    if (language && category) {
      results = await prisma.$queryRaw`
        SELECT *, (embedding <=> ${embedding}::vector) AS distance
        FROM "knowledge_base"
        WHERE (language = ${language} OR language IS NULL)
        AND (category = ${category} OR category IS NULL)
        ORDER BY distance
        LIMIT ${limit}
      `;
    } else if (language) {
      results = await prisma.$queryRaw`
        SELECT *, (embedding <=> ${embedding}::vector) AS distance
        FROM "knowledge_base"
        WHERE language = ${language} OR language IS NULL
        ORDER BY distance
        LIMIT ${limit}
      `;
    } else if (category) {
      results = await prisma.$queryRaw`
        SELECT *, (embedding <=> ${embedding}::vector) AS distance
        FROM "knowledge_base"
        WHERE category = ${category} OR category IS NULL
        ORDER BY distance
        LIMIT ${limit}
      `;
    } else {
      results = await prisma.$queryRaw`
        SELECT *, (embedding <=> ${embedding}::vector) AS distance
        FROM "knowledge_base"
        ORDER BY distance
        LIMIT ${limit}
      `;
    }
    
    // If no results or hybrid search is disabled, return vector search results
    if (results.length === 0 || !useHybridSearch) {
      return results.map(result => ({
        ...result,
        score: 0,
        relevance: 1 - Math.min(1, result.distance)
      }));
    }
    
    // Calculate average document length for BM25
    const avgDocLength = results.reduce((sum, doc) => sum + doc.content.split(/\\s+/).length, 0) / results.length;
    
    // Calculate additional scores and combined relevance
    const enhancedResults = results.map(result => {
      const keywordScore = calculateBM25Score(result.content, query, avgDocLength);
      const recencyScore = calculateRecencyScore(result.created_at);
      const categoryScore = calculateCategoryScore(result.category, category);
      const languageScore = calculateLanguageScore(result.language, language);
      
      const relevance = calculateRelevanceScore(
        result.distance,
        keywordScore,
        recencyScore,
        categoryScore,
        languageScore
      );
      
      return {
        ...result,
        score: keywordScore,
        relevance
      };
    });
    
    // Filter by relevance threshold and sort by relevance
    return enhancedResults
      .filter(result => result.relevance >= threshold)
      .sort((a, b) => b.relevance - a.relevance);
  } catch (error) {
    logger.error('Error searching knowledge base:', error);
    throw error;
  }
}

/**
 * Split long content into smaller chunks for better search performance
 * @param content Long content to split
 * @param maxChunkSize Maximum chunk size in characters (default: 1000)
 * @param overlapSize Overlap size between chunks in characters (default: 100)
 * @returns Array of content chunks
 */
export function splitContentIntoChunks(
  content: string,
  maxChunkSize = 1000,
  overlapSize = 100
): string[] {
  // If content is shorter than max chunk size, return as is
  if (content.length <= maxChunkSize) {
    return [content];
  }
  
  const chunks: string[] = [];
  let startPos = 0;
  
  while (startPos < content.length) {
    // Calculate end position
    let endPos = startPos + maxChunkSize;
    
    // If we're not at the end of the content, try to find a natural break point
    if (endPos < content.length) {
      // Look for paragraph break
      const paragraphBreak = content.indexOf('\\n\\n', endPos - 200);
      if (paragraphBreak !== -1 && paragraphBreak < endPos + 200) {
        endPos = paragraphBreak + 2;
      } else {
        // Look for sentence break
        const sentenceBreak = content.indexOf('. ', endPos - 100);
        if (sentenceBreak !== -1 && sentenceBreak < endPos + 100) {
          endPos = sentenceBreak + 2;
        } else {
          // Look for word break
          const wordBreak = content.indexOf(' ', endPos - 50);
          if (wordBreak !== -1 && wordBreak < endPos + 50) {
            endPos = wordBreak + 1;
          }
        }
      }
    } else {
      endPos = content.length;
    }
    
    // Add chunk
    chunks.push(content.substring(startPos, endPos));
    
    // Move start position for next chunk, with overlap
    startPos = endPos - overlapSize;
  }
  
  return chunks;
}

/**
 * Import knowledge base entries from a document
 * @param document Document content
 * @param source Source identifier
 * @param sourceId Source ID
 * @param category Category
 * @param language Language
 * @returns Array of created knowledge base entries
 */
export async function importFromDocument(
  document: string,
  source: string,
  sourceId?: string,
  category?: string,
  language?: string
): Promise<any[]> {
  try {
    // Split document into chunks
    const chunks = splitContentIntoChunks(document);
    
    // Detect language if not provided
    const detectedLanguage = language || detectLanguage(document);
    
    // Create knowledge entries for each chunk
    const entries: KnowledgeBaseEntry[] = chunks.map((chunk, index) => ({
      content: chunk,
      source,
      sourceId: sourceId ? `${sourceId}-${index + 1}` : undefined,
      category,
      language: detectedLanguage
    }));
    
    // Create knowledge entries
    const results = await createKnowledgeEntries(entries);
    
    logger.info(`Imported ${results.length} knowledge base entries from document`);
    return results;
  } catch (error) {
    logger.error('Error importing knowledge base entries from document:', error);
    throw error;
  }
}

/**
 * Export knowledge base entries to a document
 * @param options Export options
 * @returns Document content
 */
export async function exportToDocument(options: {
  category?: string;
  language?: string;
  source?: string;
}): Promise<string> {
  try {
    const { category, language, source } = options;
    
    // Build query conditions
    const conditions: any = {};
    if (category) conditions.category = category;
    if (language) conditions.language = language;
    if (source) conditions.source = source;
    
    // Get knowledge entries
    const entries = await prisma.knowledgeBase.findMany({
      where: conditions,
      orderBy: { createdAt: 'asc' }
    });
    
    // Build document
    const document = entries.map(entry => {
      return `# ${entry.category || 'Uncategorized'} - ${entry.source} (ID: ${entry.id})
      
${entry.content}

---`;
    }).join('\\n\\n');
    
    logger.info(`Exported ${entries.length} knowledge base entries to document`);
    return document;
  } catch (error) {
    logger.error('Error exporting knowledge base entries to document:', error);
    throw error;
  }
}

// Export all functions as a module
export default {
  createKnowledgeEntry,
  createKnowledgeEntries,
  updateKnowledgeEntry,
  deleteKnowledgeEntry,
  searchKnowledgeBase,
  splitContentIntoChunks,
  importFromDocument,
  exportToDocument
};
