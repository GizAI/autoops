
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model ProcessedEmail
 * 
 */
export type ProcessedEmail = $Result.DefaultSelection<Prisma.$ProcessedEmailPayload>
/**
 * Model KnowledgeBase
 * 
 */
export type KnowledgeBase = $Result.DefaultSelection<Prisma.$KnowledgeBasePayload>
/**
 * Model Response
 * 
 */
export type Response = $Result.DefaultSelection<Prisma.$ResponsePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.processedEmail`: Exposes CRUD operations for the **ProcessedEmail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProcessedEmails
    * const processedEmails = await prisma.processedEmail.findMany()
    * ```
    */
  get processedEmail(): Prisma.ProcessedEmailDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.knowledgeBase`: Exposes CRUD operations for the **KnowledgeBase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KnowledgeBases
    * const knowledgeBases = await prisma.knowledgeBase.findMany()
    * ```
    */
  get knowledgeBase(): Prisma.KnowledgeBaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.response`: Exposes CRUD operations for the **Response** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Responses
    * const responses = await prisma.response.findMany()
    * ```
    */
  get response(): Prisma.ResponseDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    ProcessedEmail: 'ProcessedEmail',
    KnowledgeBase: 'KnowledgeBase',
    Response: 'Response'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "processedEmail" | "knowledgeBase" | "response"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      ProcessedEmail: {
        payload: Prisma.$ProcessedEmailPayload<ExtArgs>
        fields: Prisma.ProcessedEmailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProcessedEmailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProcessedEmailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>
          }
          findFirst: {
            args: Prisma.ProcessedEmailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProcessedEmailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>
          }
          findMany: {
            args: Prisma.ProcessedEmailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>[]
          }
          create: {
            args: Prisma.ProcessedEmailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>
          }
          createMany: {
            args: Prisma.ProcessedEmailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProcessedEmailCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>[]
          }
          delete: {
            args: Prisma.ProcessedEmailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>
          }
          update: {
            args: Prisma.ProcessedEmailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>
          }
          deleteMany: {
            args: Prisma.ProcessedEmailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProcessedEmailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProcessedEmailUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>[]
          }
          upsert: {
            args: Prisma.ProcessedEmailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessedEmailPayload>
          }
          aggregate: {
            args: Prisma.ProcessedEmailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcessedEmail>
          }
          groupBy: {
            args: Prisma.ProcessedEmailGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProcessedEmailGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProcessedEmailCountArgs<ExtArgs>
            result: $Utils.Optional<ProcessedEmailCountAggregateOutputType> | number
          }
        }
      }
      KnowledgeBase: {
        payload: Prisma.$KnowledgeBasePayload<ExtArgs>
        fields: Prisma.KnowledgeBaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KnowledgeBaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KnowledgeBaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          findFirst: {
            args: Prisma.KnowledgeBaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KnowledgeBaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          findMany: {
            args: Prisma.KnowledgeBaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>[]
          }
          create: {
            args: Prisma.KnowledgeBaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          createMany: {
            args: Prisma.KnowledgeBaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KnowledgeBaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>[]
          }
          delete: {
            args: Prisma.KnowledgeBaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          update: {
            args: Prisma.KnowledgeBaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          deleteMany: {
            args: Prisma.KnowledgeBaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KnowledgeBaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KnowledgeBaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>[]
          }
          upsert: {
            args: Prisma.KnowledgeBaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          aggregate: {
            args: Prisma.KnowledgeBaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKnowledgeBase>
          }
          groupBy: {
            args: Prisma.KnowledgeBaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<KnowledgeBaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.KnowledgeBaseCountArgs<ExtArgs>
            result: $Utils.Optional<KnowledgeBaseCountAggregateOutputType> | number
          }
        }
      }
      Response: {
        payload: Prisma.$ResponsePayload<ExtArgs>
        fields: Prisma.ResponseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResponseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResponseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          findFirst: {
            args: Prisma.ResponseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResponseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          findMany: {
            args: Prisma.ResponseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>[]
          }
          create: {
            args: Prisma.ResponseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          createMany: {
            args: Prisma.ResponseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ResponseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>[]
          }
          delete: {
            args: Prisma.ResponseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          update: {
            args: Prisma.ResponseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          deleteMany: {
            args: Prisma.ResponseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResponseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ResponseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>[]
          }
          upsert: {
            args: Prisma.ResponseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResponsePayload>
          }
          aggregate: {
            args: Prisma.ResponseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResponse>
          }
          groupBy: {
            args: Prisma.ResponseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResponseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResponseCountArgs<ExtArgs>
            result: $Utils.Optional<ResponseCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    processedEmail?: ProcessedEmailOmit
    knowledgeBase?: KnowledgeBaseOmit
    response?: ResponseOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ResponseCountOutputType
   */

  export type ResponseCountOutputType = {
    processedEmails: number
  }

  export type ResponseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    processedEmails?: boolean | ResponseCountOutputTypeCountProcessedEmailsArgs
  }

  // Custom InputTypes
  /**
   * ResponseCountOutputType without action
   */
  export type ResponseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResponseCountOutputType
     */
    select?: ResponseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResponseCountOutputType without action
   */
  export type ResponseCountOutputTypeCountProcessedEmailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessedEmailWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    name: string | null
    password: string
    role: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      name: string | null
      password: string
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model ProcessedEmail
   */

  export type AggregateProcessedEmail = {
    _count: ProcessedEmailCountAggregateOutputType | null
    _avg: ProcessedEmailAvgAggregateOutputType | null
    _sum: ProcessedEmailSumAggregateOutputType | null
    _min: ProcessedEmailMinAggregateOutputType | null
    _max: ProcessedEmailMaxAggregateOutputType | null
  }

  export type ProcessedEmailAvgAggregateOutputType = {
    id: number | null
    responseId: number | null
  }

  export type ProcessedEmailSumAggregateOutputType = {
    id: number | null
    responseId: number | null
  }

  export type ProcessedEmailMinAggregateOutputType = {
    id: number | null
    messageId: string | null
    threadId: string | null
    fromEmail: string | null
    subject: string | null
    receivedAt: Date | null
    language: string | null
    status: string | null
    responseId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProcessedEmailMaxAggregateOutputType = {
    id: number | null
    messageId: string | null
    threadId: string | null
    fromEmail: string | null
    subject: string | null
    receivedAt: Date | null
    language: string | null
    status: string | null
    responseId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProcessedEmailCountAggregateOutputType = {
    id: number
    messageId: number
    threadId: number
    fromEmail: number
    subject: number
    receivedAt: number
    language: number
    status: number
    responseId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProcessedEmailAvgAggregateInputType = {
    id?: true
    responseId?: true
  }

  export type ProcessedEmailSumAggregateInputType = {
    id?: true
    responseId?: true
  }

  export type ProcessedEmailMinAggregateInputType = {
    id?: true
    messageId?: true
    threadId?: true
    fromEmail?: true
    subject?: true
    receivedAt?: true
    language?: true
    status?: true
    responseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProcessedEmailMaxAggregateInputType = {
    id?: true
    messageId?: true
    threadId?: true
    fromEmail?: true
    subject?: true
    receivedAt?: true
    language?: true
    status?: true
    responseId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProcessedEmailCountAggregateInputType = {
    id?: true
    messageId?: true
    threadId?: true
    fromEmail?: true
    subject?: true
    receivedAt?: true
    language?: true
    status?: true
    responseId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProcessedEmailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedEmail to aggregate.
     */
    where?: ProcessedEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEmails to fetch.
     */
    orderBy?: ProcessedEmailOrderByWithRelationInput | ProcessedEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProcessedEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProcessedEmails
    **/
    _count?: true | ProcessedEmailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProcessedEmailAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProcessedEmailSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProcessedEmailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProcessedEmailMaxAggregateInputType
  }

  export type GetProcessedEmailAggregateType<T extends ProcessedEmailAggregateArgs> = {
        [P in keyof T & keyof AggregateProcessedEmail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcessedEmail[P]>
      : GetScalarType<T[P], AggregateProcessedEmail[P]>
  }




  export type ProcessedEmailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessedEmailWhereInput
    orderBy?: ProcessedEmailOrderByWithAggregationInput | ProcessedEmailOrderByWithAggregationInput[]
    by: ProcessedEmailScalarFieldEnum[] | ProcessedEmailScalarFieldEnum
    having?: ProcessedEmailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProcessedEmailCountAggregateInputType | true
    _avg?: ProcessedEmailAvgAggregateInputType
    _sum?: ProcessedEmailSumAggregateInputType
    _min?: ProcessedEmailMinAggregateInputType
    _max?: ProcessedEmailMaxAggregateInputType
  }

  export type ProcessedEmailGroupByOutputType = {
    id: number
    messageId: string
    threadId: string
    fromEmail: string
    subject: string
    receivedAt: Date
    language: string | null
    status: string
    responseId: number | null
    createdAt: Date
    updatedAt: Date
    _count: ProcessedEmailCountAggregateOutputType | null
    _avg: ProcessedEmailAvgAggregateOutputType | null
    _sum: ProcessedEmailSumAggregateOutputType | null
    _min: ProcessedEmailMinAggregateOutputType | null
    _max: ProcessedEmailMaxAggregateOutputType | null
  }

  type GetProcessedEmailGroupByPayload<T extends ProcessedEmailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProcessedEmailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProcessedEmailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProcessedEmailGroupByOutputType[P]>
            : GetScalarType<T[P], ProcessedEmailGroupByOutputType[P]>
        }
      >
    >


  export type ProcessedEmailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    threadId?: boolean
    fromEmail?: boolean
    subject?: boolean
    receivedAt?: boolean
    language?: boolean
    status?: boolean
    responseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    response?: boolean | ProcessedEmail$responseArgs<ExtArgs>
  }, ExtArgs["result"]["processedEmail"]>

  export type ProcessedEmailSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    threadId?: boolean
    fromEmail?: boolean
    subject?: boolean
    receivedAt?: boolean
    language?: boolean
    status?: boolean
    responseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    response?: boolean | ProcessedEmail$responseArgs<ExtArgs>
  }, ExtArgs["result"]["processedEmail"]>

  export type ProcessedEmailSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    messageId?: boolean
    threadId?: boolean
    fromEmail?: boolean
    subject?: boolean
    receivedAt?: boolean
    language?: boolean
    status?: boolean
    responseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    response?: boolean | ProcessedEmail$responseArgs<ExtArgs>
  }, ExtArgs["result"]["processedEmail"]>

  export type ProcessedEmailSelectScalar = {
    id?: boolean
    messageId?: boolean
    threadId?: boolean
    fromEmail?: boolean
    subject?: boolean
    receivedAt?: boolean
    language?: boolean
    status?: boolean
    responseId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProcessedEmailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "messageId" | "threadId" | "fromEmail" | "subject" | "receivedAt" | "language" | "status" | "responseId" | "createdAt" | "updatedAt", ExtArgs["result"]["processedEmail"]>
  export type ProcessedEmailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    response?: boolean | ProcessedEmail$responseArgs<ExtArgs>
  }
  export type ProcessedEmailIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    response?: boolean | ProcessedEmail$responseArgs<ExtArgs>
  }
  export type ProcessedEmailIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    response?: boolean | ProcessedEmail$responseArgs<ExtArgs>
  }

  export type $ProcessedEmailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProcessedEmail"
    objects: {
      response: Prisma.$ResponsePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      messageId: string
      threadId: string
      fromEmail: string
      subject: string
      receivedAt: Date
      language: string | null
      status: string
      responseId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["processedEmail"]>
    composites: {}
  }

  type ProcessedEmailGetPayload<S extends boolean | null | undefined | ProcessedEmailDefaultArgs> = $Result.GetResult<Prisma.$ProcessedEmailPayload, S>

  type ProcessedEmailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProcessedEmailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProcessedEmailCountAggregateInputType | true
    }

  export interface ProcessedEmailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProcessedEmail'], meta: { name: 'ProcessedEmail' } }
    /**
     * Find zero or one ProcessedEmail that matches the filter.
     * @param {ProcessedEmailFindUniqueArgs} args - Arguments to find a ProcessedEmail
     * @example
     * // Get one ProcessedEmail
     * const processedEmail = await prisma.processedEmail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProcessedEmailFindUniqueArgs>(args: SelectSubset<T, ProcessedEmailFindUniqueArgs<ExtArgs>>): Prisma__ProcessedEmailClient<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProcessedEmail that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProcessedEmailFindUniqueOrThrowArgs} args - Arguments to find a ProcessedEmail
     * @example
     * // Get one ProcessedEmail
     * const processedEmail = await prisma.processedEmail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProcessedEmailFindUniqueOrThrowArgs>(args: SelectSubset<T, ProcessedEmailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProcessedEmailClient<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessedEmail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEmailFindFirstArgs} args - Arguments to find a ProcessedEmail
     * @example
     * // Get one ProcessedEmail
     * const processedEmail = await prisma.processedEmail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProcessedEmailFindFirstArgs>(args?: SelectSubset<T, ProcessedEmailFindFirstArgs<ExtArgs>>): Prisma__ProcessedEmailClient<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessedEmail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEmailFindFirstOrThrowArgs} args - Arguments to find a ProcessedEmail
     * @example
     * // Get one ProcessedEmail
     * const processedEmail = await prisma.processedEmail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProcessedEmailFindFirstOrThrowArgs>(args?: SelectSubset<T, ProcessedEmailFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProcessedEmailClient<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProcessedEmails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEmailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProcessedEmails
     * const processedEmails = await prisma.processedEmail.findMany()
     * 
     * // Get first 10 ProcessedEmails
     * const processedEmails = await prisma.processedEmail.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const processedEmailWithIdOnly = await prisma.processedEmail.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProcessedEmailFindManyArgs>(args?: SelectSubset<T, ProcessedEmailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProcessedEmail.
     * @param {ProcessedEmailCreateArgs} args - Arguments to create a ProcessedEmail.
     * @example
     * // Create one ProcessedEmail
     * const ProcessedEmail = await prisma.processedEmail.create({
     *   data: {
     *     // ... data to create a ProcessedEmail
     *   }
     * })
     * 
     */
    create<T extends ProcessedEmailCreateArgs>(args: SelectSubset<T, ProcessedEmailCreateArgs<ExtArgs>>): Prisma__ProcessedEmailClient<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProcessedEmails.
     * @param {ProcessedEmailCreateManyArgs} args - Arguments to create many ProcessedEmails.
     * @example
     * // Create many ProcessedEmails
     * const processedEmail = await prisma.processedEmail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProcessedEmailCreateManyArgs>(args?: SelectSubset<T, ProcessedEmailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProcessedEmails and returns the data saved in the database.
     * @param {ProcessedEmailCreateManyAndReturnArgs} args - Arguments to create many ProcessedEmails.
     * @example
     * // Create many ProcessedEmails
     * const processedEmail = await prisma.processedEmail.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProcessedEmails and only return the `id`
     * const processedEmailWithIdOnly = await prisma.processedEmail.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProcessedEmailCreateManyAndReturnArgs>(args?: SelectSubset<T, ProcessedEmailCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProcessedEmail.
     * @param {ProcessedEmailDeleteArgs} args - Arguments to delete one ProcessedEmail.
     * @example
     * // Delete one ProcessedEmail
     * const ProcessedEmail = await prisma.processedEmail.delete({
     *   where: {
     *     // ... filter to delete one ProcessedEmail
     *   }
     * })
     * 
     */
    delete<T extends ProcessedEmailDeleteArgs>(args: SelectSubset<T, ProcessedEmailDeleteArgs<ExtArgs>>): Prisma__ProcessedEmailClient<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProcessedEmail.
     * @param {ProcessedEmailUpdateArgs} args - Arguments to update one ProcessedEmail.
     * @example
     * // Update one ProcessedEmail
     * const processedEmail = await prisma.processedEmail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProcessedEmailUpdateArgs>(args: SelectSubset<T, ProcessedEmailUpdateArgs<ExtArgs>>): Prisma__ProcessedEmailClient<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProcessedEmails.
     * @param {ProcessedEmailDeleteManyArgs} args - Arguments to filter ProcessedEmails to delete.
     * @example
     * // Delete a few ProcessedEmails
     * const { count } = await prisma.processedEmail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProcessedEmailDeleteManyArgs>(args?: SelectSubset<T, ProcessedEmailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessedEmails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEmailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProcessedEmails
     * const processedEmail = await prisma.processedEmail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProcessedEmailUpdateManyArgs>(args: SelectSubset<T, ProcessedEmailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessedEmails and returns the data updated in the database.
     * @param {ProcessedEmailUpdateManyAndReturnArgs} args - Arguments to update many ProcessedEmails.
     * @example
     * // Update many ProcessedEmails
     * const processedEmail = await prisma.processedEmail.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProcessedEmails and only return the `id`
     * const processedEmailWithIdOnly = await prisma.processedEmail.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProcessedEmailUpdateManyAndReturnArgs>(args: SelectSubset<T, ProcessedEmailUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProcessedEmail.
     * @param {ProcessedEmailUpsertArgs} args - Arguments to update or create a ProcessedEmail.
     * @example
     * // Update or create a ProcessedEmail
     * const processedEmail = await prisma.processedEmail.upsert({
     *   create: {
     *     // ... data to create a ProcessedEmail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProcessedEmail we want to update
     *   }
     * })
     */
    upsert<T extends ProcessedEmailUpsertArgs>(args: SelectSubset<T, ProcessedEmailUpsertArgs<ExtArgs>>): Prisma__ProcessedEmailClient<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProcessedEmails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEmailCountArgs} args - Arguments to filter ProcessedEmails to count.
     * @example
     * // Count the number of ProcessedEmails
     * const count = await prisma.processedEmail.count({
     *   where: {
     *     // ... the filter for the ProcessedEmails we want to count
     *   }
     * })
    **/
    count<T extends ProcessedEmailCountArgs>(
      args?: Subset<T, ProcessedEmailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcessedEmailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProcessedEmail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEmailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProcessedEmailAggregateArgs>(args: Subset<T, ProcessedEmailAggregateArgs>): Prisma.PrismaPromise<GetProcessedEmailAggregateType<T>>

    /**
     * Group by ProcessedEmail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessedEmailGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProcessedEmailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcessedEmailGroupByArgs['orderBy'] }
        : { orderBy?: ProcessedEmailGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProcessedEmailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcessedEmailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProcessedEmail model
   */
  readonly fields: ProcessedEmailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProcessedEmail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProcessedEmailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    response<T extends ProcessedEmail$responseArgs<ExtArgs> = {}>(args?: Subset<T, ProcessedEmail$responseArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProcessedEmail model
   */
  interface ProcessedEmailFieldRefs {
    readonly id: FieldRef<"ProcessedEmail", 'Int'>
    readonly messageId: FieldRef<"ProcessedEmail", 'String'>
    readonly threadId: FieldRef<"ProcessedEmail", 'String'>
    readonly fromEmail: FieldRef<"ProcessedEmail", 'String'>
    readonly subject: FieldRef<"ProcessedEmail", 'String'>
    readonly receivedAt: FieldRef<"ProcessedEmail", 'DateTime'>
    readonly language: FieldRef<"ProcessedEmail", 'String'>
    readonly status: FieldRef<"ProcessedEmail", 'String'>
    readonly responseId: FieldRef<"ProcessedEmail", 'Int'>
    readonly createdAt: FieldRef<"ProcessedEmail", 'DateTime'>
    readonly updatedAt: FieldRef<"ProcessedEmail", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProcessedEmail findUnique
   */
  export type ProcessedEmailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedEmailInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedEmail to fetch.
     */
    where: ProcessedEmailWhereUniqueInput
  }

  /**
   * ProcessedEmail findUniqueOrThrow
   */
  export type ProcessedEmailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedEmailInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedEmail to fetch.
     */
    where: ProcessedEmailWhereUniqueInput
  }

  /**
   * ProcessedEmail findFirst
   */
  export type ProcessedEmailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedEmailInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedEmail to fetch.
     */
    where?: ProcessedEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEmails to fetch.
     */
    orderBy?: ProcessedEmailOrderByWithRelationInput | ProcessedEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedEmails.
     */
    cursor?: ProcessedEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedEmails.
     */
    distinct?: ProcessedEmailScalarFieldEnum | ProcessedEmailScalarFieldEnum[]
  }

  /**
   * ProcessedEmail findFirstOrThrow
   */
  export type ProcessedEmailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedEmailInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedEmail to fetch.
     */
    where?: ProcessedEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEmails to fetch.
     */
    orderBy?: ProcessedEmailOrderByWithRelationInput | ProcessedEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessedEmails.
     */
    cursor?: ProcessedEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEmails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessedEmails.
     */
    distinct?: ProcessedEmailScalarFieldEnum | ProcessedEmailScalarFieldEnum[]
  }

  /**
   * ProcessedEmail findMany
   */
  export type ProcessedEmailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedEmailInclude<ExtArgs> | null
    /**
     * Filter, which ProcessedEmails to fetch.
     */
    where?: ProcessedEmailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessedEmails to fetch.
     */
    orderBy?: ProcessedEmailOrderByWithRelationInput | ProcessedEmailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProcessedEmails.
     */
    cursor?: ProcessedEmailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessedEmails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessedEmails.
     */
    skip?: number
    distinct?: ProcessedEmailScalarFieldEnum | ProcessedEmailScalarFieldEnum[]
  }

  /**
   * ProcessedEmail create
   */
  export type ProcessedEmailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedEmailInclude<ExtArgs> | null
    /**
     * The data needed to create a ProcessedEmail.
     */
    data: XOR<ProcessedEmailCreateInput, ProcessedEmailUncheckedCreateInput>
  }

  /**
   * ProcessedEmail createMany
   */
  export type ProcessedEmailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProcessedEmails.
     */
    data: ProcessedEmailCreateManyInput | ProcessedEmailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessedEmail createManyAndReturn
   */
  export type ProcessedEmailCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * The data used to create many ProcessedEmails.
     */
    data: ProcessedEmailCreateManyInput | ProcessedEmailCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedEmailIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProcessedEmail update
   */
  export type ProcessedEmailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedEmailInclude<ExtArgs> | null
    /**
     * The data needed to update a ProcessedEmail.
     */
    data: XOR<ProcessedEmailUpdateInput, ProcessedEmailUncheckedUpdateInput>
    /**
     * Choose, which ProcessedEmail to update.
     */
    where: ProcessedEmailWhereUniqueInput
  }

  /**
   * ProcessedEmail updateMany
   */
  export type ProcessedEmailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProcessedEmails.
     */
    data: XOR<ProcessedEmailUpdateManyMutationInput, ProcessedEmailUncheckedUpdateManyInput>
    /**
     * Filter which ProcessedEmails to update
     */
    where?: ProcessedEmailWhereInput
    /**
     * Limit how many ProcessedEmails to update.
     */
    limit?: number
  }

  /**
   * ProcessedEmail updateManyAndReturn
   */
  export type ProcessedEmailUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * The data used to update ProcessedEmails.
     */
    data: XOR<ProcessedEmailUpdateManyMutationInput, ProcessedEmailUncheckedUpdateManyInput>
    /**
     * Filter which ProcessedEmails to update
     */
    where?: ProcessedEmailWhereInput
    /**
     * Limit how many ProcessedEmails to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedEmailIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProcessedEmail upsert
   */
  export type ProcessedEmailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedEmailInclude<ExtArgs> | null
    /**
     * The filter to search for the ProcessedEmail to update in case it exists.
     */
    where: ProcessedEmailWhereUniqueInput
    /**
     * In case the ProcessedEmail found by the `where` argument doesn't exist, create a new ProcessedEmail with this data.
     */
    create: XOR<ProcessedEmailCreateInput, ProcessedEmailUncheckedCreateInput>
    /**
     * In case the ProcessedEmail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProcessedEmailUpdateInput, ProcessedEmailUncheckedUpdateInput>
  }

  /**
   * ProcessedEmail delete
   */
  export type ProcessedEmailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedEmailInclude<ExtArgs> | null
    /**
     * Filter which ProcessedEmail to delete.
     */
    where: ProcessedEmailWhereUniqueInput
  }

  /**
   * ProcessedEmail deleteMany
   */
  export type ProcessedEmailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessedEmails to delete
     */
    where?: ProcessedEmailWhereInput
    /**
     * Limit how many ProcessedEmails to delete.
     */
    limit?: number
  }

  /**
   * ProcessedEmail.response
   */
  export type ProcessedEmail$responseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    where?: ResponseWhereInput
  }

  /**
   * ProcessedEmail without action
   */
  export type ProcessedEmailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedEmailInclude<ExtArgs> | null
  }


  /**
   * Model KnowledgeBase
   */

  export type AggregateKnowledgeBase = {
    _count: KnowledgeBaseCountAggregateOutputType | null
    _avg: KnowledgeBaseAvgAggregateOutputType | null
    _sum: KnowledgeBaseSumAggregateOutputType | null
    _min: KnowledgeBaseMinAggregateOutputType | null
    _max: KnowledgeBaseMaxAggregateOutputType | null
  }

  export type KnowledgeBaseAvgAggregateOutputType = {
    id: number | null
  }

  export type KnowledgeBaseSumAggregateOutputType = {
    id: number | null
  }

  export type KnowledgeBaseMinAggregateOutputType = {
    id: number | null
    content: string | null
    source: string | null
    sourceId: string | null
    category: string | null
    language: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KnowledgeBaseMaxAggregateOutputType = {
    id: number | null
    content: string | null
    source: string | null
    sourceId: string | null
    category: string | null
    language: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KnowledgeBaseCountAggregateOutputType = {
    id: number
    content: number
    source: number
    sourceId: number
    category: number
    language: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type KnowledgeBaseAvgAggregateInputType = {
    id?: true
  }

  export type KnowledgeBaseSumAggregateInputType = {
    id?: true
  }

  export type KnowledgeBaseMinAggregateInputType = {
    id?: true
    content?: true
    source?: true
    sourceId?: true
    category?: true
    language?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KnowledgeBaseMaxAggregateInputType = {
    id?: true
    content?: true
    source?: true
    sourceId?: true
    category?: true
    language?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KnowledgeBaseCountAggregateInputType = {
    id?: true
    content?: true
    source?: true
    sourceId?: true
    category?: true
    language?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type KnowledgeBaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KnowledgeBase to aggregate.
     */
    where?: KnowledgeBaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeBases to fetch.
     */
    orderBy?: KnowledgeBaseOrderByWithRelationInput | KnowledgeBaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KnowledgeBaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeBases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeBases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KnowledgeBases
    **/
    _count?: true | KnowledgeBaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: KnowledgeBaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: KnowledgeBaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KnowledgeBaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KnowledgeBaseMaxAggregateInputType
  }

  export type GetKnowledgeBaseAggregateType<T extends KnowledgeBaseAggregateArgs> = {
        [P in keyof T & keyof AggregateKnowledgeBase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKnowledgeBase[P]>
      : GetScalarType<T[P], AggregateKnowledgeBase[P]>
  }




  export type KnowledgeBaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KnowledgeBaseWhereInput
    orderBy?: KnowledgeBaseOrderByWithAggregationInput | KnowledgeBaseOrderByWithAggregationInput[]
    by: KnowledgeBaseScalarFieldEnum[] | KnowledgeBaseScalarFieldEnum
    having?: KnowledgeBaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KnowledgeBaseCountAggregateInputType | true
    _avg?: KnowledgeBaseAvgAggregateInputType
    _sum?: KnowledgeBaseSumAggregateInputType
    _min?: KnowledgeBaseMinAggregateInputType
    _max?: KnowledgeBaseMaxAggregateInputType
  }

  export type KnowledgeBaseGroupByOutputType = {
    id: number
    content: string
    source: string
    sourceId: string | null
    category: string | null
    language: string | null
    createdAt: Date
    updatedAt: Date
    _count: KnowledgeBaseCountAggregateOutputType | null
    _avg: KnowledgeBaseAvgAggregateOutputType | null
    _sum: KnowledgeBaseSumAggregateOutputType | null
    _min: KnowledgeBaseMinAggregateOutputType | null
    _max: KnowledgeBaseMaxAggregateOutputType | null
  }

  type GetKnowledgeBaseGroupByPayload<T extends KnowledgeBaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KnowledgeBaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KnowledgeBaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KnowledgeBaseGroupByOutputType[P]>
            : GetScalarType<T[P], KnowledgeBaseGroupByOutputType[P]>
        }
      >
    >


  export type KnowledgeBaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    source?: boolean
    sourceId?: boolean
    category?: boolean
    language?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["knowledgeBase"]>

  export type KnowledgeBaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    source?: boolean
    sourceId?: boolean
    category?: boolean
    language?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["knowledgeBase"]>

  export type KnowledgeBaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    source?: boolean
    sourceId?: boolean
    category?: boolean
    language?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["knowledgeBase"]>

  export type KnowledgeBaseSelectScalar = {
    id?: boolean
    content?: boolean
    source?: boolean
    sourceId?: boolean
    category?: boolean
    language?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type KnowledgeBaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "source" | "sourceId" | "category" | "language" | "createdAt" | "updatedAt", ExtArgs["result"]["knowledgeBase"]>

  export type $KnowledgeBasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KnowledgeBase"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      content: string
      source: string
      sourceId: string | null
      category: string | null
      language: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["knowledgeBase"]>
    composites: {}
  }

  type KnowledgeBaseGetPayload<S extends boolean | null | undefined | KnowledgeBaseDefaultArgs> = $Result.GetResult<Prisma.$KnowledgeBasePayload, S>

  type KnowledgeBaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KnowledgeBaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KnowledgeBaseCountAggregateInputType | true
    }

  export interface KnowledgeBaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KnowledgeBase'], meta: { name: 'KnowledgeBase' } }
    /**
     * Find zero or one KnowledgeBase that matches the filter.
     * @param {KnowledgeBaseFindUniqueArgs} args - Arguments to find a KnowledgeBase
     * @example
     * // Get one KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KnowledgeBaseFindUniqueArgs>(args: SelectSubset<T, KnowledgeBaseFindUniqueArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one KnowledgeBase that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KnowledgeBaseFindUniqueOrThrowArgs} args - Arguments to find a KnowledgeBase
     * @example
     * // Get one KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KnowledgeBaseFindUniqueOrThrowArgs>(args: SelectSubset<T, KnowledgeBaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KnowledgeBase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseFindFirstArgs} args - Arguments to find a KnowledgeBase
     * @example
     * // Get one KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KnowledgeBaseFindFirstArgs>(args?: SelectSubset<T, KnowledgeBaseFindFirstArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KnowledgeBase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseFindFirstOrThrowArgs} args - Arguments to find a KnowledgeBase
     * @example
     * // Get one KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KnowledgeBaseFindFirstOrThrowArgs>(args?: SelectSubset<T, KnowledgeBaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more KnowledgeBases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KnowledgeBases
     * const knowledgeBases = await prisma.knowledgeBase.findMany()
     * 
     * // Get first 10 KnowledgeBases
     * const knowledgeBases = await prisma.knowledgeBase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const knowledgeBaseWithIdOnly = await prisma.knowledgeBase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KnowledgeBaseFindManyArgs>(args?: SelectSubset<T, KnowledgeBaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a KnowledgeBase.
     * @param {KnowledgeBaseCreateArgs} args - Arguments to create a KnowledgeBase.
     * @example
     * // Create one KnowledgeBase
     * const KnowledgeBase = await prisma.knowledgeBase.create({
     *   data: {
     *     // ... data to create a KnowledgeBase
     *   }
     * })
     * 
     */
    create<T extends KnowledgeBaseCreateArgs>(args: SelectSubset<T, KnowledgeBaseCreateArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many KnowledgeBases.
     * @param {KnowledgeBaseCreateManyArgs} args - Arguments to create many KnowledgeBases.
     * @example
     * // Create many KnowledgeBases
     * const knowledgeBase = await prisma.knowledgeBase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KnowledgeBaseCreateManyArgs>(args?: SelectSubset<T, KnowledgeBaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KnowledgeBases and returns the data saved in the database.
     * @param {KnowledgeBaseCreateManyAndReturnArgs} args - Arguments to create many KnowledgeBases.
     * @example
     * // Create many KnowledgeBases
     * const knowledgeBase = await prisma.knowledgeBase.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KnowledgeBases and only return the `id`
     * const knowledgeBaseWithIdOnly = await prisma.knowledgeBase.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KnowledgeBaseCreateManyAndReturnArgs>(args?: SelectSubset<T, KnowledgeBaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a KnowledgeBase.
     * @param {KnowledgeBaseDeleteArgs} args - Arguments to delete one KnowledgeBase.
     * @example
     * // Delete one KnowledgeBase
     * const KnowledgeBase = await prisma.knowledgeBase.delete({
     *   where: {
     *     // ... filter to delete one KnowledgeBase
     *   }
     * })
     * 
     */
    delete<T extends KnowledgeBaseDeleteArgs>(args: SelectSubset<T, KnowledgeBaseDeleteArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one KnowledgeBase.
     * @param {KnowledgeBaseUpdateArgs} args - Arguments to update one KnowledgeBase.
     * @example
     * // Update one KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KnowledgeBaseUpdateArgs>(args: SelectSubset<T, KnowledgeBaseUpdateArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more KnowledgeBases.
     * @param {KnowledgeBaseDeleteManyArgs} args - Arguments to filter KnowledgeBases to delete.
     * @example
     * // Delete a few KnowledgeBases
     * const { count } = await prisma.knowledgeBase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KnowledgeBaseDeleteManyArgs>(args?: SelectSubset<T, KnowledgeBaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KnowledgeBases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KnowledgeBases
     * const knowledgeBase = await prisma.knowledgeBase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KnowledgeBaseUpdateManyArgs>(args: SelectSubset<T, KnowledgeBaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KnowledgeBases and returns the data updated in the database.
     * @param {KnowledgeBaseUpdateManyAndReturnArgs} args - Arguments to update many KnowledgeBases.
     * @example
     * // Update many KnowledgeBases
     * const knowledgeBase = await prisma.knowledgeBase.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more KnowledgeBases and only return the `id`
     * const knowledgeBaseWithIdOnly = await prisma.knowledgeBase.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends KnowledgeBaseUpdateManyAndReturnArgs>(args: SelectSubset<T, KnowledgeBaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one KnowledgeBase.
     * @param {KnowledgeBaseUpsertArgs} args - Arguments to update or create a KnowledgeBase.
     * @example
     * // Update or create a KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.upsert({
     *   create: {
     *     // ... data to create a KnowledgeBase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KnowledgeBase we want to update
     *   }
     * })
     */
    upsert<T extends KnowledgeBaseUpsertArgs>(args: SelectSubset<T, KnowledgeBaseUpsertArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of KnowledgeBases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseCountArgs} args - Arguments to filter KnowledgeBases to count.
     * @example
     * // Count the number of KnowledgeBases
     * const count = await prisma.knowledgeBase.count({
     *   where: {
     *     // ... the filter for the KnowledgeBases we want to count
     *   }
     * })
    **/
    count<T extends KnowledgeBaseCountArgs>(
      args?: Subset<T, KnowledgeBaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KnowledgeBaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KnowledgeBase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KnowledgeBaseAggregateArgs>(args: Subset<T, KnowledgeBaseAggregateArgs>): Prisma.PrismaPromise<GetKnowledgeBaseAggregateType<T>>

    /**
     * Group by KnowledgeBase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KnowledgeBaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KnowledgeBaseGroupByArgs['orderBy'] }
        : { orderBy?: KnowledgeBaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KnowledgeBaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKnowledgeBaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KnowledgeBase model
   */
  readonly fields: KnowledgeBaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KnowledgeBase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KnowledgeBaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the KnowledgeBase model
   */
  interface KnowledgeBaseFieldRefs {
    readonly id: FieldRef<"KnowledgeBase", 'Int'>
    readonly content: FieldRef<"KnowledgeBase", 'String'>
    readonly source: FieldRef<"KnowledgeBase", 'String'>
    readonly sourceId: FieldRef<"KnowledgeBase", 'String'>
    readonly category: FieldRef<"KnowledgeBase", 'String'>
    readonly language: FieldRef<"KnowledgeBase", 'String'>
    readonly createdAt: FieldRef<"KnowledgeBase", 'DateTime'>
    readonly updatedAt: FieldRef<"KnowledgeBase", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KnowledgeBase findUnique
   */
  export type KnowledgeBaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeBase to fetch.
     */
    where: KnowledgeBaseWhereUniqueInput
  }

  /**
   * KnowledgeBase findUniqueOrThrow
   */
  export type KnowledgeBaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeBase to fetch.
     */
    where: KnowledgeBaseWhereUniqueInput
  }

  /**
   * KnowledgeBase findFirst
   */
  export type KnowledgeBaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeBase to fetch.
     */
    where?: KnowledgeBaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeBases to fetch.
     */
    orderBy?: KnowledgeBaseOrderByWithRelationInput | KnowledgeBaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KnowledgeBases.
     */
    cursor?: KnowledgeBaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeBases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeBases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KnowledgeBases.
     */
    distinct?: KnowledgeBaseScalarFieldEnum | KnowledgeBaseScalarFieldEnum[]
  }

  /**
   * KnowledgeBase findFirstOrThrow
   */
  export type KnowledgeBaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeBase to fetch.
     */
    where?: KnowledgeBaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeBases to fetch.
     */
    orderBy?: KnowledgeBaseOrderByWithRelationInput | KnowledgeBaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KnowledgeBases.
     */
    cursor?: KnowledgeBaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeBases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeBases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KnowledgeBases.
     */
    distinct?: KnowledgeBaseScalarFieldEnum | KnowledgeBaseScalarFieldEnum[]
  }

  /**
   * KnowledgeBase findMany
   */
  export type KnowledgeBaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeBases to fetch.
     */
    where?: KnowledgeBaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeBases to fetch.
     */
    orderBy?: KnowledgeBaseOrderByWithRelationInput | KnowledgeBaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KnowledgeBases.
     */
    cursor?: KnowledgeBaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeBases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeBases.
     */
    skip?: number
    distinct?: KnowledgeBaseScalarFieldEnum | KnowledgeBaseScalarFieldEnum[]
  }

  /**
   * KnowledgeBase create
   */
  export type KnowledgeBaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * The data needed to create a KnowledgeBase.
     */
    data: XOR<KnowledgeBaseCreateInput, KnowledgeBaseUncheckedCreateInput>
  }

  /**
   * KnowledgeBase createMany
   */
  export type KnowledgeBaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KnowledgeBases.
     */
    data: KnowledgeBaseCreateManyInput | KnowledgeBaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KnowledgeBase createManyAndReturn
   */
  export type KnowledgeBaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * The data used to create many KnowledgeBases.
     */
    data: KnowledgeBaseCreateManyInput | KnowledgeBaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KnowledgeBase update
   */
  export type KnowledgeBaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * The data needed to update a KnowledgeBase.
     */
    data: XOR<KnowledgeBaseUpdateInput, KnowledgeBaseUncheckedUpdateInput>
    /**
     * Choose, which KnowledgeBase to update.
     */
    where: KnowledgeBaseWhereUniqueInput
  }

  /**
   * KnowledgeBase updateMany
   */
  export type KnowledgeBaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KnowledgeBases.
     */
    data: XOR<KnowledgeBaseUpdateManyMutationInput, KnowledgeBaseUncheckedUpdateManyInput>
    /**
     * Filter which KnowledgeBases to update
     */
    where?: KnowledgeBaseWhereInput
    /**
     * Limit how many KnowledgeBases to update.
     */
    limit?: number
  }

  /**
   * KnowledgeBase updateManyAndReturn
   */
  export type KnowledgeBaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * The data used to update KnowledgeBases.
     */
    data: XOR<KnowledgeBaseUpdateManyMutationInput, KnowledgeBaseUncheckedUpdateManyInput>
    /**
     * Filter which KnowledgeBases to update
     */
    where?: KnowledgeBaseWhereInput
    /**
     * Limit how many KnowledgeBases to update.
     */
    limit?: number
  }

  /**
   * KnowledgeBase upsert
   */
  export type KnowledgeBaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * The filter to search for the KnowledgeBase to update in case it exists.
     */
    where: KnowledgeBaseWhereUniqueInput
    /**
     * In case the KnowledgeBase found by the `where` argument doesn't exist, create a new KnowledgeBase with this data.
     */
    create: XOR<KnowledgeBaseCreateInput, KnowledgeBaseUncheckedCreateInput>
    /**
     * In case the KnowledgeBase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KnowledgeBaseUpdateInput, KnowledgeBaseUncheckedUpdateInput>
  }

  /**
   * KnowledgeBase delete
   */
  export type KnowledgeBaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Filter which KnowledgeBase to delete.
     */
    where: KnowledgeBaseWhereUniqueInput
  }

  /**
   * KnowledgeBase deleteMany
   */
  export type KnowledgeBaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KnowledgeBases to delete
     */
    where?: KnowledgeBaseWhereInput
    /**
     * Limit how many KnowledgeBases to delete.
     */
    limit?: number
  }

  /**
   * KnowledgeBase without action
   */
  export type KnowledgeBaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
  }


  /**
   * Model Response
   */

  export type AggregateResponse = {
    _count: ResponseCountAggregateOutputType | null
    _avg: ResponseAvgAggregateOutputType | null
    _sum: ResponseSumAggregateOutputType | null
    _min: ResponseMinAggregateOutputType | null
    _max: ResponseMaxAggregateOutputType | null
  }

  export type ResponseAvgAggregateOutputType = {
    id: number | null
  }

  export type ResponseSumAggregateOutputType = {
    id: number | null
  }

  export type ResponseMinAggregateOutputType = {
    id: number | null
    threadId: string | null
    subject: string | null
    body: string | null
    htmlBody: string | null
    language: string | null
    status: string | null
    sentAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResponseMaxAggregateOutputType = {
    id: number | null
    threadId: string | null
    subject: string | null
    body: string | null
    htmlBody: string | null
    language: string | null
    status: string | null
    sentAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ResponseCountAggregateOutputType = {
    id: number
    threadId: number
    subject: number
    body: number
    htmlBody: number
    language: number
    status: number
    sentAt: number
    knowledgeSources: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ResponseAvgAggregateInputType = {
    id?: true
  }

  export type ResponseSumAggregateInputType = {
    id?: true
  }

  export type ResponseMinAggregateInputType = {
    id?: true
    threadId?: true
    subject?: true
    body?: true
    htmlBody?: true
    language?: true
    status?: true
    sentAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResponseMaxAggregateInputType = {
    id?: true
    threadId?: true
    subject?: true
    body?: true
    htmlBody?: true
    language?: true
    status?: true
    sentAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ResponseCountAggregateInputType = {
    id?: true
    threadId?: true
    subject?: true
    body?: true
    htmlBody?: true
    language?: true
    status?: true
    sentAt?: true
    knowledgeSources?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ResponseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Response to aggregate.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Responses
    **/
    _count?: true | ResponseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResponseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResponseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResponseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResponseMaxAggregateInputType
  }

  export type GetResponseAggregateType<T extends ResponseAggregateArgs> = {
        [P in keyof T & keyof AggregateResponse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResponse[P]>
      : GetScalarType<T[P], AggregateResponse[P]>
  }




  export type ResponseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResponseWhereInput
    orderBy?: ResponseOrderByWithAggregationInput | ResponseOrderByWithAggregationInput[]
    by: ResponseScalarFieldEnum[] | ResponseScalarFieldEnum
    having?: ResponseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResponseCountAggregateInputType | true
    _avg?: ResponseAvgAggregateInputType
    _sum?: ResponseSumAggregateInputType
    _min?: ResponseMinAggregateInputType
    _max?: ResponseMaxAggregateInputType
  }

  export type ResponseGroupByOutputType = {
    id: number
    threadId: string
    subject: string
    body: string
    htmlBody: string | null
    language: string
    status: string
    sentAt: Date | null
    knowledgeSources: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: ResponseCountAggregateOutputType | null
    _avg: ResponseAvgAggregateOutputType | null
    _sum: ResponseSumAggregateOutputType | null
    _min: ResponseMinAggregateOutputType | null
    _max: ResponseMaxAggregateOutputType | null
  }

  type GetResponseGroupByPayload<T extends ResponseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResponseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResponseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResponseGroupByOutputType[P]>
            : GetScalarType<T[P], ResponseGroupByOutputType[P]>
        }
      >
    >


  export type ResponseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    subject?: boolean
    body?: boolean
    htmlBody?: boolean
    language?: boolean
    status?: boolean
    sentAt?: boolean
    knowledgeSources?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    processedEmails?: boolean | Response$processedEmailsArgs<ExtArgs>
    _count?: boolean | ResponseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["response"]>

  export type ResponseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    subject?: boolean
    body?: boolean
    htmlBody?: boolean
    language?: boolean
    status?: boolean
    sentAt?: boolean
    knowledgeSources?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["response"]>

  export type ResponseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    threadId?: boolean
    subject?: boolean
    body?: boolean
    htmlBody?: boolean
    language?: boolean
    status?: boolean
    sentAt?: boolean
    knowledgeSources?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["response"]>

  export type ResponseSelectScalar = {
    id?: boolean
    threadId?: boolean
    subject?: boolean
    body?: boolean
    htmlBody?: boolean
    language?: boolean
    status?: boolean
    sentAt?: boolean
    knowledgeSources?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ResponseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "threadId" | "subject" | "body" | "htmlBody" | "language" | "status" | "sentAt" | "knowledgeSources" | "createdAt" | "updatedAt", ExtArgs["result"]["response"]>
  export type ResponseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    processedEmails?: boolean | Response$processedEmailsArgs<ExtArgs>
    _count?: boolean | ResponseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ResponseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ResponseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ResponsePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Response"
    objects: {
      processedEmails: Prisma.$ProcessedEmailPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      threadId: string
      subject: string
      body: string
      htmlBody: string | null
      language: string
      status: string
      sentAt: Date | null
      knowledgeSources: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["response"]>
    composites: {}
  }

  type ResponseGetPayload<S extends boolean | null | undefined | ResponseDefaultArgs> = $Result.GetResult<Prisma.$ResponsePayload, S>

  type ResponseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResponseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResponseCountAggregateInputType | true
    }

  export interface ResponseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Response'], meta: { name: 'Response' } }
    /**
     * Find zero or one Response that matches the filter.
     * @param {ResponseFindUniqueArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResponseFindUniqueArgs>(args: SelectSubset<T, ResponseFindUniqueArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Response that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResponseFindUniqueOrThrowArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResponseFindUniqueOrThrowArgs>(args: SelectSubset<T, ResponseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Response that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindFirstArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResponseFindFirstArgs>(args?: SelectSubset<T, ResponseFindFirstArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Response that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindFirstOrThrowArgs} args - Arguments to find a Response
     * @example
     * // Get one Response
     * const response = await prisma.response.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResponseFindFirstOrThrowArgs>(args?: SelectSubset<T, ResponseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Responses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Responses
     * const responses = await prisma.response.findMany()
     * 
     * // Get first 10 Responses
     * const responses = await prisma.response.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const responseWithIdOnly = await prisma.response.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResponseFindManyArgs>(args?: SelectSubset<T, ResponseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Response.
     * @param {ResponseCreateArgs} args - Arguments to create a Response.
     * @example
     * // Create one Response
     * const Response = await prisma.response.create({
     *   data: {
     *     // ... data to create a Response
     *   }
     * })
     * 
     */
    create<T extends ResponseCreateArgs>(args: SelectSubset<T, ResponseCreateArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Responses.
     * @param {ResponseCreateManyArgs} args - Arguments to create many Responses.
     * @example
     * // Create many Responses
     * const response = await prisma.response.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResponseCreateManyArgs>(args?: SelectSubset<T, ResponseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Responses and returns the data saved in the database.
     * @param {ResponseCreateManyAndReturnArgs} args - Arguments to create many Responses.
     * @example
     * // Create many Responses
     * const response = await prisma.response.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Responses and only return the `id`
     * const responseWithIdOnly = await prisma.response.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ResponseCreateManyAndReturnArgs>(args?: SelectSubset<T, ResponseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Response.
     * @param {ResponseDeleteArgs} args - Arguments to delete one Response.
     * @example
     * // Delete one Response
     * const Response = await prisma.response.delete({
     *   where: {
     *     // ... filter to delete one Response
     *   }
     * })
     * 
     */
    delete<T extends ResponseDeleteArgs>(args: SelectSubset<T, ResponseDeleteArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Response.
     * @param {ResponseUpdateArgs} args - Arguments to update one Response.
     * @example
     * // Update one Response
     * const response = await prisma.response.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResponseUpdateArgs>(args: SelectSubset<T, ResponseUpdateArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Responses.
     * @param {ResponseDeleteManyArgs} args - Arguments to filter Responses to delete.
     * @example
     * // Delete a few Responses
     * const { count } = await prisma.response.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResponseDeleteManyArgs>(args?: SelectSubset<T, ResponseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Responses
     * const response = await prisma.response.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResponseUpdateManyArgs>(args: SelectSubset<T, ResponseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Responses and returns the data updated in the database.
     * @param {ResponseUpdateManyAndReturnArgs} args - Arguments to update many Responses.
     * @example
     * // Update many Responses
     * const response = await prisma.response.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Responses and only return the `id`
     * const responseWithIdOnly = await prisma.response.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ResponseUpdateManyAndReturnArgs>(args: SelectSubset<T, ResponseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Response.
     * @param {ResponseUpsertArgs} args - Arguments to update or create a Response.
     * @example
     * // Update or create a Response
     * const response = await prisma.response.upsert({
     *   create: {
     *     // ... data to create a Response
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Response we want to update
     *   }
     * })
     */
    upsert<T extends ResponseUpsertArgs>(args: SelectSubset<T, ResponseUpsertArgs<ExtArgs>>): Prisma__ResponseClient<$Result.GetResult<Prisma.$ResponsePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Responses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseCountArgs} args - Arguments to filter Responses to count.
     * @example
     * // Count the number of Responses
     * const count = await prisma.response.count({
     *   where: {
     *     // ... the filter for the Responses we want to count
     *   }
     * })
    **/
    count<T extends ResponseCountArgs>(
      args?: Subset<T, ResponseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResponseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Response.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResponseAggregateArgs>(args: Subset<T, ResponseAggregateArgs>): Prisma.PrismaPromise<GetResponseAggregateType<T>>

    /**
     * Group by Response.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResponseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResponseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResponseGroupByArgs['orderBy'] }
        : { orderBy?: ResponseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResponseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResponseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Response model
   */
  readonly fields: ResponseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Response.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResponseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    processedEmails<T extends Response$processedEmailsArgs<ExtArgs> = {}>(args?: Subset<T, Response$processedEmailsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessedEmailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Response model
   */
  interface ResponseFieldRefs {
    readonly id: FieldRef<"Response", 'Int'>
    readonly threadId: FieldRef<"Response", 'String'>
    readonly subject: FieldRef<"Response", 'String'>
    readonly body: FieldRef<"Response", 'String'>
    readonly htmlBody: FieldRef<"Response", 'String'>
    readonly language: FieldRef<"Response", 'String'>
    readonly status: FieldRef<"Response", 'String'>
    readonly sentAt: FieldRef<"Response", 'DateTime'>
    readonly knowledgeSources: FieldRef<"Response", 'Json'>
    readonly createdAt: FieldRef<"Response", 'DateTime'>
    readonly updatedAt: FieldRef<"Response", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Response findUnique
   */
  export type ResponseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response findUniqueOrThrow
   */
  export type ResponseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response findFirst
   */
  export type ResponseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Responses.
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Responses.
     */
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Response findFirstOrThrow
   */
  export type ResponseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Response to fetch.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Responses.
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Responses.
     */
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Response findMany
   */
  export type ResponseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter, which Responses to fetch.
     */
    where?: ResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Responses to fetch.
     */
    orderBy?: ResponseOrderByWithRelationInput | ResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Responses.
     */
    cursor?: ResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Responses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Responses.
     */
    skip?: number
    distinct?: ResponseScalarFieldEnum | ResponseScalarFieldEnum[]
  }

  /**
   * Response create
   */
  export type ResponseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * The data needed to create a Response.
     */
    data: XOR<ResponseCreateInput, ResponseUncheckedCreateInput>
  }

  /**
   * Response createMany
   */
  export type ResponseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Responses.
     */
    data: ResponseCreateManyInput | ResponseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Response createManyAndReturn
   */
  export type ResponseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * The data used to create many Responses.
     */
    data: ResponseCreateManyInput | ResponseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Response update
   */
  export type ResponseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * The data needed to update a Response.
     */
    data: XOR<ResponseUpdateInput, ResponseUncheckedUpdateInput>
    /**
     * Choose, which Response to update.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response updateMany
   */
  export type ResponseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Responses.
     */
    data: XOR<ResponseUpdateManyMutationInput, ResponseUncheckedUpdateManyInput>
    /**
     * Filter which Responses to update
     */
    where?: ResponseWhereInput
    /**
     * Limit how many Responses to update.
     */
    limit?: number
  }

  /**
   * Response updateManyAndReturn
   */
  export type ResponseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * The data used to update Responses.
     */
    data: XOR<ResponseUpdateManyMutationInput, ResponseUncheckedUpdateManyInput>
    /**
     * Filter which Responses to update
     */
    where?: ResponseWhereInput
    /**
     * Limit how many Responses to update.
     */
    limit?: number
  }

  /**
   * Response upsert
   */
  export type ResponseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * The filter to search for the Response to update in case it exists.
     */
    where: ResponseWhereUniqueInput
    /**
     * In case the Response found by the `where` argument doesn't exist, create a new Response with this data.
     */
    create: XOR<ResponseCreateInput, ResponseUncheckedCreateInput>
    /**
     * In case the Response was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResponseUpdateInput, ResponseUncheckedUpdateInput>
  }

  /**
   * Response delete
   */
  export type ResponseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
    /**
     * Filter which Response to delete.
     */
    where: ResponseWhereUniqueInput
  }

  /**
   * Response deleteMany
   */
  export type ResponseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Responses to delete
     */
    where?: ResponseWhereInput
    /**
     * Limit how many Responses to delete.
     */
    limit?: number
  }

  /**
   * Response.processedEmails
   */
  export type Response$processedEmailsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessedEmail
     */
    select?: ProcessedEmailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessedEmail
     */
    omit?: ProcessedEmailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessedEmailInclude<ExtArgs> | null
    where?: ProcessedEmailWhereInput
    orderBy?: ProcessedEmailOrderByWithRelationInput | ProcessedEmailOrderByWithRelationInput[]
    cursor?: ProcessedEmailWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProcessedEmailScalarFieldEnum | ProcessedEmailScalarFieldEnum[]
  }

  /**
   * Response without action
   */
  export type ResponseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Response
     */
    select?: ResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Response
     */
    omit?: ResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResponseInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProcessedEmailScalarFieldEnum: {
    id: 'id',
    messageId: 'messageId',
    threadId: 'threadId',
    fromEmail: 'fromEmail',
    subject: 'subject',
    receivedAt: 'receivedAt',
    language: 'language',
    status: 'status',
    responseId: 'responseId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProcessedEmailScalarFieldEnum = (typeof ProcessedEmailScalarFieldEnum)[keyof typeof ProcessedEmailScalarFieldEnum]


  export const KnowledgeBaseScalarFieldEnum: {
    id: 'id',
    content: 'content',
    source: 'source',
    sourceId: 'sourceId',
    category: 'category',
    language: 'language',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type KnowledgeBaseScalarFieldEnum = (typeof KnowledgeBaseScalarFieldEnum)[keyof typeof KnowledgeBaseScalarFieldEnum]


  export const ResponseScalarFieldEnum: {
    id: 'id',
    threadId: 'threadId',
    subject: 'subject',
    body: 'body',
    htmlBody: 'htmlBody',
    language: 'language',
    status: 'status',
    sentAt: 'sentAt',
    knowledgeSources: 'knowledgeSources',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ResponseScalarFieldEnum = (typeof ResponseScalarFieldEnum)[keyof typeof ResponseScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProcessedEmailWhereInput = {
    AND?: ProcessedEmailWhereInput | ProcessedEmailWhereInput[]
    OR?: ProcessedEmailWhereInput[]
    NOT?: ProcessedEmailWhereInput | ProcessedEmailWhereInput[]
    id?: IntFilter<"ProcessedEmail"> | number
    messageId?: StringFilter<"ProcessedEmail"> | string
    threadId?: StringFilter<"ProcessedEmail"> | string
    fromEmail?: StringFilter<"ProcessedEmail"> | string
    subject?: StringFilter<"ProcessedEmail"> | string
    receivedAt?: DateTimeFilter<"ProcessedEmail"> | Date | string
    language?: StringNullableFilter<"ProcessedEmail"> | string | null
    status?: StringFilter<"ProcessedEmail"> | string
    responseId?: IntNullableFilter<"ProcessedEmail"> | number | null
    createdAt?: DateTimeFilter<"ProcessedEmail"> | Date | string
    updatedAt?: DateTimeFilter<"ProcessedEmail"> | Date | string
    response?: XOR<ResponseNullableScalarRelationFilter, ResponseWhereInput> | null
  }

  export type ProcessedEmailOrderByWithRelationInput = {
    id?: SortOrder
    messageId?: SortOrder
    threadId?: SortOrder
    fromEmail?: SortOrder
    subject?: SortOrder
    receivedAt?: SortOrder
    language?: SortOrderInput | SortOrder
    status?: SortOrder
    responseId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    response?: ResponseOrderByWithRelationInput
  }

  export type ProcessedEmailWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    messageId?: string
    AND?: ProcessedEmailWhereInput | ProcessedEmailWhereInput[]
    OR?: ProcessedEmailWhereInput[]
    NOT?: ProcessedEmailWhereInput | ProcessedEmailWhereInput[]
    threadId?: StringFilter<"ProcessedEmail"> | string
    fromEmail?: StringFilter<"ProcessedEmail"> | string
    subject?: StringFilter<"ProcessedEmail"> | string
    receivedAt?: DateTimeFilter<"ProcessedEmail"> | Date | string
    language?: StringNullableFilter<"ProcessedEmail"> | string | null
    status?: StringFilter<"ProcessedEmail"> | string
    responseId?: IntNullableFilter<"ProcessedEmail"> | number | null
    createdAt?: DateTimeFilter<"ProcessedEmail"> | Date | string
    updatedAt?: DateTimeFilter<"ProcessedEmail"> | Date | string
    response?: XOR<ResponseNullableScalarRelationFilter, ResponseWhereInput> | null
  }, "id" | "messageId">

  export type ProcessedEmailOrderByWithAggregationInput = {
    id?: SortOrder
    messageId?: SortOrder
    threadId?: SortOrder
    fromEmail?: SortOrder
    subject?: SortOrder
    receivedAt?: SortOrder
    language?: SortOrderInput | SortOrder
    status?: SortOrder
    responseId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProcessedEmailCountOrderByAggregateInput
    _avg?: ProcessedEmailAvgOrderByAggregateInput
    _max?: ProcessedEmailMaxOrderByAggregateInput
    _min?: ProcessedEmailMinOrderByAggregateInput
    _sum?: ProcessedEmailSumOrderByAggregateInput
  }

  export type ProcessedEmailScalarWhereWithAggregatesInput = {
    AND?: ProcessedEmailScalarWhereWithAggregatesInput | ProcessedEmailScalarWhereWithAggregatesInput[]
    OR?: ProcessedEmailScalarWhereWithAggregatesInput[]
    NOT?: ProcessedEmailScalarWhereWithAggregatesInput | ProcessedEmailScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProcessedEmail"> | number
    messageId?: StringWithAggregatesFilter<"ProcessedEmail"> | string
    threadId?: StringWithAggregatesFilter<"ProcessedEmail"> | string
    fromEmail?: StringWithAggregatesFilter<"ProcessedEmail"> | string
    subject?: StringWithAggregatesFilter<"ProcessedEmail"> | string
    receivedAt?: DateTimeWithAggregatesFilter<"ProcessedEmail"> | Date | string
    language?: StringNullableWithAggregatesFilter<"ProcessedEmail"> | string | null
    status?: StringWithAggregatesFilter<"ProcessedEmail"> | string
    responseId?: IntNullableWithAggregatesFilter<"ProcessedEmail"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"ProcessedEmail"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProcessedEmail"> | Date | string
  }

  export type KnowledgeBaseWhereInput = {
    AND?: KnowledgeBaseWhereInput | KnowledgeBaseWhereInput[]
    OR?: KnowledgeBaseWhereInput[]
    NOT?: KnowledgeBaseWhereInput | KnowledgeBaseWhereInput[]
    id?: IntFilter<"KnowledgeBase"> | number
    content?: StringFilter<"KnowledgeBase"> | string
    source?: StringFilter<"KnowledgeBase"> | string
    sourceId?: StringNullableFilter<"KnowledgeBase"> | string | null
    category?: StringNullableFilter<"KnowledgeBase"> | string | null
    language?: StringNullableFilter<"KnowledgeBase"> | string | null
    createdAt?: DateTimeFilter<"KnowledgeBase"> | Date | string
    updatedAt?: DateTimeFilter<"KnowledgeBase"> | Date | string
  }

  export type KnowledgeBaseOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    source?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KnowledgeBaseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: KnowledgeBaseWhereInput | KnowledgeBaseWhereInput[]
    OR?: KnowledgeBaseWhereInput[]
    NOT?: KnowledgeBaseWhereInput | KnowledgeBaseWhereInput[]
    content?: StringFilter<"KnowledgeBase"> | string
    source?: StringFilter<"KnowledgeBase"> | string
    sourceId?: StringNullableFilter<"KnowledgeBase"> | string | null
    category?: StringNullableFilter<"KnowledgeBase"> | string | null
    language?: StringNullableFilter<"KnowledgeBase"> | string | null
    createdAt?: DateTimeFilter<"KnowledgeBase"> | Date | string
    updatedAt?: DateTimeFilter<"KnowledgeBase"> | Date | string
  }, "id">

  export type KnowledgeBaseOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    source?: SortOrder
    sourceId?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: KnowledgeBaseCountOrderByAggregateInput
    _avg?: KnowledgeBaseAvgOrderByAggregateInput
    _max?: KnowledgeBaseMaxOrderByAggregateInput
    _min?: KnowledgeBaseMinOrderByAggregateInput
    _sum?: KnowledgeBaseSumOrderByAggregateInput
  }

  export type KnowledgeBaseScalarWhereWithAggregatesInput = {
    AND?: KnowledgeBaseScalarWhereWithAggregatesInput | KnowledgeBaseScalarWhereWithAggregatesInput[]
    OR?: KnowledgeBaseScalarWhereWithAggregatesInput[]
    NOT?: KnowledgeBaseScalarWhereWithAggregatesInput | KnowledgeBaseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"KnowledgeBase"> | number
    content?: StringWithAggregatesFilter<"KnowledgeBase"> | string
    source?: StringWithAggregatesFilter<"KnowledgeBase"> | string
    sourceId?: StringNullableWithAggregatesFilter<"KnowledgeBase"> | string | null
    category?: StringNullableWithAggregatesFilter<"KnowledgeBase"> | string | null
    language?: StringNullableWithAggregatesFilter<"KnowledgeBase"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"KnowledgeBase"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"KnowledgeBase"> | Date | string
  }

  export type ResponseWhereInput = {
    AND?: ResponseWhereInput | ResponseWhereInput[]
    OR?: ResponseWhereInput[]
    NOT?: ResponseWhereInput | ResponseWhereInput[]
    id?: IntFilter<"Response"> | number
    threadId?: StringFilter<"Response"> | string
    subject?: StringFilter<"Response"> | string
    body?: StringFilter<"Response"> | string
    htmlBody?: StringNullableFilter<"Response"> | string | null
    language?: StringFilter<"Response"> | string
    status?: StringFilter<"Response"> | string
    sentAt?: DateTimeNullableFilter<"Response"> | Date | string | null
    knowledgeSources?: JsonNullableFilter<"Response">
    createdAt?: DateTimeFilter<"Response"> | Date | string
    updatedAt?: DateTimeFilter<"Response"> | Date | string
    processedEmails?: ProcessedEmailListRelationFilter
  }

  export type ResponseOrderByWithRelationInput = {
    id?: SortOrder
    threadId?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    htmlBody?: SortOrderInput | SortOrder
    language?: SortOrder
    status?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    knowledgeSources?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    processedEmails?: ProcessedEmailOrderByRelationAggregateInput
  }

  export type ResponseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ResponseWhereInput | ResponseWhereInput[]
    OR?: ResponseWhereInput[]
    NOT?: ResponseWhereInput | ResponseWhereInput[]
    threadId?: StringFilter<"Response"> | string
    subject?: StringFilter<"Response"> | string
    body?: StringFilter<"Response"> | string
    htmlBody?: StringNullableFilter<"Response"> | string | null
    language?: StringFilter<"Response"> | string
    status?: StringFilter<"Response"> | string
    sentAt?: DateTimeNullableFilter<"Response"> | Date | string | null
    knowledgeSources?: JsonNullableFilter<"Response">
    createdAt?: DateTimeFilter<"Response"> | Date | string
    updatedAt?: DateTimeFilter<"Response"> | Date | string
    processedEmails?: ProcessedEmailListRelationFilter
  }, "id">

  export type ResponseOrderByWithAggregationInput = {
    id?: SortOrder
    threadId?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    htmlBody?: SortOrderInput | SortOrder
    language?: SortOrder
    status?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    knowledgeSources?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ResponseCountOrderByAggregateInput
    _avg?: ResponseAvgOrderByAggregateInput
    _max?: ResponseMaxOrderByAggregateInput
    _min?: ResponseMinOrderByAggregateInput
    _sum?: ResponseSumOrderByAggregateInput
  }

  export type ResponseScalarWhereWithAggregatesInput = {
    AND?: ResponseScalarWhereWithAggregatesInput | ResponseScalarWhereWithAggregatesInput[]
    OR?: ResponseScalarWhereWithAggregatesInput[]
    NOT?: ResponseScalarWhereWithAggregatesInput | ResponseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Response"> | number
    threadId?: StringWithAggregatesFilter<"Response"> | string
    subject?: StringWithAggregatesFilter<"Response"> | string
    body?: StringWithAggregatesFilter<"Response"> | string
    htmlBody?: StringNullableWithAggregatesFilter<"Response"> | string | null
    language?: StringWithAggregatesFilter<"Response"> | string
    status?: StringWithAggregatesFilter<"Response"> | string
    sentAt?: DateTimeNullableWithAggregatesFilter<"Response"> | Date | string | null
    knowledgeSources?: JsonNullableWithAggregatesFilter<"Response">
    createdAt?: DateTimeWithAggregatesFilter<"Response"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Response"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    name?: string | null
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    name?: string | null
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    name?: string | null
    password: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEmailCreateInput = {
    messageId: string
    threadId: string
    fromEmail: string
    subject: string
    receivedAt: Date | string
    language?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    response?: ResponseCreateNestedOneWithoutProcessedEmailsInput
  }

  export type ProcessedEmailUncheckedCreateInput = {
    id?: number
    messageId: string
    threadId: string
    fromEmail: string
    subject: string
    receivedAt: Date | string
    language?: string | null
    status?: string
    responseId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProcessedEmailUpdateInput = {
    messageId?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    response?: ResponseUpdateOneWithoutProcessedEmailsNestedInput
  }

  export type ProcessedEmailUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    messageId?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    responseId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEmailCreateManyInput = {
    id?: number
    messageId: string
    threadId: string
    fromEmail: string
    subject: string
    receivedAt: Date | string
    language?: string | null
    status?: string
    responseId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProcessedEmailUpdateManyMutationInput = {
    messageId?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEmailUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    messageId?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    responseId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeBaseCreateInput = {
    content: string
    source: string
    sourceId?: string | null
    category?: string | null
    language?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KnowledgeBaseUncheckedCreateInput = {
    id?: number
    content: string
    source: string
    sourceId?: string | null
    category?: string | null
    language?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KnowledgeBaseUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeBaseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeBaseCreateManyInput = {
    id?: number
    content: string
    source: string
    sourceId?: string | null
    category?: string | null
    language?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KnowledgeBaseUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeBaseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    sourceId?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseCreateInput = {
    threadId: string
    subject: string
    body: string
    htmlBody?: string | null
    language: string
    status?: string
    sentAt?: Date | string | null
    knowledgeSources?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    processedEmails?: ProcessedEmailCreateNestedManyWithoutResponseInput
  }

  export type ResponseUncheckedCreateInput = {
    id?: number
    threadId: string
    subject: string
    body: string
    htmlBody?: string | null
    language: string
    status?: string
    sentAt?: Date | string | null
    knowledgeSources?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    processedEmails?: ProcessedEmailUncheckedCreateNestedManyWithoutResponseInput
  }

  export type ResponseUpdateInput = {
    threadId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    htmlBody?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    knowledgeSources?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedEmails?: ProcessedEmailUpdateManyWithoutResponseNestedInput
  }

  export type ResponseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    threadId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    htmlBody?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    knowledgeSources?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedEmails?: ProcessedEmailUncheckedUpdateManyWithoutResponseNestedInput
  }

  export type ResponseCreateManyInput = {
    id?: number
    threadId: string
    subject: string
    body: string
    htmlBody?: string | null
    language: string
    status?: string
    sentAt?: Date | string | null
    knowledgeSources?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResponseUpdateManyMutationInput = {
    threadId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    htmlBody?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    knowledgeSources?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    threadId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    htmlBody?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    knowledgeSources?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ResponseNullableScalarRelationFilter = {
    is?: ResponseWhereInput | null
    isNot?: ResponseWhereInput | null
  }

  export type ProcessedEmailCountOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    threadId?: SortOrder
    fromEmail?: SortOrder
    subject?: SortOrder
    receivedAt?: SortOrder
    language?: SortOrder
    status?: SortOrder
    responseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProcessedEmailAvgOrderByAggregateInput = {
    id?: SortOrder
    responseId?: SortOrder
  }

  export type ProcessedEmailMaxOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    threadId?: SortOrder
    fromEmail?: SortOrder
    subject?: SortOrder
    receivedAt?: SortOrder
    language?: SortOrder
    status?: SortOrder
    responseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProcessedEmailMinOrderByAggregateInput = {
    id?: SortOrder
    messageId?: SortOrder
    threadId?: SortOrder
    fromEmail?: SortOrder
    subject?: SortOrder
    receivedAt?: SortOrder
    language?: SortOrder
    status?: SortOrder
    responseId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProcessedEmailSumOrderByAggregateInput = {
    id?: SortOrder
    responseId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type KnowledgeBaseCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    source?: SortOrder
    sourceId?: SortOrder
    category?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KnowledgeBaseAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type KnowledgeBaseMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    source?: SortOrder
    sourceId?: SortOrder
    category?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KnowledgeBaseMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    source?: SortOrder
    sourceId?: SortOrder
    category?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KnowledgeBaseSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProcessedEmailListRelationFilter = {
    every?: ProcessedEmailWhereInput
    some?: ProcessedEmailWhereInput
    none?: ProcessedEmailWhereInput
  }

  export type ProcessedEmailOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResponseCountOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    htmlBody?: SortOrder
    language?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    knowledgeSources?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResponseAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ResponseMaxOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    htmlBody?: SortOrder
    language?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResponseMinOrderByAggregateInput = {
    id?: SortOrder
    threadId?: SortOrder
    subject?: SortOrder
    body?: SortOrder
    htmlBody?: SortOrder
    language?: SortOrder
    status?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ResponseSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ResponseCreateNestedOneWithoutProcessedEmailsInput = {
    create?: XOR<ResponseCreateWithoutProcessedEmailsInput, ResponseUncheckedCreateWithoutProcessedEmailsInput>
    connectOrCreate?: ResponseCreateOrConnectWithoutProcessedEmailsInput
    connect?: ResponseWhereUniqueInput
  }

  export type ResponseUpdateOneWithoutProcessedEmailsNestedInput = {
    create?: XOR<ResponseCreateWithoutProcessedEmailsInput, ResponseUncheckedCreateWithoutProcessedEmailsInput>
    connectOrCreate?: ResponseCreateOrConnectWithoutProcessedEmailsInput
    upsert?: ResponseUpsertWithoutProcessedEmailsInput
    disconnect?: ResponseWhereInput | boolean
    delete?: ResponseWhereInput | boolean
    connect?: ResponseWhereUniqueInput
    update?: XOR<XOR<ResponseUpdateToOneWithWhereWithoutProcessedEmailsInput, ResponseUpdateWithoutProcessedEmailsInput>, ResponseUncheckedUpdateWithoutProcessedEmailsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProcessedEmailCreateNestedManyWithoutResponseInput = {
    create?: XOR<ProcessedEmailCreateWithoutResponseInput, ProcessedEmailUncheckedCreateWithoutResponseInput> | ProcessedEmailCreateWithoutResponseInput[] | ProcessedEmailUncheckedCreateWithoutResponseInput[]
    connectOrCreate?: ProcessedEmailCreateOrConnectWithoutResponseInput | ProcessedEmailCreateOrConnectWithoutResponseInput[]
    createMany?: ProcessedEmailCreateManyResponseInputEnvelope
    connect?: ProcessedEmailWhereUniqueInput | ProcessedEmailWhereUniqueInput[]
  }

  export type ProcessedEmailUncheckedCreateNestedManyWithoutResponseInput = {
    create?: XOR<ProcessedEmailCreateWithoutResponseInput, ProcessedEmailUncheckedCreateWithoutResponseInput> | ProcessedEmailCreateWithoutResponseInput[] | ProcessedEmailUncheckedCreateWithoutResponseInput[]
    connectOrCreate?: ProcessedEmailCreateOrConnectWithoutResponseInput | ProcessedEmailCreateOrConnectWithoutResponseInput[]
    createMany?: ProcessedEmailCreateManyResponseInputEnvelope
    connect?: ProcessedEmailWhereUniqueInput | ProcessedEmailWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProcessedEmailUpdateManyWithoutResponseNestedInput = {
    create?: XOR<ProcessedEmailCreateWithoutResponseInput, ProcessedEmailUncheckedCreateWithoutResponseInput> | ProcessedEmailCreateWithoutResponseInput[] | ProcessedEmailUncheckedCreateWithoutResponseInput[]
    connectOrCreate?: ProcessedEmailCreateOrConnectWithoutResponseInput | ProcessedEmailCreateOrConnectWithoutResponseInput[]
    upsert?: ProcessedEmailUpsertWithWhereUniqueWithoutResponseInput | ProcessedEmailUpsertWithWhereUniqueWithoutResponseInput[]
    createMany?: ProcessedEmailCreateManyResponseInputEnvelope
    set?: ProcessedEmailWhereUniqueInput | ProcessedEmailWhereUniqueInput[]
    disconnect?: ProcessedEmailWhereUniqueInput | ProcessedEmailWhereUniqueInput[]
    delete?: ProcessedEmailWhereUniqueInput | ProcessedEmailWhereUniqueInput[]
    connect?: ProcessedEmailWhereUniqueInput | ProcessedEmailWhereUniqueInput[]
    update?: ProcessedEmailUpdateWithWhereUniqueWithoutResponseInput | ProcessedEmailUpdateWithWhereUniqueWithoutResponseInput[]
    updateMany?: ProcessedEmailUpdateManyWithWhereWithoutResponseInput | ProcessedEmailUpdateManyWithWhereWithoutResponseInput[]
    deleteMany?: ProcessedEmailScalarWhereInput | ProcessedEmailScalarWhereInput[]
  }

  export type ProcessedEmailUncheckedUpdateManyWithoutResponseNestedInput = {
    create?: XOR<ProcessedEmailCreateWithoutResponseInput, ProcessedEmailUncheckedCreateWithoutResponseInput> | ProcessedEmailCreateWithoutResponseInput[] | ProcessedEmailUncheckedCreateWithoutResponseInput[]
    connectOrCreate?: ProcessedEmailCreateOrConnectWithoutResponseInput | ProcessedEmailCreateOrConnectWithoutResponseInput[]
    upsert?: ProcessedEmailUpsertWithWhereUniqueWithoutResponseInput | ProcessedEmailUpsertWithWhereUniqueWithoutResponseInput[]
    createMany?: ProcessedEmailCreateManyResponseInputEnvelope
    set?: ProcessedEmailWhereUniqueInput | ProcessedEmailWhereUniqueInput[]
    disconnect?: ProcessedEmailWhereUniqueInput | ProcessedEmailWhereUniqueInput[]
    delete?: ProcessedEmailWhereUniqueInput | ProcessedEmailWhereUniqueInput[]
    connect?: ProcessedEmailWhereUniqueInput | ProcessedEmailWhereUniqueInput[]
    update?: ProcessedEmailUpdateWithWhereUniqueWithoutResponseInput | ProcessedEmailUpdateWithWhereUniqueWithoutResponseInput[]
    updateMany?: ProcessedEmailUpdateManyWithWhereWithoutResponseInput | ProcessedEmailUpdateManyWithWhereWithoutResponseInput[]
    deleteMany?: ProcessedEmailScalarWhereInput | ProcessedEmailScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ResponseCreateWithoutProcessedEmailsInput = {
    threadId: string
    subject: string
    body: string
    htmlBody?: string | null
    language: string
    status?: string
    sentAt?: Date | string | null
    knowledgeSources?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResponseUncheckedCreateWithoutProcessedEmailsInput = {
    id?: number
    threadId: string
    subject: string
    body: string
    htmlBody?: string | null
    language: string
    status?: string
    sentAt?: Date | string | null
    knowledgeSources?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ResponseCreateOrConnectWithoutProcessedEmailsInput = {
    where: ResponseWhereUniqueInput
    create: XOR<ResponseCreateWithoutProcessedEmailsInput, ResponseUncheckedCreateWithoutProcessedEmailsInput>
  }

  export type ResponseUpsertWithoutProcessedEmailsInput = {
    update: XOR<ResponseUpdateWithoutProcessedEmailsInput, ResponseUncheckedUpdateWithoutProcessedEmailsInput>
    create: XOR<ResponseCreateWithoutProcessedEmailsInput, ResponseUncheckedCreateWithoutProcessedEmailsInput>
    where?: ResponseWhereInput
  }

  export type ResponseUpdateToOneWithWhereWithoutProcessedEmailsInput = {
    where?: ResponseWhereInput
    data: XOR<ResponseUpdateWithoutProcessedEmailsInput, ResponseUncheckedUpdateWithoutProcessedEmailsInput>
  }

  export type ResponseUpdateWithoutProcessedEmailsInput = {
    threadId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    htmlBody?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    knowledgeSources?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResponseUncheckedUpdateWithoutProcessedEmailsInput = {
    id?: IntFieldUpdateOperationsInput | number
    threadId?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    htmlBody?: NullableStringFieldUpdateOperationsInput | string | null
    language?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    knowledgeSources?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEmailCreateWithoutResponseInput = {
    messageId: string
    threadId: string
    fromEmail: string
    subject: string
    receivedAt: Date | string
    language?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProcessedEmailUncheckedCreateWithoutResponseInput = {
    id?: number
    messageId: string
    threadId: string
    fromEmail: string
    subject: string
    receivedAt: Date | string
    language?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProcessedEmailCreateOrConnectWithoutResponseInput = {
    where: ProcessedEmailWhereUniqueInput
    create: XOR<ProcessedEmailCreateWithoutResponseInput, ProcessedEmailUncheckedCreateWithoutResponseInput>
  }

  export type ProcessedEmailCreateManyResponseInputEnvelope = {
    data: ProcessedEmailCreateManyResponseInput | ProcessedEmailCreateManyResponseInput[]
    skipDuplicates?: boolean
  }

  export type ProcessedEmailUpsertWithWhereUniqueWithoutResponseInput = {
    where: ProcessedEmailWhereUniqueInput
    update: XOR<ProcessedEmailUpdateWithoutResponseInput, ProcessedEmailUncheckedUpdateWithoutResponseInput>
    create: XOR<ProcessedEmailCreateWithoutResponseInput, ProcessedEmailUncheckedCreateWithoutResponseInput>
  }

  export type ProcessedEmailUpdateWithWhereUniqueWithoutResponseInput = {
    where: ProcessedEmailWhereUniqueInput
    data: XOR<ProcessedEmailUpdateWithoutResponseInput, ProcessedEmailUncheckedUpdateWithoutResponseInput>
  }

  export type ProcessedEmailUpdateManyWithWhereWithoutResponseInput = {
    where: ProcessedEmailScalarWhereInput
    data: XOR<ProcessedEmailUpdateManyMutationInput, ProcessedEmailUncheckedUpdateManyWithoutResponseInput>
  }

  export type ProcessedEmailScalarWhereInput = {
    AND?: ProcessedEmailScalarWhereInput | ProcessedEmailScalarWhereInput[]
    OR?: ProcessedEmailScalarWhereInput[]
    NOT?: ProcessedEmailScalarWhereInput | ProcessedEmailScalarWhereInput[]
    id?: IntFilter<"ProcessedEmail"> | number
    messageId?: StringFilter<"ProcessedEmail"> | string
    threadId?: StringFilter<"ProcessedEmail"> | string
    fromEmail?: StringFilter<"ProcessedEmail"> | string
    subject?: StringFilter<"ProcessedEmail"> | string
    receivedAt?: DateTimeFilter<"ProcessedEmail"> | Date | string
    language?: StringNullableFilter<"ProcessedEmail"> | string | null
    status?: StringFilter<"ProcessedEmail"> | string
    responseId?: IntNullableFilter<"ProcessedEmail"> | number | null
    createdAt?: DateTimeFilter<"ProcessedEmail"> | Date | string
    updatedAt?: DateTimeFilter<"ProcessedEmail"> | Date | string
  }

  export type ProcessedEmailCreateManyResponseInput = {
    id?: number
    messageId: string
    threadId: string
    fromEmail: string
    subject: string
    receivedAt: Date | string
    language?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProcessedEmailUpdateWithoutResponseInput = {
    messageId?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEmailUncheckedUpdateWithoutResponseInput = {
    id?: IntFieldUpdateOperationsInput | number
    messageId?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessedEmailUncheckedUpdateManyWithoutResponseInput = {
    id?: IntFieldUpdateOperationsInput | number
    messageId?: StringFieldUpdateOperationsInput | string
    threadId?: StringFieldUpdateOperationsInput | string
    fromEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    receivedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}