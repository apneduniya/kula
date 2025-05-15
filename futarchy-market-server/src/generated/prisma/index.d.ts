
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
 * Model decision
 * 
 */
export type decision = $Result.DefaultSelection<Prisma.$decisionPayload>
/**
 * Model chat
 * 
 */
export type chat = $Result.DefaultSelection<Prisma.$chatPayload>
/**
 * Model agent
 * 
 */
export type agent = $Result.DefaultSelection<Prisma.$agentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Decisions
 * const decisions = await prisma.decision.findMany()
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
   * // Fetch zero or more Decisions
   * const decisions = await prisma.decision.findMany()
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
   * `prisma.decision`: Exposes CRUD operations for the **decision** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Decisions
    * const decisions = await prisma.decision.findMany()
    * ```
    */
  get decision(): Prisma.decisionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chat`: Exposes CRUD operations for the **chat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chats
    * const chats = await prisma.chat.findMany()
    * ```
    */
  get chat(): Prisma.chatDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.agent`: Exposes CRUD operations for the **agent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Agents
    * const agents = await prisma.agent.findMany()
    * ```
    */
  get agent(): Prisma.agentDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
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
    decision: 'decision',
    chat: 'chat',
    agent: 'agent'
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
      modelProps: "decision" | "chat" | "agent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      decision: {
        payload: Prisma.$decisionPayload<ExtArgs>
        fields: Prisma.decisionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.decisionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$decisionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.decisionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$decisionPayload>
          }
          findFirst: {
            args: Prisma.decisionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$decisionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.decisionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$decisionPayload>
          }
          findMany: {
            args: Prisma.decisionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$decisionPayload>[]
          }
          create: {
            args: Prisma.decisionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$decisionPayload>
          }
          createMany: {
            args: Prisma.decisionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.decisionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$decisionPayload>[]
          }
          delete: {
            args: Prisma.decisionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$decisionPayload>
          }
          update: {
            args: Prisma.decisionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$decisionPayload>
          }
          deleteMany: {
            args: Prisma.decisionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.decisionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.decisionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$decisionPayload>[]
          }
          upsert: {
            args: Prisma.decisionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$decisionPayload>
          }
          aggregate: {
            args: Prisma.DecisionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDecision>
          }
          groupBy: {
            args: Prisma.decisionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DecisionGroupByOutputType>[]
          }
          count: {
            args: Prisma.decisionCountArgs<ExtArgs>
            result: $Utils.Optional<DecisionCountAggregateOutputType> | number
          }
        }
      }
      chat: {
        payload: Prisma.$chatPayload<ExtArgs>
        fields: Prisma.chatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.chatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.chatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>
          }
          findFirst: {
            args: Prisma.chatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.chatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>
          }
          findMany: {
            args: Prisma.chatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>[]
          }
          create: {
            args: Prisma.chatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>
          }
          createMany: {
            args: Prisma.chatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.chatCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>[]
          }
          delete: {
            args: Prisma.chatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>
          }
          update: {
            args: Prisma.chatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>
          }
          deleteMany: {
            args: Prisma.chatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.chatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.chatUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>[]
          }
          upsert: {
            args: Prisma.chatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$chatPayload>
          }
          aggregate: {
            args: Prisma.ChatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChat>
          }
          groupBy: {
            args: Prisma.chatGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatGroupByOutputType>[]
          }
          count: {
            args: Prisma.chatCountArgs<ExtArgs>
            result: $Utils.Optional<ChatCountAggregateOutputType> | number
          }
        }
      }
      agent: {
        payload: Prisma.$agentPayload<ExtArgs>
        fields: Prisma.agentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.agentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.agentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentPayload>
          }
          findFirst: {
            args: Prisma.agentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.agentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentPayload>
          }
          findMany: {
            args: Prisma.agentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentPayload>[]
          }
          create: {
            args: Prisma.agentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentPayload>
          }
          createMany: {
            args: Prisma.agentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.agentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentPayload>[]
          }
          delete: {
            args: Prisma.agentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentPayload>
          }
          update: {
            args: Prisma.agentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentPayload>
          }
          deleteMany: {
            args: Prisma.agentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.agentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.agentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentPayload>[]
          }
          upsert: {
            args: Prisma.agentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$agentPayload>
          }
          aggregate: {
            args: Prisma.AgentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAgent>
          }
          groupBy: {
            args: Prisma.agentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AgentGroupByOutputType>[]
          }
          count: {
            args: Prisma.agentCountArgs<ExtArgs>
            result: $Utils.Optional<AgentCountAggregateOutputType> | number
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
    decision?: decisionOmit
    chat?: chatOmit
    agent?: agentOmit
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
   * Count Type DecisionCountOutputType
   */

  export type DecisionCountOutputType = {
    agents: number
  }

  export type DecisionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | DecisionCountOutputTypeCountAgentsArgs
  }

  // Custom InputTypes
  /**
   * DecisionCountOutputType without action
   */
  export type DecisionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DecisionCountOutputType
     */
    select?: DecisionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DecisionCountOutputType without action
   */
  export type DecisionCountOutputTypeCountAgentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agentWhereInput
  }


  /**
   * Count Type ChatCountOutputType
   */

  export type ChatCountOutputType = {
    agents: number
  }

  export type ChatCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | ChatCountOutputTypeCountAgentsArgs
  }

  // Custom InputTypes
  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatCountOutputType
     */
    select?: ChatCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeCountAgentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agentWhereInput
  }


  /**
   * Count Type AgentCountOutputType
   */

  export type AgentCountOutputType = {
    decisions: number
  }

  export type AgentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    decisions?: boolean | AgentCountOutputTypeCountDecisionsArgs
  }

  // Custom InputTypes
  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AgentCountOutputType
     */
    select?: AgentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AgentCountOutputType without action
   */
  export type AgentCountOutputTypeCountDecisionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: decisionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model decision
   */

  export type AggregateDecision = {
    _count: DecisionCountAggregateOutputType | null
    _avg: DecisionAvgAggregateOutputType | null
    _sum: DecisionSumAggregateOutputType | null
    _min: DecisionMinAggregateOutputType | null
    _max: DecisionMaxAggregateOutputType | null
  }

  export type DecisionAvgAggregateOutputType = {
    id: number | null
    passPrice: number | null
    failPrice: number | null
    chatId: number | null
  }

  export type DecisionSumAggregateOutputType = {
    id: number | null
    passPrice: number | null
    failPrice: number | null
    chatId: number | null
  }

  export type DecisionMinAggregateOutputType = {
    id: number | null
    title: string | null
    isResolved: boolean | null
    passPrice: number | null
    failPrice: number | null
    chatId: number | null
  }

  export type DecisionMaxAggregateOutputType = {
    id: number | null
    title: string | null
    isResolved: boolean | null
    passPrice: number | null
    failPrice: number | null
    chatId: number | null
  }

  export type DecisionCountAggregateOutputType = {
    id: number
    title: number
    isResolved: number
    passPrice: number
    failPrice: number
    chatId: number
    _all: number
  }


  export type DecisionAvgAggregateInputType = {
    id?: true
    passPrice?: true
    failPrice?: true
    chatId?: true
  }

  export type DecisionSumAggregateInputType = {
    id?: true
    passPrice?: true
    failPrice?: true
    chatId?: true
  }

  export type DecisionMinAggregateInputType = {
    id?: true
    title?: true
    isResolved?: true
    passPrice?: true
    failPrice?: true
    chatId?: true
  }

  export type DecisionMaxAggregateInputType = {
    id?: true
    title?: true
    isResolved?: true
    passPrice?: true
    failPrice?: true
    chatId?: true
  }

  export type DecisionCountAggregateInputType = {
    id?: true
    title?: true
    isResolved?: true
    passPrice?: true
    failPrice?: true
    chatId?: true
    _all?: true
  }

  export type DecisionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which decision to aggregate.
     */
    where?: decisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of decisions to fetch.
     */
    orderBy?: decisionOrderByWithRelationInput | decisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: decisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` decisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` decisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned decisions
    **/
    _count?: true | DecisionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DecisionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DecisionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DecisionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DecisionMaxAggregateInputType
  }

  export type GetDecisionAggregateType<T extends DecisionAggregateArgs> = {
        [P in keyof T & keyof AggregateDecision]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDecision[P]>
      : GetScalarType<T[P], AggregateDecision[P]>
  }




  export type decisionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: decisionWhereInput
    orderBy?: decisionOrderByWithAggregationInput | decisionOrderByWithAggregationInput[]
    by: DecisionScalarFieldEnum[] | DecisionScalarFieldEnum
    having?: decisionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DecisionCountAggregateInputType | true
    _avg?: DecisionAvgAggregateInputType
    _sum?: DecisionSumAggregateInputType
    _min?: DecisionMinAggregateInputType
    _max?: DecisionMaxAggregateInputType
  }

  export type DecisionGroupByOutputType = {
    id: number
    title: string | null
    isResolved: boolean | null
    passPrice: number | null
    failPrice: number | null
    chatId: number | null
    _count: DecisionCountAggregateOutputType | null
    _avg: DecisionAvgAggregateOutputType | null
    _sum: DecisionSumAggregateOutputType | null
    _min: DecisionMinAggregateOutputType | null
    _max: DecisionMaxAggregateOutputType | null
  }

  type GetDecisionGroupByPayload<T extends decisionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DecisionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DecisionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DecisionGroupByOutputType[P]>
            : GetScalarType<T[P], DecisionGroupByOutputType[P]>
        }
      >
    >


  export type decisionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    isResolved?: boolean
    passPrice?: boolean
    failPrice?: boolean
    chatId?: boolean
    agents?: boolean | decision$agentsArgs<ExtArgs>
    _count?: boolean | DecisionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["decision"]>

  export type decisionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    isResolved?: boolean
    passPrice?: boolean
    failPrice?: boolean
    chatId?: boolean
  }, ExtArgs["result"]["decision"]>

  export type decisionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    isResolved?: boolean
    passPrice?: boolean
    failPrice?: boolean
    chatId?: boolean
  }, ExtArgs["result"]["decision"]>

  export type decisionSelectScalar = {
    id?: boolean
    title?: boolean
    isResolved?: boolean
    passPrice?: boolean
    failPrice?: boolean
    chatId?: boolean
  }

  export type decisionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "isResolved" | "passPrice" | "failPrice" | "chatId", ExtArgs["result"]["decision"]>
  export type decisionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | decision$agentsArgs<ExtArgs>
    _count?: boolean | DecisionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type decisionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type decisionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $decisionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "decision"
    objects: {
      agents: Prisma.$agentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string | null
      isResolved: boolean | null
      passPrice: number | null
      failPrice: number | null
      chatId: number | null
    }, ExtArgs["result"]["decision"]>
    composites: {}
  }

  type decisionGetPayload<S extends boolean | null | undefined | decisionDefaultArgs> = $Result.GetResult<Prisma.$decisionPayload, S>

  type decisionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<decisionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DecisionCountAggregateInputType | true
    }

  export interface decisionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['decision'], meta: { name: 'decision' } }
    /**
     * Find zero or one Decision that matches the filter.
     * @param {decisionFindUniqueArgs} args - Arguments to find a Decision
     * @example
     * // Get one Decision
     * const decision = await prisma.decision.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends decisionFindUniqueArgs>(args: SelectSubset<T, decisionFindUniqueArgs<ExtArgs>>): Prisma__decisionClient<$Result.GetResult<Prisma.$decisionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Decision that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {decisionFindUniqueOrThrowArgs} args - Arguments to find a Decision
     * @example
     * // Get one Decision
     * const decision = await prisma.decision.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends decisionFindUniqueOrThrowArgs>(args: SelectSubset<T, decisionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__decisionClient<$Result.GetResult<Prisma.$decisionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Decision that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {decisionFindFirstArgs} args - Arguments to find a Decision
     * @example
     * // Get one Decision
     * const decision = await prisma.decision.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends decisionFindFirstArgs>(args?: SelectSubset<T, decisionFindFirstArgs<ExtArgs>>): Prisma__decisionClient<$Result.GetResult<Prisma.$decisionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Decision that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {decisionFindFirstOrThrowArgs} args - Arguments to find a Decision
     * @example
     * // Get one Decision
     * const decision = await prisma.decision.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends decisionFindFirstOrThrowArgs>(args?: SelectSubset<T, decisionFindFirstOrThrowArgs<ExtArgs>>): Prisma__decisionClient<$Result.GetResult<Prisma.$decisionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Decisions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {decisionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Decisions
     * const decisions = await prisma.decision.findMany()
     * 
     * // Get first 10 Decisions
     * const decisions = await prisma.decision.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const decisionWithIdOnly = await prisma.decision.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends decisionFindManyArgs>(args?: SelectSubset<T, decisionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$decisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Decision.
     * @param {decisionCreateArgs} args - Arguments to create a Decision.
     * @example
     * // Create one Decision
     * const Decision = await prisma.decision.create({
     *   data: {
     *     // ... data to create a Decision
     *   }
     * })
     * 
     */
    create<T extends decisionCreateArgs>(args: SelectSubset<T, decisionCreateArgs<ExtArgs>>): Prisma__decisionClient<$Result.GetResult<Prisma.$decisionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Decisions.
     * @param {decisionCreateManyArgs} args - Arguments to create many Decisions.
     * @example
     * // Create many Decisions
     * const decision = await prisma.decision.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends decisionCreateManyArgs>(args?: SelectSubset<T, decisionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Decisions and returns the data saved in the database.
     * @param {decisionCreateManyAndReturnArgs} args - Arguments to create many Decisions.
     * @example
     * // Create many Decisions
     * const decision = await prisma.decision.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Decisions and only return the `id`
     * const decisionWithIdOnly = await prisma.decision.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends decisionCreateManyAndReturnArgs>(args?: SelectSubset<T, decisionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$decisionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Decision.
     * @param {decisionDeleteArgs} args - Arguments to delete one Decision.
     * @example
     * // Delete one Decision
     * const Decision = await prisma.decision.delete({
     *   where: {
     *     // ... filter to delete one Decision
     *   }
     * })
     * 
     */
    delete<T extends decisionDeleteArgs>(args: SelectSubset<T, decisionDeleteArgs<ExtArgs>>): Prisma__decisionClient<$Result.GetResult<Prisma.$decisionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Decision.
     * @param {decisionUpdateArgs} args - Arguments to update one Decision.
     * @example
     * // Update one Decision
     * const decision = await prisma.decision.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends decisionUpdateArgs>(args: SelectSubset<T, decisionUpdateArgs<ExtArgs>>): Prisma__decisionClient<$Result.GetResult<Prisma.$decisionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Decisions.
     * @param {decisionDeleteManyArgs} args - Arguments to filter Decisions to delete.
     * @example
     * // Delete a few Decisions
     * const { count } = await prisma.decision.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends decisionDeleteManyArgs>(args?: SelectSubset<T, decisionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Decisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {decisionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Decisions
     * const decision = await prisma.decision.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends decisionUpdateManyArgs>(args: SelectSubset<T, decisionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Decisions and returns the data updated in the database.
     * @param {decisionUpdateManyAndReturnArgs} args - Arguments to update many Decisions.
     * @example
     * // Update many Decisions
     * const decision = await prisma.decision.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Decisions and only return the `id`
     * const decisionWithIdOnly = await prisma.decision.updateManyAndReturn({
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
    updateManyAndReturn<T extends decisionUpdateManyAndReturnArgs>(args: SelectSubset<T, decisionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$decisionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Decision.
     * @param {decisionUpsertArgs} args - Arguments to update or create a Decision.
     * @example
     * // Update or create a Decision
     * const decision = await prisma.decision.upsert({
     *   create: {
     *     // ... data to create a Decision
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Decision we want to update
     *   }
     * })
     */
    upsert<T extends decisionUpsertArgs>(args: SelectSubset<T, decisionUpsertArgs<ExtArgs>>): Prisma__decisionClient<$Result.GetResult<Prisma.$decisionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Decisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {decisionCountArgs} args - Arguments to filter Decisions to count.
     * @example
     * // Count the number of Decisions
     * const count = await prisma.decision.count({
     *   where: {
     *     // ... the filter for the Decisions we want to count
     *   }
     * })
    **/
    count<T extends decisionCountArgs>(
      args?: Subset<T, decisionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DecisionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Decision.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DecisionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DecisionAggregateArgs>(args: Subset<T, DecisionAggregateArgs>): Prisma.PrismaPromise<GetDecisionAggregateType<T>>

    /**
     * Group by Decision.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {decisionGroupByArgs} args - Group by arguments.
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
      T extends decisionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: decisionGroupByArgs['orderBy'] }
        : { orderBy?: decisionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, decisionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDecisionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the decision model
   */
  readonly fields: decisionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for decision.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__decisionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agents<T extends decision$agentsArgs<ExtArgs> = {}>(args?: Subset<T, decision$agentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the decision model
   */
  interface decisionFieldRefs {
    readonly id: FieldRef<"decision", 'Int'>
    readonly title: FieldRef<"decision", 'String'>
    readonly isResolved: FieldRef<"decision", 'Boolean'>
    readonly passPrice: FieldRef<"decision", 'Float'>
    readonly failPrice: FieldRef<"decision", 'Float'>
    readonly chatId: FieldRef<"decision", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * decision findUnique
   */
  export type decisionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the decision
     */
    select?: decisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the decision
     */
    omit?: decisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: decisionInclude<ExtArgs> | null
    /**
     * Filter, which decision to fetch.
     */
    where: decisionWhereUniqueInput
  }

  /**
   * decision findUniqueOrThrow
   */
  export type decisionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the decision
     */
    select?: decisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the decision
     */
    omit?: decisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: decisionInclude<ExtArgs> | null
    /**
     * Filter, which decision to fetch.
     */
    where: decisionWhereUniqueInput
  }

  /**
   * decision findFirst
   */
  export type decisionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the decision
     */
    select?: decisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the decision
     */
    omit?: decisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: decisionInclude<ExtArgs> | null
    /**
     * Filter, which decision to fetch.
     */
    where?: decisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of decisions to fetch.
     */
    orderBy?: decisionOrderByWithRelationInput | decisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for decisions.
     */
    cursor?: decisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` decisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` decisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of decisions.
     */
    distinct?: DecisionScalarFieldEnum | DecisionScalarFieldEnum[]
  }

  /**
   * decision findFirstOrThrow
   */
  export type decisionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the decision
     */
    select?: decisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the decision
     */
    omit?: decisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: decisionInclude<ExtArgs> | null
    /**
     * Filter, which decision to fetch.
     */
    where?: decisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of decisions to fetch.
     */
    orderBy?: decisionOrderByWithRelationInput | decisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for decisions.
     */
    cursor?: decisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` decisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` decisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of decisions.
     */
    distinct?: DecisionScalarFieldEnum | DecisionScalarFieldEnum[]
  }

  /**
   * decision findMany
   */
  export type decisionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the decision
     */
    select?: decisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the decision
     */
    omit?: decisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: decisionInclude<ExtArgs> | null
    /**
     * Filter, which decisions to fetch.
     */
    where?: decisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of decisions to fetch.
     */
    orderBy?: decisionOrderByWithRelationInput | decisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing decisions.
     */
    cursor?: decisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` decisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` decisions.
     */
    skip?: number
    distinct?: DecisionScalarFieldEnum | DecisionScalarFieldEnum[]
  }

  /**
   * decision create
   */
  export type decisionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the decision
     */
    select?: decisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the decision
     */
    omit?: decisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: decisionInclude<ExtArgs> | null
    /**
     * The data needed to create a decision.
     */
    data?: XOR<decisionCreateInput, decisionUncheckedCreateInput>
  }

  /**
   * decision createMany
   */
  export type decisionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many decisions.
     */
    data: decisionCreateManyInput | decisionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * decision createManyAndReturn
   */
  export type decisionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the decision
     */
    select?: decisionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the decision
     */
    omit?: decisionOmit<ExtArgs> | null
    /**
     * The data used to create many decisions.
     */
    data: decisionCreateManyInput | decisionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * decision update
   */
  export type decisionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the decision
     */
    select?: decisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the decision
     */
    omit?: decisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: decisionInclude<ExtArgs> | null
    /**
     * The data needed to update a decision.
     */
    data: XOR<decisionUpdateInput, decisionUncheckedUpdateInput>
    /**
     * Choose, which decision to update.
     */
    where: decisionWhereUniqueInput
  }

  /**
   * decision updateMany
   */
  export type decisionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update decisions.
     */
    data: XOR<decisionUpdateManyMutationInput, decisionUncheckedUpdateManyInput>
    /**
     * Filter which decisions to update
     */
    where?: decisionWhereInput
    /**
     * Limit how many decisions to update.
     */
    limit?: number
  }

  /**
   * decision updateManyAndReturn
   */
  export type decisionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the decision
     */
    select?: decisionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the decision
     */
    omit?: decisionOmit<ExtArgs> | null
    /**
     * The data used to update decisions.
     */
    data: XOR<decisionUpdateManyMutationInput, decisionUncheckedUpdateManyInput>
    /**
     * Filter which decisions to update
     */
    where?: decisionWhereInput
    /**
     * Limit how many decisions to update.
     */
    limit?: number
  }

  /**
   * decision upsert
   */
  export type decisionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the decision
     */
    select?: decisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the decision
     */
    omit?: decisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: decisionInclude<ExtArgs> | null
    /**
     * The filter to search for the decision to update in case it exists.
     */
    where: decisionWhereUniqueInput
    /**
     * In case the decision found by the `where` argument doesn't exist, create a new decision with this data.
     */
    create: XOR<decisionCreateInput, decisionUncheckedCreateInput>
    /**
     * In case the decision was found with the provided `where` argument, update it with this data.
     */
    update: XOR<decisionUpdateInput, decisionUncheckedUpdateInput>
  }

  /**
   * decision delete
   */
  export type decisionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the decision
     */
    select?: decisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the decision
     */
    omit?: decisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: decisionInclude<ExtArgs> | null
    /**
     * Filter which decision to delete.
     */
    where: decisionWhereUniqueInput
  }

  /**
   * decision deleteMany
   */
  export type decisionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which decisions to delete
     */
    where?: decisionWhereInput
    /**
     * Limit how many decisions to delete.
     */
    limit?: number
  }

  /**
   * decision.agents
   */
  export type decision$agentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent
     */
    select?: agentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent
     */
    omit?: agentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentInclude<ExtArgs> | null
    where?: agentWhereInput
    orderBy?: agentOrderByWithRelationInput | agentOrderByWithRelationInput[]
    cursor?: agentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * decision without action
   */
  export type decisionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the decision
     */
    select?: decisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the decision
     */
    omit?: decisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: decisionInclude<ExtArgs> | null
  }


  /**
   * Model chat
   */

  export type AggregateChat = {
    _count: ChatCountAggregateOutputType | null
    _avg: ChatAvgAggregateOutputType | null
    _sum: ChatSumAggregateOutputType | null
    _min: ChatMinAggregateOutputType | null
    _max: ChatMaxAggregateOutputType | null
  }

  export type ChatAvgAggregateOutputType = {
    id: number | null
  }

  export type ChatSumAggregateOutputType = {
    id: number | null
  }

  export type ChatMinAggregateOutputType = {
    id: number | null
    createdAt: Date | null
  }

  export type ChatMaxAggregateOutputType = {
    id: number | null
    createdAt: Date | null
  }

  export type ChatCountAggregateOutputType = {
    id: number
    createdAt: number
    _all: number
  }


  export type ChatAvgAggregateInputType = {
    id?: true
  }

  export type ChatSumAggregateInputType = {
    id?: true
  }

  export type ChatMinAggregateInputType = {
    id?: true
    createdAt?: true
  }

  export type ChatMaxAggregateInputType = {
    id?: true
    createdAt?: true
  }

  export type ChatCountAggregateInputType = {
    id?: true
    createdAt?: true
    _all?: true
  }

  export type ChatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which chat to aggregate.
     */
    where?: chatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chats to fetch.
     */
    orderBy?: chatOrderByWithRelationInput | chatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: chatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned chats
    **/
    _count?: true | ChatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMaxAggregateInputType
  }

  export type GetChatAggregateType<T extends ChatAggregateArgs> = {
        [P in keyof T & keyof AggregateChat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChat[P]>
      : GetScalarType<T[P], AggregateChat[P]>
  }




  export type chatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: chatWhereInput
    orderBy?: chatOrderByWithAggregationInput | chatOrderByWithAggregationInput[]
    by: ChatScalarFieldEnum[] | ChatScalarFieldEnum
    having?: chatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatCountAggregateInputType | true
    _avg?: ChatAvgAggregateInputType
    _sum?: ChatSumAggregateInputType
    _min?: ChatMinAggregateInputType
    _max?: ChatMaxAggregateInputType
  }

  export type ChatGroupByOutputType = {
    id: number
    createdAt: Date | null
    _count: ChatCountAggregateOutputType | null
    _avg: ChatAvgAggregateOutputType | null
    _sum: ChatSumAggregateOutputType | null
    _min: ChatMinAggregateOutputType | null
    _max: ChatMaxAggregateOutputType | null
  }

  type GetChatGroupByPayload<T extends chatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatGroupByOutputType[P]>
            : GetScalarType<T[P], ChatGroupByOutputType[P]>
        }
      >
    >


  export type chatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    agents?: boolean | chat$agentsArgs<ExtArgs>
    _count?: boolean | ChatCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chat"]>

  export type chatSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["chat"]>

  export type chatSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["chat"]>

  export type chatSelectScalar = {
    id?: boolean
    createdAt?: boolean
  }

  export type chatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt", ExtArgs["result"]["chat"]>
  export type chatInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    agents?: boolean | chat$agentsArgs<ExtArgs>
    _count?: boolean | ChatCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type chatIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type chatIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $chatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "chat"
    objects: {
      agents: Prisma.$agentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: Date | null
    }, ExtArgs["result"]["chat"]>
    composites: {}
  }

  type chatGetPayload<S extends boolean | null | undefined | chatDefaultArgs> = $Result.GetResult<Prisma.$chatPayload, S>

  type chatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<chatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatCountAggregateInputType | true
    }

  export interface chatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['chat'], meta: { name: 'chat' } }
    /**
     * Find zero or one Chat that matches the filter.
     * @param {chatFindUniqueArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends chatFindUniqueArgs>(args: SelectSubset<T, chatFindUniqueArgs<ExtArgs>>): Prisma__chatClient<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {chatFindUniqueOrThrowArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends chatFindUniqueOrThrowArgs>(args: SelectSubset<T, chatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__chatClient<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatFindFirstArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends chatFindFirstArgs>(args?: SelectSubset<T, chatFindFirstArgs<ExtArgs>>): Prisma__chatClient<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatFindFirstOrThrowArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends chatFindFirstOrThrowArgs>(args?: SelectSubset<T, chatFindFirstOrThrowArgs<ExtArgs>>): Prisma__chatClient<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Chats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chats
     * const chats = await prisma.chat.findMany()
     * 
     * // Get first 10 Chats
     * const chats = await prisma.chat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatWithIdOnly = await prisma.chat.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends chatFindManyArgs>(args?: SelectSubset<T, chatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chat.
     * @param {chatCreateArgs} args - Arguments to create a Chat.
     * @example
     * // Create one Chat
     * const Chat = await prisma.chat.create({
     *   data: {
     *     // ... data to create a Chat
     *   }
     * })
     * 
     */
    create<T extends chatCreateArgs>(args: SelectSubset<T, chatCreateArgs<ExtArgs>>): Prisma__chatClient<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Chats.
     * @param {chatCreateManyArgs} args - Arguments to create many Chats.
     * @example
     * // Create many Chats
     * const chat = await prisma.chat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends chatCreateManyArgs>(args?: SelectSubset<T, chatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Chats and returns the data saved in the database.
     * @param {chatCreateManyAndReturnArgs} args - Arguments to create many Chats.
     * @example
     * // Create many Chats
     * const chat = await prisma.chat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Chats and only return the `id`
     * const chatWithIdOnly = await prisma.chat.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends chatCreateManyAndReturnArgs>(args?: SelectSubset<T, chatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Chat.
     * @param {chatDeleteArgs} args - Arguments to delete one Chat.
     * @example
     * // Delete one Chat
     * const Chat = await prisma.chat.delete({
     *   where: {
     *     // ... filter to delete one Chat
     *   }
     * })
     * 
     */
    delete<T extends chatDeleteArgs>(args: SelectSubset<T, chatDeleteArgs<ExtArgs>>): Prisma__chatClient<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chat.
     * @param {chatUpdateArgs} args - Arguments to update one Chat.
     * @example
     * // Update one Chat
     * const chat = await prisma.chat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends chatUpdateArgs>(args: SelectSubset<T, chatUpdateArgs<ExtArgs>>): Prisma__chatClient<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Chats.
     * @param {chatDeleteManyArgs} args - Arguments to filter Chats to delete.
     * @example
     * // Delete a few Chats
     * const { count } = await prisma.chat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends chatDeleteManyArgs>(args?: SelectSubset<T, chatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chats
     * const chat = await prisma.chat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends chatUpdateManyArgs>(args: SelectSubset<T, chatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chats and returns the data updated in the database.
     * @param {chatUpdateManyAndReturnArgs} args - Arguments to update many Chats.
     * @example
     * // Update many Chats
     * const chat = await prisma.chat.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Chats and only return the `id`
     * const chatWithIdOnly = await prisma.chat.updateManyAndReturn({
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
    updateManyAndReturn<T extends chatUpdateManyAndReturnArgs>(args: SelectSubset<T, chatUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Chat.
     * @param {chatUpsertArgs} args - Arguments to update or create a Chat.
     * @example
     * // Update or create a Chat
     * const chat = await prisma.chat.upsert({
     *   create: {
     *     // ... data to create a Chat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chat we want to update
     *   }
     * })
     */
    upsert<T extends chatUpsertArgs>(args: SelectSubset<T, chatUpsertArgs<ExtArgs>>): Prisma__chatClient<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatCountArgs} args - Arguments to filter Chats to count.
     * @example
     * // Count the number of Chats
     * const count = await prisma.chat.count({
     *   where: {
     *     // ... the filter for the Chats we want to count
     *   }
     * })
    **/
    count<T extends chatCountArgs>(
      args?: Subset<T, chatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChatAggregateArgs>(args: Subset<T, ChatAggregateArgs>): Prisma.PrismaPromise<GetChatAggregateType<T>>

    /**
     * Group by Chat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chatGroupByArgs} args - Group by arguments.
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
      T extends chatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: chatGroupByArgs['orderBy'] }
        : { orderBy?: chatGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, chatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the chat model
   */
  readonly fields: chatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for chat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__chatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    agents<T extends chat$agentsArgs<ExtArgs> = {}>(args?: Subset<T, chat$agentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the chat model
   */
  interface chatFieldRefs {
    readonly id: FieldRef<"chat", 'Int'>
    readonly createdAt: FieldRef<"chat", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * chat findUnique
   */
  export type chatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * Filter, which chat to fetch.
     */
    where: chatWhereUniqueInput
  }

  /**
   * chat findUniqueOrThrow
   */
  export type chatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * Filter, which chat to fetch.
     */
    where: chatWhereUniqueInput
  }

  /**
   * chat findFirst
   */
  export type chatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * Filter, which chat to fetch.
     */
    where?: chatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chats to fetch.
     */
    orderBy?: chatOrderByWithRelationInput | chatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chats.
     */
    cursor?: chatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chats.
     */
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[]
  }

  /**
   * chat findFirstOrThrow
   */
  export type chatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * Filter, which chat to fetch.
     */
    where?: chatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chats to fetch.
     */
    orderBy?: chatOrderByWithRelationInput | chatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chats.
     */
    cursor?: chatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chats.
     */
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[]
  }

  /**
   * chat findMany
   */
  export type chatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * Filter, which chats to fetch.
     */
    where?: chatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chats to fetch.
     */
    orderBy?: chatOrderByWithRelationInput | chatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing chats.
     */
    cursor?: chatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chats.
     */
    skip?: number
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[]
  }

  /**
   * chat create
   */
  export type chatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * The data needed to create a chat.
     */
    data?: XOR<chatCreateInput, chatUncheckedCreateInput>
  }

  /**
   * chat createMany
   */
  export type chatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many chats.
     */
    data: chatCreateManyInput | chatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * chat createManyAndReturn
   */
  export type chatCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * The data used to create many chats.
     */
    data: chatCreateManyInput | chatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * chat update
   */
  export type chatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * The data needed to update a chat.
     */
    data: XOR<chatUpdateInput, chatUncheckedUpdateInput>
    /**
     * Choose, which chat to update.
     */
    where: chatWhereUniqueInput
  }

  /**
   * chat updateMany
   */
  export type chatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update chats.
     */
    data: XOR<chatUpdateManyMutationInput, chatUncheckedUpdateManyInput>
    /**
     * Filter which chats to update
     */
    where?: chatWhereInput
    /**
     * Limit how many chats to update.
     */
    limit?: number
  }

  /**
   * chat updateManyAndReturn
   */
  export type chatUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * The data used to update chats.
     */
    data: XOR<chatUpdateManyMutationInput, chatUncheckedUpdateManyInput>
    /**
     * Filter which chats to update
     */
    where?: chatWhereInput
    /**
     * Limit how many chats to update.
     */
    limit?: number
  }

  /**
   * chat upsert
   */
  export type chatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * The filter to search for the chat to update in case it exists.
     */
    where: chatWhereUniqueInput
    /**
     * In case the chat found by the `where` argument doesn't exist, create a new chat with this data.
     */
    create: XOR<chatCreateInput, chatUncheckedCreateInput>
    /**
     * In case the chat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<chatUpdateInput, chatUncheckedUpdateInput>
  }

  /**
   * chat delete
   */
  export type chatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
    /**
     * Filter which chat to delete.
     */
    where: chatWhereUniqueInput
  }

  /**
   * chat deleteMany
   */
  export type chatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which chats to delete
     */
    where?: chatWhereInput
    /**
     * Limit how many chats to delete.
     */
    limit?: number
  }

  /**
   * chat.agents
   */
  export type chat$agentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent
     */
    select?: agentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent
     */
    omit?: agentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentInclude<ExtArgs> | null
    where?: agentWhereInput
    orderBy?: agentOrderByWithRelationInput | agentOrderByWithRelationInput[]
    cursor?: agentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * chat without action
   */
  export type chatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chat
     */
    select?: chatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the chat
     */
    omit?: chatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: chatInclude<ExtArgs> | null
  }


  /**
   * Model agent
   */

  export type AggregateAgent = {
    _count: AgentCountAggregateOutputType | null
    _avg: AgentAvgAggregateOutputType | null
    _sum: AgentSumAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  export type AgentAvgAggregateOutputType = {
    id: number | null
    chatId: number | null
  }

  export type AgentSumAggregateOutputType = {
    id: number | null
    chatId: number | null
  }

  export type AgentMinAggregateOutputType = {
    id: number | null
    walletAddress: string | null
    personality: string | null
    encryptedKeypair: string | null
    chatId: number | null
  }

  export type AgentMaxAggregateOutputType = {
    id: number | null
    walletAddress: string | null
    personality: string | null
    encryptedKeypair: string | null
    chatId: number | null
  }

  export type AgentCountAggregateOutputType = {
    id: number
    walletAddress: number
    personality: number
    encryptedKeypair: number
    chatId: number
    _all: number
  }


  export type AgentAvgAggregateInputType = {
    id?: true
    chatId?: true
  }

  export type AgentSumAggregateInputType = {
    id?: true
    chatId?: true
  }

  export type AgentMinAggregateInputType = {
    id?: true
    walletAddress?: true
    personality?: true
    encryptedKeypair?: true
    chatId?: true
  }

  export type AgentMaxAggregateInputType = {
    id?: true
    walletAddress?: true
    personality?: true
    encryptedKeypair?: true
    chatId?: true
  }

  export type AgentCountAggregateInputType = {
    id?: true
    walletAddress?: true
    personality?: true
    encryptedKeypair?: true
    chatId?: true
    _all?: true
  }

  export type AgentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agent to aggregate.
     */
    where?: agentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agents to fetch.
     */
    orderBy?: agentOrderByWithRelationInput | agentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: agentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned agents
    **/
    _count?: true | AgentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AgentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AgentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AgentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AgentMaxAggregateInputType
  }

  export type GetAgentAggregateType<T extends AgentAggregateArgs> = {
        [P in keyof T & keyof AggregateAgent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAgent[P]>
      : GetScalarType<T[P], AggregateAgent[P]>
  }




  export type agentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: agentWhereInput
    orderBy?: agentOrderByWithAggregationInput | agentOrderByWithAggregationInput[]
    by: AgentScalarFieldEnum[] | AgentScalarFieldEnum
    having?: agentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AgentCountAggregateInputType | true
    _avg?: AgentAvgAggregateInputType
    _sum?: AgentSumAggregateInputType
    _min?: AgentMinAggregateInputType
    _max?: AgentMaxAggregateInputType
  }

  export type AgentGroupByOutputType = {
    id: number
    walletAddress: string | null
    personality: string | null
    encryptedKeypair: string | null
    chatId: number
    _count: AgentCountAggregateOutputType | null
    _avg: AgentAvgAggregateOutputType | null
    _sum: AgentSumAggregateOutputType | null
    _min: AgentMinAggregateOutputType | null
    _max: AgentMaxAggregateOutputType | null
  }

  type GetAgentGroupByPayload<T extends agentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AgentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AgentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AgentGroupByOutputType[P]>
            : GetScalarType<T[P], AgentGroupByOutputType[P]>
        }
      >
    >


  export type agentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    personality?: boolean
    encryptedKeypair?: boolean
    chatId?: boolean
    chat?: boolean | chatDefaultArgs<ExtArgs>
    decisions?: boolean | agent$decisionsArgs<ExtArgs>
    _count?: boolean | AgentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type agentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    personality?: boolean
    encryptedKeypair?: boolean
    chatId?: boolean
    chat?: boolean | chatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type agentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    personality?: boolean
    encryptedKeypair?: boolean
    chatId?: boolean
    chat?: boolean | chatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["agent"]>

  export type agentSelectScalar = {
    id?: boolean
    walletAddress?: boolean
    personality?: boolean
    encryptedKeypair?: boolean
    chatId?: boolean
  }

  export type agentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "walletAddress" | "personality" | "encryptedKeypair" | "chatId", ExtArgs["result"]["agent"]>
  export type agentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | chatDefaultArgs<ExtArgs>
    decisions?: boolean | agent$decisionsArgs<ExtArgs>
    _count?: boolean | AgentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type agentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | chatDefaultArgs<ExtArgs>
  }
  export type agentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | chatDefaultArgs<ExtArgs>
  }

  export type $agentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "agent"
    objects: {
      chat: Prisma.$chatPayload<ExtArgs>
      decisions: Prisma.$decisionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      walletAddress: string | null
      personality: string | null
      encryptedKeypair: string | null
      chatId: number
    }, ExtArgs["result"]["agent"]>
    composites: {}
  }

  type agentGetPayload<S extends boolean | null | undefined | agentDefaultArgs> = $Result.GetResult<Prisma.$agentPayload, S>

  type agentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<agentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AgentCountAggregateInputType | true
    }

  export interface agentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['agent'], meta: { name: 'agent' } }
    /**
     * Find zero or one Agent that matches the filter.
     * @param {agentFindUniqueArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends agentFindUniqueArgs>(args: SelectSubset<T, agentFindUniqueArgs<ExtArgs>>): Prisma__agentClient<$Result.GetResult<Prisma.$agentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Agent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {agentFindUniqueOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends agentFindUniqueOrThrowArgs>(args: SelectSubset<T, agentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__agentClient<$Result.GetResult<Prisma.$agentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agentFindFirstArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends agentFindFirstArgs>(args?: SelectSubset<T, agentFindFirstArgs<ExtArgs>>): Prisma__agentClient<$Result.GetResult<Prisma.$agentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Agent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agentFindFirstOrThrowArgs} args - Arguments to find a Agent
     * @example
     * // Get one Agent
     * const agent = await prisma.agent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends agentFindFirstOrThrowArgs>(args?: SelectSubset<T, agentFindFirstOrThrowArgs<ExtArgs>>): Prisma__agentClient<$Result.GetResult<Prisma.$agentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Agents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Agents
     * const agents = await prisma.agent.findMany()
     * 
     * // Get first 10 Agents
     * const agents = await prisma.agent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const agentWithIdOnly = await prisma.agent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends agentFindManyArgs>(args?: SelectSubset<T, agentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Agent.
     * @param {agentCreateArgs} args - Arguments to create a Agent.
     * @example
     * // Create one Agent
     * const Agent = await prisma.agent.create({
     *   data: {
     *     // ... data to create a Agent
     *   }
     * })
     * 
     */
    create<T extends agentCreateArgs>(args: SelectSubset<T, agentCreateArgs<ExtArgs>>): Prisma__agentClient<$Result.GetResult<Prisma.$agentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Agents.
     * @param {agentCreateManyArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends agentCreateManyArgs>(args?: SelectSubset<T, agentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Agents and returns the data saved in the database.
     * @param {agentCreateManyAndReturnArgs} args - Arguments to create many Agents.
     * @example
     * // Create many Agents
     * const agent = await prisma.agent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends agentCreateManyAndReturnArgs>(args?: SelectSubset<T, agentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Agent.
     * @param {agentDeleteArgs} args - Arguments to delete one Agent.
     * @example
     * // Delete one Agent
     * const Agent = await prisma.agent.delete({
     *   where: {
     *     // ... filter to delete one Agent
     *   }
     * })
     * 
     */
    delete<T extends agentDeleteArgs>(args: SelectSubset<T, agentDeleteArgs<ExtArgs>>): Prisma__agentClient<$Result.GetResult<Prisma.$agentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Agent.
     * @param {agentUpdateArgs} args - Arguments to update one Agent.
     * @example
     * // Update one Agent
     * const agent = await prisma.agent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends agentUpdateArgs>(args: SelectSubset<T, agentUpdateArgs<ExtArgs>>): Prisma__agentClient<$Result.GetResult<Prisma.$agentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Agents.
     * @param {agentDeleteManyArgs} args - Arguments to filter Agents to delete.
     * @example
     * // Delete a few Agents
     * const { count } = await prisma.agent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends agentDeleteManyArgs>(args?: SelectSubset<T, agentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends agentUpdateManyArgs>(args: SelectSubset<T, agentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Agents and returns the data updated in the database.
     * @param {agentUpdateManyAndReturnArgs} args - Arguments to update many Agents.
     * @example
     * // Update many Agents
     * const agent = await prisma.agent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Agents and only return the `id`
     * const agentWithIdOnly = await prisma.agent.updateManyAndReturn({
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
    updateManyAndReturn<T extends agentUpdateManyAndReturnArgs>(args: SelectSubset<T, agentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$agentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Agent.
     * @param {agentUpsertArgs} args - Arguments to update or create a Agent.
     * @example
     * // Update or create a Agent
     * const agent = await prisma.agent.upsert({
     *   create: {
     *     // ... data to create a Agent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Agent we want to update
     *   }
     * })
     */
    upsert<T extends agentUpsertArgs>(args: SelectSubset<T, agentUpsertArgs<ExtArgs>>): Prisma__agentClient<$Result.GetResult<Prisma.$agentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Agents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agentCountArgs} args - Arguments to filter Agents to count.
     * @example
     * // Count the number of Agents
     * const count = await prisma.agent.count({
     *   where: {
     *     // ... the filter for the Agents we want to count
     *   }
     * })
    **/
    count<T extends agentCountArgs>(
      args?: Subset<T, agentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AgentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AgentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AgentAggregateArgs>(args: Subset<T, AgentAggregateArgs>): Prisma.PrismaPromise<GetAgentAggregateType<T>>

    /**
     * Group by Agent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {agentGroupByArgs} args - Group by arguments.
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
      T extends agentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: agentGroupByArgs['orderBy'] }
        : { orderBy?: agentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, agentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAgentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the agent model
   */
  readonly fields: agentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for agent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__agentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chat<T extends chatDefaultArgs<ExtArgs> = {}>(args?: Subset<T, chatDefaultArgs<ExtArgs>>): Prisma__chatClient<$Result.GetResult<Prisma.$chatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    decisions<T extends agent$decisionsArgs<ExtArgs> = {}>(args?: Subset<T, agent$decisionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$decisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the agent model
   */
  interface agentFieldRefs {
    readonly id: FieldRef<"agent", 'Int'>
    readonly walletAddress: FieldRef<"agent", 'String'>
    readonly personality: FieldRef<"agent", 'String'>
    readonly encryptedKeypair: FieldRef<"agent", 'String'>
    readonly chatId: FieldRef<"agent", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * agent findUnique
   */
  export type agentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent
     */
    select?: agentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent
     */
    omit?: agentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentInclude<ExtArgs> | null
    /**
     * Filter, which agent to fetch.
     */
    where: agentWhereUniqueInput
  }

  /**
   * agent findUniqueOrThrow
   */
  export type agentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent
     */
    select?: agentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent
     */
    omit?: agentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentInclude<ExtArgs> | null
    /**
     * Filter, which agent to fetch.
     */
    where: agentWhereUniqueInput
  }

  /**
   * agent findFirst
   */
  export type agentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent
     */
    select?: agentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent
     */
    omit?: agentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentInclude<ExtArgs> | null
    /**
     * Filter, which agent to fetch.
     */
    where?: agentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agents to fetch.
     */
    orderBy?: agentOrderByWithRelationInput | agentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agents.
     */
    cursor?: agentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * agent findFirstOrThrow
   */
  export type agentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent
     */
    select?: agentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent
     */
    omit?: agentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentInclude<ExtArgs> | null
    /**
     * Filter, which agent to fetch.
     */
    where?: agentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agents to fetch.
     */
    orderBy?: agentOrderByWithRelationInput | agentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for agents.
     */
    cursor?: agentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of agents.
     */
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * agent findMany
   */
  export type agentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent
     */
    select?: agentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent
     */
    omit?: agentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentInclude<ExtArgs> | null
    /**
     * Filter, which agents to fetch.
     */
    where?: agentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of agents to fetch.
     */
    orderBy?: agentOrderByWithRelationInput | agentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing agents.
     */
    cursor?: agentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` agents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` agents.
     */
    skip?: number
    distinct?: AgentScalarFieldEnum | AgentScalarFieldEnum[]
  }

  /**
   * agent create
   */
  export type agentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent
     */
    select?: agentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent
     */
    omit?: agentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentInclude<ExtArgs> | null
    /**
     * The data needed to create a agent.
     */
    data: XOR<agentCreateInput, agentUncheckedCreateInput>
  }

  /**
   * agent createMany
   */
  export type agentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many agents.
     */
    data: agentCreateManyInput | agentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * agent createManyAndReturn
   */
  export type agentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent
     */
    select?: agentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the agent
     */
    omit?: agentOmit<ExtArgs> | null
    /**
     * The data used to create many agents.
     */
    data: agentCreateManyInput | agentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * agent update
   */
  export type agentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent
     */
    select?: agentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent
     */
    omit?: agentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentInclude<ExtArgs> | null
    /**
     * The data needed to update a agent.
     */
    data: XOR<agentUpdateInput, agentUncheckedUpdateInput>
    /**
     * Choose, which agent to update.
     */
    where: agentWhereUniqueInput
  }

  /**
   * agent updateMany
   */
  export type agentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update agents.
     */
    data: XOR<agentUpdateManyMutationInput, agentUncheckedUpdateManyInput>
    /**
     * Filter which agents to update
     */
    where?: agentWhereInput
    /**
     * Limit how many agents to update.
     */
    limit?: number
  }

  /**
   * agent updateManyAndReturn
   */
  export type agentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent
     */
    select?: agentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the agent
     */
    omit?: agentOmit<ExtArgs> | null
    /**
     * The data used to update agents.
     */
    data: XOR<agentUpdateManyMutationInput, agentUncheckedUpdateManyInput>
    /**
     * Filter which agents to update
     */
    where?: agentWhereInput
    /**
     * Limit how many agents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * agent upsert
   */
  export type agentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent
     */
    select?: agentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent
     */
    omit?: agentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentInclude<ExtArgs> | null
    /**
     * The filter to search for the agent to update in case it exists.
     */
    where: agentWhereUniqueInput
    /**
     * In case the agent found by the `where` argument doesn't exist, create a new agent with this data.
     */
    create: XOR<agentCreateInput, agentUncheckedCreateInput>
    /**
     * In case the agent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<agentUpdateInput, agentUncheckedUpdateInput>
  }

  /**
   * agent delete
   */
  export type agentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent
     */
    select?: agentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent
     */
    omit?: agentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentInclude<ExtArgs> | null
    /**
     * Filter which agent to delete.
     */
    where: agentWhereUniqueInput
  }

  /**
   * agent deleteMany
   */
  export type agentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which agents to delete
     */
    where?: agentWhereInput
    /**
     * Limit how many agents to delete.
     */
    limit?: number
  }

  /**
   * agent.decisions
   */
  export type agent$decisionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the decision
     */
    select?: decisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the decision
     */
    omit?: decisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: decisionInclude<ExtArgs> | null
    where?: decisionWhereInput
    orderBy?: decisionOrderByWithRelationInput | decisionOrderByWithRelationInput[]
    cursor?: decisionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DecisionScalarFieldEnum | DecisionScalarFieldEnum[]
  }

  /**
   * agent without action
   */
  export type agentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the agent
     */
    select?: agentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the agent
     */
    omit?: agentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: agentInclude<ExtArgs> | null
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


  export const DecisionScalarFieldEnum: {
    id: 'id',
    title: 'title',
    isResolved: 'isResolved',
    passPrice: 'passPrice',
    failPrice: 'failPrice',
    chatId: 'chatId'
  };

  export type DecisionScalarFieldEnum = (typeof DecisionScalarFieldEnum)[keyof typeof DecisionScalarFieldEnum]


  export const ChatScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt'
  };

  export type ChatScalarFieldEnum = (typeof ChatScalarFieldEnum)[keyof typeof ChatScalarFieldEnum]


  export const AgentScalarFieldEnum: {
    id: 'id',
    walletAddress: 'walletAddress',
    personality: 'personality',
    encryptedKeypair: 'encryptedKeypair',
    chatId: 'chatId'
  };

  export type AgentScalarFieldEnum = (typeof AgentScalarFieldEnum)[keyof typeof AgentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type decisionWhereInput = {
    AND?: decisionWhereInput | decisionWhereInput[]
    OR?: decisionWhereInput[]
    NOT?: decisionWhereInput | decisionWhereInput[]
    id?: IntFilter<"decision"> | number
    title?: StringNullableFilter<"decision"> | string | null
    isResolved?: BoolNullableFilter<"decision"> | boolean | null
    passPrice?: FloatNullableFilter<"decision"> | number | null
    failPrice?: FloatNullableFilter<"decision"> | number | null
    chatId?: IntNullableFilter<"decision"> | number | null
    agents?: AgentListRelationFilter
  }

  export type decisionOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    isResolved?: SortOrderInput | SortOrder
    passPrice?: SortOrderInput | SortOrder
    failPrice?: SortOrderInput | SortOrder
    chatId?: SortOrderInput | SortOrder
    agents?: agentOrderByRelationAggregateInput
  }

  export type decisionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: decisionWhereInput | decisionWhereInput[]
    OR?: decisionWhereInput[]
    NOT?: decisionWhereInput | decisionWhereInput[]
    title?: StringNullableFilter<"decision"> | string | null
    isResolved?: BoolNullableFilter<"decision"> | boolean | null
    passPrice?: FloatNullableFilter<"decision"> | number | null
    failPrice?: FloatNullableFilter<"decision"> | number | null
    chatId?: IntNullableFilter<"decision"> | number | null
    agents?: AgentListRelationFilter
  }, "id">

  export type decisionOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    isResolved?: SortOrderInput | SortOrder
    passPrice?: SortOrderInput | SortOrder
    failPrice?: SortOrderInput | SortOrder
    chatId?: SortOrderInput | SortOrder
    _count?: decisionCountOrderByAggregateInput
    _avg?: decisionAvgOrderByAggregateInput
    _max?: decisionMaxOrderByAggregateInput
    _min?: decisionMinOrderByAggregateInput
    _sum?: decisionSumOrderByAggregateInput
  }

  export type decisionScalarWhereWithAggregatesInput = {
    AND?: decisionScalarWhereWithAggregatesInput | decisionScalarWhereWithAggregatesInput[]
    OR?: decisionScalarWhereWithAggregatesInput[]
    NOT?: decisionScalarWhereWithAggregatesInput | decisionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"decision"> | number
    title?: StringNullableWithAggregatesFilter<"decision"> | string | null
    isResolved?: BoolNullableWithAggregatesFilter<"decision"> | boolean | null
    passPrice?: FloatNullableWithAggregatesFilter<"decision"> | number | null
    failPrice?: FloatNullableWithAggregatesFilter<"decision"> | number | null
    chatId?: IntNullableWithAggregatesFilter<"decision"> | number | null
  }

  export type chatWhereInput = {
    AND?: chatWhereInput | chatWhereInput[]
    OR?: chatWhereInput[]
    NOT?: chatWhereInput | chatWhereInput[]
    id?: IntFilter<"chat"> | number
    createdAt?: DateTimeNullableFilter<"chat"> | Date | string | null
    agents?: AgentListRelationFilter
  }

  export type chatOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    agents?: agentOrderByRelationAggregateInput
  }

  export type chatWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: chatWhereInput | chatWhereInput[]
    OR?: chatWhereInput[]
    NOT?: chatWhereInput | chatWhereInput[]
    createdAt?: DateTimeNullableFilter<"chat"> | Date | string | null
    agents?: AgentListRelationFilter
  }, "id">

  export type chatOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    _count?: chatCountOrderByAggregateInput
    _avg?: chatAvgOrderByAggregateInput
    _max?: chatMaxOrderByAggregateInput
    _min?: chatMinOrderByAggregateInput
    _sum?: chatSumOrderByAggregateInput
  }

  export type chatScalarWhereWithAggregatesInput = {
    AND?: chatScalarWhereWithAggregatesInput | chatScalarWhereWithAggregatesInput[]
    OR?: chatScalarWhereWithAggregatesInput[]
    NOT?: chatScalarWhereWithAggregatesInput | chatScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"chat"> | number
    createdAt?: DateTimeNullableWithAggregatesFilter<"chat"> | Date | string | null
  }

  export type agentWhereInput = {
    AND?: agentWhereInput | agentWhereInput[]
    OR?: agentWhereInput[]
    NOT?: agentWhereInput | agentWhereInput[]
    id?: IntFilter<"agent"> | number
    walletAddress?: StringNullableFilter<"agent"> | string | null
    personality?: StringNullableFilter<"agent"> | string | null
    encryptedKeypair?: StringNullableFilter<"agent"> | string | null
    chatId?: IntFilter<"agent"> | number
    chat?: XOR<ChatScalarRelationFilter, chatWhereInput>
    decisions?: DecisionListRelationFilter
  }

  export type agentOrderByWithRelationInput = {
    id?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    personality?: SortOrderInput | SortOrder
    encryptedKeypair?: SortOrderInput | SortOrder
    chatId?: SortOrder
    chat?: chatOrderByWithRelationInput
    decisions?: decisionOrderByRelationAggregateInput
  }

  export type agentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: agentWhereInput | agentWhereInput[]
    OR?: agentWhereInput[]
    NOT?: agentWhereInput | agentWhereInput[]
    walletAddress?: StringNullableFilter<"agent"> | string | null
    personality?: StringNullableFilter<"agent"> | string | null
    encryptedKeypair?: StringNullableFilter<"agent"> | string | null
    chatId?: IntFilter<"agent"> | number
    chat?: XOR<ChatScalarRelationFilter, chatWhereInput>
    decisions?: DecisionListRelationFilter
  }, "id">

  export type agentOrderByWithAggregationInput = {
    id?: SortOrder
    walletAddress?: SortOrderInput | SortOrder
    personality?: SortOrderInput | SortOrder
    encryptedKeypair?: SortOrderInput | SortOrder
    chatId?: SortOrder
    _count?: agentCountOrderByAggregateInput
    _avg?: agentAvgOrderByAggregateInput
    _max?: agentMaxOrderByAggregateInput
    _min?: agentMinOrderByAggregateInput
    _sum?: agentSumOrderByAggregateInput
  }

  export type agentScalarWhereWithAggregatesInput = {
    AND?: agentScalarWhereWithAggregatesInput | agentScalarWhereWithAggregatesInput[]
    OR?: agentScalarWhereWithAggregatesInput[]
    NOT?: agentScalarWhereWithAggregatesInput | agentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"agent"> | number
    walletAddress?: StringNullableWithAggregatesFilter<"agent"> | string | null
    personality?: StringNullableWithAggregatesFilter<"agent"> | string | null
    encryptedKeypair?: StringNullableWithAggregatesFilter<"agent"> | string | null
    chatId?: IntWithAggregatesFilter<"agent"> | number
  }

  export type decisionCreateInput = {
    title?: string | null
    isResolved?: boolean | null
    passPrice?: number | null
    failPrice?: number | null
    chatId?: number | null
    agents?: agentCreateNestedManyWithoutDecisionsInput
  }

  export type decisionUncheckedCreateInput = {
    id?: number
    title?: string | null
    isResolved?: boolean | null
    passPrice?: number | null
    failPrice?: number | null
    chatId?: number | null
    agents?: agentUncheckedCreateNestedManyWithoutDecisionsInput
  }

  export type decisionUpdateInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    isResolved?: NullableBoolFieldUpdateOperationsInput | boolean | null
    passPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    failPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    chatId?: NullableIntFieldUpdateOperationsInput | number | null
    agents?: agentUpdateManyWithoutDecisionsNestedInput
  }

  export type decisionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    isResolved?: NullableBoolFieldUpdateOperationsInput | boolean | null
    passPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    failPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    chatId?: NullableIntFieldUpdateOperationsInput | number | null
    agents?: agentUncheckedUpdateManyWithoutDecisionsNestedInput
  }

  export type decisionCreateManyInput = {
    id?: number
    title?: string | null
    isResolved?: boolean | null
    passPrice?: number | null
    failPrice?: number | null
    chatId?: number | null
  }

  export type decisionUpdateManyMutationInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    isResolved?: NullableBoolFieldUpdateOperationsInput | boolean | null
    passPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    failPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    chatId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type decisionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    isResolved?: NullableBoolFieldUpdateOperationsInput | boolean | null
    passPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    failPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    chatId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type chatCreateInput = {
    createdAt?: Date | string | null
    agents?: agentCreateNestedManyWithoutChatInput
  }

  export type chatUncheckedCreateInput = {
    id?: number
    createdAt?: Date | string | null
    agents?: agentUncheckedCreateNestedManyWithoutChatInput
  }

  export type chatUpdateInput = {
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agents?: agentUpdateManyWithoutChatNestedInput
  }

  export type chatUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agents?: agentUncheckedUpdateManyWithoutChatNestedInput
  }

  export type chatCreateManyInput = {
    id?: number
    createdAt?: Date | string | null
  }

  export type chatUpdateManyMutationInput = {
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chatUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type agentCreateInput = {
    walletAddress?: string | null
    personality?: string | null
    encryptedKeypair?: string | null
    chat: chatCreateNestedOneWithoutAgentsInput
    decisions?: decisionCreateNestedManyWithoutAgentsInput
  }

  export type agentUncheckedCreateInput = {
    id?: number
    walletAddress?: string | null
    personality?: string | null
    encryptedKeypair?: string | null
    chatId: number
    decisions?: decisionUncheckedCreateNestedManyWithoutAgentsInput
  }

  export type agentUpdateInput = {
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedKeypair?: NullableStringFieldUpdateOperationsInput | string | null
    chat?: chatUpdateOneRequiredWithoutAgentsNestedInput
    decisions?: decisionUpdateManyWithoutAgentsNestedInput
  }

  export type agentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedKeypair?: NullableStringFieldUpdateOperationsInput | string | null
    chatId?: IntFieldUpdateOperationsInput | number
    decisions?: decisionUncheckedUpdateManyWithoutAgentsNestedInput
  }

  export type agentCreateManyInput = {
    id?: number
    walletAddress?: string | null
    personality?: string | null
    encryptedKeypair?: string | null
    chatId: number
  }

  export type agentUpdateManyMutationInput = {
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedKeypair?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type agentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedKeypair?: NullableStringFieldUpdateOperationsInput | string | null
    chatId?: IntFieldUpdateOperationsInput | number
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

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type AgentListRelationFilter = {
    every?: agentWhereInput
    some?: agentWhereInput
    none?: agentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type agentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type decisionCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    isResolved?: SortOrder
    passPrice?: SortOrder
    failPrice?: SortOrder
    chatId?: SortOrder
  }

  export type decisionAvgOrderByAggregateInput = {
    id?: SortOrder
    passPrice?: SortOrder
    failPrice?: SortOrder
    chatId?: SortOrder
  }

  export type decisionMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    isResolved?: SortOrder
    passPrice?: SortOrder
    failPrice?: SortOrder
    chatId?: SortOrder
  }

  export type decisionMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    isResolved?: SortOrder
    passPrice?: SortOrder
    failPrice?: SortOrder
    chatId?: SortOrder
  }

  export type decisionSumOrderByAggregateInput = {
    id?: SortOrder
    passPrice?: SortOrder
    failPrice?: SortOrder
    chatId?: SortOrder
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

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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

  export type chatCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
  }

  export type chatAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type chatMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
  }

  export type chatMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
  }

  export type chatSumOrderByAggregateInput = {
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

  export type ChatScalarRelationFilter = {
    is?: chatWhereInput
    isNot?: chatWhereInput
  }

  export type DecisionListRelationFilter = {
    every?: decisionWhereInput
    some?: decisionWhereInput
    none?: decisionWhereInput
  }

  export type decisionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type agentCountOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    personality?: SortOrder
    encryptedKeypair?: SortOrder
    chatId?: SortOrder
  }

  export type agentAvgOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
  }

  export type agentMaxOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    personality?: SortOrder
    encryptedKeypair?: SortOrder
    chatId?: SortOrder
  }

  export type agentMinOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    personality?: SortOrder
    encryptedKeypair?: SortOrder
    chatId?: SortOrder
  }

  export type agentSumOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
  }

  export type agentCreateNestedManyWithoutDecisionsInput = {
    create?: XOR<agentCreateWithoutDecisionsInput, agentUncheckedCreateWithoutDecisionsInput> | agentCreateWithoutDecisionsInput[] | agentUncheckedCreateWithoutDecisionsInput[]
    connectOrCreate?: agentCreateOrConnectWithoutDecisionsInput | agentCreateOrConnectWithoutDecisionsInput[]
    connect?: agentWhereUniqueInput | agentWhereUniqueInput[]
  }

  export type agentUncheckedCreateNestedManyWithoutDecisionsInput = {
    create?: XOR<agentCreateWithoutDecisionsInput, agentUncheckedCreateWithoutDecisionsInput> | agentCreateWithoutDecisionsInput[] | agentUncheckedCreateWithoutDecisionsInput[]
    connectOrCreate?: agentCreateOrConnectWithoutDecisionsInput | agentCreateOrConnectWithoutDecisionsInput[]
    connect?: agentWhereUniqueInput | agentWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type agentUpdateManyWithoutDecisionsNestedInput = {
    create?: XOR<agentCreateWithoutDecisionsInput, agentUncheckedCreateWithoutDecisionsInput> | agentCreateWithoutDecisionsInput[] | agentUncheckedCreateWithoutDecisionsInput[]
    connectOrCreate?: agentCreateOrConnectWithoutDecisionsInput | agentCreateOrConnectWithoutDecisionsInput[]
    upsert?: agentUpsertWithWhereUniqueWithoutDecisionsInput | agentUpsertWithWhereUniqueWithoutDecisionsInput[]
    set?: agentWhereUniqueInput | agentWhereUniqueInput[]
    disconnect?: agentWhereUniqueInput | agentWhereUniqueInput[]
    delete?: agentWhereUniqueInput | agentWhereUniqueInput[]
    connect?: agentWhereUniqueInput | agentWhereUniqueInput[]
    update?: agentUpdateWithWhereUniqueWithoutDecisionsInput | agentUpdateWithWhereUniqueWithoutDecisionsInput[]
    updateMany?: agentUpdateManyWithWhereWithoutDecisionsInput | agentUpdateManyWithWhereWithoutDecisionsInput[]
    deleteMany?: agentScalarWhereInput | agentScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type agentUncheckedUpdateManyWithoutDecisionsNestedInput = {
    create?: XOR<agentCreateWithoutDecisionsInput, agentUncheckedCreateWithoutDecisionsInput> | agentCreateWithoutDecisionsInput[] | agentUncheckedCreateWithoutDecisionsInput[]
    connectOrCreate?: agentCreateOrConnectWithoutDecisionsInput | agentCreateOrConnectWithoutDecisionsInput[]
    upsert?: agentUpsertWithWhereUniqueWithoutDecisionsInput | agentUpsertWithWhereUniqueWithoutDecisionsInput[]
    set?: agentWhereUniqueInput | agentWhereUniqueInput[]
    disconnect?: agentWhereUniqueInput | agentWhereUniqueInput[]
    delete?: agentWhereUniqueInput | agentWhereUniqueInput[]
    connect?: agentWhereUniqueInput | agentWhereUniqueInput[]
    update?: agentUpdateWithWhereUniqueWithoutDecisionsInput | agentUpdateWithWhereUniqueWithoutDecisionsInput[]
    updateMany?: agentUpdateManyWithWhereWithoutDecisionsInput | agentUpdateManyWithWhereWithoutDecisionsInput[]
    deleteMany?: agentScalarWhereInput | agentScalarWhereInput[]
  }

  export type agentCreateNestedManyWithoutChatInput = {
    create?: XOR<agentCreateWithoutChatInput, agentUncheckedCreateWithoutChatInput> | agentCreateWithoutChatInput[] | agentUncheckedCreateWithoutChatInput[]
    connectOrCreate?: agentCreateOrConnectWithoutChatInput | agentCreateOrConnectWithoutChatInput[]
    createMany?: agentCreateManyChatInputEnvelope
    connect?: agentWhereUniqueInput | agentWhereUniqueInput[]
  }

  export type agentUncheckedCreateNestedManyWithoutChatInput = {
    create?: XOR<agentCreateWithoutChatInput, agentUncheckedCreateWithoutChatInput> | agentCreateWithoutChatInput[] | agentUncheckedCreateWithoutChatInput[]
    connectOrCreate?: agentCreateOrConnectWithoutChatInput | agentCreateOrConnectWithoutChatInput[]
    createMany?: agentCreateManyChatInputEnvelope
    connect?: agentWhereUniqueInput | agentWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type agentUpdateManyWithoutChatNestedInput = {
    create?: XOR<agentCreateWithoutChatInput, agentUncheckedCreateWithoutChatInput> | agentCreateWithoutChatInput[] | agentUncheckedCreateWithoutChatInput[]
    connectOrCreate?: agentCreateOrConnectWithoutChatInput | agentCreateOrConnectWithoutChatInput[]
    upsert?: agentUpsertWithWhereUniqueWithoutChatInput | agentUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: agentCreateManyChatInputEnvelope
    set?: agentWhereUniqueInput | agentWhereUniqueInput[]
    disconnect?: agentWhereUniqueInput | agentWhereUniqueInput[]
    delete?: agentWhereUniqueInput | agentWhereUniqueInput[]
    connect?: agentWhereUniqueInput | agentWhereUniqueInput[]
    update?: agentUpdateWithWhereUniqueWithoutChatInput | agentUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: agentUpdateManyWithWhereWithoutChatInput | agentUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: agentScalarWhereInput | agentScalarWhereInput[]
  }

  export type agentUncheckedUpdateManyWithoutChatNestedInput = {
    create?: XOR<agentCreateWithoutChatInput, agentUncheckedCreateWithoutChatInput> | agentCreateWithoutChatInput[] | agentUncheckedCreateWithoutChatInput[]
    connectOrCreate?: agentCreateOrConnectWithoutChatInput | agentCreateOrConnectWithoutChatInput[]
    upsert?: agentUpsertWithWhereUniqueWithoutChatInput | agentUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: agentCreateManyChatInputEnvelope
    set?: agentWhereUniqueInput | agentWhereUniqueInput[]
    disconnect?: agentWhereUniqueInput | agentWhereUniqueInput[]
    delete?: agentWhereUniqueInput | agentWhereUniqueInput[]
    connect?: agentWhereUniqueInput | agentWhereUniqueInput[]
    update?: agentUpdateWithWhereUniqueWithoutChatInput | agentUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: agentUpdateManyWithWhereWithoutChatInput | agentUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: agentScalarWhereInput | agentScalarWhereInput[]
  }

  export type chatCreateNestedOneWithoutAgentsInput = {
    create?: XOR<chatCreateWithoutAgentsInput, chatUncheckedCreateWithoutAgentsInput>
    connectOrCreate?: chatCreateOrConnectWithoutAgentsInput
    connect?: chatWhereUniqueInput
  }

  export type decisionCreateNestedManyWithoutAgentsInput = {
    create?: XOR<decisionCreateWithoutAgentsInput, decisionUncheckedCreateWithoutAgentsInput> | decisionCreateWithoutAgentsInput[] | decisionUncheckedCreateWithoutAgentsInput[]
    connectOrCreate?: decisionCreateOrConnectWithoutAgentsInput | decisionCreateOrConnectWithoutAgentsInput[]
    connect?: decisionWhereUniqueInput | decisionWhereUniqueInput[]
  }

  export type decisionUncheckedCreateNestedManyWithoutAgentsInput = {
    create?: XOR<decisionCreateWithoutAgentsInput, decisionUncheckedCreateWithoutAgentsInput> | decisionCreateWithoutAgentsInput[] | decisionUncheckedCreateWithoutAgentsInput[]
    connectOrCreate?: decisionCreateOrConnectWithoutAgentsInput | decisionCreateOrConnectWithoutAgentsInput[]
    connect?: decisionWhereUniqueInput | decisionWhereUniqueInput[]
  }

  export type chatUpdateOneRequiredWithoutAgentsNestedInput = {
    create?: XOR<chatCreateWithoutAgentsInput, chatUncheckedCreateWithoutAgentsInput>
    connectOrCreate?: chatCreateOrConnectWithoutAgentsInput
    upsert?: chatUpsertWithoutAgentsInput
    connect?: chatWhereUniqueInput
    update?: XOR<XOR<chatUpdateToOneWithWhereWithoutAgentsInput, chatUpdateWithoutAgentsInput>, chatUncheckedUpdateWithoutAgentsInput>
  }

  export type decisionUpdateManyWithoutAgentsNestedInput = {
    create?: XOR<decisionCreateWithoutAgentsInput, decisionUncheckedCreateWithoutAgentsInput> | decisionCreateWithoutAgentsInput[] | decisionUncheckedCreateWithoutAgentsInput[]
    connectOrCreate?: decisionCreateOrConnectWithoutAgentsInput | decisionCreateOrConnectWithoutAgentsInput[]
    upsert?: decisionUpsertWithWhereUniqueWithoutAgentsInput | decisionUpsertWithWhereUniqueWithoutAgentsInput[]
    set?: decisionWhereUniqueInput | decisionWhereUniqueInput[]
    disconnect?: decisionWhereUniqueInput | decisionWhereUniqueInput[]
    delete?: decisionWhereUniqueInput | decisionWhereUniqueInput[]
    connect?: decisionWhereUniqueInput | decisionWhereUniqueInput[]
    update?: decisionUpdateWithWhereUniqueWithoutAgentsInput | decisionUpdateWithWhereUniqueWithoutAgentsInput[]
    updateMany?: decisionUpdateManyWithWhereWithoutAgentsInput | decisionUpdateManyWithWhereWithoutAgentsInput[]
    deleteMany?: decisionScalarWhereInput | decisionScalarWhereInput[]
  }

  export type decisionUncheckedUpdateManyWithoutAgentsNestedInput = {
    create?: XOR<decisionCreateWithoutAgentsInput, decisionUncheckedCreateWithoutAgentsInput> | decisionCreateWithoutAgentsInput[] | decisionUncheckedCreateWithoutAgentsInput[]
    connectOrCreate?: decisionCreateOrConnectWithoutAgentsInput | decisionCreateOrConnectWithoutAgentsInput[]
    upsert?: decisionUpsertWithWhereUniqueWithoutAgentsInput | decisionUpsertWithWhereUniqueWithoutAgentsInput[]
    set?: decisionWhereUniqueInput | decisionWhereUniqueInput[]
    disconnect?: decisionWhereUniqueInput | decisionWhereUniqueInput[]
    delete?: decisionWhereUniqueInput | decisionWhereUniqueInput[]
    connect?: decisionWhereUniqueInput | decisionWhereUniqueInput[]
    update?: decisionUpdateWithWhereUniqueWithoutAgentsInput | decisionUpdateWithWhereUniqueWithoutAgentsInput[]
    updateMany?: decisionUpdateManyWithWhereWithoutAgentsInput | decisionUpdateManyWithWhereWithoutAgentsInput[]
    deleteMany?: decisionScalarWhereInput | decisionScalarWhereInput[]
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

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
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

  export type agentCreateWithoutDecisionsInput = {
    walletAddress?: string | null
    personality?: string | null
    encryptedKeypair?: string | null
    chat: chatCreateNestedOneWithoutAgentsInput
  }

  export type agentUncheckedCreateWithoutDecisionsInput = {
    id?: number
    walletAddress?: string | null
    personality?: string | null
    encryptedKeypair?: string | null
    chatId: number
  }

  export type agentCreateOrConnectWithoutDecisionsInput = {
    where: agentWhereUniqueInput
    create: XOR<agentCreateWithoutDecisionsInput, agentUncheckedCreateWithoutDecisionsInput>
  }

  export type agentUpsertWithWhereUniqueWithoutDecisionsInput = {
    where: agentWhereUniqueInput
    update: XOR<agentUpdateWithoutDecisionsInput, agentUncheckedUpdateWithoutDecisionsInput>
    create: XOR<agentCreateWithoutDecisionsInput, agentUncheckedCreateWithoutDecisionsInput>
  }

  export type agentUpdateWithWhereUniqueWithoutDecisionsInput = {
    where: agentWhereUniqueInput
    data: XOR<agentUpdateWithoutDecisionsInput, agentUncheckedUpdateWithoutDecisionsInput>
  }

  export type agentUpdateManyWithWhereWithoutDecisionsInput = {
    where: agentScalarWhereInput
    data: XOR<agentUpdateManyMutationInput, agentUncheckedUpdateManyWithoutDecisionsInput>
  }

  export type agentScalarWhereInput = {
    AND?: agentScalarWhereInput | agentScalarWhereInput[]
    OR?: agentScalarWhereInput[]
    NOT?: agentScalarWhereInput | agentScalarWhereInput[]
    id?: IntFilter<"agent"> | number
    walletAddress?: StringNullableFilter<"agent"> | string | null
    personality?: StringNullableFilter<"agent"> | string | null
    encryptedKeypair?: StringNullableFilter<"agent"> | string | null
    chatId?: IntFilter<"agent"> | number
  }

  export type agentCreateWithoutChatInput = {
    walletAddress?: string | null
    personality?: string | null
    encryptedKeypair?: string | null
    decisions?: decisionCreateNestedManyWithoutAgentsInput
  }

  export type agentUncheckedCreateWithoutChatInput = {
    id?: number
    walletAddress?: string | null
    personality?: string | null
    encryptedKeypair?: string | null
    decisions?: decisionUncheckedCreateNestedManyWithoutAgentsInput
  }

  export type agentCreateOrConnectWithoutChatInput = {
    where: agentWhereUniqueInput
    create: XOR<agentCreateWithoutChatInput, agentUncheckedCreateWithoutChatInput>
  }

  export type agentCreateManyChatInputEnvelope = {
    data: agentCreateManyChatInput | agentCreateManyChatInput[]
    skipDuplicates?: boolean
  }

  export type agentUpsertWithWhereUniqueWithoutChatInput = {
    where: agentWhereUniqueInput
    update: XOR<agentUpdateWithoutChatInput, agentUncheckedUpdateWithoutChatInput>
    create: XOR<agentCreateWithoutChatInput, agentUncheckedCreateWithoutChatInput>
  }

  export type agentUpdateWithWhereUniqueWithoutChatInput = {
    where: agentWhereUniqueInput
    data: XOR<agentUpdateWithoutChatInput, agentUncheckedUpdateWithoutChatInput>
  }

  export type agentUpdateManyWithWhereWithoutChatInput = {
    where: agentScalarWhereInput
    data: XOR<agentUpdateManyMutationInput, agentUncheckedUpdateManyWithoutChatInput>
  }

  export type chatCreateWithoutAgentsInput = {
    createdAt?: Date | string | null
  }

  export type chatUncheckedCreateWithoutAgentsInput = {
    id?: number
    createdAt?: Date | string | null
  }

  export type chatCreateOrConnectWithoutAgentsInput = {
    where: chatWhereUniqueInput
    create: XOR<chatCreateWithoutAgentsInput, chatUncheckedCreateWithoutAgentsInput>
  }

  export type decisionCreateWithoutAgentsInput = {
    title?: string | null
    isResolved?: boolean | null
    passPrice?: number | null
    failPrice?: number | null
    chatId?: number | null
  }

  export type decisionUncheckedCreateWithoutAgentsInput = {
    id?: number
    title?: string | null
    isResolved?: boolean | null
    passPrice?: number | null
    failPrice?: number | null
    chatId?: number | null
  }

  export type decisionCreateOrConnectWithoutAgentsInput = {
    where: decisionWhereUniqueInput
    create: XOR<decisionCreateWithoutAgentsInput, decisionUncheckedCreateWithoutAgentsInput>
  }

  export type chatUpsertWithoutAgentsInput = {
    update: XOR<chatUpdateWithoutAgentsInput, chatUncheckedUpdateWithoutAgentsInput>
    create: XOR<chatCreateWithoutAgentsInput, chatUncheckedCreateWithoutAgentsInput>
    where?: chatWhereInput
  }

  export type chatUpdateToOneWithWhereWithoutAgentsInput = {
    where?: chatWhereInput
    data: XOR<chatUpdateWithoutAgentsInput, chatUncheckedUpdateWithoutAgentsInput>
  }

  export type chatUpdateWithoutAgentsInput = {
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type chatUncheckedUpdateWithoutAgentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type decisionUpsertWithWhereUniqueWithoutAgentsInput = {
    where: decisionWhereUniqueInput
    update: XOR<decisionUpdateWithoutAgentsInput, decisionUncheckedUpdateWithoutAgentsInput>
    create: XOR<decisionCreateWithoutAgentsInput, decisionUncheckedCreateWithoutAgentsInput>
  }

  export type decisionUpdateWithWhereUniqueWithoutAgentsInput = {
    where: decisionWhereUniqueInput
    data: XOR<decisionUpdateWithoutAgentsInput, decisionUncheckedUpdateWithoutAgentsInput>
  }

  export type decisionUpdateManyWithWhereWithoutAgentsInput = {
    where: decisionScalarWhereInput
    data: XOR<decisionUpdateManyMutationInput, decisionUncheckedUpdateManyWithoutAgentsInput>
  }

  export type decisionScalarWhereInput = {
    AND?: decisionScalarWhereInput | decisionScalarWhereInput[]
    OR?: decisionScalarWhereInput[]
    NOT?: decisionScalarWhereInput | decisionScalarWhereInput[]
    id?: IntFilter<"decision"> | number
    title?: StringNullableFilter<"decision"> | string | null
    isResolved?: BoolNullableFilter<"decision"> | boolean | null
    passPrice?: FloatNullableFilter<"decision"> | number | null
    failPrice?: FloatNullableFilter<"decision"> | number | null
    chatId?: IntNullableFilter<"decision"> | number | null
  }

  export type agentUpdateWithoutDecisionsInput = {
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedKeypair?: NullableStringFieldUpdateOperationsInput | string | null
    chat?: chatUpdateOneRequiredWithoutAgentsNestedInput
  }

  export type agentUncheckedUpdateWithoutDecisionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedKeypair?: NullableStringFieldUpdateOperationsInput | string | null
    chatId?: IntFieldUpdateOperationsInput | number
  }

  export type agentUncheckedUpdateManyWithoutDecisionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedKeypair?: NullableStringFieldUpdateOperationsInput | string | null
    chatId?: IntFieldUpdateOperationsInput | number
  }

  export type agentCreateManyChatInput = {
    id?: number
    walletAddress?: string | null
    personality?: string | null
    encryptedKeypair?: string | null
  }

  export type agentUpdateWithoutChatInput = {
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedKeypair?: NullableStringFieldUpdateOperationsInput | string | null
    decisions?: decisionUpdateManyWithoutAgentsNestedInput
  }

  export type agentUncheckedUpdateWithoutChatInput = {
    id?: IntFieldUpdateOperationsInput | number
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedKeypair?: NullableStringFieldUpdateOperationsInput | string | null
    decisions?: decisionUncheckedUpdateManyWithoutAgentsNestedInput
  }

  export type agentUncheckedUpdateManyWithoutChatInput = {
    id?: IntFieldUpdateOperationsInput | number
    walletAddress?: NullableStringFieldUpdateOperationsInput | string | null
    personality?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedKeypair?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type decisionUpdateWithoutAgentsInput = {
    title?: NullableStringFieldUpdateOperationsInput | string | null
    isResolved?: NullableBoolFieldUpdateOperationsInput | boolean | null
    passPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    failPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    chatId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type decisionUncheckedUpdateWithoutAgentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    isResolved?: NullableBoolFieldUpdateOperationsInput | boolean | null
    passPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    failPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    chatId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type decisionUncheckedUpdateManyWithoutAgentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    isResolved?: NullableBoolFieldUpdateOperationsInput | boolean | null
    passPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    failPrice?: NullableFloatFieldUpdateOperationsInput | number | null
    chatId?: NullableIntFieldUpdateOperationsInput | number | null
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