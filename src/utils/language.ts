import langdetect from 'langdetect';
import { logger } from './logger';

/**
 * Detect the language of a text
 * @param text The text to detect the language of
 * @returns The language code (e.g., 'en', 'ko', 'ja', etc.) or undefined if detection fails
 */
export const detectLanguage = (text: string): string | undefined => {
  try {
    if (!text || text.trim().length < 10) {
      return undefined;
    }
    
    const detections = langdetect.detect(text);
    
    if (!detections || detections.length === 0) {
      return undefined;
    }
    
    // Get the most probable language
    return detections[0].lang;
  } catch (error) {
    logger.error('Language detection error:', error);
    return undefined;
  }
};
