
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
 * Model MobileUser
 * 
 */
export type MobileUser = $Result.DefaultSelection<Prisma.$MobileUserPayload>
/**
 * Model Calculation
 * 
 */
export type Calculation = $Result.DefaultSelection<Prisma.$CalculationPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model ApiKey
 * 
 */
export type ApiKey = $Result.DefaultSelection<Prisma.$ApiKeyPayload>
/**
 * Model FeatureFlag
 * 
 */
export type FeatureFlag = $Result.DefaultSelection<Prisma.$FeatureFlagPayload>
/**
 * Model RemoteConfig
 * 
 */
export type RemoteConfig = $Result.DefaultSelection<Prisma.$RemoteConfigPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model PushToken
 * 
 */
export type PushToken = $Result.DefaultSelection<Prisma.$PushTokenPayload>
/**
 * Model Region
 * 
 */
export type Region = $Result.DefaultSelection<Prisma.$RegionPayload>
/**
 * Model InstanceType
 * 
 */
export type InstanceType = $Result.DefaultSelection<Prisma.$InstanceTypePayload>
/**
 * Model Provider
 * 
 */
export type Provider = $Result.DefaultSelection<Prisma.$ProviderPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CloudProvider: {
  AWS: 'AWS',
  GCP: 'GCP',
  AZURE: 'AZURE'
};

export type CloudProvider = (typeof CloudProvider)[keyof typeof CloudProvider]


export const MobileUserStatus: {
  ACTIVE: 'ACTIVE',
  BANNED: 'BANNED'
};

export type MobileUserStatus = (typeof MobileUserStatus)[keyof typeof MobileUserStatus]


export const GridIntensitySource: {
  ELECTRICITY_MAPS: 'ELECTRICITY_MAPS',
  CCF_DEFAULT: 'CCF_DEFAULT'
};

export type GridIntensitySource = (typeof GridIntensitySource)[keyof typeof GridIntensitySource]


export const CarbonRating: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export type CarbonRating = (typeof CarbonRating)[keyof typeof CarbonRating]


export const CalculationSource: {
  MOBILE_APP: 'MOBILE_APP',
  SDK: 'SDK',
  WEB_PLAYGROUND: 'WEB_PLAYGROUND',
  API_DIRECT: 'API_DIRECT'
};

export type CalculationSource = (typeof CalculationSource)[keyof typeof CalculationSource]


export const ApiKeyStatus: {
  ACTIVE: 'ACTIVE',
  REVOKED: 'REVOKED'
};

export type ApiKeyStatus = (typeof ApiKeyStatus)[keyof typeof ApiKeyStatus]


export const FlagCategory: {
  SCREEN: 'SCREEN',
  FEATURE: 'FEATURE',
  EXPERIMENT: 'EXPERIMENT',
  MAINTENANCE: 'MAINTENANCE'
};

export type FlagCategory = (typeof FlagCategory)[keyof typeof FlagCategory]


export const ConfigCategory: {
  THRESHOLDS: 'THRESHOLDS',
  RECOMMENDATIONS: 'RECOMMENDATIONS',
  CONTENT: 'CONTENT',
  MAINTENANCE: 'MAINTENANCE'
};

export type ConfigCategory = (typeof ConfigCategory)[keyof typeof ConfigCategory]


export const ConfigValueType: {
  NUMBER: 'NUMBER',
  STRING: 'STRING',
  BOOLEAN: 'BOOLEAN',
  JSON: 'JSON'
};

export type ConfigValueType = (typeof ConfigValueType)[keyof typeof ConfigValueType]


export const NotificationType: {
  BROADCAST: 'BROADCAST',
  TARGETED: 'TARGETED',
  THRESHOLD_ALERT: 'THRESHOLD_ALERT'
};

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType]


export const TargetAudience: {
  ALL: 'ALL',
  PROVIDER_AWS: 'PROVIDER_AWS',
  PROVIDER_GCP: 'PROVIDER_GCP',
  PROVIDER_AZURE: 'PROVIDER_AZURE',
  CUSTOM: 'CUSTOM'
};

export type TargetAudience = (typeof TargetAudience)[keyof typeof TargetAudience]


export const NotificationStatus: {
  DRAFT: 'DRAFT',
  SCHEDULED: 'SCHEDULED',
  SENDING: 'SENDING',
  SENT: 'SENT',
  FAILED: 'FAILED'
};

export type NotificationStatus = (typeof NotificationStatus)[keyof typeof NotificationStatus]


export const InstanceCategory: {
  GENERAL: 'GENERAL',
  COMPUTE: 'COMPUTE',
  MEMORY: 'MEMORY',
  STORAGE: 'STORAGE',
  GPU: 'GPU'
};

export type InstanceCategory = (typeof InstanceCategory)[keyof typeof InstanceCategory]


export const StorageType: {
  EBS: 'EBS',
  SSD: 'SSD',
  HDD: 'HDD',
  NVME: 'NVME'
};

export type StorageType = (typeof StorageType)[keyof typeof StorageType]

}

export type CloudProvider = $Enums.CloudProvider

export const CloudProvider: typeof $Enums.CloudProvider

export type MobileUserStatus = $Enums.MobileUserStatus

export const MobileUserStatus: typeof $Enums.MobileUserStatus

export type GridIntensitySource = $Enums.GridIntensitySource

export const GridIntensitySource: typeof $Enums.GridIntensitySource

export type CarbonRating = $Enums.CarbonRating

export const CarbonRating: typeof $Enums.CarbonRating

export type CalculationSource = $Enums.CalculationSource

export const CalculationSource: typeof $Enums.CalculationSource

export type ApiKeyStatus = $Enums.ApiKeyStatus

export const ApiKeyStatus: typeof $Enums.ApiKeyStatus

export type FlagCategory = $Enums.FlagCategory

export const FlagCategory: typeof $Enums.FlagCategory

export type ConfigCategory = $Enums.ConfigCategory

export const ConfigCategory: typeof $Enums.ConfigCategory

export type ConfigValueType = $Enums.ConfigValueType

export const ConfigValueType: typeof $Enums.ConfigValueType

export type NotificationType = $Enums.NotificationType

export const NotificationType: typeof $Enums.NotificationType

export type TargetAudience = $Enums.TargetAudience

export const TargetAudience: typeof $Enums.TargetAudience

export type NotificationStatus = $Enums.NotificationStatus

export const NotificationStatus: typeof $Enums.NotificationStatus

export type InstanceCategory = $Enums.InstanceCategory

export const InstanceCategory: typeof $Enums.InstanceCategory

export type StorageType = $Enums.StorageType

export const StorageType: typeof $Enums.StorageType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more MobileUsers
 * const mobileUsers = await prisma.mobileUser.findMany()
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
   * // Fetch zero or more MobileUsers
   * const mobileUsers = await prisma.mobileUser.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.mobileUser`: Exposes CRUD operations for the **MobileUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MobileUsers
    * const mobileUsers = await prisma.mobileUser.findMany()
    * ```
    */
  get mobileUser(): Prisma.MobileUserDelegate<ExtArgs>;

  /**
   * `prisma.calculation`: Exposes CRUD operations for the **Calculation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Calculations
    * const calculations = await prisma.calculation.findMany()
    * ```
    */
  get calculation(): Prisma.CalculationDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.apiKey`: Exposes CRUD operations for the **ApiKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiKeys
    * const apiKeys = await prisma.apiKey.findMany()
    * ```
    */
  get apiKey(): Prisma.ApiKeyDelegate<ExtArgs>;

  /**
   * `prisma.featureFlag`: Exposes CRUD operations for the **FeatureFlag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FeatureFlags
    * const featureFlags = await prisma.featureFlag.findMany()
    * ```
    */
  get featureFlag(): Prisma.FeatureFlagDelegate<ExtArgs>;

  /**
   * `prisma.remoteConfig`: Exposes CRUD operations for the **RemoteConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RemoteConfigs
    * const remoteConfigs = await prisma.remoteConfig.findMany()
    * ```
    */
  get remoteConfig(): Prisma.RemoteConfigDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs>;

  /**
   * `prisma.pushToken`: Exposes CRUD operations for the **PushToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PushTokens
    * const pushTokens = await prisma.pushToken.findMany()
    * ```
    */
  get pushToken(): Prisma.PushTokenDelegate<ExtArgs>;

  /**
   * `prisma.region`: Exposes CRUD operations for the **Region** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Regions
    * const regions = await prisma.region.findMany()
    * ```
    */
  get region(): Prisma.RegionDelegate<ExtArgs>;

  /**
   * `prisma.instanceType`: Exposes CRUD operations for the **InstanceType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InstanceTypes
    * const instanceTypes = await prisma.instanceType.findMany()
    * ```
    */
  get instanceType(): Prisma.InstanceTypeDelegate<ExtArgs>;

  /**
   * `prisma.provider`: Exposes CRUD operations for the **Provider** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Providers
    * const providers = await prisma.provider.findMany()
    * ```
    */
  get provider(): Prisma.ProviderDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    MobileUser: 'MobileUser',
    Calculation: 'Calculation',
    Session: 'Session',
    ApiKey: 'ApiKey',
    FeatureFlag: 'FeatureFlag',
    RemoteConfig: 'RemoteConfig',
    AuditLog: 'AuditLog',
    Notification: 'Notification',
    PushToken: 'PushToken',
    Region: 'Region',
    InstanceType: 'InstanceType',
    Provider: 'Provider'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "mobileUser" | "calculation" | "session" | "apiKey" | "featureFlag" | "remoteConfig" | "auditLog" | "notification" | "pushToken" | "region" | "instanceType" | "provider"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      MobileUser: {
        payload: Prisma.$MobileUserPayload<ExtArgs>
        fields: Prisma.MobileUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MobileUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MobileUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MobileUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MobileUserPayload>
          }
          findFirst: {
            args: Prisma.MobileUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MobileUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MobileUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MobileUserPayload>
          }
          findMany: {
            args: Prisma.MobileUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MobileUserPayload>[]
          }
          create: {
            args: Prisma.MobileUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MobileUserPayload>
          }
          createMany: {
            args: Prisma.MobileUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MobileUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MobileUserPayload>[]
          }
          delete: {
            args: Prisma.MobileUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MobileUserPayload>
          }
          update: {
            args: Prisma.MobileUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MobileUserPayload>
          }
          deleteMany: {
            args: Prisma.MobileUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MobileUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MobileUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MobileUserPayload>
          }
          aggregate: {
            args: Prisma.MobileUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMobileUser>
          }
          groupBy: {
            args: Prisma.MobileUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<MobileUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.MobileUserCountArgs<ExtArgs>
            result: $Utils.Optional<MobileUserCountAggregateOutputType> | number
          }
        }
      }
      Calculation: {
        payload: Prisma.$CalculationPayload<ExtArgs>
        fields: Prisma.CalculationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CalculationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CalculationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload>
          }
          findFirst: {
            args: Prisma.CalculationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CalculationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload>
          }
          findMany: {
            args: Prisma.CalculationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload>[]
          }
          create: {
            args: Prisma.CalculationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload>
          }
          createMany: {
            args: Prisma.CalculationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CalculationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload>[]
          }
          delete: {
            args: Prisma.CalculationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload>
          }
          update: {
            args: Prisma.CalculationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload>
          }
          deleteMany: {
            args: Prisma.CalculationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CalculationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CalculationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalculationPayload>
          }
          aggregate: {
            args: Prisma.CalculationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCalculation>
          }
          groupBy: {
            args: Prisma.CalculationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CalculationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CalculationCountArgs<ExtArgs>
            result: $Utils.Optional<CalculationCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      ApiKey: {
        payload: Prisma.$ApiKeyPayload<ExtArgs>
        fields: Prisma.ApiKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findFirst: {
            args: Prisma.ApiKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findMany: {
            args: Prisma.ApiKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          create: {
            args: Prisma.ApiKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          createMany: {
            args: Prisma.ApiKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          delete: {
            args: Prisma.ApiKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          update: {
            args: Prisma.ApiKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          deleteMany: {
            args: Prisma.ApiKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ApiKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          aggregate: {
            args: Prisma.ApiKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiKey>
          }
          groupBy: {
            args: Prisma.ApiKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiKeyCountArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyCountAggregateOutputType> | number
          }
        }
      }
      FeatureFlag: {
        payload: Prisma.$FeatureFlagPayload<ExtArgs>
        fields: Prisma.FeatureFlagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeatureFlagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeatureFlagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          findFirst: {
            args: Prisma.FeatureFlagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeatureFlagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          findMany: {
            args: Prisma.FeatureFlagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>[]
          }
          create: {
            args: Prisma.FeatureFlagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          createMany: {
            args: Prisma.FeatureFlagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeatureFlagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>[]
          }
          delete: {
            args: Prisma.FeatureFlagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          update: {
            args: Prisma.FeatureFlagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          deleteMany: {
            args: Prisma.FeatureFlagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeatureFlagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FeatureFlagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeatureFlagPayload>
          }
          aggregate: {
            args: Prisma.FeatureFlagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeatureFlag>
          }
          groupBy: {
            args: Prisma.FeatureFlagGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeatureFlagGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeatureFlagCountArgs<ExtArgs>
            result: $Utils.Optional<FeatureFlagCountAggregateOutputType> | number
          }
        }
      }
      RemoteConfig: {
        payload: Prisma.$RemoteConfigPayload<ExtArgs>
        fields: Prisma.RemoteConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RemoteConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemoteConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RemoteConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemoteConfigPayload>
          }
          findFirst: {
            args: Prisma.RemoteConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemoteConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RemoteConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemoteConfigPayload>
          }
          findMany: {
            args: Prisma.RemoteConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemoteConfigPayload>[]
          }
          create: {
            args: Prisma.RemoteConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemoteConfigPayload>
          }
          createMany: {
            args: Prisma.RemoteConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RemoteConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemoteConfigPayload>[]
          }
          delete: {
            args: Prisma.RemoteConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemoteConfigPayload>
          }
          update: {
            args: Prisma.RemoteConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemoteConfigPayload>
          }
          deleteMany: {
            args: Prisma.RemoteConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RemoteConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RemoteConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RemoteConfigPayload>
          }
          aggregate: {
            args: Prisma.RemoteConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRemoteConfig>
          }
          groupBy: {
            args: Prisma.RemoteConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<RemoteConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.RemoteConfigCountArgs<ExtArgs>
            result: $Utils.Optional<RemoteConfigCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      PushToken: {
        payload: Prisma.$PushTokenPayload<ExtArgs>
        fields: Prisma.PushTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PushTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PushTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushTokenPayload>
          }
          findFirst: {
            args: Prisma.PushTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PushTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushTokenPayload>
          }
          findMany: {
            args: Prisma.PushTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushTokenPayload>[]
          }
          create: {
            args: Prisma.PushTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushTokenPayload>
          }
          createMany: {
            args: Prisma.PushTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PushTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushTokenPayload>[]
          }
          delete: {
            args: Prisma.PushTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushTokenPayload>
          }
          update: {
            args: Prisma.PushTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushTokenPayload>
          }
          deleteMany: {
            args: Prisma.PushTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PushTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PushTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PushTokenPayload>
          }
          aggregate: {
            args: Prisma.PushTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePushToken>
          }
          groupBy: {
            args: Prisma.PushTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<PushTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.PushTokenCountArgs<ExtArgs>
            result: $Utils.Optional<PushTokenCountAggregateOutputType> | number
          }
        }
      }
      Region: {
        payload: Prisma.$RegionPayload<ExtArgs>
        fields: Prisma.RegionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findFirst: {
            args: Prisma.RegionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findMany: {
            args: Prisma.RegionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          create: {
            args: Prisma.RegionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          createMany: {
            args: Prisma.RegionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          delete: {
            args: Prisma.RegionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          update: {
            args: Prisma.RegionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          deleteMany: {
            args: Prisma.RegionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RegionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          aggregate: {
            args: Prisma.RegionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegion>
          }
          groupBy: {
            args: Prisma.RegionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegionCountArgs<ExtArgs>
            result: $Utils.Optional<RegionCountAggregateOutputType> | number
          }
        }
      }
      InstanceType: {
        payload: Prisma.$InstanceTypePayload<ExtArgs>
        fields: Prisma.InstanceTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InstanceTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InstanceTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceTypePayload>
          }
          findFirst: {
            args: Prisma.InstanceTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InstanceTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceTypePayload>
          }
          findMany: {
            args: Prisma.InstanceTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceTypePayload>[]
          }
          create: {
            args: Prisma.InstanceTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceTypePayload>
          }
          createMany: {
            args: Prisma.InstanceTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InstanceTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceTypePayload>[]
          }
          delete: {
            args: Prisma.InstanceTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceTypePayload>
          }
          update: {
            args: Prisma.InstanceTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceTypePayload>
          }
          deleteMany: {
            args: Prisma.InstanceTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InstanceTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InstanceTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceTypePayload>
          }
          aggregate: {
            args: Prisma.InstanceTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInstanceType>
          }
          groupBy: {
            args: Prisma.InstanceTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<InstanceTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.InstanceTypeCountArgs<ExtArgs>
            result: $Utils.Optional<InstanceTypeCountAggregateOutputType> | number
          }
        }
      }
      Provider: {
        payload: Prisma.$ProviderPayload<ExtArgs>
        fields: Prisma.ProviderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProviderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProviderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          findFirst: {
            args: Prisma.ProviderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProviderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          findMany: {
            args: Prisma.ProviderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>[]
          }
          create: {
            args: Prisma.ProviderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          createMany: {
            args: Prisma.ProviderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProviderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>[]
          }
          delete: {
            args: Prisma.ProviderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          update: {
            args: Prisma.ProviderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          deleteMany: {
            args: Prisma.ProviderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProviderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProviderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProviderPayload>
          }
          aggregate: {
            args: Prisma.ProviderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProvider>
          }
          groupBy: {
            args: Prisma.ProviderGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProviderGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProviderCountArgs<ExtArgs>
            result: $Utils.Optional<ProviderCountAggregateOutputType> | number
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
   * Count Type MobileUserCountOutputType
   */

  export type MobileUserCountOutputType = {
    calculations: number
    sessions: number
  }

  export type MobileUserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calculations?: boolean | MobileUserCountOutputTypeCountCalculationsArgs
    sessions?: boolean | MobileUserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * MobileUserCountOutputType without action
   */
  export type MobileUserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MobileUserCountOutputType
     */
    select?: MobileUserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MobileUserCountOutputType without action
   */
  export type MobileUserCountOutputTypeCountCalculationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CalculationWhereInput
  }

  /**
   * MobileUserCountOutputType without action
   */
  export type MobileUserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model MobileUser
   */

  export type AggregateMobileUser = {
    _count: MobileUserCountAggregateOutputType | null
    _avg: MobileUserAvgAggregateOutputType | null
    _sum: MobileUserSumAggregateOutputType | null
    _min: MobileUserMinAggregateOutputType | null
    _max: MobileUserMaxAggregateOutputType | null
  }

  export type MobileUserAvgAggregateOutputType = {
    calculationCount: number | null
    totalCO2Tracked: number | null
    carbonAlertThreshold: number | null
  }

  export type MobileUserSumAggregateOutputType = {
    calculationCount: number | null
    totalCO2Tracked: number | null
    carbonAlertThreshold: number | null
  }

  export type MobileUserMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    deviceId: string | null
    pushToken: string | null
    country: string | null
    lastActiveAt: Date | null
    calculationCount: number | null
    totalCO2Tracked: number | null
    carbonAlertThreshold: number | null
    theme: string | null
    notificationsEnabled: boolean | null
    defaultProvider: $Enums.CloudProvider | null
    status: $Enums.MobileUserStatus | null
    banReason: string | null
    bannedAt: Date | null
    bannedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MobileUserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    name: string | null
    deviceId: string | null
    pushToken: string | null
    country: string | null
    lastActiveAt: Date | null
    calculationCount: number | null
    totalCO2Tracked: number | null
    carbonAlertThreshold: number | null
    theme: string | null
    notificationsEnabled: boolean | null
    defaultProvider: $Enums.CloudProvider | null
    status: $Enums.MobileUserStatus | null
    banReason: string | null
    bannedAt: Date | null
    bannedBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MobileUserCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    name: number
    deviceId: number
    pushToken: number
    country: number
    lastActiveAt: number
    calculationCount: number
    totalCO2Tracked: number
    carbonAlertThreshold: number
    theme: number
    notificationsEnabled: number
    defaultProvider: number
    status: number
    banReason: number
    bannedAt: number
    bannedBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MobileUserAvgAggregateInputType = {
    calculationCount?: true
    totalCO2Tracked?: true
    carbonAlertThreshold?: true
  }

  export type MobileUserSumAggregateInputType = {
    calculationCount?: true
    totalCO2Tracked?: true
    carbonAlertThreshold?: true
  }

  export type MobileUserMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    deviceId?: true
    pushToken?: true
    country?: true
    lastActiveAt?: true
    calculationCount?: true
    totalCO2Tracked?: true
    carbonAlertThreshold?: true
    theme?: true
    notificationsEnabled?: true
    defaultProvider?: true
    status?: true
    banReason?: true
    bannedAt?: true
    bannedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MobileUserMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    deviceId?: true
    pushToken?: true
    country?: true
    lastActiveAt?: true
    calculationCount?: true
    totalCO2Tracked?: true
    carbonAlertThreshold?: true
    theme?: true
    notificationsEnabled?: true
    defaultProvider?: true
    status?: true
    banReason?: true
    bannedAt?: true
    bannedBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MobileUserCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    name?: true
    deviceId?: true
    pushToken?: true
    country?: true
    lastActiveAt?: true
    calculationCount?: true
    totalCO2Tracked?: true
    carbonAlertThreshold?: true
    theme?: true
    notificationsEnabled?: true
    defaultProvider?: true
    status?: true
    banReason?: true
    bannedAt?: true
    bannedBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MobileUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MobileUser to aggregate.
     */
    where?: MobileUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MobileUsers to fetch.
     */
    orderBy?: MobileUserOrderByWithRelationInput | MobileUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MobileUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MobileUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MobileUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MobileUsers
    **/
    _count?: true | MobileUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MobileUserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MobileUserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MobileUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MobileUserMaxAggregateInputType
  }

  export type GetMobileUserAggregateType<T extends MobileUserAggregateArgs> = {
        [P in keyof T & keyof AggregateMobileUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMobileUser[P]>
      : GetScalarType<T[P], AggregateMobileUser[P]>
  }




  export type MobileUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MobileUserWhereInput
    orderBy?: MobileUserOrderByWithAggregationInput | MobileUserOrderByWithAggregationInput[]
    by: MobileUserScalarFieldEnum[] | MobileUserScalarFieldEnum
    having?: MobileUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MobileUserCountAggregateInputType | true
    _avg?: MobileUserAvgAggregateInputType
    _sum?: MobileUserSumAggregateInputType
    _min?: MobileUserMinAggregateInputType
    _max?: MobileUserMaxAggregateInputType
  }

  export type MobileUserGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    name: string
    deviceId: string | null
    pushToken: string | null
    country: string | null
    lastActiveAt: Date
    calculationCount: number
    totalCO2Tracked: number
    carbonAlertThreshold: number
    theme: string
    notificationsEnabled: boolean
    defaultProvider: $Enums.CloudProvider | null
    status: $Enums.MobileUserStatus
    banReason: string | null
    bannedAt: Date | null
    bannedBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: MobileUserCountAggregateOutputType | null
    _avg: MobileUserAvgAggregateOutputType | null
    _sum: MobileUserSumAggregateOutputType | null
    _min: MobileUserMinAggregateOutputType | null
    _max: MobileUserMaxAggregateOutputType | null
  }

  type GetMobileUserGroupByPayload<T extends MobileUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MobileUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MobileUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MobileUserGroupByOutputType[P]>
            : GetScalarType<T[P], MobileUserGroupByOutputType[P]>
        }
      >
    >


  export type MobileUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    deviceId?: boolean
    pushToken?: boolean
    country?: boolean
    lastActiveAt?: boolean
    calculationCount?: boolean
    totalCO2Tracked?: boolean
    carbonAlertThreshold?: boolean
    theme?: boolean
    notificationsEnabled?: boolean
    defaultProvider?: boolean
    status?: boolean
    banReason?: boolean
    bannedAt?: boolean
    bannedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    calculations?: boolean | MobileUser$calculationsArgs<ExtArgs>
    sessions?: boolean | MobileUser$sessionsArgs<ExtArgs>
    _count?: boolean | MobileUserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mobileUser"]>

  export type MobileUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    deviceId?: boolean
    pushToken?: boolean
    country?: boolean
    lastActiveAt?: boolean
    calculationCount?: boolean
    totalCO2Tracked?: boolean
    carbonAlertThreshold?: boolean
    theme?: boolean
    notificationsEnabled?: boolean
    defaultProvider?: boolean
    status?: boolean
    banReason?: boolean
    bannedAt?: boolean
    bannedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["mobileUser"]>

  export type MobileUserSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    name?: boolean
    deviceId?: boolean
    pushToken?: boolean
    country?: boolean
    lastActiveAt?: boolean
    calculationCount?: boolean
    totalCO2Tracked?: boolean
    carbonAlertThreshold?: boolean
    theme?: boolean
    notificationsEnabled?: boolean
    defaultProvider?: boolean
    status?: boolean
    banReason?: boolean
    bannedAt?: boolean
    bannedBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MobileUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calculations?: boolean | MobileUser$calculationsArgs<ExtArgs>
    sessions?: boolean | MobileUser$sessionsArgs<ExtArgs>
    _count?: boolean | MobileUserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MobileUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MobileUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MobileUser"
    objects: {
      calculations: Prisma.$CalculationPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      name: string
      deviceId: string | null
      pushToken: string | null
      country: string | null
      lastActiveAt: Date
      calculationCount: number
      totalCO2Tracked: number
      carbonAlertThreshold: number
      theme: string
      notificationsEnabled: boolean
      defaultProvider: $Enums.CloudProvider | null
      status: $Enums.MobileUserStatus
      banReason: string | null
      bannedAt: Date | null
      bannedBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mobileUser"]>
    composites: {}
  }

  type MobileUserGetPayload<S extends boolean | null | undefined | MobileUserDefaultArgs> = $Result.GetResult<Prisma.$MobileUserPayload, S>

  type MobileUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MobileUserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MobileUserCountAggregateInputType | true
    }

  export interface MobileUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MobileUser'], meta: { name: 'MobileUser' } }
    /**
     * Find zero or one MobileUser that matches the filter.
     * @param {MobileUserFindUniqueArgs} args - Arguments to find a MobileUser
     * @example
     * // Get one MobileUser
     * const mobileUser = await prisma.mobileUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MobileUserFindUniqueArgs>(args: SelectSubset<T, MobileUserFindUniqueArgs<ExtArgs>>): Prisma__MobileUserClient<$Result.GetResult<Prisma.$MobileUserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MobileUser that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MobileUserFindUniqueOrThrowArgs} args - Arguments to find a MobileUser
     * @example
     * // Get one MobileUser
     * const mobileUser = await prisma.mobileUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MobileUserFindUniqueOrThrowArgs>(args: SelectSubset<T, MobileUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MobileUserClient<$Result.GetResult<Prisma.$MobileUserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MobileUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MobileUserFindFirstArgs} args - Arguments to find a MobileUser
     * @example
     * // Get one MobileUser
     * const mobileUser = await prisma.mobileUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MobileUserFindFirstArgs>(args?: SelectSubset<T, MobileUserFindFirstArgs<ExtArgs>>): Prisma__MobileUserClient<$Result.GetResult<Prisma.$MobileUserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MobileUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MobileUserFindFirstOrThrowArgs} args - Arguments to find a MobileUser
     * @example
     * // Get one MobileUser
     * const mobileUser = await prisma.mobileUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MobileUserFindFirstOrThrowArgs>(args?: SelectSubset<T, MobileUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__MobileUserClient<$Result.GetResult<Prisma.$MobileUserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MobileUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MobileUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MobileUsers
     * const mobileUsers = await prisma.mobileUser.findMany()
     * 
     * // Get first 10 MobileUsers
     * const mobileUsers = await prisma.mobileUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mobileUserWithIdOnly = await prisma.mobileUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MobileUserFindManyArgs>(args?: SelectSubset<T, MobileUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MobileUserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MobileUser.
     * @param {MobileUserCreateArgs} args - Arguments to create a MobileUser.
     * @example
     * // Create one MobileUser
     * const MobileUser = await prisma.mobileUser.create({
     *   data: {
     *     // ... data to create a MobileUser
     *   }
     * })
     * 
     */
    create<T extends MobileUserCreateArgs>(args: SelectSubset<T, MobileUserCreateArgs<ExtArgs>>): Prisma__MobileUserClient<$Result.GetResult<Prisma.$MobileUserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MobileUsers.
     * @param {MobileUserCreateManyArgs} args - Arguments to create many MobileUsers.
     * @example
     * // Create many MobileUsers
     * const mobileUser = await prisma.mobileUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MobileUserCreateManyArgs>(args?: SelectSubset<T, MobileUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MobileUsers and returns the data saved in the database.
     * @param {MobileUserCreateManyAndReturnArgs} args - Arguments to create many MobileUsers.
     * @example
     * // Create many MobileUsers
     * const mobileUser = await prisma.mobileUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MobileUsers and only return the `id`
     * const mobileUserWithIdOnly = await prisma.mobileUser.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MobileUserCreateManyAndReturnArgs>(args?: SelectSubset<T, MobileUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MobileUserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MobileUser.
     * @param {MobileUserDeleteArgs} args - Arguments to delete one MobileUser.
     * @example
     * // Delete one MobileUser
     * const MobileUser = await prisma.mobileUser.delete({
     *   where: {
     *     // ... filter to delete one MobileUser
     *   }
     * })
     * 
     */
    delete<T extends MobileUserDeleteArgs>(args: SelectSubset<T, MobileUserDeleteArgs<ExtArgs>>): Prisma__MobileUserClient<$Result.GetResult<Prisma.$MobileUserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MobileUser.
     * @param {MobileUserUpdateArgs} args - Arguments to update one MobileUser.
     * @example
     * // Update one MobileUser
     * const mobileUser = await prisma.mobileUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MobileUserUpdateArgs>(args: SelectSubset<T, MobileUserUpdateArgs<ExtArgs>>): Prisma__MobileUserClient<$Result.GetResult<Prisma.$MobileUserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MobileUsers.
     * @param {MobileUserDeleteManyArgs} args - Arguments to filter MobileUsers to delete.
     * @example
     * // Delete a few MobileUsers
     * const { count } = await prisma.mobileUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MobileUserDeleteManyArgs>(args?: SelectSubset<T, MobileUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MobileUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MobileUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MobileUsers
     * const mobileUser = await prisma.mobileUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MobileUserUpdateManyArgs>(args: SelectSubset<T, MobileUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MobileUser.
     * @param {MobileUserUpsertArgs} args - Arguments to update or create a MobileUser.
     * @example
     * // Update or create a MobileUser
     * const mobileUser = await prisma.mobileUser.upsert({
     *   create: {
     *     // ... data to create a MobileUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MobileUser we want to update
     *   }
     * })
     */
    upsert<T extends MobileUserUpsertArgs>(args: SelectSubset<T, MobileUserUpsertArgs<ExtArgs>>): Prisma__MobileUserClient<$Result.GetResult<Prisma.$MobileUserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MobileUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MobileUserCountArgs} args - Arguments to filter MobileUsers to count.
     * @example
     * // Count the number of MobileUsers
     * const count = await prisma.mobileUser.count({
     *   where: {
     *     // ... the filter for the MobileUsers we want to count
     *   }
     * })
    **/
    count<T extends MobileUserCountArgs>(
      args?: Subset<T, MobileUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MobileUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MobileUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MobileUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MobileUserAggregateArgs>(args: Subset<T, MobileUserAggregateArgs>): Prisma.PrismaPromise<GetMobileUserAggregateType<T>>

    /**
     * Group by MobileUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MobileUserGroupByArgs} args - Group by arguments.
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
      T extends MobileUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MobileUserGroupByArgs['orderBy'] }
        : { orderBy?: MobileUserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MobileUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMobileUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MobileUser model
   */
  readonly fields: MobileUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MobileUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MobileUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    calculations<T extends MobileUser$calculationsArgs<ExtArgs> = {}>(args?: Subset<T, MobileUser$calculationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "findMany"> | Null>
    sessions<T extends MobileUser$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, MobileUser$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the MobileUser model
   */ 
  interface MobileUserFieldRefs {
    readonly id: FieldRef<"MobileUser", 'String'>
    readonly email: FieldRef<"MobileUser", 'String'>
    readonly passwordHash: FieldRef<"MobileUser", 'String'>
    readonly name: FieldRef<"MobileUser", 'String'>
    readonly deviceId: FieldRef<"MobileUser", 'String'>
    readonly pushToken: FieldRef<"MobileUser", 'String'>
    readonly country: FieldRef<"MobileUser", 'String'>
    readonly lastActiveAt: FieldRef<"MobileUser", 'DateTime'>
    readonly calculationCount: FieldRef<"MobileUser", 'Int'>
    readonly totalCO2Tracked: FieldRef<"MobileUser", 'Float'>
    readonly carbonAlertThreshold: FieldRef<"MobileUser", 'Float'>
    readonly theme: FieldRef<"MobileUser", 'String'>
    readonly notificationsEnabled: FieldRef<"MobileUser", 'Boolean'>
    readonly defaultProvider: FieldRef<"MobileUser", 'CloudProvider'>
    readonly status: FieldRef<"MobileUser", 'MobileUserStatus'>
    readonly banReason: FieldRef<"MobileUser", 'String'>
    readonly bannedAt: FieldRef<"MobileUser", 'DateTime'>
    readonly bannedBy: FieldRef<"MobileUser", 'String'>
    readonly createdAt: FieldRef<"MobileUser", 'DateTime'>
    readonly updatedAt: FieldRef<"MobileUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MobileUser findUnique
   */
  export type MobileUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MobileUser
     */
    select?: MobileUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MobileUserInclude<ExtArgs> | null
    /**
     * Filter, which MobileUser to fetch.
     */
    where: MobileUserWhereUniqueInput
  }

  /**
   * MobileUser findUniqueOrThrow
   */
  export type MobileUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MobileUser
     */
    select?: MobileUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MobileUserInclude<ExtArgs> | null
    /**
     * Filter, which MobileUser to fetch.
     */
    where: MobileUserWhereUniqueInput
  }

  /**
   * MobileUser findFirst
   */
  export type MobileUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MobileUser
     */
    select?: MobileUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MobileUserInclude<ExtArgs> | null
    /**
     * Filter, which MobileUser to fetch.
     */
    where?: MobileUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MobileUsers to fetch.
     */
    orderBy?: MobileUserOrderByWithRelationInput | MobileUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MobileUsers.
     */
    cursor?: MobileUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MobileUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MobileUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MobileUsers.
     */
    distinct?: MobileUserScalarFieldEnum | MobileUserScalarFieldEnum[]
  }

  /**
   * MobileUser findFirstOrThrow
   */
  export type MobileUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MobileUser
     */
    select?: MobileUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MobileUserInclude<ExtArgs> | null
    /**
     * Filter, which MobileUser to fetch.
     */
    where?: MobileUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MobileUsers to fetch.
     */
    orderBy?: MobileUserOrderByWithRelationInput | MobileUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MobileUsers.
     */
    cursor?: MobileUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MobileUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MobileUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MobileUsers.
     */
    distinct?: MobileUserScalarFieldEnum | MobileUserScalarFieldEnum[]
  }

  /**
   * MobileUser findMany
   */
  export type MobileUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MobileUser
     */
    select?: MobileUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MobileUserInclude<ExtArgs> | null
    /**
     * Filter, which MobileUsers to fetch.
     */
    where?: MobileUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MobileUsers to fetch.
     */
    orderBy?: MobileUserOrderByWithRelationInput | MobileUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MobileUsers.
     */
    cursor?: MobileUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MobileUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MobileUsers.
     */
    skip?: number
    distinct?: MobileUserScalarFieldEnum | MobileUserScalarFieldEnum[]
  }

  /**
   * MobileUser create
   */
  export type MobileUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MobileUser
     */
    select?: MobileUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MobileUserInclude<ExtArgs> | null
    /**
     * The data needed to create a MobileUser.
     */
    data: XOR<MobileUserCreateInput, MobileUserUncheckedCreateInput>
  }

  /**
   * MobileUser createMany
   */
  export type MobileUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MobileUsers.
     */
    data: MobileUserCreateManyInput | MobileUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MobileUser createManyAndReturn
   */
  export type MobileUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MobileUser
     */
    select?: MobileUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MobileUsers.
     */
    data: MobileUserCreateManyInput | MobileUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MobileUser update
   */
  export type MobileUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MobileUser
     */
    select?: MobileUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MobileUserInclude<ExtArgs> | null
    /**
     * The data needed to update a MobileUser.
     */
    data: XOR<MobileUserUpdateInput, MobileUserUncheckedUpdateInput>
    /**
     * Choose, which MobileUser to update.
     */
    where: MobileUserWhereUniqueInput
  }

  /**
   * MobileUser updateMany
   */
  export type MobileUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MobileUsers.
     */
    data: XOR<MobileUserUpdateManyMutationInput, MobileUserUncheckedUpdateManyInput>
    /**
     * Filter which MobileUsers to update
     */
    where?: MobileUserWhereInput
  }

  /**
   * MobileUser upsert
   */
  export type MobileUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MobileUser
     */
    select?: MobileUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MobileUserInclude<ExtArgs> | null
    /**
     * The filter to search for the MobileUser to update in case it exists.
     */
    where: MobileUserWhereUniqueInput
    /**
     * In case the MobileUser found by the `where` argument doesn't exist, create a new MobileUser with this data.
     */
    create: XOR<MobileUserCreateInput, MobileUserUncheckedCreateInput>
    /**
     * In case the MobileUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MobileUserUpdateInput, MobileUserUncheckedUpdateInput>
  }

  /**
   * MobileUser delete
   */
  export type MobileUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MobileUser
     */
    select?: MobileUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MobileUserInclude<ExtArgs> | null
    /**
     * Filter which MobileUser to delete.
     */
    where: MobileUserWhereUniqueInput
  }

  /**
   * MobileUser deleteMany
   */
  export type MobileUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MobileUsers to delete
     */
    where?: MobileUserWhereInput
  }

  /**
   * MobileUser.calculations
   */
  export type MobileUser$calculationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalculationInclude<ExtArgs> | null
    where?: CalculationWhereInput
    orderBy?: CalculationOrderByWithRelationInput | CalculationOrderByWithRelationInput[]
    cursor?: CalculationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CalculationScalarFieldEnum | CalculationScalarFieldEnum[]
  }

  /**
   * MobileUser.sessions
   */
  export type MobileUser$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * MobileUser without action
   */
  export type MobileUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MobileUser
     */
    select?: MobileUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MobileUserInclude<ExtArgs> | null
  }


  /**
   * Model Calculation
   */

  export type AggregateCalculation = {
    _count: CalculationCountAggregateOutputType | null
    _avg: CalculationAvgAggregateOutputType | null
    _sum: CalculationSumAggregateOutputType | null
    _min: CalculationMinAggregateOutputType | null
    _max: CalculationMaxAggregateOutputType | null
  }

  export type CalculationAvgAggregateOutputType = {
    instanceCount: number | null
    hoursPerMonth: number | null
    cpuUtilization: number | null
    storageGB: number | null
    ramGB: number | null
    energyComputeKwh: number | null
    energyMemoryKwh: number | null
    energyStorageKwh: number | null
    energyTotalKwh: number | null
    co2GramsMonth: number | null
    co2KgMonth: number | null
    co2GramsHour: number | null
    gridIntensity: number | null
    computePercentage: number | null
    memoryPercentage: number | null
    storagePercentage: number | null
    potentialReductionPct: number | null
    responseTimeMs: number | null
  }

  export type CalculationSumAggregateOutputType = {
    instanceCount: number | null
    hoursPerMonth: number | null
    cpuUtilization: number | null
    storageGB: number | null
    ramGB: number | null
    energyComputeKwh: number | null
    energyMemoryKwh: number | null
    energyStorageKwh: number | null
    energyTotalKwh: number | null
    co2GramsMonth: number | null
    co2KgMonth: number | null
    co2GramsHour: number | null
    gridIntensity: number | null
    computePercentage: number | null
    memoryPercentage: number | null
    storagePercentage: number | null
    potentialReductionPct: number | null
    responseTimeMs: number | null
  }

  export type CalculationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: $Enums.CloudProvider | null
    region: string | null
    regionName: string | null
    instanceType: string | null
    instanceCount: number | null
    hoursPerMonth: number | null
    cpuUtilization: number | null
    storageGB: number | null
    ramGB: number | null
    energyComputeKwh: number | null
    energyMemoryKwh: number | null
    energyStorageKwh: number | null
    energyTotalKwh: number | null
    co2GramsMonth: number | null
    co2KgMonth: number | null
    co2GramsHour: number | null
    gridIntensity: number | null
    gridIntensitySource: $Enums.GridIntensitySource | null
    computePercentage: number | null
    memoryPercentage: number | null
    storagePercentage: number | null
    rating: $Enums.CarbonRating | null
    ratingColor: string | null
    realWorldEquivalent: string | null
    recommendation: string | null
    recommendedRegion: string | null
    potentialReductionPct: number | null
    source: $Enums.CalculationSource | null
    apiKeyId: string | null
    responseTimeMs: number | null
    sdkVersion: string | null
    createdAt: Date | null
  }

  export type CalculationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    provider: $Enums.CloudProvider | null
    region: string | null
    regionName: string | null
    instanceType: string | null
    instanceCount: number | null
    hoursPerMonth: number | null
    cpuUtilization: number | null
    storageGB: number | null
    ramGB: number | null
    energyComputeKwh: number | null
    energyMemoryKwh: number | null
    energyStorageKwh: number | null
    energyTotalKwh: number | null
    co2GramsMonth: number | null
    co2KgMonth: number | null
    co2GramsHour: number | null
    gridIntensity: number | null
    gridIntensitySource: $Enums.GridIntensitySource | null
    computePercentage: number | null
    memoryPercentage: number | null
    storagePercentage: number | null
    rating: $Enums.CarbonRating | null
    ratingColor: string | null
    realWorldEquivalent: string | null
    recommendation: string | null
    recommendedRegion: string | null
    potentialReductionPct: number | null
    source: $Enums.CalculationSource | null
    apiKeyId: string | null
    responseTimeMs: number | null
    sdkVersion: string | null
    createdAt: Date | null
  }

  export type CalculationCountAggregateOutputType = {
    id: number
    userId: number
    provider: number
    region: number
    regionName: number
    instanceType: number
    instanceCount: number
    hoursPerMonth: number
    cpuUtilization: number
    storageGB: number
    ramGB: number
    energyComputeKwh: number
    energyMemoryKwh: number
    energyStorageKwh: number
    energyTotalKwh: number
    co2GramsMonth: number
    co2KgMonth: number
    co2GramsHour: number
    gridIntensity: number
    gridIntensitySource: number
    computePercentage: number
    memoryPercentage: number
    storagePercentage: number
    rating: number
    ratingColor: number
    realWorldEquivalent: number
    recommendation: number
    recommendedRegion: number
    potentialReductionPct: number
    source: number
    apiKeyId: number
    responseTimeMs: number
    sdkVersion: number
    createdAt: number
    _all: number
  }


  export type CalculationAvgAggregateInputType = {
    instanceCount?: true
    hoursPerMonth?: true
    cpuUtilization?: true
    storageGB?: true
    ramGB?: true
    energyComputeKwh?: true
    energyMemoryKwh?: true
    energyStorageKwh?: true
    energyTotalKwh?: true
    co2GramsMonth?: true
    co2KgMonth?: true
    co2GramsHour?: true
    gridIntensity?: true
    computePercentage?: true
    memoryPercentage?: true
    storagePercentage?: true
    potentialReductionPct?: true
    responseTimeMs?: true
  }

  export type CalculationSumAggregateInputType = {
    instanceCount?: true
    hoursPerMonth?: true
    cpuUtilization?: true
    storageGB?: true
    ramGB?: true
    energyComputeKwh?: true
    energyMemoryKwh?: true
    energyStorageKwh?: true
    energyTotalKwh?: true
    co2GramsMonth?: true
    co2KgMonth?: true
    co2GramsHour?: true
    gridIntensity?: true
    computePercentage?: true
    memoryPercentage?: true
    storagePercentage?: true
    potentialReductionPct?: true
    responseTimeMs?: true
  }

  export type CalculationMinAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    region?: true
    regionName?: true
    instanceType?: true
    instanceCount?: true
    hoursPerMonth?: true
    cpuUtilization?: true
    storageGB?: true
    ramGB?: true
    energyComputeKwh?: true
    energyMemoryKwh?: true
    energyStorageKwh?: true
    energyTotalKwh?: true
    co2GramsMonth?: true
    co2KgMonth?: true
    co2GramsHour?: true
    gridIntensity?: true
    gridIntensitySource?: true
    computePercentage?: true
    memoryPercentage?: true
    storagePercentage?: true
    rating?: true
    ratingColor?: true
    realWorldEquivalent?: true
    recommendation?: true
    recommendedRegion?: true
    potentialReductionPct?: true
    source?: true
    apiKeyId?: true
    responseTimeMs?: true
    sdkVersion?: true
    createdAt?: true
  }

  export type CalculationMaxAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    region?: true
    regionName?: true
    instanceType?: true
    instanceCount?: true
    hoursPerMonth?: true
    cpuUtilization?: true
    storageGB?: true
    ramGB?: true
    energyComputeKwh?: true
    energyMemoryKwh?: true
    energyStorageKwh?: true
    energyTotalKwh?: true
    co2GramsMonth?: true
    co2KgMonth?: true
    co2GramsHour?: true
    gridIntensity?: true
    gridIntensitySource?: true
    computePercentage?: true
    memoryPercentage?: true
    storagePercentage?: true
    rating?: true
    ratingColor?: true
    realWorldEquivalent?: true
    recommendation?: true
    recommendedRegion?: true
    potentialReductionPct?: true
    source?: true
    apiKeyId?: true
    responseTimeMs?: true
    sdkVersion?: true
    createdAt?: true
  }

  export type CalculationCountAggregateInputType = {
    id?: true
    userId?: true
    provider?: true
    region?: true
    regionName?: true
    instanceType?: true
    instanceCount?: true
    hoursPerMonth?: true
    cpuUtilization?: true
    storageGB?: true
    ramGB?: true
    energyComputeKwh?: true
    energyMemoryKwh?: true
    energyStorageKwh?: true
    energyTotalKwh?: true
    co2GramsMonth?: true
    co2KgMonth?: true
    co2GramsHour?: true
    gridIntensity?: true
    gridIntensitySource?: true
    computePercentage?: true
    memoryPercentage?: true
    storagePercentage?: true
    rating?: true
    ratingColor?: true
    realWorldEquivalent?: true
    recommendation?: true
    recommendedRegion?: true
    potentialReductionPct?: true
    source?: true
    apiKeyId?: true
    responseTimeMs?: true
    sdkVersion?: true
    createdAt?: true
    _all?: true
  }

  export type CalculationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Calculation to aggregate.
     */
    where?: CalculationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Calculations to fetch.
     */
    orderBy?: CalculationOrderByWithRelationInput | CalculationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CalculationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Calculations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Calculations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Calculations
    **/
    _count?: true | CalculationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CalculationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CalculationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CalculationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CalculationMaxAggregateInputType
  }

  export type GetCalculationAggregateType<T extends CalculationAggregateArgs> = {
        [P in keyof T & keyof AggregateCalculation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCalculation[P]>
      : GetScalarType<T[P], AggregateCalculation[P]>
  }




  export type CalculationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CalculationWhereInput
    orderBy?: CalculationOrderByWithAggregationInput | CalculationOrderByWithAggregationInput[]
    by: CalculationScalarFieldEnum[] | CalculationScalarFieldEnum
    having?: CalculationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CalculationCountAggregateInputType | true
    _avg?: CalculationAvgAggregateInputType
    _sum?: CalculationSumAggregateInputType
    _min?: CalculationMinAggregateInputType
    _max?: CalculationMaxAggregateInputType
  }

  export type CalculationGroupByOutputType = {
    id: string
    userId: string
    provider: $Enums.CloudProvider
    region: string
    regionName: string
    instanceType: string
    instanceCount: number
    hoursPerMonth: number
    cpuUtilization: number
    storageGB: number
    ramGB: number
    energyComputeKwh: number
    energyMemoryKwh: number
    energyStorageKwh: number
    energyTotalKwh: number
    co2GramsMonth: number
    co2KgMonth: number
    co2GramsHour: number
    gridIntensity: number
    gridIntensitySource: $Enums.GridIntensitySource
    computePercentage: number
    memoryPercentage: number
    storagePercentage: number
    rating: $Enums.CarbonRating
    ratingColor: string
    realWorldEquivalent: string
    recommendation: string
    recommendedRegion: string | null
    potentialReductionPct: number | null
    source: $Enums.CalculationSource
    apiKeyId: string | null
    responseTimeMs: number
    sdkVersion: string | null
    createdAt: Date
    _count: CalculationCountAggregateOutputType | null
    _avg: CalculationAvgAggregateOutputType | null
    _sum: CalculationSumAggregateOutputType | null
    _min: CalculationMinAggregateOutputType | null
    _max: CalculationMaxAggregateOutputType | null
  }

  type GetCalculationGroupByPayload<T extends CalculationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CalculationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CalculationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CalculationGroupByOutputType[P]>
            : GetScalarType<T[P], CalculationGroupByOutputType[P]>
        }
      >
    >


  export type CalculationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    region?: boolean
    regionName?: boolean
    instanceType?: boolean
    instanceCount?: boolean
    hoursPerMonth?: boolean
    cpuUtilization?: boolean
    storageGB?: boolean
    ramGB?: boolean
    energyComputeKwh?: boolean
    energyMemoryKwh?: boolean
    energyStorageKwh?: boolean
    energyTotalKwh?: boolean
    co2GramsMonth?: boolean
    co2KgMonth?: boolean
    co2GramsHour?: boolean
    gridIntensity?: boolean
    gridIntensitySource?: boolean
    computePercentage?: boolean
    memoryPercentage?: boolean
    storagePercentage?: boolean
    rating?: boolean
    ratingColor?: boolean
    realWorldEquivalent?: boolean
    recommendation?: boolean
    recommendedRegion?: boolean
    potentialReductionPct?: boolean
    source?: boolean
    apiKeyId?: boolean
    responseTimeMs?: boolean
    sdkVersion?: boolean
    createdAt?: boolean
    user?: boolean | MobileUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calculation"]>

  export type CalculationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    provider?: boolean
    region?: boolean
    regionName?: boolean
    instanceType?: boolean
    instanceCount?: boolean
    hoursPerMonth?: boolean
    cpuUtilization?: boolean
    storageGB?: boolean
    ramGB?: boolean
    energyComputeKwh?: boolean
    energyMemoryKwh?: boolean
    energyStorageKwh?: boolean
    energyTotalKwh?: boolean
    co2GramsMonth?: boolean
    co2KgMonth?: boolean
    co2GramsHour?: boolean
    gridIntensity?: boolean
    gridIntensitySource?: boolean
    computePercentage?: boolean
    memoryPercentage?: boolean
    storagePercentage?: boolean
    rating?: boolean
    ratingColor?: boolean
    realWorldEquivalent?: boolean
    recommendation?: boolean
    recommendedRegion?: boolean
    potentialReductionPct?: boolean
    source?: boolean
    apiKeyId?: boolean
    responseTimeMs?: boolean
    sdkVersion?: boolean
    createdAt?: boolean
    user?: boolean | MobileUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calculation"]>

  export type CalculationSelectScalar = {
    id?: boolean
    userId?: boolean
    provider?: boolean
    region?: boolean
    regionName?: boolean
    instanceType?: boolean
    instanceCount?: boolean
    hoursPerMonth?: boolean
    cpuUtilization?: boolean
    storageGB?: boolean
    ramGB?: boolean
    energyComputeKwh?: boolean
    energyMemoryKwh?: boolean
    energyStorageKwh?: boolean
    energyTotalKwh?: boolean
    co2GramsMonth?: boolean
    co2KgMonth?: boolean
    co2GramsHour?: boolean
    gridIntensity?: boolean
    gridIntensitySource?: boolean
    computePercentage?: boolean
    memoryPercentage?: boolean
    storagePercentage?: boolean
    rating?: boolean
    ratingColor?: boolean
    realWorldEquivalent?: boolean
    recommendation?: boolean
    recommendedRegion?: boolean
    potentialReductionPct?: boolean
    source?: boolean
    apiKeyId?: boolean
    responseTimeMs?: boolean
    sdkVersion?: boolean
    createdAt?: boolean
  }

  export type CalculationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | MobileUserDefaultArgs<ExtArgs>
  }
  export type CalculationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | MobileUserDefaultArgs<ExtArgs>
  }

  export type $CalculationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Calculation"
    objects: {
      user: Prisma.$MobileUserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      provider: $Enums.CloudProvider
      region: string
      regionName: string
      instanceType: string
      instanceCount: number
      hoursPerMonth: number
      cpuUtilization: number
      storageGB: number
      ramGB: number
      energyComputeKwh: number
      energyMemoryKwh: number
      energyStorageKwh: number
      energyTotalKwh: number
      co2GramsMonth: number
      co2KgMonth: number
      co2GramsHour: number
      gridIntensity: number
      gridIntensitySource: $Enums.GridIntensitySource
      computePercentage: number
      memoryPercentage: number
      storagePercentage: number
      rating: $Enums.CarbonRating
      ratingColor: string
      realWorldEquivalent: string
      recommendation: string
      recommendedRegion: string | null
      potentialReductionPct: number | null
      source: $Enums.CalculationSource
      apiKeyId: string | null
      responseTimeMs: number
      sdkVersion: string | null
      createdAt: Date
    }, ExtArgs["result"]["calculation"]>
    composites: {}
  }

  type CalculationGetPayload<S extends boolean | null | undefined | CalculationDefaultArgs> = $Result.GetResult<Prisma.$CalculationPayload, S>

  type CalculationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CalculationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CalculationCountAggregateInputType | true
    }

  export interface CalculationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Calculation'], meta: { name: 'Calculation' } }
    /**
     * Find zero or one Calculation that matches the filter.
     * @param {CalculationFindUniqueArgs} args - Arguments to find a Calculation
     * @example
     * // Get one Calculation
     * const calculation = await prisma.calculation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CalculationFindUniqueArgs>(args: SelectSubset<T, CalculationFindUniqueArgs<ExtArgs>>): Prisma__CalculationClient<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Calculation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CalculationFindUniqueOrThrowArgs} args - Arguments to find a Calculation
     * @example
     * // Get one Calculation
     * const calculation = await prisma.calculation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CalculationFindUniqueOrThrowArgs>(args: SelectSubset<T, CalculationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CalculationClient<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Calculation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalculationFindFirstArgs} args - Arguments to find a Calculation
     * @example
     * // Get one Calculation
     * const calculation = await prisma.calculation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CalculationFindFirstArgs>(args?: SelectSubset<T, CalculationFindFirstArgs<ExtArgs>>): Prisma__CalculationClient<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Calculation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalculationFindFirstOrThrowArgs} args - Arguments to find a Calculation
     * @example
     * // Get one Calculation
     * const calculation = await prisma.calculation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CalculationFindFirstOrThrowArgs>(args?: SelectSubset<T, CalculationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CalculationClient<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Calculations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalculationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Calculations
     * const calculations = await prisma.calculation.findMany()
     * 
     * // Get first 10 Calculations
     * const calculations = await prisma.calculation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const calculationWithIdOnly = await prisma.calculation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CalculationFindManyArgs>(args?: SelectSubset<T, CalculationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Calculation.
     * @param {CalculationCreateArgs} args - Arguments to create a Calculation.
     * @example
     * // Create one Calculation
     * const Calculation = await prisma.calculation.create({
     *   data: {
     *     // ... data to create a Calculation
     *   }
     * })
     * 
     */
    create<T extends CalculationCreateArgs>(args: SelectSubset<T, CalculationCreateArgs<ExtArgs>>): Prisma__CalculationClient<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Calculations.
     * @param {CalculationCreateManyArgs} args - Arguments to create many Calculations.
     * @example
     * // Create many Calculations
     * const calculation = await prisma.calculation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CalculationCreateManyArgs>(args?: SelectSubset<T, CalculationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Calculations and returns the data saved in the database.
     * @param {CalculationCreateManyAndReturnArgs} args - Arguments to create many Calculations.
     * @example
     * // Create many Calculations
     * const calculation = await prisma.calculation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Calculations and only return the `id`
     * const calculationWithIdOnly = await prisma.calculation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CalculationCreateManyAndReturnArgs>(args?: SelectSubset<T, CalculationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Calculation.
     * @param {CalculationDeleteArgs} args - Arguments to delete one Calculation.
     * @example
     * // Delete one Calculation
     * const Calculation = await prisma.calculation.delete({
     *   where: {
     *     // ... filter to delete one Calculation
     *   }
     * })
     * 
     */
    delete<T extends CalculationDeleteArgs>(args: SelectSubset<T, CalculationDeleteArgs<ExtArgs>>): Prisma__CalculationClient<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Calculation.
     * @param {CalculationUpdateArgs} args - Arguments to update one Calculation.
     * @example
     * // Update one Calculation
     * const calculation = await prisma.calculation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CalculationUpdateArgs>(args: SelectSubset<T, CalculationUpdateArgs<ExtArgs>>): Prisma__CalculationClient<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Calculations.
     * @param {CalculationDeleteManyArgs} args - Arguments to filter Calculations to delete.
     * @example
     * // Delete a few Calculations
     * const { count } = await prisma.calculation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CalculationDeleteManyArgs>(args?: SelectSubset<T, CalculationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Calculations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalculationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Calculations
     * const calculation = await prisma.calculation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CalculationUpdateManyArgs>(args: SelectSubset<T, CalculationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Calculation.
     * @param {CalculationUpsertArgs} args - Arguments to update or create a Calculation.
     * @example
     * // Update or create a Calculation
     * const calculation = await prisma.calculation.upsert({
     *   create: {
     *     // ... data to create a Calculation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Calculation we want to update
     *   }
     * })
     */
    upsert<T extends CalculationUpsertArgs>(args: SelectSubset<T, CalculationUpsertArgs<ExtArgs>>): Prisma__CalculationClient<$Result.GetResult<Prisma.$CalculationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Calculations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalculationCountArgs} args - Arguments to filter Calculations to count.
     * @example
     * // Count the number of Calculations
     * const count = await prisma.calculation.count({
     *   where: {
     *     // ... the filter for the Calculations we want to count
     *   }
     * })
    **/
    count<T extends CalculationCountArgs>(
      args?: Subset<T, CalculationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CalculationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Calculation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalculationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CalculationAggregateArgs>(args: Subset<T, CalculationAggregateArgs>): Prisma.PrismaPromise<GetCalculationAggregateType<T>>

    /**
     * Group by Calculation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalculationGroupByArgs} args - Group by arguments.
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
      T extends CalculationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CalculationGroupByArgs['orderBy'] }
        : { orderBy?: CalculationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CalculationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCalculationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Calculation model
   */
  readonly fields: CalculationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Calculation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CalculationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends MobileUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MobileUserDefaultArgs<ExtArgs>>): Prisma__MobileUserClient<$Result.GetResult<Prisma.$MobileUserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Calculation model
   */ 
  interface CalculationFieldRefs {
    readonly id: FieldRef<"Calculation", 'String'>
    readonly userId: FieldRef<"Calculation", 'String'>
    readonly provider: FieldRef<"Calculation", 'CloudProvider'>
    readonly region: FieldRef<"Calculation", 'String'>
    readonly regionName: FieldRef<"Calculation", 'String'>
    readonly instanceType: FieldRef<"Calculation", 'String'>
    readonly instanceCount: FieldRef<"Calculation", 'Int'>
    readonly hoursPerMonth: FieldRef<"Calculation", 'Int'>
    readonly cpuUtilization: FieldRef<"Calculation", 'Float'>
    readonly storageGB: FieldRef<"Calculation", 'Float'>
    readonly ramGB: FieldRef<"Calculation", 'Float'>
    readonly energyComputeKwh: FieldRef<"Calculation", 'Float'>
    readonly energyMemoryKwh: FieldRef<"Calculation", 'Float'>
    readonly energyStorageKwh: FieldRef<"Calculation", 'Float'>
    readonly energyTotalKwh: FieldRef<"Calculation", 'Float'>
    readonly co2GramsMonth: FieldRef<"Calculation", 'Float'>
    readonly co2KgMonth: FieldRef<"Calculation", 'Float'>
    readonly co2GramsHour: FieldRef<"Calculation", 'Float'>
    readonly gridIntensity: FieldRef<"Calculation", 'Float'>
    readonly gridIntensitySource: FieldRef<"Calculation", 'GridIntensitySource'>
    readonly computePercentage: FieldRef<"Calculation", 'Float'>
    readonly memoryPercentage: FieldRef<"Calculation", 'Float'>
    readonly storagePercentage: FieldRef<"Calculation", 'Float'>
    readonly rating: FieldRef<"Calculation", 'CarbonRating'>
    readonly ratingColor: FieldRef<"Calculation", 'String'>
    readonly realWorldEquivalent: FieldRef<"Calculation", 'String'>
    readonly recommendation: FieldRef<"Calculation", 'String'>
    readonly recommendedRegion: FieldRef<"Calculation", 'String'>
    readonly potentialReductionPct: FieldRef<"Calculation", 'Float'>
    readonly source: FieldRef<"Calculation", 'CalculationSource'>
    readonly apiKeyId: FieldRef<"Calculation", 'String'>
    readonly responseTimeMs: FieldRef<"Calculation", 'Int'>
    readonly sdkVersion: FieldRef<"Calculation", 'String'>
    readonly createdAt: FieldRef<"Calculation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Calculation findUnique
   */
  export type CalculationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalculationInclude<ExtArgs> | null
    /**
     * Filter, which Calculation to fetch.
     */
    where: CalculationWhereUniqueInput
  }

  /**
   * Calculation findUniqueOrThrow
   */
  export type CalculationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalculationInclude<ExtArgs> | null
    /**
     * Filter, which Calculation to fetch.
     */
    where: CalculationWhereUniqueInput
  }

  /**
   * Calculation findFirst
   */
  export type CalculationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalculationInclude<ExtArgs> | null
    /**
     * Filter, which Calculation to fetch.
     */
    where?: CalculationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Calculations to fetch.
     */
    orderBy?: CalculationOrderByWithRelationInput | CalculationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Calculations.
     */
    cursor?: CalculationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Calculations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Calculations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Calculations.
     */
    distinct?: CalculationScalarFieldEnum | CalculationScalarFieldEnum[]
  }

  /**
   * Calculation findFirstOrThrow
   */
  export type CalculationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalculationInclude<ExtArgs> | null
    /**
     * Filter, which Calculation to fetch.
     */
    where?: CalculationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Calculations to fetch.
     */
    orderBy?: CalculationOrderByWithRelationInput | CalculationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Calculations.
     */
    cursor?: CalculationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Calculations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Calculations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Calculations.
     */
    distinct?: CalculationScalarFieldEnum | CalculationScalarFieldEnum[]
  }

  /**
   * Calculation findMany
   */
  export type CalculationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalculationInclude<ExtArgs> | null
    /**
     * Filter, which Calculations to fetch.
     */
    where?: CalculationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Calculations to fetch.
     */
    orderBy?: CalculationOrderByWithRelationInput | CalculationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Calculations.
     */
    cursor?: CalculationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Calculations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Calculations.
     */
    skip?: number
    distinct?: CalculationScalarFieldEnum | CalculationScalarFieldEnum[]
  }

  /**
   * Calculation create
   */
  export type CalculationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalculationInclude<ExtArgs> | null
    /**
     * The data needed to create a Calculation.
     */
    data: XOR<CalculationCreateInput, CalculationUncheckedCreateInput>
  }

  /**
   * Calculation createMany
   */
  export type CalculationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Calculations.
     */
    data: CalculationCreateManyInput | CalculationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Calculation createManyAndReturn
   */
  export type CalculationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Calculations.
     */
    data: CalculationCreateManyInput | CalculationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalculationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Calculation update
   */
  export type CalculationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalculationInclude<ExtArgs> | null
    /**
     * The data needed to update a Calculation.
     */
    data: XOR<CalculationUpdateInput, CalculationUncheckedUpdateInput>
    /**
     * Choose, which Calculation to update.
     */
    where: CalculationWhereUniqueInput
  }

  /**
   * Calculation updateMany
   */
  export type CalculationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Calculations.
     */
    data: XOR<CalculationUpdateManyMutationInput, CalculationUncheckedUpdateManyInput>
    /**
     * Filter which Calculations to update
     */
    where?: CalculationWhereInput
  }

  /**
   * Calculation upsert
   */
  export type CalculationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalculationInclude<ExtArgs> | null
    /**
     * The filter to search for the Calculation to update in case it exists.
     */
    where: CalculationWhereUniqueInput
    /**
     * In case the Calculation found by the `where` argument doesn't exist, create a new Calculation with this data.
     */
    create: XOR<CalculationCreateInput, CalculationUncheckedCreateInput>
    /**
     * In case the Calculation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CalculationUpdateInput, CalculationUncheckedUpdateInput>
  }

  /**
   * Calculation delete
   */
  export type CalculationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalculationInclude<ExtArgs> | null
    /**
     * Filter which Calculation to delete.
     */
    where: CalculationWhereUniqueInput
  }

  /**
   * Calculation deleteMany
   */
  export type CalculationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Calculations to delete
     */
    where?: CalculationWhereInput
  }

  /**
   * Calculation without action
   */
  export type CalculationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Calculation
     */
    select?: CalculationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalculationInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    refreshToken: string | null
    platform: string | null
    osVersion: string | null
    appVersion: string | null
    deviceModel: string | null
    ip: string | null
    isActive: boolean | null
    lastActivityAt: Date | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    refreshToken: string | null
    platform: string | null
    osVersion: string | null
    appVersion: string | null
    deviceModel: string | null
    ip: string | null
    isActive: boolean | null
    lastActivityAt: Date | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    refreshToken: number
    platform: number
    osVersion: number
    appVersion: number
    deviceModel: number
    ip: number
    isActive: number
    lastActivityAt: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    refreshToken?: true
    platform?: true
    osVersion?: true
    appVersion?: true
    deviceModel?: true
    ip?: true
    isActive?: true
    lastActivityAt?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    refreshToken?: true
    platform?: true
    osVersion?: true
    appVersion?: true
    deviceModel?: true
    ip?: true
    isActive?: true
    lastActivityAt?: true
    expiresAt?: true
    createdAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    refreshToken?: true
    platform?: true
    osVersion?: true
    appVersion?: true
    deviceModel?: true
    ip?: true
    isActive?: true
    lastActivityAt?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    refreshToken: string
    platform: string | null
    osVersion: string | null
    appVersion: string | null
    deviceModel: string | null
    ip: string | null
    isActive: boolean
    lastActivityAt: Date
    expiresAt: Date
    createdAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    refreshToken?: boolean
    platform?: boolean
    osVersion?: boolean
    appVersion?: boolean
    deviceModel?: boolean
    ip?: boolean
    isActive?: boolean
    lastActivityAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | MobileUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    refreshToken?: boolean
    platform?: boolean
    osVersion?: boolean
    appVersion?: boolean
    deviceModel?: boolean
    ip?: boolean
    isActive?: boolean
    lastActivityAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    user?: boolean | MobileUserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    refreshToken?: boolean
    platform?: boolean
    osVersion?: boolean
    appVersion?: boolean
    deviceModel?: boolean
    ip?: boolean
    isActive?: boolean
    lastActivityAt?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | MobileUserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | MobileUserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$MobileUserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      refreshToken: string
      platform: string | null
      osVersion: string | null
      appVersion: string | null
      deviceModel: string | null
      ip: string | null
      isActive: boolean
      lastActivityAt: Date
      expiresAt: Date
      createdAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends MobileUserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MobileUserDefaultArgs<ExtArgs>>): Prisma__MobileUserClient<$Result.GetResult<Prisma.$MobileUserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly refreshToken: FieldRef<"Session", 'String'>
    readonly platform: FieldRef<"Session", 'String'>
    readonly osVersion: FieldRef<"Session", 'String'>
    readonly appVersion: FieldRef<"Session", 'String'>
    readonly deviceModel: FieldRef<"Session", 'String'>
    readonly ip: FieldRef<"Session", 'String'>
    readonly isActive: FieldRef<"Session", 'Boolean'>
    readonly lastActivityAt: FieldRef<"Session", 'DateTime'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model ApiKey
   */

  export type AggregateApiKey = {
    _count: ApiKeyCountAggregateOutputType | null
    _avg: ApiKeyAvgAggregateOutputType | null
    _sum: ApiKeySumAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  export type ApiKeyAvgAggregateOutputType = {
    requestsPerMinute: number | null
    requestsPerDay: number | null
    totalRequests: number | null
    todayRequests: number | null
  }

  export type ApiKeySumAggregateOutputType = {
    requestsPerMinute: number | null
    requestsPerDay: number | null
    totalRequests: number | null
    todayRequests: number | null
  }

  export type ApiKeyMinAggregateOutputType = {
    id: string | null
    name: string | null
    prefix: string | null
    hashedKey: string | null
    createdBy: string | null
    requestsPerMinute: number | null
    requestsPerDay: number | null
    totalRequests: number | null
    lastUsedAt: Date | null
    todayRequests: number | null
    todayResetAt: Date | null
    status: $Enums.ApiKeyStatus | null
    revokedAt: Date | null
    revokedBy: string | null
    revokeReason: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApiKeyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    prefix: string | null
    hashedKey: string | null
    createdBy: string | null
    requestsPerMinute: number | null
    requestsPerDay: number | null
    totalRequests: number | null
    lastUsedAt: Date | null
    todayRequests: number | null
    todayResetAt: Date | null
    status: $Enums.ApiKeyStatus | null
    revokedAt: Date | null
    revokedBy: string | null
    revokeReason: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApiKeyCountAggregateOutputType = {
    id: number
    name: number
    prefix: number
    hashedKey: number
    createdBy: number
    permissions: number
    requestsPerMinute: number
    requestsPerDay: number
    totalRequests: number
    lastUsedAt: number
    todayRequests: number
    todayResetAt: number
    status: number
    revokedAt: number
    revokedBy: number
    revokeReason: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ApiKeyAvgAggregateInputType = {
    requestsPerMinute?: true
    requestsPerDay?: true
    totalRequests?: true
    todayRequests?: true
  }

  export type ApiKeySumAggregateInputType = {
    requestsPerMinute?: true
    requestsPerDay?: true
    totalRequests?: true
    todayRequests?: true
  }

  export type ApiKeyMinAggregateInputType = {
    id?: true
    name?: true
    prefix?: true
    hashedKey?: true
    createdBy?: true
    requestsPerMinute?: true
    requestsPerDay?: true
    totalRequests?: true
    lastUsedAt?: true
    todayRequests?: true
    todayResetAt?: true
    status?: true
    revokedAt?: true
    revokedBy?: true
    revokeReason?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApiKeyMaxAggregateInputType = {
    id?: true
    name?: true
    prefix?: true
    hashedKey?: true
    createdBy?: true
    requestsPerMinute?: true
    requestsPerDay?: true
    totalRequests?: true
    lastUsedAt?: true
    todayRequests?: true
    todayResetAt?: true
    status?: true
    revokedAt?: true
    revokedBy?: true
    revokeReason?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApiKeyCountAggregateInputType = {
    id?: true
    name?: true
    prefix?: true
    hashedKey?: true
    createdBy?: true
    permissions?: true
    requestsPerMinute?: true
    requestsPerDay?: true
    totalRequests?: true
    lastUsedAt?: true
    todayRequests?: true
    todayResetAt?: true
    status?: true
    revokedAt?: true
    revokedBy?: true
    revokeReason?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ApiKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKey to aggregate.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiKeys
    **/
    _count?: true | ApiKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApiKeyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApiKeySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiKeyMaxAggregateInputType
  }

  export type GetApiKeyAggregateType<T extends ApiKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateApiKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiKey[P]>
      : GetScalarType<T[P], AggregateApiKey[P]>
  }




  export type ApiKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithAggregationInput | ApiKeyOrderByWithAggregationInput[]
    by: ApiKeyScalarFieldEnum[] | ApiKeyScalarFieldEnum
    having?: ApiKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiKeyCountAggregateInputType | true
    _avg?: ApiKeyAvgAggregateInputType
    _sum?: ApiKeySumAggregateInputType
    _min?: ApiKeyMinAggregateInputType
    _max?: ApiKeyMaxAggregateInputType
  }

  export type ApiKeyGroupByOutputType = {
    id: string
    name: string
    prefix: string
    hashedKey: string
    createdBy: string
    permissions: string[]
    requestsPerMinute: number
    requestsPerDay: number
    totalRequests: number
    lastUsedAt: Date | null
    todayRequests: number
    todayResetAt: Date
    status: $Enums.ApiKeyStatus
    revokedAt: Date | null
    revokedBy: string | null
    revokeReason: string | null
    expiresAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ApiKeyCountAggregateOutputType | null
    _avg: ApiKeyAvgAggregateOutputType | null
    _sum: ApiKeySumAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  type GetApiKeyGroupByPayload<T extends ApiKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
            : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
        }
      >
    >


  export type ApiKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    prefix?: boolean
    hashedKey?: boolean
    createdBy?: boolean
    permissions?: boolean
    requestsPerMinute?: boolean
    requestsPerDay?: boolean
    totalRequests?: boolean
    lastUsedAt?: boolean
    todayRequests?: boolean
    todayResetAt?: boolean
    status?: boolean
    revokedAt?: boolean
    revokedBy?: boolean
    revokeReason?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    prefix?: boolean
    hashedKey?: boolean
    createdBy?: boolean
    permissions?: boolean
    requestsPerMinute?: boolean
    requestsPerDay?: boolean
    totalRequests?: boolean
    lastUsedAt?: boolean
    todayRequests?: boolean
    todayResetAt?: boolean
    status?: boolean
    revokedAt?: boolean
    revokedBy?: boolean
    revokeReason?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectScalar = {
    id?: boolean
    name?: boolean
    prefix?: boolean
    hashedKey?: boolean
    createdBy?: boolean
    permissions?: boolean
    requestsPerMinute?: boolean
    requestsPerDay?: boolean
    totalRequests?: boolean
    lastUsedAt?: boolean
    todayRequests?: boolean
    todayResetAt?: boolean
    status?: boolean
    revokedAt?: boolean
    revokedBy?: boolean
    revokeReason?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $ApiKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiKey"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      prefix: string
      hashedKey: string
      createdBy: string
      permissions: string[]
      requestsPerMinute: number
      requestsPerDay: number
      totalRequests: number
      lastUsedAt: Date | null
      todayRequests: number
      todayResetAt: Date
      status: $Enums.ApiKeyStatus
      revokedAt: Date | null
      revokedBy: string | null
      revokeReason: string | null
      expiresAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["apiKey"]>
    composites: {}
  }

  type ApiKeyGetPayload<S extends boolean | null | undefined | ApiKeyDefaultArgs> = $Result.GetResult<Prisma.$ApiKeyPayload, S>

  type ApiKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ApiKeyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ApiKeyCountAggregateInputType | true
    }

  export interface ApiKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiKey'], meta: { name: 'ApiKey' } }
    /**
     * Find zero or one ApiKey that matches the filter.
     * @param {ApiKeyFindUniqueArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiKeyFindUniqueArgs>(args: SelectSubset<T, ApiKeyFindUniqueArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ApiKey that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ApiKeyFindUniqueOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ApiKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiKeyFindFirstArgs>(args?: SelectSubset<T, ApiKeyFindFirstArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ApiKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ApiKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiKeys
     * const apiKeys = await prisma.apiKey.findMany()
     * 
     * // Get first 10 ApiKeys
     * const apiKeys = await prisma.apiKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiKeyFindManyArgs>(args?: SelectSubset<T, ApiKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ApiKey.
     * @param {ApiKeyCreateArgs} args - Arguments to create a ApiKey.
     * @example
     * // Create one ApiKey
     * const ApiKey = await prisma.apiKey.create({
     *   data: {
     *     // ... data to create a ApiKey
     *   }
     * })
     * 
     */
    create<T extends ApiKeyCreateArgs>(args: SelectSubset<T, ApiKeyCreateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ApiKeys.
     * @param {ApiKeyCreateManyArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiKeyCreateManyArgs>(args?: SelectSubset<T, ApiKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiKeys and returns the data saved in the database.
     * @param {ApiKeyCreateManyAndReturnArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ApiKey.
     * @param {ApiKeyDeleteArgs} args - Arguments to delete one ApiKey.
     * @example
     * // Delete one ApiKey
     * const ApiKey = await prisma.apiKey.delete({
     *   where: {
     *     // ... filter to delete one ApiKey
     *   }
     * })
     * 
     */
    delete<T extends ApiKeyDeleteArgs>(args: SelectSubset<T, ApiKeyDeleteArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ApiKey.
     * @param {ApiKeyUpdateArgs} args - Arguments to update one ApiKey.
     * @example
     * // Update one ApiKey
     * const apiKey = await prisma.apiKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiKeyUpdateArgs>(args: SelectSubset<T, ApiKeyUpdateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ApiKeys.
     * @param {ApiKeyDeleteManyArgs} args - Arguments to filter ApiKeys to delete.
     * @example
     * // Delete a few ApiKeys
     * const { count } = await prisma.apiKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiKeyDeleteManyArgs>(args?: SelectSubset<T, ApiKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiKeyUpdateManyArgs>(args: SelectSubset<T, ApiKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ApiKey.
     * @param {ApiKeyUpsertArgs} args - Arguments to update or create a ApiKey.
     * @example
     * // Update or create a ApiKey
     * const apiKey = await prisma.apiKey.upsert({
     *   create: {
     *     // ... data to create a ApiKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiKey we want to update
     *   }
     * })
     */
    upsert<T extends ApiKeyUpsertArgs>(args: SelectSubset<T, ApiKeyUpsertArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyCountArgs} args - Arguments to filter ApiKeys to count.
     * @example
     * // Count the number of ApiKeys
     * const count = await prisma.apiKey.count({
     *   where: {
     *     // ... the filter for the ApiKeys we want to count
     *   }
     * })
    **/
    count<T extends ApiKeyCountArgs>(
      args?: Subset<T, ApiKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ApiKeyAggregateArgs>(args: Subset<T, ApiKeyAggregateArgs>): Prisma.PrismaPromise<GetApiKeyAggregateType<T>>

    /**
     * Group by ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyGroupByArgs} args - Group by arguments.
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
      T extends ApiKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiKeyGroupByArgs['orderBy'] }
        : { orderBy?: ApiKeyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ApiKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiKey model
   */
  readonly fields: ApiKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the ApiKey model
   */ 
  interface ApiKeyFieldRefs {
    readonly id: FieldRef<"ApiKey", 'String'>
    readonly name: FieldRef<"ApiKey", 'String'>
    readonly prefix: FieldRef<"ApiKey", 'String'>
    readonly hashedKey: FieldRef<"ApiKey", 'String'>
    readonly createdBy: FieldRef<"ApiKey", 'String'>
    readonly permissions: FieldRef<"ApiKey", 'String[]'>
    readonly requestsPerMinute: FieldRef<"ApiKey", 'Int'>
    readonly requestsPerDay: FieldRef<"ApiKey", 'Int'>
    readonly totalRequests: FieldRef<"ApiKey", 'Int'>
    readonly lastUsedAt: FieldRef<"ApiKey", 'DateTime'>
    readonly todayRequests: FieldRef<"ApiKey", 'Int'>
    readonly todayResetAt: FieldRef<"ApiKey", 'DateTime'>
    readonly status: FieldRef<"ApiKey", 'ApiKeyStatus'>
    readonly revokedAt: FieldRef<"ApiKey", 'DateTime'>
    readonly revokedBy: FieldRef<"ApiKey", 'String'>
    readonly revokeReason: FieldRef<"ApiKey", 'String'>
    readonly expiresAt: FieldRef<"ApiKey", 'DateTime'>
    readonly createdAt: FieldRef<"ApiKey", 'DateTime'>
    readonly updatedAt: FieldRef<"ApiKey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApiKey findUnique
   */
  export type ApiKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findUniqueOrThrow
   */
  export type ApiKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findFirst
   */
  export type ApiKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findFirstOrThrow
   */
  export type ApiKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findMany
   */
  export type ApiKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Filter, which ApiKeys to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey create
   */
  export type ApiKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * The data needed to create a ApiKey.
     */
    data: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
  }

  /**
   * ApiKey createMany
   */
  export type ApiKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiKey createManyAndReturn
   */
  export type ApiKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiKey update
   */
  export type ApiKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * The data needed to update a ApiKey.
     */
    data: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
    /**
     * Choose, which ApiKey to update.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey updateMany
   */
  export type ApiKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
  }

  /**
   * ApiKey upsert
   */
  export type ApiKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * The filter to search for the ApiKey to update in case it exists.
     */
    where: ApiKeyWhereUniqueInput
    /**
     * In case the ApiKey found by the `where` argument doesn't exist, create a new ApiKey with this data.
     */
    create: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
    /**
     * In case the ApiKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
  }

  /**
   * ApiKey delete
   */
  export type ApiKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Filter which ApiKey to delete.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey deleteMany
   */
  export type ApiKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKeys to delete
     */
    where?: ApiKeyWhereInput
  }

  /**
   * ApiKey without action
   */
  export type ApiKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
  }


  /**
   * Model FeatureFlag
   */

  export type AggregateFeatureFlag = {
    _count: FeatureFlagCountAggregateOutputType | null
    _avg: FeatureFlagAvgAggregateOutputType | null
    _sum: FeatureFlagSumAggregateOutputType | null
    _min: FeatureFlagMinAggregateOutputType | null
    _max: FeatureFlagMaxAggregateOutputType | null
  }

  export type FeatureFlagAvgAggregateOutputType = {
    toggleCount: number | null
    version: number | null
  }

  export type FeatureFlagSumAggregateOutputType = {
    toggleCount: number | null
    version: number | null
  }

  export type FeatureFlagMinAggregateOutputType = {
    id: string | null
    key: string | null
    displayName: string | null
    description: string | null
    category: $Enums.FlagCategory | null
    enabled: boolean | null
    lastToggledBy: string | null
    lastToggledAt: Date | null
    toggleCount: number | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeatureFlagMaxAggregateOutputType = {
    id: string | null
    key: string | null
    displayName: string | null
    description: string | null
    category: $Enums.FlagCategory | null
    enabled: boolean | null
    lastToggledBy: string | null
    lastToggledAt: Date | null
    toggleCount: number | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FeatureFlagCountAggregateOutputType = {
    id: number
    key: number
    displayName: number
    description: number
    category: number
    enabled: number
    value: number
    lastToggledBy: number
    lastToggledAt: number
    toggleCount: number
    version: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FeatureFlagAvgAggregateInputType = {
    toggleCount?: true
    version?: true
  }

  export type FeatureFlagSumAggregateInputType = {
    toggleCount?: true
    version?: true
  }

  export type FeatureFlagMinAggregateInputType = {
    id?: true
    key?: true
    displayName?: true
    description?: true
    category?: true
    enabled?: true
    lastToggledBy?: true
    lastToggledAt?: true
    toggleCount?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeatureFlagMaxAggregateInputType = {
    id?: true
    key?: true
    displayName?: true
    description?: true
    category?: true
    enabled?: true
    lastToggledBy?: true
    lastToggledAt?: true
    toggleCount?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FeatureFlagCountAggregateInputType = {
    id?: true
    key?: true
    displayName?: true
    description?: true
    category?: true
    enabled?: true
    value?: true
    lastToggledBy?: true
    lastToggledAt?: true
    toggleCount?: true
    version?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FeatureFlagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeatureFlag to aggregate.
     */
    where?: FeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureFlags to fetch.
     */
    orderBy?: FeatureFlagOrderByWithRelationInput | FeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FeatureFlags
    **/
    _count?: true | FeatureFlagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FeatureFlagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FeatureFlagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeatureFlagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeatureFlagMaxAggregateInputType
  }

  export type GetFeatureFlagAggregateType<T extends FeatureFlagAggregateArgs> = {
        [P in keyof T & keyof AggregateFeatureFlag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeatureFlag[P]>
      : GetScalarType<T[P], AggregateFeatureFlag[P]>
  }




  export type FeatureFlagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeatureFlagWhereInput
    orderBy?: FeatureFlagOrderByWithAggregationInput | FeatureFlagOrderByWithAggregationInput[]
    by: FeatureFlagScalarFieldEnum[] | FeatureFlagScalarFieldEnum
    having?: FeatureFlagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeatureFlagCountAggregateInputType | true
    _avg?: FeatureFlagAvgAggregateInputType
    _sum?: FeatureFlagSumAggregateInputType
    _min?: FeatureFlagMinAggregateInputType
    _max?: FeatureFlagMaxAggregateInputType
  }

  export type FeatureFlagGroupByOutputType = {
    id: string
    key: string
    displayName: string
    description: string
    category: $Enums.FlagCategory
    enabled: boolean
    value: JsonValue | null
    lastToggledBy: string | null
    lastToggledAt: Date
    toggleCount: number
    version: number
    createdAt: Date
    updatedAt: Date
    _count: FeatureFlagCountAggregateOutputType | null
    _avg: FeatureFlagAvgAggregateOutputType | null
    _sum: FeatureFlagSumAggregateOutputType | null
    _min: FeatureFlagMinAggregateOutputType | null
    _max: FeatureFlagMaxAggregateOutputType | null
  }

  type GetFeatureFlagGroupByPayload<T extends FeatureFlagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeatureFlagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeatureFlagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeatureFlagGroupByOutputType[P]>
            : GetScalarType<T[P], FeatureFlagGroupByOutputType[P]>
        }
      >
    >


  export type FeatureFlagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    displayName?: boolean
    description?: boolean
    category?: boolean
    enabled?: boolean
    value?: boolean
    lastToggledBy?: boolean
    lastToggledAt?: boolean
    toggleCount?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["featureFlag"]>

  export type FeatureFlagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    displayName?: boolean
    description?: boolean
    category?: boolean
    enabled?: boolean
    value?: boolean
    lastToggledBy?: boolean
    lastToggledAt?: boolean
    toggleCount?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["featureFlag"]>

  export type FeatureFlagSelectScalar = {
    id?: boolean
    key?: boolean
    displayName?: boolean
    description?: boolean
    category?: boolean
    enabled?: boolean
    value?: boolean
    lastToggledBy?: boolean
    lastToggledAt?: boolean
    toggleCount?: boolean
    version?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $FeatureFlagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FeatureFlag"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      displayName: string
      description: string
      category: $Enums.FlagCategory
      enabled: boolean
      value: Prisma.JsonValue | null
      lastToggledBy: string | null
      lastToggledAt: Date
      toggleCount: number
      version: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["featureFlag"]>
    composites: {}
  }

  type FeatureFlagGetPayload<S extends boolean | null | undefined | FeatureFlagDefaultArgs> = $Result.GetResult<Prisma.$FeatureFlagPayload, S>

  type FeatureFlagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FeatureFlagFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FeatureFlagCountAggregateInputType | true
    }

  export interface FeatureFlagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FeatureFlag'], meta: { name: 'FeatureFlag' } }
    /**
     * Find zero or one FeatureFlag that matches the filter.
     * @param {FeatureFlagFindUniqueArgs} args - Arguments to find a FeatureFlag
     * @example
     * // Get one FeatureFlag
     * const featureFlag = await prisma.featureFlag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeatureFlagFindUniqueArgs>(args: SelectSubset<T, FeatureFlagFindUniqueArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FeatureFlag that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FeatureFlagFindUniqueOrThrowArgs} args - Arguments to find a FeatureFlag
     * @example
     * // Get one FeatureFlag
     * const featureFlag = await prisma.featureFlag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeatureFlagFindUniqueOrThrowArgs>(args: SelectSubset<T, FeatureFlagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FeatureFlag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagFindFirstArgs} args - Arguments to find a FeatureFlag
     * @example
     * // Get one FeatureFlag
     * const featureFlag = await prisma.featureFlag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeatureFlagFindFirstArgs>(args?: SelectSubset<T, FeatureFlagFindFirstArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FeatureFlag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagFindFirstOrThrowArgs} args - Arguments to find a FeatureFlag
     * @example
     * // Get one FeatureFlag
     * const featureFlag = await prisma.featureFlag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeatureFlagFindFirstOrThrowArgs>(args?: SelectSubset<T, FeatureFlagFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FeatureFlags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FeatureFlags
     * const featureFlags = await prisma.featureFlag.findMany()
     * 
     * // Get first 10 FeatureFlags
     * const featureFlags = await prisma.featureFlag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const featureFlagWithIdOnly = await prisma.featureFlag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeatureFlagFindManyArgs>(args?: SelectSubset<T, FeatureFlagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FeatureFlag.
     * @param {FeatureFlagCreateArgs} args - Arguments to create a FeatureFlag.
     * @example
     * // Create one FeatureFlag
     * const FeatureFlag = await prisma.featureFlag.create({
     *   data: {
     *     // ... data to create a FeatureFlag
     *   }
     * })
     * 
     */
    create<T extends FeatureFlagCreateArgs>(args: SelectSubset<T, FeatureFlagCreateArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FeatureFlags.
     * @param {FeatureFlagCreateManyArgs} args - Arguments to create many FeatureFlags.
     * @example
     * // Create many FeatureFlags
     * const featureFlag = await prisma.featureFlag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeatureFlagCreateManyArgs>(args?: SelectSubset<T, FeatureFlagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FeatureFlags and returns the data saved in the database.
     * @param {FeatureFlagCreateManyAndReturnArgs} args - Arguments to create many FeatureFlags.
     * @example
     * // Create many FeatureFlags
     * const featureFlag = await prisma.featureFlag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FeatureFlags and only return the `id`
     * const featureFlagWithIdOnly = await prisma.featureFlag.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeatureFlagCreateManyAndReturnArgs>(args?: SelectSubset<T, FeatureFlagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FeatureFlag.
     * @param {FeatureFlagDeleteArgs} args - Arguments to delete one FeatureFlag.
     * @example
     * // Delete one FeatureFlag
     * const FeatureFlag = await prisma.featureFlag.delete({
     *   where: {
     *     // ... filter to delete one FeatureFlag
     *   }
     * })
     * 
     */
    delete<T extends FeatureFlagDeleteArgs>(args: SelectSubset<T, FeatureFlagDeleteArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FeatureFlag.
     * @param {FeatureFlagUpdateArgs} args - Arguments to update one FeatureFlag.
     * @example
     * // Update one FeatureFlag
     * const featureFlag = await prisma.featureFlag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeatureFlagUpdateArgs>(args: SelectSubset<T, FeatureFlagUpdateArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FeatureFlags.
     * @param {FeatureFlagDeleteManyArgs} args - Arguments to filter FeatureFlags to delete.
     * @example
     * // Delete a few FeatureFlags
     * const { count } = await prisma.featureFlag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeatureFlagDeleteManyArgs>(args?: SelectSubset<T, FeatureFlagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeatureFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FeatureFlags
     * const featureFlag = await prisma.featureFlag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeatureFlagUpdateManyArgs>(args: SelectSubset<T, FeatureFlagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FeatureFlag.
     * @param {FeatureFlagUpsertArgs} args - Arguments to update or create a FeatureFlag.
     * @example
     * // Update or create a FeatureFlag
     * const featureFlag = await prisma.featureFlag.upsert({
     *   create: {
     *     // ... data to create a FeatureFlag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FeatureFlag we want to update
     *   }
     * })
     */
    upsert<T extends FeatureFlagUpsertArgs>(args: SelectSubset<T, FeatureFlagUpsertArgs<ExtArgs>>): Prisma__FeatureFlagClient<$Result.GetResult<Prisma.$FeatureFlagPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FeatureFlags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagCountArgs} args - Arguments to filter FeatureFlags to count.
     * @example
     * // Count the number of FeatureFlags
     * const count = await prisma.featureFlag.count({
     *   where: {
     *     // ... the filter for the FeatureFlags we want to count
     *   }
     * })
    **/
    count<T extends FeatureFlagCountArgs>(
      args?: Subset<T, FeatureFlagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeatureFlagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FeatureFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FeatureFlagAggregateArgs>(args: Subset<T, FeatureFlagAggregateArgs>): Prisma.PrismaPromise<GetFeatureFlagAggregateType<T>>

    /**
     * Group by FeatureFlag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFlagGroupByArgs} args - Group by arguments.
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
      T extends FeatureFlagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeatureFlagGroupByArgs['orderBy'] }
        : { orderBy?: FeatureFlagGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FeatureFlagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeatureFlagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FeatureFlag model
   */
  readonly fields: FeatureFlagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FeatureFlag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeatureFlagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the FeatureFlag model
   */ 
  interface FeatureFlagFieldRefs {
    readonly id: FieldRef<"FeatureFlag", 'String'>
    readonly key: FieldRef<"FeatureFlag", 'String'>
    readonly displayName: FieldRef<"FeatureFlag", 'String'>
    readonly description: FieldRef<"FeatureFlag", 'String'>
    readonly category: FieldRef<"FeatureFlag", 'FlagCategory'>
    readonly enabled: FieldRef<"FeatureFlag", 'Boolean'>
    readonly value: FieldRef<"FeatureFlag", 'Json'>
    readonly lastToggledBy: FieldRef<"FeatureFlag", 'String'>
    readonly lastToggledAt: FieldRef<"FeatureFlag", 'DateTime'>
    readonly toggleCount: FieldRef<"FeatureFlag", 'Int'>
    readonly version: FieldRef<"FeatureFlag", 'Int'>
    readonly createdAt: FieldRef<"FeatureFlag", 'DateTime'>
    readonly updatedAt: FieldRef<"FeatureFlag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FeatureFlag findUnique
   */
  export type FeatureFlagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Filter, which FeatureFlag to fetch.
     */
    where: FeatureFlagWhereUniqueInput
  }

  /**
   * FeatureFlag findUniqueOrThrow
   */
  export type FeatureFlagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Filter, which FeatureFlag to fetch.
     */
    where: FeatureFlagWhereUniqueInput
  }

  /**
   * FeatureFlag findFirst
   */
  export type FeatureFlagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Filter, which FeatureFlag to fetch.
     */
    where?: FeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureFlags to fetch.
     */
    orderBy?: FeatureFlagOrderByWithRelationInput | FeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeatureFlags.
     */
    cursor?: FeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeatureFlags.
     */
    distinct?: FeatureFlagScalarFieldEnum | FeatureFlagScalarFieldEnum[]
  }

  /**
   * FeatureFlag findFirstOrThrow
   */
  export type FeatureFlagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Filter, which FeatureFlag to fetch.
     */
    where?: FeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureFlags to fetch.
     */
    orderBy?: FeatureFlagOrderByWithRelationInput | FeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeatureFlags.
     */
    cursor?: FeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureFlags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeatureFlags.
     */
    distinct?: FeatureFlagScalarFieldEnum | FeatureFlagScalarFieldEnum[]
  }

  /**
   * FeatureFlag findMany
   */
  export type FeatureFlagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Filter, which FeatureFlags to fetch.
     */
    where?: FeatureFlagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeatureFlags to fetch.
     */
    orderBy?: FeatureFlagOrderByWithRelationInput | FeatureFlagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FeatureFlags.
     */
    cursor?: FeatureFlagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeatureFlags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeatureFlags.
     */
    skip?: number
    distinct?: FeatureFlagScalarFieldEnum | FeatureFlagScalarFieldEnum[]
  }

  /**
   * FeatureFlag create
   */
  export type FeatureFlagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * The data needed to create a FeatureFlag.
     */
    data: XOR<FeatureFlagCreateInput, FeatureFlagUncheckedCreateInput>
  }

  /**
   * FeatureFlag createMany
   */
  export type FeatureFlagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FeatureFlags.
     */
    data: FeatureFlagCreateManyInput | FeatureFlagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeatureFlag createManyAndReturn
   */
  export type FeatureFlagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FeatureFlags.
     */
    data: FeatureFlagCreateManyInput | FeatureFlagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeatureFlag update
   */
  export type FeatureFlagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * The data needed to update a FeatureFlag.
     */
    data: XOR<FeatureFlagUpdateInput, FeatureFlagUncheckedUpdateInput>
    /**
     * Choose, which FeatureFlag to update.
     */
    where: FeatureFlagWhereUniqueInput
  }

  /**
   * FeatureFlag updateMany
   */
  export type FeatureFlagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FeatureFlags.
     */
    data: XOR<FeatureFlagUpdateManyMutationInput, FeatureFlagUncheckedUpdateManyInput>
    /**
     * Filter which FeatureFlags to update
     */
    where?: FeatureFlagWhereInput
  }

  /**
   * FeatureFlag upsert
   */
  export type FeatureFlagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * The filter to search for the FeatureFlag to update in case it exists.
     */
    where: FeatureFlagWhereUniqueInput
    /**
     * In case the FeatureFlag found by the `where` argument doesn't exist, create a new FeatureFlag with this data.
     */
    create: XOR<FeatureFlagCreateInput, FeatureFlagUncheckedCreateInput>
    /**
     * In case the FeatureFlag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeatureFlagUpdateInput, FeatureFlagUncheckedUpdateInput>
  }

  /**
   * FeatureFlag delete
   */
  export type FeatureFlagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
    /**
     * Filter which FeatureFlag to delete.
     */
    where: FeatureFlagWhereUniqueInput
  }

  /**
   * FeatureFlag deleteMany
   */
  export type FeatureFlagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeatureFlags to delete
     */
    where?: FeatureFlagWhereInput
  }

  /**
   * FeatureFlag without action
   */
  export type FeatureFlagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureFlag
     */
    select?: FeatureFlagSelect<ExtArgs> | null
  }


  /**
   * Model RemoteConfig
   */

  export type AggregateRemoteConfig = {
    _count: RemoteConfigCountAggregateOutputType | null
    _avg: RemoteConfigAvgAggregateOutputType | null
    _sum: RemoteConfigSumAggregateOutputType | null
    _min: RemoteConfigMinAggregateOutputType | null
    _max: RemoteConfigMaxAggregateOutputType | null
  }

  export type RemoteConfigAvgAggregateOutputType = {
    version: number | null
  }

  export type RemoteConfigSumAggregateOutputType = {
    version: number | null
  }

  export type RemoteConfigMinAggregateOutputType = {
    id: string | null
    key: string | null
    displayName: string | null
    category: $Enums.ConfigCategory | null
    valueType: $Enums.ConfigValueType | null
    description: string | null
    lastUpdatedBy: string | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RemoteConfigMaxAggregateOutputType = {
    id: string | null
    key: string | null
    displayName: string | null
    category: $Enums.ConfigCategory | null
    valueType: $Enums.ConfigValueType | null
    description: string | null
    lastUpdatedBy: string | null
    version: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RemoteConfigCountAggregateOutputType = {
    id: number
    key: number
    displayName: number
    category: number
    value: number
    valueType: number
    description: number
    lastUpdatedBy: number
    version: number
    history: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RemoteConfigAvgAggregateInputType = {
    version?: true
  }

  export type RemoteConfigSumAggregateInputType = {
    version?: true
  }

  export type RemoteConfigMinAggregateInputType = {
    id?: true
    key?: true
    displayName?: true
    category?: true
    valueType?: true
    description?: true
    lastUpdatedBy?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RemoteConfigMaxAggregateInputType = {
    id?: true
    key?: true
    displayName?: true
    category?: true
    valueType?: true
    description?: true
    lastUpdatedBy?: true
    version?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RemoteConfigCountAggregateInputType = {
    id?: true
    key?: true
    displayName?: true
    category?: true
    value?: true
    valueType?: true
    description?: true
    lastUpdatedBy?: true
    version?: true
    history?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RemoteConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RemoteConfig to aggregate.
     */
    where?: RemoteConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RemoteConfigs to fetch.
     */
    orderBy?: RemoteConfigOrderByWithRelationInput | RemoteConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RemoteConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RemoteConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RemoteConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RemoteConfigs
    **/
    _count?: true | RemoteConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RemoteConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RemoteConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RemoteConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RemoteConfigMaxAggregateInputType
  }

  export type GetRemoteConfigAggregateType<T extends RemoteConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateRemoteConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRemoteConfig[P]>
      : GetScalarType<T[P], AggregateRemoteConfig[P]>
  }




  export type RemoteConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RemoteConfigWhereInput
    orderBy?: RemoteConfigOrderByWithAggregationInput | RemoteConfigOrderByWithAggregationInput[]
    by: RemoteConfigScalarFieldEnum[] | RemoteConfigScalarFieldEnum
    having?: RemoteConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RemoteConfigCountAggregateInputType | true
    _avg?: RemoteConfigAvgAggregateInputType
    _sum?: RemoteConfigSumAggregateInputType
    _min?: RemoteConfigMinAggregateInputType
    _max?: RemoteConfigMaxAggregateInputType
  }

  export type RemoteConfigGroupByOutputType = {
    id: string
    key: string
    displayName: string
    category: $Enums.ConfigCategory
    value: JsonValue
    valueType: $Enums.ConfigValueType
    description: string
    lastUpdatedBy: string | null
    version: number
    history: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: RemoteConfigCountAggregateOutputType | null
    _avg: RemoteConfigAvgAggregateOutputType | null
    _sum: RemoteConfigSumAggregateOutputType | null
    _min: RemoteConfigMinAggregateOutputType | null
    _max: RemoteConfigMaxAggregateOutputType | null
  }

  type GetRemoteConfigGroupByPayload<T extends RemoteConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RemoteConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RemoteConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RemoteConfigGroupByOutputType[P]>
            : GetScalarType<T[P], RemoteConfigGroupByOutputType[P]>
        }
      >
    >


  export type RemoteConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    displayName?: boolean
    category?: boolean
    value?: boolean
    valueType?: boolean
    description?: boolean
    lastUpdatedBy?: boolean
    version?: boolean
    history?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["remoteConfig"]>

  export type RemoteConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    displayName?: boolean
    category?: boolean
    value?: boolean
    valueType?: boolean
    description?: boolean
    lastUpdatedBy?: boolean
    version?: boolean
    history?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["remoteConfig"]>

  export type RemoteConfigSelectScalar = {
    id?: boolean
    key?: boolean
    displayName?: boolean
    category?: boolean
    value?: boolean
    valueType?: boolean
    description?: boolean
    lastUpdatedBy?: boolean
    version?: boolean
    history?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $RemoteConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RemoteConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      displayName: string
      category: $Enums.ConfigCategory
      value: Prisma.JsonValue
      valueType: $Enums.ConfigValueType
      description: string
      lastUpdatedBy: string | null
      version: number
      history: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["remoteConfig"]>
    composites: {}
  }

  type RemoteConfigGetPayload<S extends boolean | null | undefined | RemoteConfigDefaultArgs> = $Result.GetResult<Prisma.$RemoteConfigPayload, S>

  type RemoteConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RemoteConfigFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RemoteConfigCountAggregateInputType | true
    }

  export interface RemoteConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RemoteConfig'], meta: { name: 'RemoteConfig' } }
    /**
     * Find zero or one RemoteConfig that matches the filter.
     * @param {RemoteConfigFindUniqueArgs} args - Arguments to find a RemoteConfig
     * @example
     * // Get one RemoteConfig
     * const remoteConfig = await prisma.remoteConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RemoteConfigFindUniqueArgs>(args: SelectSubset<T, RemoteConfigFindUniqueArgs<ExtArgs>>): Prisma__RemoteConfigClient<$Result.GetResult<Prisma.$RemoteConfigPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RemoteConfig that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RemoteConfigFindUniqueOrThrowArgs} args - Arguments to find a RemoteConfig
     * @example
     * // Get one RemoteConfig
     * const remoteConfig = await prisma.remoteConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RemoteConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, RemoteConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RemoteConfigClient<$Result.GetResult<Prisma.$RemoteConfigPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RemoteConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RemoteConfigFindFirstArgs} args - Arguments to find a RemoteConfig
     * @example
     * // Get one RemoteConfig
     * const remoteConfig = await prisma.remoteConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RemoteConfigFindFirstArgs>(args?: SelectSubset<T, RemoteConfigFindFirstArgs<ExtArgs>>): Prisma__RemoteConfigClient<$Result.GetResult<Prisma.$RemoteConfigPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RemoteConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RemoteConfigFindFirstOrThrowArgs} args - Arguments to find a RemoteConfig
     * @example
     * // Get one RemoteConfig
     * const remoteConfig = await prisma.remoteConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RemoteConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, RemoteConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__RemoteConfigClient<$Result.GetResult<Prisma.$RemoteConfigPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RemoteConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RemoteConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RemoteConfigs
     * const remoteConfigs = await prisma.remoteConfig.findMany()
     * 
     * // Get first 10 RemoteConfigs
     * const remoteConfigs = await prisma.remoteConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const remoteConfigWithIdOnly = await prisma.remoteConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RemoteConfigFindManyArgs>(args?: SelectSubset<T, RemoteConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RemoteConfigPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RemoteConfig.
     * @param {RemoteConfigCreateArgs} args - Arguments to create a RemoteConfig.
     * @example
     * // Create one RemoteConfig
     * const RemoteConfig = await prisma.remoteConfig.create({
     *   data: {
     *     // ... data to create a RemoteConfig
     *   }
     * })
     * 
     */
    create<T extends RemoteConfigCreateArgs>(args: SelectSubset<T, RemoteConfigCreateArgs<ExtArgs>>): Prisma__RemoteConfigClient<$Result.GetResult<Prisma.$RemoteConfigPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RemoteConfigs.
     * @param {RemoteConfigCreateManyArgs} args - Arguments to create many RemoteConfigs.
     * @example
     * // Create many RemoteConfigs
     * const remoteConfig = await prisma.remoteConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RemoteConfigCreateManyArgs>(args?: SelectSubset<T, RemoteConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RemoteConfigs and returns the data saved in the database.
     * @param {RemoteConfigCreateManyAndReturnArgs} args - Arguments to create many RemoteConfigs.
     * @example
     * // Create many RemoteConfigs
     * const remoteConfig = await prisma.remoteConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RemoteConfigs and only return the `id`
     * const remoteConfigWithIdOnly = await prisma.remoteConfig.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RemoteConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, RemoteConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RemoteConfigPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RemoteConfig.
     * @param {RemoteConfigDeleteArgs} args - Arguments to delete one RemoteConfig.
     * @example
     * // Delete one RemoteConfig
     * const RemoteConfig = await prisma.remoteConfig.delete({
     *   where: {
     *     // ... filter to delete one RemoteConfig
     *   }
     * })
     * 
     */
    delete<T extends RemoteConfigDeleteArgs>(args: SelectSubset<T, RemoteConfigDeleteArgs<ExtArgs>>): Prisma__RemoteConfigClient<$Result.GetResult<Prisma.$RemoteConfigPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RemoteConfig.
     * @param {RemoteConfigUpdateArgs} args - Arguments to update one RemoteConfig.
     * @example
     * // Update one RemoteConfig
     * const remoteConfig = await prisma.remoteConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RemoteConfigUpdateArgs>(args: SelectSubset<T, RemoteConfigUpdateArgs<ExtArgs>>): Prisma__RemoteConfigClient<$Result.GetResult<Prisma.$RemoteConfigPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RemoteConfigs.
     * @param {RemoteConfigDeleteManyArgs} args - Arguments to filter RemoteConfigs to delete.
     * @example
     * // Delete a few RemoteConfigs
     * const { count } = await prisma.remoteConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RemoteConfigDeleteManyArgs>(args?: SelectSubset<T, RemoteConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RemoteConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RemoteConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RemoteConfigs
     * const remoteConfig = await prisma.remoteConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RemoteConfigUpdateManyArgs>(args: SelectSubset<T, RemoteConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RemoteConfig.
     * @param {RemoteConfigUpsertArgs} args - Arguments to update or create a RemoteConfig.
     * @example
     * // Update or create a RemoteConfig
     * const remoteConfig = await prisma.remoteConfig.upsert({
     *   create: {
     *     // ... data to create a RemoteConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RemoteConfig we want to update
     *   }
     * })
     */
    upsert<T extends RemoteConfigUpsertArgs>(args: SelectSubset<T, RemoteConfigUpsertArgs<ExtArgs>>): Prisma__RemoteConfigClient<$Result.GetResult<Prisma.$RemoteConfigPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RemoteConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RemoteConfigCountArgs} args - Arguments to filter RemoteConfigs to count.
     * @example
     * // Count the number of RemoteConfigs
     * const count = await prisma.remoteConfig.count({
     *   where: {
     *     // ... the filter for the RemoteConfigs we want to count
     *   }
     * })
    **/
    count<T extends RemoteConfigCountArgs>(
      args?: Subset<T, RemoteConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RemoteConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RemoteConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RemoteConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RemoteConfigAggregateArgs>(args: Subset<T, RemoteConfigAggregateArgs>): Prisma.PrismaPromise<GetRemoteConfigAggregateType<T>>

    /**
     * Group by RemoteConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RemoteConfigGroupByArgs} args - Group by arguments.
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
      T extends RemoteConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RemoteConfigGroupByArgs['orderBy'] }
        : { orderBy?: RemoteConfigGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RemoteConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRemoteConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RemoteConfig model
   */
  readonly fields: RemoteConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RemoteConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RemoteConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the RemoteConfig model
   */ 
  interface RemoteConfigFieldRefs {
    readonly id: FieldRef<"RemoteConfig", 'String'>
    readonly key: FieldRef<"RemoteConfig", 'String'>
    readonly displayName: FieldRef<"RemoteConfig", 'String'>
    readonly category: FieldRef<"RemoteConfig", 'ConfigCategory'>
    readonly value: FieldRef<"RemoteConfig", 'Json'>
    readonly valueType: FieldRef<"RemoteConfig", 'ConfigValueType'>
    readonly description: FieldRef<"RemoteConfig", 'String'>
    readonly lastUpdatedBy: FieldRef<"RemoteConfig", 'String'>
    readonly version: FieldRef<"RemoteConfig", 'Int'>
    readonly history: FieldRef<"RemoteConfig", 'Json'>
    readonly createdAt: FieldRef<"RemoteConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"RemoteConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RemoteConfig findUnique
   */
  export type RemoteConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RemoteConfig
     */
    select?: RemoteConfigSelect<ExtArgs> | null
    /**
     * Filter, which RemoteConfig to fetch.
     */
    where: RemoteConfigWhereUniqueInput
  }

  /**
   * RemoteConfig findUniqueOrThrow
   */
  export type RemoteConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RemoteConfig
     */
    select?: RemoteConfigSelect<ExtArgs> | null
    /**
     * Filter, which RemoteConfig to fetch.
     */
    where: RemoteConfigWhereUniqueInput
  }

  /**
   * RemoteConfig findFirst
   */
  export type RemoteConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RemoteConfig
     */
    select?: RemoteConfigSelect<ExtArgs> | null
    /**
     * Filter, which RemoteConfig to fetch.
     */
    where?: RemoteConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RemoteConfigs to fetch.
     */
    orderBy?: RemoteConfigOrderByWithRelationInput | RemoteConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RemoteConfigs.
     */
    cursor?: RemoteConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RemoteConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RemoteConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RemoteConfigs.
     */
    distinct?: RemoteConfigScalarFieldEnum | RemoteConfigScalarFieldEnum[]
  }

  /**
   * RemoteConfig findFirstOrThrow
   */
  export type RemoteConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RemoteConfig
     */
    select?: RemoteConfigSelect<ExtArgs> | null
    /**
     * Filter, which RemoteConfig to fetch.
     */
    where?: RemoteConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RemoteConfigs to fetch.
     */
    orderBy?: RemoteConfigOrderByWithRelationInput | RemoteConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RemoteConfigs.
     */
    cursor?: RemoteConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RemoteConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RemoteConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RemoteConfigs.
     */
    distinct?: RemoteConfigScalarFieldEnum | RemoteConfigScalarFieldEnum[]
  }

  /**
   * RemoteConfig findMany
   */
  export type RemoteConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RemoteConfig
     */
    select?: RemoteConfigSelect<ExtArgs> | null
    /**
     * Filter, which RemoteConfigs to fetch.
     */
    where?: RemoteConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RemoteConfigs to fetch.
     */
    orderBy?: RemoteConfigOrderByWithRelationInput | RemoteConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RemoteConfigs.
     */
    cursor?: RemoteConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RemoteConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RemoteConfigs.
     */
    skip?: number
    distinct?: RemoteConfigScalarFieldEnum | RemoteConfigScalarFieldEnum[]
  }

  /**
   * RemoteConfig create
   */
  export type RemoteConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RemoteConfig
     */
    select?: RemoteConfigSelect<ExtArgs> | null
    /**
     * The data needed to create a RemoteConfig.
     */
    data: XOR<RemoteConfigCreateInput, RemoteConfigUncheckedCreateInput>
  }

  /**
   * RemoteConfig createMany
   */
  export type RemoteConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RemoteConfigs.
     */
    data: RemoteConfigCreateManyInput | RemoteConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RemoteConfig createManyAndReturn
   */
  export type RemoteConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RemoteConfig
     */
    select?: RemoteConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RemoteConfigs.
     */
    data: RemoteConfigCreateManyInput | RemoteConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RemoteConfig update
   */
  export type RemoteConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RemoteConfig
     */
    select?: RemoteConfigSelect<ExtArgs> | null
    /**
     * The data needed to update a RemoteConfig.
     */
    data: XOR<RemoteConfigUpdateInput, RemoteConfigUncheckedUpdateInput>
    /**
     * Choose, which RemoteConfig to update.
     */
    where: RemoteConfigWhereUniqueInput
  }

  /**
   * RemoteConfig updateMany
   */
  export type RemoteConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RemoteConfigs.
     */
    data: XOR<RemoteConfigUpdateManyMutationInput, RemoteConfigUncheckedUpdateManyInput>
    /**
     * Filter which RemoteConfigs to update
     */
    where?: RemoteConfigWhereInput
  }

  /**
   * RemoteConfig upsert
   */
  export type RemoteConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RemoteConfig
     */
    select?: RemoteConfigSelect<ExtArgs> | null
    /**
     * The filter to search for the RemoteConfig to update in case it exists.
     */
    where: RemoteConfigWhereUniqueInput
    /**
     * In case the RemoteConfig found by the `where` argument doesn't exist, create a new RemoteConfig with this data.
     */
    create: XOR<RemoteConfigCreateInput, RemoteConfigUncheckedCreateInput>
    /**
     * In case the RemoteConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RemoteConfigUpdateInput, RemoteConfigUncheckedUpdateInput>
  }

  /**
   * RemoteConfig delete
   */
  export type RemoteConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RemoteConfig
     */
    select?: RemoteConfigSelect<ExtArgs> | null
    /**
     * Filter which RemoteConfig to delete.
     */
    where: RemoteConfigWhereUniqueInput
  }

  /**
   * RemoteConfig deleteMany
   */
  export type RemoteConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RemoteConfigs to delete
     */
    where?: RemoteConfigWhereInput
  }

  /**
   * RemoteConfig without action
   */
  export type RemoteConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RemoteConfig
     */
    select?: RemoteConfigSelect<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    actorId: string | null
    actorEmail: string | null
    actorRole: string | null
    action: string | null
    resource: string | null
    resourceId: string | null
    ip: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    actorId: string | null
    actorEmail: string | null
    actorRole: string | null
    action: string | null
    resource: string | null
    resourceId: string | null
    ip: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    actorId: number
    actorEmail: number
    actorRole: number
    action: number
    resource: number
    resourceId: number
    before: number
    after: number
    metadata: number
    ip: number
    userAgent: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    actorId?: true
    actorEmail?: true
    actorRole?: true
    action?: true
    resource?: true
    resourceId?: true
    ip?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    actorId?: true
    actorEmail?: true
    actorRole?: true
    action?: true
    resource?: true
    resourceId?: true
    ip?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    actorId?: true
    actorEmail?: true
    actorRole?: true
    action?: true
    resource?: true
    resourceId?: true
    before?: true
    after?: true
    metadata?: true
    ip?: true
    userAgent?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    actorId: string
    actorEmail: string
    actorRole: string
    action: string
    resource: string
    resourceId: string | null
    before: JsonValue | null
    after: JsonValue | null
    metadata: JsonValue | null
    ip: string
    userAgent: string
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorId?: boolean
    actorEmail?: boolean
    actorRole?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    before?: boolean
    after?: boolean
    metadata?: boolean
    ip?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    actorId?: boolean
    actorEmail?: boolean
    actorRole?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    before?: boolean
    after?: boolean
    metadata?: boolean
    ip?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    actorId?: boolean
    actorEmail?: boolean
    actorRole?: boolean
    action?: boolean
    resource?: boolean
    resourceId?: boolean
    before?: boolean
    after?: boolean
    metadata?: boolean
    ip?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }


  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      actorId: string
      actorEmail: string
      actorRole: string
      action: string
      resource: string
      resourceId: string | null
      before: Prisma.JsonValue | null
      after: Prisma.JsonValue | null
      metadata: Prisma.JsonValue | null
      ip: string
      userAgent: string
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly actorId: FieldRef<"AuditLog", 'String'>
    readonly actorEmail: FieldRef<"AuditLog", 'String'>
    readonly actorRole: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly resource: FieldRef<"AuditLog", 'String'>
    readonly resourceId: FieldRef<"AuditLog", 'String'>
    readonly before: FieldRef<"AuditLog", 'Json'>
    readonly after: FieldRef<"AuditLog", 'Json'>
    readonly metadata: FieldRef<"AuditLog", 'Json'>
    readonly ip: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    totalRecipients: number | null
    delivered: number | null
    opened: number | null
    failed: number | null
  }

  export type NotificationSumAggregateOutputType = {
    totalRecipients: number | null
    delivered: number | null
    opened: number | null
    failed: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    title: string | null
    body: string | null
    type: $Enums.NotificationType | null
    targetAudience: $Enums.TargetAudience | null
    status: $Enums.NotificationStatus | null
    scheduledAt: Date | null
    sentAt: Date | null
    totalRecipients: number | null
    delivered: number | null
    opened: number | null
    failed: number | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    title: string | null
    body: string | null
    type: $Enums.NotificationType | null
    targetAudience: $Enums.TargetAudience | null
    status: $Enums.NotificationStatus | null
    scheduledAt: Date | null
    sentAt: Date | null
    totalRecipients: number | null
    delivered: number | null
    opened: number | null
    failed: number | null
    createdBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    title: number
    body: number
    data: number
    type: number
    targetAudience: number
    targetUserIds: number
    status: number
    scheduledAt: number
    sentAt: number
    totalRecipients: number
    delivered: number
    opened: number
    failed: number
    createdBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    totalRecipients?: true
    delivered?: true
    opened?: true
    failed?: true
  }

  export type NotificationSumAggregateInputType = {
    totalRecipients?: true
    delivered?: true
    opened?: true
    failed?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    title?: true
    body?: true
    type?: true
    targetAudience?: true
    status?: true
    scheduledAt?: true
    sentAt?: true
    totalRecipients?: true
    delivered?: true
    opened?: true
    failed?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    title?: true
    body?: true
    type?: true
    targetAudience?: true
    status?: true
    scheduledAt?: true
    sentAt?: true
    totalRecipients?: true
    delivered?: true
    opened?: true
    failed?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    title?: true
    body?: true
    data?: true
    type?: true
    targetAudience?: true
    targetUserIds?: true
    status?: true
    scheduledAt?: true
    sentAt?: true
    totalRecipients?: true
    delivered?: true
    opened?: true
    failed?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    title: string
    body: string
    data: JsonValue | null
    type: $Enums.NotificationType
    targetAudience: $Enums.TargetAudience
    targetUserIds: string[]
    status: $Enums.NotificationStatus
    scheduledAt: Date | null
    sentAt: Date | null
    totalRecipients: number
    delivered: number
    opened: number
    failed: number
    createdBy: string
    createdAt: Date
    updatedAt: Date
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    body?: boolean
    data?: boolean
    type?: boolean
    targetAudience?: boolean
    targetUserIds?: boolean
    status?: boolean
    scheduledAt?: boolean
    sentAt?: boolean
    totalRecipients?: boolean
    delivered?: boolean
    opened?: boolean
    failed?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    body?: boolean
    data?: boolean
    type?: boolean
    targetAudience?: boolean
    targetUserIds?: boolean
    status?: boolean
    scheduledAt?: boolean
    sentAt?: boolean
    totalRecipients?: boolean
    delivered?: boolean
    opened?: boolean
    failed?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    title?: boolean
    body?: boolean
    data?: boolean
    type?: boolean
    targetAudience?: boolean
    targetUserIds?: boolean
    status?: boolean
    scheduledAt?: boolean
    sentAt?: boolean
    totalRecipients?: boolean
    delivered?: boolean
    opened?: boolean
    failed?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      body: string
      data: Prisma.JsonValue | null
      type: $Enums.NotificationType
      targetAudience: $Enums.TargetAudience
      targetUserIds: string[]
      status: $Enums.NotificationStatus
      scheduledAt: Date | null
      sentAt: Date | null
      totalRecipients: number
      delivered: number
      opened: number
      failed: number
      createdBy: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
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
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly body: FieldRef<"Notification", 'String'>
    readonly data: FieldRef<"Notification", 'Json'>
    readonly type: FieldRef<"Notification", 'NotificationType'>
    readonly targetAudience: FieldRef<"Notification", 'TargetAudience'>
    readonly targetUserIds: FieldRef<"Notification", 'String[]'>
    readonly status: FieldRef<"Notification", 'NotificationStatus'>
    readonly scheduledAt: FieldRef<"Notification", 'DateTime'>
    readonly sentAt: FieldRef<"Notification", 'DateTime'>
    readonly totalRecipients: FieldRef<"Notification", 'Int'>
    readonly delivered: FieldRef<"Notification", 'Int'>
    readonly opened: FieldRef<"Notification", 'Int'>
    readonly failed: FieldRef<"Notification", 'Int'>
    readonly createdBy: FieldRef<"Notification", 'String'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
    readonly updatedAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
  }


  /**
   * Model PushToken
   */

  export type AggregatePushToken = {
    _count: PushTokenCountAggregateOutputType | null
    _min: PushTokenMinAggregateOutputType | null
    _max: PushTokenMaxAggregateOutputType | null
  }

  export type PushTokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    platform: string | null
    isActive: boolean | null
    lastUsedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PushTokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    platform: string | null
    isActive: boolean | null
    lastUsedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PushTokenCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    platform: number
    isActive: number
    lastUsedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PushTokenMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    platform?: true
    isActive?: true
    lastUsedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PushTokenMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    platform?: true
    isActive?: true
    lastUsedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PushTokenCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    platform?: true
    isActive?: true
    lastUsedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PushTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PushToken to aggregate.
     */
    where?: PushTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PushTokens to fetch.
     */
    orderBy?: PushTokenOrderByWithRelationInput | PushTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PushTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PushTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PushTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PushTokens
    **/
    _count?: true | PushTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PushTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PushTokenMaxAggregateInputType
  }

  export type GetPushTokenAggregateType<T extends PushTokenAggregateArgs> = {
        [P in keyof T & keyof AggregatePushToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePushToken[P]>
      : GetScalarType<T[P], AggregatePushToken[P]>
  }




  export type PushTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PushTokenWhereInput
    orderBy?: PushTokenOrderByWithAggregationInput | PushTokenOrderByWithAggregationInput[]
    by: PushTokenScalarFieldEnum[] | PushTokenScalarFieldEnum
    having?: PushTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PushTokenCountAggregateInputType | true
    _min?: PushTokenMinAggregateInputType
    _max?: PushTokenMaxAggregateInputType
  }

  export type PushTokenGroupByOutputType = {
    id: string
    userId: string
    token: string
    platform: string
    isActive: boolean
    lastUsedAt: Date
    createdAt: Date
    updatedAt: Date
    _count: PushTokenCountAggregateOutputType | null
    _min: PushTokenMinAggregateOutputType | null
    _max: PushTokenMaxAggregateOutputType | null
  }

  type GetPushTokenGroupByPayload<T extends PushTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PushTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PushTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PushTokenGroupByOutputType[P]>
            : GetScalarType<T[P], PushTokenGroupByOutputType[P]>
        }
      >
    >


  export type PushTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    platform?: boolean
    isActive?: boolean
    lastUsedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pushToken"]>

  export type PushTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    platform?: boolean
    isActive?: boolean
    lastUsedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pushToken"]>

  export type PushTokenSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    platform?: boolean
    isActive?: boolean
    lastUsedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $PushTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PushToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      platform: string
      isActive: boolean
      lastUsedAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pushToken"]>
    composites: {}
  }

  type PushTokenGetPayload<S extends boolean | null | undefined | PushTokenDefaultArgs> = $Result.GetResult<Prisma.$PushTokenPayload, S>

  type PushTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PushTokenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PushTokenCountAggregateInputType | true
    }

  export interface PushTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PushToken'], meta: { name: 'PushToken' } }
    /**
     * Find zero or one PushToken that matches the filter.
     * @param {PushTokenFindUniqueArgs} args - Arguments to find a PushToken
     * @example
     * // Get one PushToken
     * const pushToken = await prisma.pushToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PushTokenFindUniqueArgs>(args: SelectSubset<T, PushTokenFindUniqueArgs<ExtArgs>>): Prisma__PushTokenClient<$Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PushToken that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PushTokenFindUniqueOrThrowArgs} args - Arguments to find a PushToken
     * @example
     * // Get one PushToken
     * const pushToken = await prisma.pushToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PushTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, PushTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PushTokenClient<$Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PushToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PushTokenFindFirstArgs} args - Arguments to find a PushToken
     * @example
     * // Get one PushToken
     * const pushToken = await prisma.pushToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PushTokenFindFirstArgs>(args?: SelectSubset<T, PushTokenFindFirstArgs<ExtArgs>>): Prisma__PushTokenClient<$Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PushToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PushTokenFindFirstOrThrowArgs} args - Arguments to find a PushToken
     * @example
     * // Get one PushToken
     * const pushToken = await prisma.pushToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PushTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, PushTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__PushTokenClient<$Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PushTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PushTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PushTokens
     * const pushTokens = await prisma.pushToken.findMany()
     * 
     * // Get first 10 PushTokens
     * const pushTokens = await prisma.pushToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pushTokenWithIdOnly = await prisma.pushToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PushTokenFindManyArgs>(args?: SelectSubset<T, PushTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PushToken.
     * @param {PushTokenCreateArgs} args - Arguments to create a PushToken.
     * @example
     * // Create one PushToken
     * const PushToken = await prisma.pushToken.create({
     *   data: {
     *     // ... data to create a PushToken
     *   }
     * })
     * 
     */
    create<T extends PushTokenCreateArgs>(args: SelectSubset<T, PushTokenCreateArgs<ExtArgs>>): Prisma__PushTokenClient<$Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PushTokens.
     * @param {PushTokenCreateManyArgs} args - Arguments to create many PushTokens.
     * @example
     * // Create many PushTokens
     * const pushToken = await prisma.pushToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PushTokenCreateManyArgs>(args?: SelectSubset<T, PushTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PushTokens and returns the data saved in the database.
     * @param {PushTokenCreateManyAndReturnArgs} args - Arguments to create many PushTokens.
     * @example
     * // Create many PushTokens
     * const pushToken = await prisma.pushToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PushTokens and only return the `id`
     * const pushTokenWithIdOnly = await prisma.pushToken.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PushTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, PushTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PushToken.
     * @param {PushTokenDeleteArgs} args - Arguments to delete one PushToken.
     * @example
     * // Delete one PushToken
     * const PushToken = await prisma.pushToken.delete({
     *   where: {
     *     // ... filter to delete one PushToken
     *   }
     * })
     * 
     */
    delete<T extends PushTokenDeleteArgs>(args: SelectSubset<T, PushTokenDeleteArgs<ExtArgs>>): Prisma__PushTokenClient<$Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PushToken.
     * @param {PushTokenUpdateArgs} args - Arguments to update one PushToken.
     * @example
     * // Update one PushToken
     * const pushToken = await prisma.pushToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PushTokenUpdateArgs>(args: SelectSubset<T, PushTokenUpdateArgs<ExtArgs>>): Prisma__PushTokenClient<$Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PushTokens.
     * @param {PushTokenDeleteManyArgs} args - Arguments to filter PushTokens to delete.
     * @example
     * // Delete a few PushTokens
     * const { count } = await prisma.pushToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PushTokenDeleteManyArgs>(args?: SelectSubset<T, PushTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PushTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PushTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PushTokens
     * const pushToken = await prisma.pushToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PushTokenUpdateManyArgs>(args: SelectSubset<T, PushTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PushToken.
     * @param {PushTokenUpsertArgs} args - Arguments to update or create a PushToken.
     * @example
     * // Update or create a PushToken
     * const pushToken = await prisma.pushToken.upsert({
     *   create: {
     *     // ... data to create a PushToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PushToken we want to update
     *   }
     * })
     */
    upsert<T extends PushTokenUpsertArgs>(args: SelectSubset<T, PushTokenUpsertArgs<ExtArgs>>): Prisma__PushTokenClient<$Result.GetResult<Prisma.$PushTokenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PushTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PushTokenCountArgs} args - Arguments to filter PushTokens to count.
     * @example
     * // Count the number of PushTokens
     * const count = await prisma.pushToken.count({
     *   where: {
     *     // ... the filter for the PushTokens we want to count
     *   }
     * })
    **/
    count<T extends PushTokenCountArgs>(
      args?: Subset<T, PushTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PushTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PushToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PushTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PushTokenAggregateArgs>(args: Subset<T, PushTokenAggregateArgs>): Prisma.PrismaPromise<GetPushTokenAggregateType<T>>

    /**
     * Group by PushToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PushTokenGroupByArgs} args - Group by arguments.
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
      T extends PushTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PushTokenGroupByArgs['orderBy'] }
        : { orderBy?: PushTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PushTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPushTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PushToken model
   */
  readonly fields: PushTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PushToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PushTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PushToken model
   */ 
  interface PushTokenFieldRefs {
    readonly id: FieldRef<"PushToken", 'String'>
    readonly userId: FieldRef<"PushToken", 'String'>
    readonly token: FieldRef<"PushToken", 'String'>
    readonly platform: FieldRef<"PushToken", 'String'>
    readonly isActive: FieldRef<"PushToken", 'Boolean'>
    readonly lastUsedAt: FieldRef<"PushToken", 'DateTime'>
    readonly createdAt: FieldRef<"PushToken", 'DateTime'>
    readonly updatedAt: FieldRef<"PushToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PushToken findUnique
   */
  export type PushTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushToken
     */
    select?: PushTokenSelect<ExtArgs> | null
    /**
     * Filter, which PushToken to fetch.
     */
    where: PushTokenWhereUniqueInput
  }

  /**
   * PushToken findUniqueOrThrow
   */
  export type PushTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushToken
     */
    select?: PushTokenSelect<ExtArgs> | null
    /**
     * Filter, which PushToken to fetch.
     */
    where: PushTokenWhereUniqueInput
  }

  /**
   * PushToken findFirst
   */
  export type PushTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushToken
     */
    select?: PushTokenSelect<ExtArgs> | null
    /**
     * Filter, which PushToken to fetch.
     */
    where?: PushTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PushTokens to fetch.
     */
    orderBy?: PushTokenOrderByWithRelationInput | PushTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PushTokens.
     */
    cursor?: PushTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PushTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PushTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PushTokens.
     */
    distinct?: PushTokenScalarFieldEnum | PushTokenScalarFieldEnum[]
  }

  /**
   * PushToken findFirstOrThrow
   */
  export type PushTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushToken
     */
    select?: PushTokenSelect<ExtArgs> | null
    /**
     * Filter, which PushToken to fetch.
     */
    where?: PushTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PushTokens to fetch.
     */
    orderBy?: PushTokenOrderByWithRelationInput | PushTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PushTokens.
     */
    cursor?: PushTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PushTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PushTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PushTokens.
     */
    distinct?: PushTokenScalarFieldEnum | PushTokenScalarFieldEnum[]
  }

  /**
   * PushToken findMany
   */
  export type PushTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushToken
     */
    select?: PushTokenSelect<ExtArgs> | null
    /**
     * Filter, which PushTokens to fetch.
     */
    where?: PushTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PushTokens to fetch.
     */
    orderBy?: PushTokenOrderByWithRelationInput | PushTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PushTokens.
     */
    cursor?: PushTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PushTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PushTokens.
     */
    skip?: number
    distinct?: PushTokenScalarFieldEnum | PushTokenScalarFieldEnum[]
  }

  /**
   * PushToken create
   */
  export type PushTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushToken
     */
    select?: PushTokenSelect<ExtArgs> | null
    /**
     * The data needed to create a PushToken.
     */
    data: XOR<PushTokenCreateInput, PushTokenUncheckedCreateInput>
  }

  /**
   * PushToken createMany
   */
  export type PushTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PushTokens.
     */
    data: PushTokenCreateManyInput | PushTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PushToken createManyAndReturn
   */
  export type PushTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushToken
     */
    select?: PushTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PushTokens.
     */
    data: PushTokenCreateManyInput | PushTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PushToken update
   */
  export type PushTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushToken
     */
    select?: PushTokenSelect<ExtArgs> | null
    /**
     * The data needed to update a PushToken.
     */
    data: XOR<PushTokenUpdateInput, PushTokenUncheckedUpdateInput>
    /**
     * Choose, which PushToken to update.
     */
    where: PushTokenWhereUniqueInput
  }

  /**
   * PushToken updateMany
   */
  export type PushTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PushTokens.
     */
    data: XOR<PushTokenUpdateManyMutationInput, PushTokenUncheckedUpdateManyInput>
    /**
     * Filter which PushTokens to update
     */
    where?: PushTokenWhereInput
  }

  /**
   * PushToken upsert
   */
  export type PushTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushToken
     */
    select?: PushTokenSelect<ExtArgs> | null
    /**
     * The filter to search for the PushToken to update in case it exists.
     */
    where: PushTokenWhereUniqueInput
    /**
     * In case the PushToken found by the `where` argument doesn't exist, create a new PushToken with this data.
     */
    create: XOR<PushTokenCreateInput, PushTokenUncheckedCreateInput>
    /**
     * In case the PushToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PushTokenUpdateInput, PushTokenUncheckedUpdateInput>
  }

  /**
   * PushToken delete
   */
  export type PushTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushToken
     */
    select?: PushTokenSelect<ExtArgs> | null
    /**
     * Filter which PushToken to delete.
     */
    where: PushTokenWhereUniqueInput
  }

  /**
   * PushToken deleteMany
   */
  export type PushTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PushTokens to delete
     */
    where?: PushTokenWhereInput
  }

  /**
   * PushToken without action
   */
  export type PushTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PushToken
     */
    select?: PushTokenSelect<ExtArgs> | null
  }


  /**
   * Model Region
   */

  export type AggregateRegion = {
    _count: RegionCountAggregateOutputType | null
    _avg: RegionAvgAggregateOutputType | null
    _sum: RegionSumAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  export type RegionAvgAggregateOutputType = {
    gridIntensity: number | null
    renewablePercentage: number | null
    pue: number | null
    lat: number | null
    lng: number | null
  }

  export type RegionSumAggregateOutputType = {
    gridIntensity: number | null
    renewablePercentage: number | null
    pue: number | null
    lat: number | null
    lng: number | null
  }

  export type RegionMinAggregateOutputType = {
    id: string | null
    provider: $Enums.CloudProvider | null
    code: string | null
    name: string | null
    country: string | null
    continent: string | null
    gridIntensity: number | null
    gridIntensitySource: string | null
    renewablePercentage: number | null
    pue: number | null
    lat: number | null
    lng: number | null
    isPopular: boolean | null
  }

  export type RegionMaxAggregateOutputType = {
    id: string | null
    provider: $Enums.CloudProvider | null
    code: string | null
    name: string | null
    country: string | null
    continent: string | null
    gridIntensity: number | null
    gridIntensitySource: string | null
    renewablePercentage: number | null
    pue: number | null
    lat: number | null
    lng: number | null
    isPopular: boolean | null
  }

  export type RegionCountAggregateOutputType = {
    id: number
    provider: number
    code: number
    name: number
    country: number
    continent: number
    gridIntensity: number
    gridIntensitySource: number
    renewablePercentage: number
    pue: number
    lat: number
    lng: number
    availableInstanceFamilies: number
    isPopular: number
    _all: number
  }


  export type RegionAvgAggregateInputType = {
    gridIntensity?: true
    renewablePercentage?: true
    pue?: true
    lat?: true
    lng?: true
  }

  export type RegionSumAggregateInputType = {
    gridIntensity?: true
    renewablePercentage?: true
    pue?: true
    lat?: true
    lng?: true
  }

  export type RegionMinAggregateInputType = {
    id?: true
    provider?: true
    code?: true
    name?: true
    country?: true
    continent?: true
    gridIntensity?: true
    gridIntensitySource?: true
    renewablePercentage?: true
    pue?: true
    lat?: true
    lng?: true
    isPopular?: true
  }

  export type RegionMaxAggregateInputType = {
    id?: true
    provider?: true
    code?: true
    name?: true
    country?: true
    continent?: true
    gridIntensity?: true
    gridIntensitySource?: true
    renewablePercentage?: true
    pue?: true
    lat?: true
    lng?: true
    isPopular?: true
  }

  export type RegionCountAggregateInputType = {
    id?: true
    provider?: true
    code?: true
    name?: true
    country?: true
    continent?: true
    gridIntensity?: true
    gridIntensitySource?: true
    renewablePercentage?: true
    pue?: true
    lat?: true
    lng?: true
    availableInstanceFamilies?: true
    isPopular?: true
    _all?: true
  }

  export type RegionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Region to aggregate.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Regions
    **/
    _count?: true | RegionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RegionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RegionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegionMaxAggregateInputType
  }

  export type GetRegionAggregateType<T extends RegionAggregateArgs> = {
        [P in keyof T & keyof AggregateRegion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegion[P]>
      : GetScalarType<T[P], AggregateRegion[P]>
  }




  export type RegionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegionWhereInput
    orderBy?: RegionOrderByWithAggregationInput | RegionOrderByWithAggregationInput[]
    by: RegionScalarFieldEnum[] | RegionScalarFieldEnum
    having?: RegionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegionCountAggregateInputType | true
    _avg?: RegionAvgAggregateInputType
    _sum?: RegionSumAggregateInputType
    _min?: RegionMinAggregateInputType
    _max?: RegionMaxAggregateInputType
  }

  export type RegionGroupByOutputType = {
    id: string
    provider: $Enums.CloudProvider
    code: string
    name: string
    country: string
    continent: string
    gridIntensity: number
    gridIntensitySource: string
    renewablePercentage: number | null
    pue: number
    lat: number
    lng: number
    availableInstanceFamilies: string[]
    isPopular: boolean
    _count: RegionCountAggregateOutputType | null
    _avg: RegionAvgAggregateOutputType | null
    _sum: RegionSumAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  type GetRegionGroupByPayload<T extends RegionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegionGroupByOutputType[P]>
            : GetScalarType<T[P], RegionGroupByOutputType[P]>
        }
      >
    >


  export type RegionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    code?: boolean
    name?: boolean
    country?: boolean
    continent?: boolean
    gridIntensity?: boolean
    gridIntensitySource?: boolean
    renewablePercentage?: boolean
    pue?: boolean
    lat?: boolean
    lng?: boolean
    availableInstanceFamilies?: boolean
    isPopular?: boolean
  }, ExtArgs["result"]["region"]>

  export type RegionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    code?: boolean
    name?: boolean
    country?: boolean
    continent?: boolean
    gridIntensity?: boolean
    gridIntensitySource?: boolean
    renewablePercentage?: boolean
    pue?: boolean
    lat?: boolean
    lng?: boolean
    availableInstanceFamilies?: boolean
    isPopular?: boolean
  }, ExtArgs["result"]["region"]>

  export type RegionSelectScalar = {
    id?: boolean
    provider?: boolean
    code?: boolean
    name?: boolean
    country?: boolean
    continent?: boolean
    gridIntensity?: boolean
    gridIntensitySource?: boolean
    renewablePercentage?: boolean
    pue?: boolean
    lat?: boolean
    lng?: boolean
    availableInstanceFamilies?: boolean
    isPopular?: boolean
  }


  export type $RegionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Region"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: $Enums.CloudProvider
      code: string
      name: string
      country: string
      continent: string
      gridIntensity: number
      gridIntensitySource: string
      renewablePercentage: number | null
      pue: number
      lat: number
      lng: number
      availableInstanceFamilies: string[]
      isPopular: boolean
    }, ExtArgs["result"]["region"]>
    composites: {}
  }

  type RegionGetPayload<S extends boolean | null | undefined | RegionDefaultArgs> = $Result.GetResult<Prisma.$RegionPayload, S>

  type RegionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RegionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RegionCountAggregateInputType | true
    }

  export interface RegionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Region'], meta: { name: 'Region' } }
    /**
     * Find zero or one Region that matches the filter.
     * @param {RegionFindUniqueArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegionFindUniqueArgs>(args: SelectSubset<T, RegionFindUniqueArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Region that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RegionFindUniqueOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegionFindUniqueOrThrowArgs>(args: SelectSubset<T, RegionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Region that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegionFindFirstArgs>(args?: SelectSubset<T, RegionFindFirstArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Region that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegionFindFirstOrThrowArgs>(args?: SelectSubset<T, RegionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Regions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Regions
     * const regions = await prisma.region.findMany()
     * 
     * // Get first 10 Regions
     * const regions = await prisma.region.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const regionWithIdOnly = await prisma.region.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegionFindManyArgs>(args?: SelectSubset<T, RegionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Region.
     * @param {RegionCreateArgs} args - Arguments to create a Region.
     * @example
     * // Create one Region
     * const Region = await prisma.region.create({
     *   data: {
     *     // ... data to create a Region
     *   }
     * })
     * 
     */
    create<T extends RegionCreateArgs>(args: SelectSubset<T, RegionCreateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Regions.
     * @param {RegionCreateManyArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegionCreateManyArgs>(args?: SelectSubset<T, RegionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Regions and returns the data saved in the database.
     * @param {RegionCreateManyAndReturnArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Regions and only return the `id`
     * const regionWithIdOnly = await prisma.region.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegionCreateManyAndReturnArgs>(args?: SelectSubset<T, RegionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Region.
     * @param {RegionDeleteArgs} args - Arguments to delete one Region.
     * @example
     * // Delete one Region
     * const Region = await prisma.region.delete({
     *   where: {
     *     // ... filter to delete one Region
     *   }
     * })
     * 
     */
    delete<T extends RegionDeleteArgs>(args: SelectSubset<T, RegionDeleteArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Region.
     * @param {RegionUpdateArgs} args - Arguments to update one Region.
     * @example
     * // Update one Region
     * const region = await prisma.region.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegionUpdateArgs>(args: SelectSubset<T, RegionUpdateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Regions.
     * @param {RegionDeleteManyArgs} args - Arguments to filter Regions to delete.
     * @example
     * // Delete a few Regions
     * const { count } = await prisma.region.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegionDeleteManyArgs>(args?: SelectSubset<T, RegionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Regions
     * const region = await prisma.region.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegionUpdateManyArgs>(args: SelectSubset<T, RegionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Region.
     * @param {RegionUpsertArgs} args - Arguments to update or create a Region.
     * @example
     * // Update or create a Region
     * const region = await prisma.region.upsert({
     *   create: {
     *     // ... data to create a Region
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Region we want to update
     *   }
     * })
     */
    upsert<T extends RegionUpsertArgs>(args: SelectSubset<T, RegionUpsertArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionCountArgs} args - Arguments to filter Regions to count.
     * @example
     * // Count the number of Regions
     * const count = await prisma.region.count({
     *   where: {
     *     // ... the filter for the Regions we want to count
     *   }
     * })
    **/
    count<T extends RegionCountArgs>(
      args?: Subset<T, RegionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RegionAggregateArgs>(args: Subset<T, RegionAggregateArgs>): Prisma.PrismaPromise<GetRegionAggregateType<T>>

    /**
     * Group by Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionGroupByArgs} args - Group by arguments.
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
      T extends RegionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegionGroupByArgs['orderBy'] }
        : { orderBy?: RegionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RegionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Region model
   */
  readonly fields: RegionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Region.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Region model
   */ 
  interface RegionFieldRefs {
    readonly id: FieldRef<"Region", 'String'>
    readonly provider: FieldRef<"Region", 'CloudProvider'>
    readonly code: FieldRef<"Region", 'String'>
    readonly name: FieldRef<"Region", 'String'>
    readonly country: FieldRef<"Region", 'String'>
    readonly continent: FieldRef<"Region", 'String'>
    readonly gridIntensity: FieldRef<"Region", 'Float'>
    readonly gridIntensitySource: FieldRef<"Region", 'String'>
    readonly renewablePercentage: FieldRef<"Region", 'Float'>
    readonly pue: FieldRef<"Region", 'Float'>
    readonly lat: FieldRef<"Region", 'Float'>
    readonly lng: FieldRef<"Region", 'Float'>
    readonly availableInstanceFamilies: FieldRef<"Region", 'String[]'>
    readonly isPopular: FieldRef<"Region", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Region findUnique
   */
  export type RegionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findUniqueOrThrow
   */
  export type RegionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findFirst
   */
  export type RegionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findFirstOrThrow
   */
  export type RegionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findMany
   */
  export type RegionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Filter, which Regions to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region create
   */
  export type RegionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * The data needed to create a Region.
     */
    data: XOR<RegionCreateInput, RegionUncheckedCreateInput>
  }

  /**
   * Region createMany
   */
  export type RegionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Region createManyAndReturn
   */
  export type RegionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Region update
   */
  export type RegionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * The data needed to update a Region.
     */
    data: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
    /**
     * Choose, which Region to update.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region updateMany
   */
  export type RegionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Regions.
     */
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyInput>
    /**
     * Filter which Regions to update
     */
    where?: RegionWhereInput
  }

  /**
   * Region upsert
   */
  export type RegionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * The filter to search for the Region to update in case it exists.
     */
    where: RegionWhereUniqueInput
    /**
     * In case the Region found by the `where` argument doesn't exist, create a new Region with this data.
     */
    create: XOR<RegionCreateInput, RegionUncheckedCreateInput>
    /**
     * In case the Region was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
  }

  /**
   * Region delete
   */
  export type RegionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Filter which Region to delete.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region deleteMany
   */
  export type RegionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Regions to delete
     */
    where?: RegionWhereInput
  }

  /**
   * Region without action
   */
  export type RegionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
  }


  /**
   * Model InstanceType
   */

  export type AggregateInstanceType = {
    _count: InstanceTypeCountAggregateOutputType | null
    _avg: InstanceTypeAvgAggregateOutputType | null
    _sum: InstanceTypeSumAggregateOutputType | null
    _min: InstanceTypeMinAggregateOutputType | null
    _max: InstanceTypeMaxAggregateOutputType | null
  }

  export type InstanceTypeAvgAggregateOutputType = {
    vCPUs: number | null
    memoryGB: number | null
    cpuTdpWatts: number | null
    onDemandHourlyUsd: number | null
  }

  export type InstanceTypeSumAggregateOutputType = {
    vCPUs: number | null
    memoryGB: number | null
    cpuTdpWatts: number | null
    onDemandHourlyUsd: number | null
  }

  export type InstanceTypeMinAggregateOutputType = {
    id: string | null
    provider: $Enums.CloudProvider | null
    name: string | null
    displayName: string | null
    family: string | null
    category: $Enums.InstanceCategory | null
    vCPUs: number | null
    memoryGB: number | null
    cpuTdpWatts: number | null
    storageType: $Enums.StorageType | null
    onDemandHourlyUsd: number | null
    isPopular: boolean | null
  }

  export type InstanceTypeMaxAggregateOutputType = {
    id: string | null
    provider: $Enums.CloudProvider | null
    name: string | null
    displayName: string | null
    family: string | null
    category: $Enums.InstanceCategory | null
    vCPUs: number | null
    memoryGB: number | null
    cpuTdpWatts: number | null
    storageType: $Enums.StorageType | null
    onDemandHourlyUsd: number | null
    isPopular: boolean | null
  }

  export type InstanceTypeCountAggregateOutputType = {
    id: number
    provider: number
    name: number
    displayName: number
    family: number
    category: number
    vCPUs: number
    memoryGB: number
    cpuTdpWatts: number
    storageType: number
    onDemandHourlyUsd: number
    isPopular: number
    _all: number
  }


  export type InstanceTypeAvgAggregateInputType = {
    vCPUs?: true
    memoryGB?: true
    cpuTdpWatts?: true
    onDemandHourlyUsd?: true
  }

  export type InstanceTypeSumAggregateInputType = {
    vCPUs?: true
    memoryGB?: true
    cpuTdpWatts?: true
    onDemandHourlyUsd?: true
  }

  export type InstanceTypeMinAggregateInputType = {
    id?: true
    provider?: true
    name?: true
    displayName?: true
    family?: true
    category?: true
    vCPUs?: true
    memoryGB?: true
    cpuTdpWatts?: true
    storageType?: true
    onDemandHourlyUsd?: true
    isPopular?: true
  }

  export type InstanceTypeMaxAggregateInputType = {
    id?: true
    provider?: true
    name?: true
    displayName?: true
    family?: true
    category?: true
    vCPUs?: true
    memoryGB?: true
    cpuTdpWatts?: true
    storageType?: true
    onDemandHourlyUsd?: true
    isPopular?: true
  }

  export type InstanceTypeCountAggregateInputType = {
    id?: true
    provider?: true
    name?: true
    displayName?: true
    family?: true
    category?: true
    vCPUs?: true
    memoryGB?: true
    cpuTdpWatts?: true
    storageType?: true
    onDemandHourlyUsd?: true
    isPopular?: true
    _all?: true
  }

  export type InstanceTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InstanceType to aggregate.
     */
    where?: InstanceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstanceTypes to fetch.
     */
    orderBy?: InstanceTypeOrderByWithRelationInput | InstanceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InstanceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstanceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstanceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InstanceTypes
    **/
    _count?: true | InstanceTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InstanceTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InstanceTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstanceTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstanceTypeMaxAggregateInputType
  }

  export type GetInstanceTypeAggregateType<T extends InstanceTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateInstanceType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstanceType[P]>
      : GetScalarType<T[P], AggregateInstanceType[P]>
  }




  export type InstanceTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstanceTypeWhereInput
    orderBy?: InstanceTypeOrderByWithAggregationInput | InstanceTypeOrderByWithAggregationInput[]
    by: InstanceTypeScalarFieldEnum[] | InstanceTypeScalarFieldEnum
    having?: InstanceTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstanceTypeCountAggregateInputType | true
    _avg?: InstanceTypeAvgAggregateInputType
    _sum?: InstanceTypeSumAggregateInputType
    _min?: InstanceTypeMinAggregateInputType
    _max?: InstanceTypeMaxAggregateInputType
  }

  export type InstanceTypeGroupByOutputType = {
    id: string
    provider: $Enums.CloudProvider
    name: string
    displayName: string
    family: string
    category: $Enums.InstanceCategory
    vCPUs: number
    memoryGB: number
    cpuTdpWatts: number
    storageType: $Enums.StorageType
    onDemandHourlyUsd: number | null
    isPopular: boolean
    _count: InstanceTypeCountAggregateOutputType | null
    _avg: InstanceTypeAvgAggregateOutputType | null
    _sum: InstanceTypeSumAggregateOutputType | null
    _min: InstanceTypeMinAggregateOutputType | null
    _max: InstanceTypeMaxAggregateOutputType | null
  }

  type GetInstanceTypeGroupByPayload<T extends InstanceTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InstanceTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstanceTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstanceTypeGroupByOutputType[P]>
            : GetScalarType<T[P], InstanceTypeGroupByOutputType[P]>
        }
      >
    >


  export type InstanceTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    name?: boolean
    displayName?: boolean
    family?: boolean
    category?: boolean
    vCPUs?: boolean
    memoryGB?: boolean
    cpuTdpWatts?: boolean
    storageType?: boolean
    onDemandHourlyUsd?: boolean
    isPopular?: boolean
  }, ExtArgs["result"]["instanceType"]>

  export type InstanceTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    name?: boolean
    displayName?: boolean
    family?: boolean
    category?: boolean
    vCPUs?: boolean
    memoryGB?: boolean
    cpuTdpWatts?: boolean
    storageType?: boolean
    onDemandHourlyUsd?: boolean
    isPopular?: boolean
  }, ExtArgs["result"]["instanceType"]>

  export type InstanceTypeSelectScalar = {
    id?: boolean
    provider?: boolean
    name?: boolean
    displayName?: boolean
    family?: boolean
    category?: boolean
    vCPUs?: boolean
    memoryGB?: boolean
    cpuTdpWatts?: boolean
    storageType?: boolean
    onDemandHourlyUsd?: boolean
    isPopular?: boolean
  }


  export type $InstanceTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InstanceType"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      provider: $Enums.CloudProvider
      name: string
      displayName: string
      family: string
      category: $Enums.InstanceCategory
      vCPUs: number
      memoryGB: number
      cpuTdpWatts: number
      storageType: $Enums.StorageType
      onDemandHourlyUsd: number | null
      isPopular: boolean
    }, ExtArgs["result"]["instanceType"]>
    composites: {}
  }

  type InstanceTypeGetPayload<S extends boolean | null | undefined | InstanceTypeDefaultArgs> = $Result.GetResult<Prisma.$InstanceTypePayload, S>

  type InstanceTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InstanceTypeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InstanceTypeCountAggregateInputType | true
    }

  export interface InstanceTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InstanceType'], meta: { name: 'InstanceType' } }
    /**
     * Find zero or one InstanceType that matches the filter.
     * @param {InstanceTypeFindUniqueArgs} args - Arguments to find a InstanceType
     * @example
     * // Get one InstanceType
     * const instanceType = await prisma.instanceType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InstanceTypeFindUniqueArgs>(args: SelectSubset<T, InstanceTypeFindUniqueArgs<ExtArgs>>): Prisma__InstanceTypeClient<$Result.GetResult<Prisma.$InstanceTypePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one InstanceType that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InstanceTypeFindUniqueOrThrowArgs} args - Arguments to find a InstanceType
     * @example
     * // Get one InstanceType
     * const instanceType = await prisma.instanceType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InstanceTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, InstanceTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InstanceTypeClient<$Result.GetResult<Prisma.$InstanceTypePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first InstanceType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceTypeFindFirstArgs} args - Arguments to find a InstanceType
     * @example
     * // Get one InstanceType
     * const instanceType = await prisma.instanceType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InstanceTypeFindFirstArgs>(args?: SelectSubset<T, InstanceTypeFindFirstArgs<ExtArgs>>): Prisma__InstanceTypeClient<$Result.GetResult<Prisma.$InstanceTypePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first InstanceType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceTypeFindFirstOrThrowArgs} args - Arguments to find a InstanceType
     * @example
     * // Get one InstanceType
     * const instanceType = await prisma.instanceType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InstanceTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, InstanceTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__InstanceTypeClient<$Result.GetResult<Prisma.$InstanceTypePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more InstanceTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InstanceTypes
     * const instanceTypes = await prisma.instanceType.findMany()
     * 
     * // Get first 10 InstanceTypes
     * const instanceTypes = await prisma.instanceType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const instanceTypeWithIdOnly = await prisma.instanceType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InstanceTypeFindManyArgs>(args?: SelectSubset<T, InstanceTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstanceTypePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a InstanceType.
     * @param {InstanceTypeCreateArgs} args - Arguments to create a InstanceType.
     * @example
     * // Create one InstanceType
     * const InstanceType = await prisma.instanceType.create({
     *   data: {
     *     // ... data to create a InstanceType
     *   }
     * })
     * 
     */
    create<T extends InstanceTypeCreateArgs>(args: SelectSubset<T, InstanceTypeCreateArgs<ExtArgs>>): Prisma__InstanceTypeClient<$Result.GetResult<Prisma.$InstanceTypePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many InstanceTypes.
     * @param {InstanceTypeCreateManyArgs} args - Arguments to create many InstanceTypes.
     * @example
     * // Create many InstanceTypes
     * const instanceType = await prisma.instanceType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InstanceTypeCreateManyArgs>(args?: SelectSubset<T, InstanceTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InstanceTypes and returns the data saved in the database.
     * @param {InstanceTypeCreateManyAndReturnArgs} args - Arguments to create many InstanceTypes.
     * @example
     * // Create many InstanceTypes
     * const instanceType = await prisma.instanceType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InstanceTypes and only return the `id`
     * const instanceTypeWithIdOnly = await prisma.instanceType.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InstanceTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, InstanceTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstanceTypePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a InstanceType.
     * @param {InstanceTypeDeleteArgs} args - Arguments to delete one InstanceType.
     * @example
     * // Delete one InstanceType
     * const InstanceType = await prisma.instanceType.delete({
     *   where: {
     *     // ... filter to delete one InstanceType
     *   }
     * })
     * 
     */
    delete<T extends InstanceTypeDeleteArgs>(args: SelectSubset<T, InstanceTypeDeleteArgs<ExtArgs>>): Prisma__InstanceTypeClient<$Result.GetResult<Prisma.$InstanceTypePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one InstanceType.
     * @param {InstanceTypeUpdateArgs} args - Arguments to update one InstanceType.
     * @example
     * // Update one InstanceType
     * const instanceType = await prisma.instanceType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InstanceTypeUpdateArgs>(args: SelectSubset<T, InstanceTypeUpdateArgs<ExtArgs>>): Prisma__InstanceTypeClient<$Result.GetResult<Prisma.$InstanceTypePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more InstanceTypes.
     * @param {InstanceTypeDeleteManyArgs} args - Arguments to filter InstanceTypes to delete.
     * @example
     * // Delete a few InstanceTypes
     * const { count } = await prisma.instanceType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InstanceTypeDeleteManyArgs>(args?: SelectSubset<T, InstanceTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InstanceTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InstanceTypes
     * const instanceType = await prisma.instanceType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InstanceTypeUpdateManyArgs>(args: SelectSubset<T, InstanceTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InstanceType.
     * @param {InstanceTypeUpsertArgs} args - Arguments to update or create a InstanceType.
     * @example
     * // Update or create a InstanceType
     * const instanceType = await prisma.instanceType.upsert({
     *   create: {
     *     // ... data to create a InstanceType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InstanceType we want to update
     *   }
     * })
     */
    upsert<T extends InstanceTypeUpsertArgs>(args: SelectSubset<T, InstanceTypeUpsertArgs<ExtArgs>>): Prisma__InstanceTypeClient<$Result.GetResult<Prisma.$InstanceTypePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of InstanceTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceTypeCountArgs} args - Arguments to filter InstanceTypes to count.
     * @example
     * // Count the number of InstanceTypes
     * const count = await prisma.instanceType.count({
     *   where: {
     *     // ... the filter for the InstanceTypes we want to count
     *   }
     * })
    **/
    count<T extends InstanceTypeCountArgs>(
      args?: Subset<T, InstanceTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstanceTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InstanceType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InstanceTypeAggregateArgs>(args: Subset<T, InstanceTypeAggregateArgs>): Prisma.PrismaPromise<GetInstanceTypeAggregateType<T>>

    /**
     * Group by InstanceType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceTypeGroupByArgs} args - Group by arguments.
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
      T extends InstanceTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstanceTypeGroupByArgs['orderBy'] }
        : { orderBy?: InstanceTypeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InstanceTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstanceTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InstanceType model
   */
  readonly fields: InstanceTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InstanceType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InstanceTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the InstanceType model
   */ 
  interface InstanceTypeFieldRefs {
    readonly id: FieldRef<"InstanceType", 'String'>
    readonly provider: FieldRef<"InstanceType", 'CloudProvider'>
    readonly name: FieldRef<"InstanceType", 'String'>
    readonly displayName: FieldRef<"InstanceType", 'String'>
    readonly family: FieldRef<"InstanceType", 'String'>
    readonly category: FieldRef<"InstanceType", 'InstanceCategory'>
    readonly vCPUs: FieldRef<"InstanceType", 'Int'>
    readonly memoryGB: FieldRef<"InstanceType", 'Float'>
    readonly cpuTdpWatts: FieldRef<"InstanceType", 'Float'>
    readonly storageType: FieldRef<"InstanceType", 'StorageType'>
    readonly onDemandHourlyUsd: FieldRef<"InstanceType", 'Float'>
    readonly isPopular: FieldRef<"InstanceType", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * InstanceType findUnique
   */
  export type InstanceTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceType
     */
    select?: InstanceTypeSelect<ExtArgs> | null
    /**
     * Filter, which InstanceType to fetch.
     */
    where: InstanceTypeWhereUniqueInput
  }

  /**
   * InstanceType findUniqueOrThrow
   */
  export type InstanceTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceType
     */
    select?: InstanceTypeSelect<ExtArgs> | null
    /**
     * Filter, which InstanceType to fetch.
     */
    where: InstanceTypeWhereUniqueInput
  }

  /**
   * InstanceType findFirst
   */
  export type InstanceTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceType
     */
    select?: InstanceTypeSelect<ExtArgs> | null
    /**
     * Filter, which InstanceType to fetch.
     */
    where?: InstanceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstanceTypes to fetch.
     */
    orderBy?: InstanceTypeOrderByWithRelationInput | InstanceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InstanceTypes.
     */
    cursor?: InstanceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstanceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstanceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InstanceTypes.
     */
    distinct?: InstanceTypeScalarFieldEnum | InstanceTypeScalarFieldEnum[]
  }

  /**
   * InstanceType findFirstOrThrow
   */
  export type InstanceTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceType
     */
    select?: InstanceTypeSelect<ExtArgs> | null
    /**
     * Filter, which InstanceType to fetch.
     */
    where?: InstanceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstanceTypes to fetch.
     */
    orderBy?: InstanceTypeOrderByWithRelationInput | InstanceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InstanceTypes.
     */
    cursor?: InstanceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstanceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstanceTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InstanceTypes.
     */
    distinct?: InstanceTypeScalarFieldEnum | InstanceTypeScalarFieldEnum[]
  }

  /**
   * InstanceType findMany
   */
  export type InstanceTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceType
     */
    select?: InstanceTypeSelect<ExtArgs> | null
    /**
     * Filter, which InstanceTypes to fetch.
     */
    where?: InstanceTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstanceTypes to fetch.
     */
    orderBy?: InstanceTypeOrderByWithRelationInput | InstanceTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InstanceTypes.
     */
    cursor?: InstanceTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstanceTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstanceTypes.
     */
    skip?: number
    distinct?: InstanceTypeScalarFieldEnum | InstanceTypeScalarFieldEnum[]
  }

  /**
   * InstanceType create
   */
  export type InstanceTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceType
     */
    select?: InstanceTypeSelect<ExtArgs> | null
    /**
     * The data needed to create a InstanceType.
     */
    data: XOR<InstanceTypeCreateInput, InstanceTypeUncheckedCreateInput>
  }

  /**
   * InstanceType createMany
   */
  export type InstanceTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InstanceTypes.
     */
    data: InstanceTypeCreateManyInput | InstanceTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InstanceType createManyAndReturn
   */
  export type InstanceTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceType
     */
    select?: InstanceTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many InstanceTypes.
     */
    data: InstanceTypeCreateManyInput | InstanceTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InstanceType update
   */
  export type InstanceTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceType
     */
    select?: InstanceTypeSelect<ExtArgs> | null
    /**
     * The data needed to update a InstanceType.
     */
    data: XOR<InstanceTypeUpdateInput, InstanceTypeUncheckedUpdateInput>
    /**
     * Choose, which InstanceType to update.
     */
    where: InstanceTypeWhereUniqueInput
  }

  /**
   * InstanceType updateMany
   */
  export type InstanceTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InstanceTypes.
     */
    data: XOR<InstanceTypeUpdateManyMutationInput, InstanceTypeUncheckedUpdateManyInput>
    /**
     * Filter which InstanceTypes to update
     */
    where?: InstanceTypeWhereInput
  }

  /**
   * InstanceType upsert
   */
  export type InstanceTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceType
     */
    select?: InstanceTypeSelect<ExtArgs> | null
    /**
     * The filter to search for the InstanceType to update in case it exists.
     */
    where: InstanceTypeWhereUniqueInput
    /**
     * In case the InstanceType found by the `where` argument doesn't exist, create a new InstanceType with this data.
     */
    create: XOR<InstanceTypeCreateInput, InstanceTypeUncheckedCreateInput>
    /**
     * In case the InstanceType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InstanceTypeUpdateInput, InstanceTypeUncheckedUpdateInput>
  }

  /**
   * InstanceType delete
   */
  export type InstanceTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceType
     */
    select?: InstanceTypeSelect<ExtArgs> | null
    /**
     * Filter which InstanceType to delete.
     */
    where: InstanceTypeWhereUniqueInput
  }

  /**
   * InstanceType deleteMany
   */
  export type InstanceTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InstanceTypes to delete
     */
    where?: InstanceTypeWhereInput
  }

  /**
   * InstanceType without action
   */
  export type InstanceTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceType
     */
    select?: InstanceTypeSelect<ExtArgs> | null
  }


  /**
   * Model Provider
   */

  export type AggregateProvider = {
    _count: ProviderCountAggregateOutputType | null
    _avg: ProviderAvgAggregateOutputType | null
    _sum: ProviderSumAggregateOutputType | null
    _min: ProviderMinAggregateOutputType | null
    _max: ProviderMaxAggregateOutputType | null
  }

  export type ProviderAvgAggregateOutputType = {
    regionCount: number | null
  }

  export type ProviderSumAggregateOutputType = {
    regionCount: number | null
  }

  export type ProviderMinAggregateOutputType = {
    id: string | null
    key: $Enums.CloudProvider | null
    name: string | null
    shortName: string | null
    logoUrl: string | null
    regionCount: number | null
    websiteUrl: string | null
    carbonPageUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type ProviderMaxAggregateOutputType = {
    id: string | null
    key: $Enums.CloudProvider | null
    name: string | null
    shortName: string | null
    logoUrl: string | null
    regionCount: number | null
    websiteUrl: string | null
    carbonPageUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type ProviderCountAggregateOutputType = {
    id: number
    key: number
    name: number
    shortName: number
    logoUrl: number
    regionCount: number
    websiteUrl: number
    carbonPageUrl: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type ProviderAvgAggregateInputType = {
    regionCount?: true
  }

  export type ProviderSumAggregateInputType = {
    regionCount?: true
  }

  export type ProviderMinAggregateInputType = {
    id?: true
    key?: true
    name?: true
    shortName?: true
    logoUrl?: true
    regionCount?: true
    websiteUrl?: true
    carbonPageUrl?: true
    isActive?: true
    createdAt?: true
  }

  export type ProviderMaxAggregateInputType = {
    id?: true
    key?: true
    name?: true
    shortName?: true
    logoUrl?: true
    regionCount?: true
    websiteUrl?: true
    carbonPageUrl?: true
    isActive?: true
    createdAt?: true
  }

  export type ProviderCountAggregateInputType = {
    id?: true
    key?: true
    name?: true
    shortName?: true
    logoUrl?: true
    regionCount?: true
    websiteUrl?: true
    carbonPageUrl?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type ProviderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Provider to aggregate.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: ProviderOrderByWithRelationInput | ProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Providers
    **/
    _count?: true | ProviderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProviderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProviderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProviderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProviderMaxAggregateInputType
  }

  export type GetProviderAggregateType<T extends ProviderAggregateArgs> = {
        [P in keyof T & keyof AggregateProvider]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProvider[P]>
      : GetScalarType<T[P], AggregateProvider[P]>
  }




  export type ProviderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProviderWhereInput
    orderBy?: ProviderOrderByWithAggregationInput | ProviderOrderByWithAggregationInput[]
    by: ProviderScalarFieldEnum[] | ProviderScalarFieldEnum
    having?: ProviderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProviderCountAggregateInputType | true
    _avg?: ProviderAvgAggregateInputType
    _sum?: ProviderSumAggregateInputType
    _min?: ProviderMinAggregateInputType
    _max?: ProviderMaxAggregateInputType
  }

  export type ProviderGroupByOutputType = {
    id: string
    key: $Enums.CloudProvider
    name: string
    shortName: string
    logoUrl: string | null
    regionCount: number
    websiteUrl: string | null
    carbonPageUrl: string | null
    isActive: boolean
    createdAt: Date
    _count: ProviderCountAggregateOutputType | null
    _avg: ProviderAvgAggregateOutputType | null
    _sum: ProviderSumAggregateOutputType | null
    _min: ProviderMinAggregateOutputType | null
    _max: ProviderMaxAggregateOutputType | null
  }

  type GetProviderGroupByPayload<T extends ProviderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProviderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProviderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProviderGroupByOutputType[P]>
            : GetScalarType<T[P], ProviderGroupByOutputType[P]>
        }
      >
    >


  export type ProviderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    name?: boolean
    shortName?: boolean
    logoUrl?: boolean
    regionCount?: boolean
    websiteUrl?: boolean
    carbonPageUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["provider"]>

  export type ProviderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    name?: boolean
    shortName?: boolean
    logoUrl?: boolean
    regionCount?: boolean
    websiteUrl?: boolean
    carbonPageUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["provider"]>

  export type ProviderSelectScalar = {
    id?: boolean
    key?: boolean
    name?: boolean
    shortName?: boolean
    logoUrl?: boolean
    regionCount?: boolean
    websiteUrl?: boolean
    carbonPageUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
  }


  export type $ProviderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Provider"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: $Enums.CloudProvider
      name: string
      shortName: string
      logoUrl: string | null
      regionCount: number
      websiteUrl: string | null
      carbonPageUrl: string | null
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["provider"]>
    composites: {}
  }

  type ProviderGetPayload<S extends boolean | null | undefined | ProviderDefaultArgs> = $Result.GetResult<Prisma.$ProviderPayload, S>

  type ProviderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProviderFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProviderCountAggregateInputType | true
    }

  export interface ProviderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Provider'], meta: { name: 'Provider' } }
    /**
     * Find zero or one Provider that matches the filter.
     * @param {ProviderFindUniqueArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProviderFindUniqueArgs>(args: SelectSubset<T, ProviderFindUniqueArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Provider that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProviderFindUniqueOrThrowArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProviderFindUniqueOrThrowArgs>(args: SelectSubset<T, ProviderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Provider that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindFirstArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProviderFindFirstArgs>(args?: SelectSubset<T, ProviderFindFirstArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Provider that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindFirstOrThrowArgs} args - Arguments to find a Provider
     * @example
     * // Get one Provider
     * const provider = await prisma.provider.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProviderFindFirstOrThrowArgs>(args?: SelectSubset<T, ProviderFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Providers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Providers
     * const providers = await prisma.provider.findMany()
     * 
     * // Get first 10 Providers
     * const providers = await prisma.provider.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const providerWithIdOnly = await prisma.provider.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProviderFindManyArgs>(args?: SelectSubset<T, ProviderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Provider.
     * @param {ProviderCreateArgs} args - Arguments to create a Provider.
     * @example
     * // Create one Provider
     * const Provider = await prisma.provider.create({
     *   data: {
     *     // ... data to create a Provider
     *   }
     * })
     * 
     */
    create<T extends ProviderCreateArgs>(args: SelectSubset<T, ProviderCreateArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Providers.
     * @param {ProviderCreateManyArgs} args - Arguments to create many Providers.
     * @example
     * // Create many Providers
     * const provider = await prisma.provider.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProviderCreateManyArgs>(args?: SelectSubset<T, ProviderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Providers and returns the data saved in the database.
     * @param {ProviderCreateManyAndReturnArgs} args - Arguments to create many Providers.
     * @example
     * // Create many Providers
     * const provider = await prisma.provider.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Providers and only return the `id`
     * const providerWithIdOnly = await prisma.provider.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProviderCreateManyAndReturnArgs>(args?: SelectSubset<T, ProviderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Provider.
     * @param {ProviderDeleteArgs} args - Arguments to delete one Provider.
     * @example
     * // Delete one Provider
     * const Provider = await prisma.provider.delete({
     *   where: {
     *     // ... filter to delete one Provider
     *   }
     * })
     * 
     */
    delete<T extends ProviderDeleteArgs>(args: SelectSubset<T, ProviderDeleteArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Provider.
     * @param {ProviderUpdateArgs} args - Arguments to update one Provider.
     * @example
     * // Update one Provider
     * const provider = await prisma.provider.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProviderUpdateArgs>(args: SelectSubset<T, ProviderUpdateArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Providers.
     * @param {ProviderDeleteManyArgs} args - Arguments to filter Providers to delete.
     * @example
     * // Delete a few Providers
     * const { count } = await prisma.provider.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProviderDeleteManyArgs>(args?: SelectSubset<T, ProviderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Providers
     * const provider = await prisma.provider.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProviderUpdateManyArgs>(args: SelectSubset<T, ProviderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Provider.
     * @param {ProviderUpsertArgs} args - Arguments to update or create a Provider.
     * @example
     * // Update or create a Provider
     * const provider = await prisma.provider.upsert({
     *   create: {
     *     // ... data to create a Provider
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Provider we want to update
     *   }
     * })
     */
    upsert<T extends ProviderUpsertArgs>(args: SelectSubset<T, ProviderUpsertArgs<ExtArgs>>): Prisma__ProviderClient<$Result.GetResult<Prisma.$ProviderPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Providers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderCountArgs} args - Arguments to filter Providers to count.
     * @example
     * // Count the number of Providers
     * const count = await prisma.provider.count({
     *   where: {
     *     // ... the filter for the Providers we want to count
     *   }
     * })
    **/
    count<T extends ProviderCountArgs>(
      args?: Subset<T, ProviderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProviderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Provider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProviderAggregateArgs>(args: Subset<T, ProviderAggregateArgs>): Prisma.PrismaPromise<GetProviderAggregateType<T>>

    /**
     * Group by Provider.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProviderGroupByArgs} args - Group by arguments.
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
      T extends ProviderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProviderGroupByArgs['orderBy'] }
        : { orderBy?: ProviderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProviderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProviderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Provider model
   */
  readonly fields: ProviderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Provider.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProviderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Provider model
   */ 
  interface ProviderFieldRefs {
    readonly id: FieldRef<"Provider", 'String'>
    readonly key: FieldRef<"Provider", 'CloudProvider'>
    readonly name: FieldRef<"Provider", 'String'>
    readonly shortName: FieldRef<"Provider", 'String'>
    readonly logoUrl: FieldRef<"Provider", 'String'>
    readonly regionCount: FieldRef<"Provider", 'Int'>
    readonly websiteUrl: FieldRef<"Provider", 'String'>
    readonly carbonPageUrl: FieldRef<"Provider", 'String'>
    readonly isActive: FieldRef<"Provider", 'Boolean'>
    readonly createdAt: FieldRef<"Provider", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Provider findUnique
   */
  export type ProviderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Filter, which Provider to fetch.
     */
    where: ProviderWhereUniqueInput
  }

  /**
   * Provider findUniqueOrThrow
   */
  export type ProviderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Filter, which Provider to fetch.
     */
    where: ProviderWhereUniqueInput
  }

  /**
   * Provider findFirst
   */
  export type ProviderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Filter, which Provider to fetch.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: ProviderOrderByWithRelationInput | ProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Providers.
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Providers.
     */
    distinct?: ProviderScalarFieldEnum | ProviderScalarFieldEnum[]
  }

  /**
   * Provider findFirstOrThrow
   */
  export type ProviderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Filter, which Provider to fetch.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: ProviderOrderByWithRelationInput | ProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Providers.
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Providers.
     */
    distinct?: ProviderScalarFieldEnum | ProviderScalarFieldEnum[]
  }

  /**
   * Provider findMany
   */
  export type ProviderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Filter, which Providers to fetch.
     */
    where?: ProviderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Providers to fetch.
     */
    orderBy?: ProviderOrderByWithRelationInput | ProviderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Providers.
     */
    cursor?: ProviderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Providers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Providers.
     */
    skip?: number
    distinct?: ProviderScalarFieldEnum | ProviderScalarFieldEnum[]
  }

  /**
   * Provider create
   */
  export type ProviderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * The data needed to create a Provider.
     */
    data: XOR<ProviderCreateInput, ProviderUncheckedCreateInput>
  }

  /**
   * Provider createMany
   */
  export type ProviderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Providers.
     */
    data: ProviderCreateManyInput | ProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Provider createManyAndReturn
   */
  export type ProviderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Providers.
     */
    data: ProviderCreateManyInput | ProviderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Provider update
   */
  export type ProviderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * The data needed to update a Provider.
     */
    data: XOR<ProviderUpdateInput, ProviderUncheckedUpdateInput>
    /**
     * Choose, which Provider to update.
     */
    where: ProviderWhereUniqueInput
  }

  /**
   * Provider updateMany
   */
  export type ProviderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Providers.
     */
    data: XOR<ProviderUpdateManyMutationInput, ProviderUncheckedUpdateManyInput>
    /**
     * Filter which Providers to update
     */
    where?: ProviderWhereInput
  }

  /**
   * Provider upsert
   */
  export type ProviderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * The filter to search for the Provider to update in case it exists.
     */
    where: ProviderWhereUniqueInput
    /**
     * In case the Provider found by the `where` argument doesn't exist, create a new Provider with this data.
     */
    create: XOR<ProviderCreateInput, ProviderUncheckedCreateInput>
    /**
     * In case the Provider was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProviderUpdateInput, ProviderUncheckedUpdateInput>
  }

  /**
   * Provider delete
   */
  export type ProviderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
    /**
     * Filter which Provider to delete.
     */
    where: ProviderWhereUniqueInput
  }

  /**
   * Provider deleteMany
   */
  export type ProviderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Providers to delete
     */
    where?: ProviderWhereInput
  }

  /**
   * Provider without action
   */
  export type ProviderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Provider
     */
    select?: ProviderSelect<ExtArgs> | null
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


  export const MobileUserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    name: 'name',
    deviceId: 'deviceId',
    pushToken: 'pushToken',
    country: 'country',
    lastActiveAt: 'lastActiveAt',
    calculationCount: 'calculationCount',
    totalCO2Tracked: 'totalCO2Tracked',
    carbonAlertThreshold: 'carbonAlertThreshold',
    theme: 'theme',
    notificationsEnabled: 'notificationsEnabled',
    defaultProvider: 'defaultProvider',
    status: 'status',
    banReason: 'banReason',
    bannedAt: 'bannedAt',
    bannedBy: 'bannedBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MobileUserScalarFieldEnum = (typeof MobileUserScalarFieldEnum)[keyof typeof MobileUserScalarFieldEnum]


  export const CalculationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    region: 'region',
    regionName: 'regionName',
    instanceType: 'instanceType',
    instanceCount: 'instanceCount',
    hoursPerMonth: 'hoursPerMonth',
    cpuUtilization: 'cpuUtilization',
    storageGB: 'storageGB',
    ramGB: 'ramGB',
    energyComputeKwh: 'energyComputeKwh',
    energyMemoryKwh: 'energyMemoryKwh',
    energyStorageKwh: 'energyStorageKwh',
    energyTotalKwh: 'energyTotalKwh',
    co2GramsMonth: 'co2GramsMonth',
    co2KgMonth: 'co2KgMonth',
    co2GramsHour: 'co2GramsHour',
    gridIntensity: 'gridIntensity',
    gridIntensitySource: 'gridIntensitySource',
    computePercentage: 'computePercentage',
    memoryPercentage: 'memoryPercentage',
    storagePercentage: 'storagePercentage',
    rating: 'rating',
    ratingColor: 'ratingColor',
    realWorldEquivalent: 'realWorldEquivalent',
    recommendation: 'recommendation',
    recommendedRegion: 'recommendedRegion',
    potentialReductionPct: 'potentialReductionPct',
    source: 'source',
    apiKeyId: 'apiKeyId',
    responseTimeMs: 'responseTimeMs',
    sdkVersion: 'sdkVersion',
    createdAt: 'createdAt'
  };

  export type CalculationScalarFieldEnum = (typeof CalculationScalarFieldEnum)[keyof typeof CalculationScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    refreshToken: 'refreshToken',
    platform: 'platform',
    osVersion: 'osVersion',
    appVersion: 'appVersion',
    deviceModel: 'deviceModel',
    ip: 'ip',
    isActive: 'isActive',
    lastActivityAt: 'lastActivityAt',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const ApiKeyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    prefix: 'prefix',
    hashedKey: 'hashedKey',
    createdBy: 'createdBy',
    permissions: 'permissions',
    requestsPerMinute: 'requestsPerMinute',
    requestsPerDay: 'requestsPerDay',
    totalRequests: 'totalRequests',
    lastUsedAt: 'lastUsedAt',
    todayRequests: 'todayRequests',
    todayResetAt: 'todayResetAt',
    status: 'status',
    revokedAt: 'revokedAt',
    revokedBy: 'revokedBy',
    revokeReason: 'revokeReason',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ApiKeyScalarFieldEnum = (typeof ApiKeyScalarFieldEnum)[keyof typeof ApiKeyScalarFieldEnum]


  export const FeatureFlagScalarFieldEnum: {
    id: 'id',
    key: 'key',
    displayName: 'displayName',
    description: 'description',
    category: 'category',
    enabled: 'enabled',
    value: 'value',
    lastToggledBy: 'lastToggledBy',
    lastToggledAt: 'lastToggledAt',
    toggleCount: 'toggleCount',
    version: 'version',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FeatureFlagScalarFieldEnum = (typeof FeatureFlagScalarFieldEnum)[keyof typeof FeatureFlagScalarFieldEnum]


  export const RemoteConfigScalarFieldEnum: {
    id: 'id',
    key: 'key',
    displayName: 'displayName',
    category: 'category',
    value: 'value',
    valueType: 'valueType',
    description: 'description',
    lastUpdatedBy: 'lastUpdatedBy',
    version: 'version',
    history: 'history',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RemoteConfigScalarFieldEnum = (typeof RemoteConfigScalarFieldEnum)[keyof typeof RemoteConfigScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    actorId: 'actorId',
    actorEmail: 'actorEmail',
    actorRole: 'actorRole',
    action: 'action',
    resource: 'resource',
    resourceId: 'resourceId',
    before: 'before',
    after: 'after',
    metadata: 'metadata',
    ip: 'ip',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    title: 'title',
    body: 'body',
    data: 'data',
    type: 'type',
    targetAudience: 'targetAudience',
    targetUserIds: 'targetUserIds',
    status: 'status',
    scheduledAt: 'scheduledAt',
    sentAt: 'sentAt',
    totalRecipients: 'totalRecipients',
    delivered: 'delivered',
    opened: 'opened',
    failed: 'failed',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const PushTokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    platform: 'platform',
    isActive: 'isActive',
    lastUsedAt: 'lastUsedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PushTokenScalarFieldEnum = (typeof PushTokenScalarFieldEnum)[keyof typeof PushTokenScalarFieldEnum]


  export const RegionScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    code: 'code',
    name: 'name',
    country: 'country',
    continent: 'continent',
    gridIntensity: 'gridIntensity',
    gridIntensitySource: 'gridIntensitySource',
    renewablePercentage: 'renewablePercentage',
    pue: 'pue',
    lat: 'lat',
    lng: 'lng',
    availableInstanceFamilies: 'availableInstanceFamilies',
    isPopular: 'isPopular'
  };

  export type RegionScalarFieldEnum = (typeof RegionScalarFieldEnum)[keyof typeof RegionScalarFieldEnum]


  export const InstanceTypeScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    name: 'name',
    displayName: 'displayName',
    family: 'family',
    category: 'category',
    vCPUs: 'vCPUs',
    memoryGB: 'memoryGB',
    cpuTdpWatts: 'cpuTdpWatts',
    storageType: 'storageType',
    onDemandHourlyUsd: 'onDemandHourlyUsd',
    isPopular: 'isPopular'
  };

  export type InstanceTypeScalarFieldEnum = (typeof InstanceTypeScalarFieldEnum)[keyof typeof InstanceTypeScalarFieldEnum]


  export const ProviderScalarFieldEnum: {
    id: 'id',
    key: 'key',
    name: 'name',
    shortName: 'shortName',
    logoUrl: 'logoUrl',
    regionCount: 'regionCount',
    websiteUrl: 'websiteUrl',
    carbonPageUrl: 'carbonPageUrl',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type ProviderScalarFieldEnum = (typeof ProviderScalarFieldEnum)[keyof typeof ProviderScalarFieldEnum]


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


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'CloudProvider'
   */
  export type EnumCloudProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CloudProvider'>
    


  /**
   * Reference to a field of type 'CloudProvider[]'
   */
  export type ListEnumCloudProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CloudProvider[]'>
    


  /**
   * Reference to a field of type 'MobileUserStatus'
   */
  export type EnumMobileUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MobileUserStatus'>
    


  /**
   * Reference to a field of type 'MobileUserStatus[]'
   */
  export type ListEnumMobileUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MobileUserStatus[]'>
    


  /**
   * Reference to a field of type 'GridIntensitySource'
   */
  export type EnumGridIntensitySourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GridIntensitySource'>
    


  /**
   * Reference to a field of type 'GridIntensitySource[]'
   */
  export type ListEnumGridIntensitySourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GridIntensitySource[]'>
    


  /**
   * Reference to a field of type 'CarbonRating'
   */
  export type EnumCarbonRatingFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CarbonRating'>
    


  /**
   * Reference to a field of type 'CarbonRating[]'
   */
  export type ListEnumCarbonRatingFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CarbonRating[]'>
    


  /**
   * Reference to a field of type 'CalculationSource'
   */
  export type EnumCalculationSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CalculationSource'>
    


  /**
   * Reference to a field of type 'CalculationSource[]'
   */
  export type ListEnumCalculationSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CalculationSource[]'>
    


  /**
   * Reference to a field of type 'ApiKeyStatus'
   */
  export type EnumApiKeyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApiKeyStatus'>
    


  /**
   * Reference to a field of type 'ApiKeyStatus[]'
   */
  export type ListEnumApiKeyStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApiKeyStatus[]'>
    


  /**
   * Reference to a field of type 'FlagCategory'
   */
  export type EnumFlagCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlagCategory'>
    


  /**
   * Reference to a field of type 'FlagCategory[]'
   */
  export type ListEnumFlagCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FlagCategory[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'ConfigCategory'
   */
  export type EnumConfigCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConfigCategory'>
    


  /**
   * Reference to a field of type 'ConfigCategory[]'
   */
  export type ListEnumConfigCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConfigCategory[]'>
    


  /**
   * Reference to a field of type 'ConfigValueType'
   */
  export type EnumConfigValueTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConfigValueType'>
    


  /**
   * Reference to a field of type 'ConfigValueType[]'
   */
  export type ListEnumConfigValueTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConfigValueType[]'>
    


  /**
   * Reference to a field of type 'NotificationType'
   */
  export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>
    


  /**
   * Reference to a field of type 'NotificationType[]'
   */
  export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>
    


  /**
   * Reference to a field of type 'TargetAudience'
   */
  export type EnumTargetAudienceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TargetAudience'>
    


  /**
   * Reference to a field of type 'TargetAudience[]'
   */
  export type ListEnumTargetAudienceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TargetAudience[]'>
    


  /**
   * Reference to a field of type 'NotificationStatus'
   */
  export type EnumNotificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationStatus'>
    


  /**
   * Reference to a field of type 'NotificationStatus[]'
   */
  export type ListEnumNotificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationStatus[]'>
    


  /**
   * Reference to a field of type 'InstanceCategory'
   */
  export type EnumInstanceCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InstanceCategory'>
    


  /**
   * Reference to a field of type 'InstanceCategory[]'
   */
  export type ListEnumInstanceCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InstanceCategory[]'>
    


  /**
   * Reference to a field of type 'StorageType'
   */
  export type EnumStorageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StorageType'>
    


  /**
   * Reference to a field of type 'StorageType[]'
   */
  export type ListEnumStorageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StorageType[]'>
    
  /**
   * Deep Input Types
   */


  export type MobileUserWhereInput = {
    AND?: MobileUserWhereInput | MobileUserWhereInput[]
    OR?: MobileUserWhereInput[]
    NOT?: MobileUserWhereInput | MobileUserWhereInput[]
    id?: StringFilter<"MobileUser"> | string
    email?: StringFilter<"MobileUser"> | string
    passwordHash?: StringFilter<"MobileUser"> | string
    name?: StringFilter<"MobileUser"> | string
    deviceId?: StringNullableFilter<"MobileUser"> | string | null
    pushToken?: StringNullableFilter<"MobileUser"> | string | null
    country?: StringNullableFilter<"MobileUser"> | string | null
    lastActiveAt?: DateTimeFilter<"MobileUser"> | Date | string
    calculationCount?: IntFilter<"MobileUser"> | number
    totalCO2Tracked?: FloatFilter<"MobileUser"> | number
    carbonAlertThreshold?: FloatFilter<"MobileUser"> | number
    theme?: StringFilter<"MobileUser"> | string
    notificationsEnabled?: BoolFilter<"MobileUser"> | boolean
    defaultProvider?: EnumCloudProviderNullableFilter<"MobileUser"> | $Enums.CloudProvider | null
    status?: EnumMobileUserStatusFilter<"MobileUser"> | $Enums.MobileUserStatus
    banReason?: StringNullableFilter<"MobileUser"> | string | null
    bannedAt?: DateTimeNullableFilter<"MobileUser"> | Date | string | null
    bannedBy?: StringNullableFilter<"MobileUser"> | string | null
    createdAt?: DateTimeFilter<"MobileUser"> | Date | string
    updatedAt?: DateTimeFilter<"MobileUser"> | Date | string
    calculations?: CalculationListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type MobileUserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    deviceId?: SortOrderInput | SortOrder
    pushToken?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    lastActiveAt?: SortOrder
    calculationCount?: SortOrder
    totalCO2Tracked?: SortOrder
    carbonAlertThreshold?: SortOrder
    theme?: SortOrder
    notificationsEnabled?: SortOrder
    defaultProvider?: SortOrderInput | SortOrder
    status?: SortOrder
    banReason?: SortOrderInput | SortOrder
    bannedAt?: SortOrderInput | SortOrder
    bannedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    calculations?: CalculationOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type MobileUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: MobileUserWhereInput | MobileUserWhereInput[]
    OR?: MobileUserWhereInput[]
    NOT?: MobileUserWhereInput | MobileUserWhereInput[]
    passwordHash?: StringFilter<"MobileUser"> | string
    name?: StringFilter<"MobileUser"> | string
    deviceId?: StringNullableFilter<"MobileUser"> | string | null
    pushToken?: StringNullableFilter<"MobileUser"> | string | null
    country?: StringNullableFilter<"MobileUser"> | string | null
    lastActiveAt?: DateTimeFilter<"MobileUser"> | Date | string
    calculationCount?: IntFilter<"MobileUser"> | number
    totalCO2Tracked?: FloatFilter<"MobileUser"> | number
    carbonAlertThreshold?: FloatFilter<"MobileUser"> | number
    theme?: StringFilter<"MobileUser"> | string
    notificationsEnabled?: BoolFilter<"MobileUser"> | boolean
    defaultProvider?: EnumCloudProviderNullableFilter<"MobileUser"> | $Enums.CloudProvider | null
    status?: EnumMobileUserStatusFilter<"MobileUser"> | $Enums.MobileUserStatus
    banReason?: StringNullableFilter<"MobileUser"> | string | null
    bannedAt?: DateTimeNullableFilter<"MobileUser"> | Date | string | null
    bannedBy?: StringNullableFilter<"MobileUser"> | string | null
    createdAt?: DateTimeFilter<"MobileUser"> | Date | string
    updatedAt?: DateTimeFilter<"MobileUser"> | Date | string
    calculations?: CalculationListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id" | "email">

  export type MobileUserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    deviceId?: SortOrderInput | SortOrder
    pushToken?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    lastActiveAt?: SortOrder
    calculationCount?: SortOrder
    totalCO2Tracked?: SortOrder
    carbonAlertThreshold?: SortOrder
    theme?: SortOrder
    notificationsEnabled?: SortOrder
    defaultProvider?: SortOrderInput | SortOrder
    status?: SortOrder
    banReason?: SortOrderInput | SortOrder
    bannedAt?: SortOrderInput | SortOrder
    bannedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MobileUserCountOrderByAggregateInput
    _avg?: MobileUserAvgOrderByAggregateInput
    _max?: MobileUserMaxOrderByAggregateInput
    _min?: MobileUserMinOrderByAggregateInput
    _sum?: MobileUserSumOrderByAggregateInput
  }

  export type MobileUserScalarWhereWithAggregatesInput = {
    AND?: MobileUserScalarWhereWithAggregatesInput | MobileUserScalarWhereWithAggregatesInput[]
    OR?: MobileUserScalarWhereWithAggregatesInput[]
    NOT?: MobileUserScalarWhereWithAggregatesInput | MobileUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MobileUser"> | string
    email?: StringWithAggregatesFilter<"MobileUser"> | string
    passwordHash?: StringWithAggregatesFilter<"MobileUser"> | string
    name?: StringWithAggregatesFilter<"MobileUser"> | string
    deviceId?: StringNullableWithAggregatesFilter<"MobileUser"> | string | null
    pushToken?: StringNullableWithAggregatesFilter<"MobileUser"> | string | null
    country?: StringNullableWithAggregatesFilter<"MobileUser"> | string | null
    lastActiveAt?: DateTimeWithAggregatesFilter<"MobileUser"> | Date | string
    calculationCount?: IntWithAggregatesFilter<"MobileUser"> | number
    totalCO2Tracked?: FloatWithAggregatesFilter<"MobileUser"> | number
    carbonAlertThreshold?: FloatWithAggregatesFilter<"MobileUser"> | number
    theme?: StringWithAggregatesFilter<"MobileUser"> | string
    notificationsEnabled?: BoolWithAggregatesFilter<"MobileUser"> | boolean
    defaultProvider?: EnumCloudProviderNullableWithAggregatesFilter<"MobileUser"> | $Enums.CloudProvider | null
    status?: EnumMobileUserStatusWithAggregatesFilter<"MobileUser"> | $Enums.MobileUserStatus
    banReason?: StringNullableWithAggregatesFilter<"MobileUser"> | string | null
    bannedAt?: DateTimeNullableWithAggregatesFilter<"MobileUser"> | Date | string | null
    bannedBy?: StringNullableWithAggregatesFilter<"MobileUser"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MobileUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MobileUser"> | Date | string
  }

  export type CalculationWhereInput = {
    AND?: CalculationWhereInput | CalculationWhereInput[]
    OR?: CalculationWhereInput[]
    NOT?: CalculationWhereInput | CalculationWhereInput[]
    id?: StringFilter<"Calculation"> | string
    userId?: StringFilter<"Calculation"> | string
    provider?: EnumCloudProviderFilter<"Calculation"> | $Enums.CloudProvider
    region?: StringFilter<"Calculation"> | string
    regionName?: StringFilter<"Calculation"> | string
    instanceType?: StringFilter<"Calculation"> | string
    instanceCount?: IntFilter<"Calculation"> | number
    hoursPerMonth?: IntFilter<"Calculation"> | number
    cpuUtilization?: FloatFilter<"Calculation"> | number
    storageGB?: FloatFilter<"Calculation"> | number
    ramGB?: FloatFilter<"Calculation"> | number
    energyComputeKwh?: FloatFilter<"Calculation"> | number
    energyMemoryKwh?: FloatFilter<"Calculation"> | number
    energyStorageKwh?: FloatFilter<"Calculation"> | number
    energyTotalKwh?: FloatFilter<"Calculation"> | number
    co2GramsMonth?: FloatFilter<"Calculation"> | number
    co2KgMonth?: FloatFilter<"Calculation"> | number
    co2GramsHour?: FloatFilter<"Calculation"> | number
    gridIntensity?: FloatFilter<"Calculation"> | number
    gridIntensitySource?: EnumGridIntensitySourceFilter<"Calculation"> | $Enums.GridIntensitySource
    computePercentage?: FloatFilter<"Calculation"> | number
    memoryPercentage?: FloatFilter<"Calculation"> | number
    storagePercentage?: FloatFilter<"Calculation"> | number
    rating?: EnumCarbonRatingFilter<"Calculation"> | $Enums.CarbonRating
    ratingColor?: StringFilter<"Calculation"> | string
    realWorldEquivalent?: StringFilter<"Calculation"> | string
    recommendation?: StringFilter<"Calculation"> | string
    recommendedRegion?: StringNullableFilter<"Calculation"> | string | null
    potentialReductionPct?: FloatNullableFilter<"Calculation"> | number | null
    source?: EnumCalculationSourceFilter<"Calculation"> | $Enums.CalculationSource
    apiKeyId?: StringNullableFilter<"Calculation"> | string | null
    responseTimeMs?: IntFilter<"Calculation"> | number
    sdkVersion?: StringNullableFilter<"Calculation"> | string | null
    createdAt?: DateTimeFilter<"Calculation"> | Date | string
    user?: XOR<MobileUserRelationFilter, MobileUserWhereInput>
  }

  export type CalculationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    region?: SortOrder
    regionName?: SortOrder
    instanceType?: SortOrder
    instanceCount?: SortOrder
    hoursPerMonth?: SortOrder
    cpuUtilization?: SortOrder
    storageGB?: SortOrder
    ramGB?: SortOrder
    energyComputeKwh?: SortOrder
    energyMemoryKwh?: SortOrder
    energyStorageKwh?: SortOrder
    energyTotalKwh?: SortOrder
    co2GramsMonth?: SortOrder
    co2KgMonth?: SortOrder
    co2GramsHour?: SortOrder
    gridIntensity?: SortOrder
    gridIntensitySource?: SortOrder
    computePercentage?: SortOrder
    memoryPercentage?: SortOrder
    storagePercentage?: SortOrder
    rating?: SortOrder
    ratingColor?: SortOrder
    realWorldEquivalent?: SortOrder
    recommendation?: SortOrder
    recommendedRegion?: SortOrderInput | SortOrder
    potentialReductionPct?: SortOrderInput | SortOrder
    source?: SortOrder
    apiKeyId?: SortOrderInput | SortOrder
    responseTimeMs?: SortOrder
    sdkVersion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: MobileUserOrderByWithRelationInput
  }

  export type CalculationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CalculationWhereInput | CalculationWhereInput[]
    OR?: CalculationWhereInput[]
    NOT?: CalculationWhereInput | CalculationWhereInput[]
    userId?: StringFilter<"Calculation"> | string
    provider?: EnumCloudProviderFilter<"Calculation"> | $Enums.CloudProvider
    region?: StringFilter<"Calculation"> | string
    regionName?: StringFilter<"Calculation"> | string
    instanceType?: StringFilter<"Calculation"> | string
    instanceCount?: IntFilter<"Calculation"> | number
    hoursPerMonth?: IntFilter<"Calculation"> | number
    cpuUtilization?: FloatFilter<"Calculation"> | number
    storageGB?: FloatFilter<"Calculation"> | number
    ramGB?: FloatFilter<"Calculation"> | number
    energyComputeKwh?: FloatFilter<"Calculation"> | number
    energyMemoryKwh?: FloatFilter<"Calculation"> | number
    energyStorageKwh?: FloatFilter<"Calculation"> | number
    energyTotalKwh?: FloatFilter<"Calculation"> | number
    co2GramsMonth?: FloatFilter<"Calculation"> | number
    co2KgMonth?: FloatFilter<"Calculation"> | number
    co2GramsHour?: FloatFilter<"Calculation"> | number
    gridIntensity?: FloatFilter<"Calculation"> | number
    gridIntensitySource?: EnumGridIntensitySourceFilter<"Calculation"> | $Enums.GridIntensitySource
    computePercentage?: FloatFilter<"Calculation"> | number
    memoryPercentage?: FloatFilter<"Calculation"> | number
    storagePercentage?: FloatFilter<"Calculation"> | number
    rating?: EnumCarbonRatingFilter<"Calculation"> | $Enums.CarbonRating
    ratingColor?: StringFilter<"Calculation"> | string
    realWorldEquivalent?: StringFilter<"Calculation"> | string
    recommendation?: StringFilter<"Calculation"> | string
    recommendedRegion?: StringNullableFilter<"Calculation"> | string | null
    potentialReductionPct?: FloatNullableFilter<"Calculation"> | number | null
    source?: EnumCalculationSourceFilter<"Calculation"> | $Enums.CalculationSource
    apiKeyId?: StringNullableFilter<"Calculation"> | string | null
    responseTimeMs?: IntFilter<"Calculation"> | number
    sdkVersion?: StringNullableFilter<"Calculation"> | string | null
    createdAt?: DateTimeFilter<"Calculation"> | Date | string
    user?: XOR<MobileUserRelationFilter, MobileUserWhereInput>
  }, "id">

  export type CalculationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    region?: SortOrder
    regionName?: SortOrder
    instanceType?: SortOrder
    instanceCount?: SortOrder
    hoursPerMonth?: SortOrder
    cpuUtilization?: SortOrder
    storageGB?: SortOrder
    ramGB?: SortOrder
    energyComputeKwh?: SortOrder
    energyMemoryKwh?: SortOrder
    energyStorageKwh?: SortOrder
    energyTotalKwh?: SortOrder
    co2GramsMonth?: SortOrder
    co2KgMonth?: SortOrder
    co2GramsHour?: SortOrder
    gridIntensity?: SortOrder
    gridIntensitySource?: SortOrder
    computePercentage?: SortOrder
    memoryPercentage?: SortOrder
    storagePercentage?: SortOrder
    rating?: SortOrder
    ratingColor?: SortOrder
    realWorldEquivalent?: SortOrder
    recommendation?: SortOrder
    recommendedRegion?: SortOrderInput | SortOrder
    potentialReductionPct?: SortOrderInput | SortOrder
    source?: SortOrder
    apiKeyId?: SortOrderInput | SortOrder
    responseTimeMs?: SortOrder
    sdkVersion?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CalculationCountOrderByAggregateInput
    _avg?: CalculationAvgOrderByAggregateInput
    _max?: CalculationMaxOrderByAggregateInput
    _min?: CalculationMinOrderByAggregateInput
    _sum?: CalculationSumOrderByAggregateInput
  }

  export type CalculationScalarWhereWithAggregatesInput = {
    AND?: CalculationScalarWhereWithAggregatesInput | CalculationScalarWhereWithAggregatesInput[]
    OR?: CalculationScalarWhereWithAggregatesInput[]
    NOT?: CalculationScalarWhereWithAggregatesInput | CalculationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Calculation"> | string
    userId?: StringWithAggregatesFilter<"Calculation"> | string
    provider?: EnumCloudProviderWithAggregatesFilter<"Calculation"> | $Enums.CloudProvider
    region?: StringWithAggregatesFilter<"Calculation"> | string
    regionName?: StringWithAggregatesFilter<"Calculation"> | string
    instanceType?: StringWithAggregatesFilter<"Calculation"> | string
    instanceCount?: IntWithAggregatesFilter<"Calculation"> | number
    hoursPerMonth?: IntWithAggregatesFilter<"Calculation"> | number
    cpuUtilization?: FloatWithAggregatesFilter<"Calculation"> | number
    storageGB?: FloatWithAggregatesFilter<"Calculation"> | number
    ramGB?: FloatWithAggregatesFilter<"Calculation"> | number
    energyComputeKwh?: FloatWithAggregatesFilter<"Calculation"> | number
    energyMemoryKwh?: FloatWithAggregatesFilter<"Calculation"> | number
    energyStorageKwh?: FloatWithAggregatesFilter<"Calculation"> | number
    energyTotalKwh?: FloatWithAggregatesFilter<"Calculation"> | number
    co2GramsMonth?: FloatWithAggregatesFilter<"Calculation"> | number
    co2KgMonth?: FloatWithAggregatesFilter<"Calculation"> | number
    co2GramsHour?: FloatWithAggregatesFilter<"Calculation"> | number
    gridIntensity?: FloatWithAggregatesFilter<"Calculation"> | number
    gridIntensitySource?: EnumGridIntensitySourceWithAggregatesFilter<"Calculation"> | $Enums.GridIntensitySource
    computePercentage?: FloatWithAggregatesFilter<"Calculation"> | number
    memoryPercentage?: FloatWithAggregatesFilter<"Calculation"> | number
    storagePercentage?: FloatWithAggregatesFilter<"Calculation"> | number
    rating?: EnumCarbonRatingWithAggregatesFilter<"Calculation"> | $Enums.CarbonRating
    ratingColor?: StringWithAggregatesFilter<"Calculation"> | string
    realWorldEquivalent?: StringWithAggregatesFilter<"Calculation"> | string
    recommendation?: StringWithAggregatesFilter<"Calculation"> | string
    recommendedRegion?: StringNullableWithAggregatesFilter<"Calculation"> | string | null
    potentialReductionPct?: FloatNullableWithAggregatesFilter<"Calculation"> | number | null
    source?: EnumCalculationSourceWithAggregatesFilter<"Calculation"> | $Enums.CalculationSource
    apiKeyId?: StringNullableWithAggregatesFilter<"Calculation"> | string | null
    responseTimeMs?: IntWithAggregatesFilter<"Calculation"> | number
    sdkVersion?: StringNullableWithAggregatesFilter<"Calculation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Calculation"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    refreshToken?: StringFilter<"Session"> | string
    platform?: StringNullableFilter<"Session"> | string | null
    osVersion?: StringNullableFilter<"Session"> | string | null
    appVersion?: StringNullableFilter<"Session"> | string | null
    deviceModel?: StringNullableFilter<"Session"> | string | null
    ip?: StringNullableFilter<"Session"> | string | null
    isActive?: BoolFilter<"Session"> | boolean
    lastActivityAt?: DateTimeFilter<"Session"> | Date | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<MobileUserRelationFilter, MobileUserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshToken?: SortOrder
    platform?: SortOrderInput | SortOrder
    osVersion?: SortOrderInput | SortOrder
    appVersion?: SortOrderInput | SortOrder
    deviceModel?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    isActive?: SortOrder
    lastActivityAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    user?: MobileUserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    refreshToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    platform?: StringNullableFilter<"Session"> | string | null
    osVersion?: StringNullableFilter<"Session"> | string | null
    appVersion?: StringNullableFilter<"Session"> | string | null
    deviceModel?: StringNullableFilter<"Session"> | string | null
    ip?: StringNullableFilter<"Session"> | string | null
    isActive?: BoolFilter<"Session"> | boolean
    lastActivityAt?: DateTimeFilter<"Session"> | Date | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<MobileUserRelationFilter, MobileUserWhereInput>
  }, "id" | "refreshToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshToken?: SortOrder
    platform?: SortOrderInput | SortOrder
    osVersion?: SortOrderInput | SortOrder
    appVersion?: SortOrderInput | SortOrder
    deviceModel?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    isActive?: SortOrder
    lastActivityAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    refreshToken?: StringWithAggregatesFilter<"Session"> | string
    platform?: StringNullableWithAggregatesFilter<"Session"> | string | null
    osVersion?: StringNullableWithAggregatesFilter<"Session"> | string | null
    appVersion?: StringNullableWithAggregatesFilter<"Session"> | string | null
    deviceModel?: StringNullableWithAggregatesFilter<"Session"> | string | null
    ip?: StringNullableWithAggregatesFilter<"Session"> | string | null
    isActive?: BoolWithAggregatesFilter<"Session"> | boolean
    lastActivityAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type ApiKeyWhereInput = {
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    prefix?: StringFilter<"ApiKey"> | string
    hashedKey?: StringFilter<"ApiKey"> | string
    createdBy?: StringFilter<"ApiKey"> | string
    permissions?: StringNullableListFilter<"ApiKey">
    requestsPerMinute?: IntFilter<"ApiKey"> | number
    requestsPerDay?: IntFilter<"ApiKey"> | number
    totalRequests?: IntFilter<"ApiKey"> | number
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    todayRequests?: IntFilter<"ApiKey"> | number
    todayResetAt?: DateTimeFilter<"ApiKey"> | Date | string
    status?: EnumApiKeyStatusFilter<"ApiKey"> | $Enums.ApiKeyStatus
    revokedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    revokedBy?: StringNullableFilter<"ApiKey"> | string | null
    revokeReason?: StringNullableFilter<"ApiKey"> | string | null
    expiresAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
  }

  export type ApiKeyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    prefix?: SortOrder
    hashedKey?: SortOrder
    createdBy?: SortOrder
    permissions?: SortOrder
    requestsPerMinute?: SortOrder
    requestsPerDay?: SortOrder
    totalRequests?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    todayRequests?: SortOrder
    todayResetAt?: SortOrder
    status?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    revokedBy?: SortOrderInput | SortOrder
    revokeReason?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    hashedKey?: string
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    name?: StringFilter<"ApiKey"> | string
    prefix?: StringFilter<"ApiKey"> | string
    createdBy?: StringFilter<"ApiKey"> | string
    permissions?: StringNullableListFilter<"ApiKey">
    requestsPerMinute?: IntFilter<"ApiKey"> | number
    requestsPerDay?: IntFilter<"ApiKey"> | number
    totalRequests?: IntFilter<"ApiKey"> | number
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    todayRequests?: IntFilter<"ApiKey"> | number
    todayResetAt?: DateTimeFilter<"ApiKey"> | Date | string
    status?: EnumApiKeyStatusFilter<"ApiKey"> | $Enums.ApiKeyStatus
    revokedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    revokedBy?: StringNullableFilter<"ApiKey"> | string | null
    revokeReason?: StringNullableFilter<"ApiKey"> | string | null
    expiresAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
  }, "id" | "hashedKey">

  export type ApiKeyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    prefix?: SortOrder
    hashedKey?: SortOrder
    createdBy?: SortOrder
    permissions?: SortOrder
    requestsPerMinute?: SortOrder
    requestsPerDay?: SortOrder
    totalRequests?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    todayRequests?: SortOrder
    todayResetAt?: SortOrder
    status?: SortOrder
    revokedAt?: SortOrderInput | SortOrder
    revokedBy?: SortOrderInput | SortOrder
    revokeReason?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ApiKeyCountOrderByAggregateInput
    _avg?: ApiKeyAvgOrderByAggregateInput
    _max?: ApiKeyMaxOrderByAggregateInput
    _min?: ApiKeyMinOrderByAggregateInput
    _sum?: ApiKeySumOrderByAggregateInput
  }

  export type ApiKeyScalarWhereWithAggregatesInput = {
    AND?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    OR?: ApiKeyScalarWhereWithAggregatesInput[]
    NOT?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiKey"> | string
    name?: StringWithAggregatesFilter<"ApiKey"> | string
    prefix?: StringWithAggregatesFilter<"ApiKey"> | string
    hashedKey?: StringWithAggregatesFilter<"ApiKey"> | string
    createdBy?: StringWithAggregatesFilter<"ApiKey"> | string
    permissions?: StringNullableListFilter<"ApiKey">
    requestsPerMinute?: IntWithAggregatesFilter<"ApiKey"> | number
    requestsPerDay?: IntWithAggregatesFilter<"ApiKey"> | number
    totalRequests?: IntWithAggregatesFilter<"ApiKey"> | number
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
    todayRequests?: IntWithAggregatesFilter<"ApiKey"> | number
    todayResetAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
    status?: EnumApiKeyStatusWithAggregatesFilter<"ApiKey"> | $Enums.ApiKeyStatus
    revokedAt?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
    revokedBy?: StringNullableWithAggregatesFilter<"ApiKey"> | string | null
    revokeReason?: StringNullableWithAggregatesFilter<"ApiKey"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
  }

  export type FeatureFlagWhereInput = {
    AND?: FeatureFlagWhereInput | FeatureFlagWhereInput[]
    OR?: FeatureFlagWhereInput[]
    NOT?: FeatureFlagWhereInput | FeatureFlagWhereInput[]
    id?: StringFilter<"FeatureFlag"> | string
    key?: StringFilter<"FeatureFlag"> | string
    displayName?: StringFilter<"FeatureFlag"> | string
    description?: StringFilter<"FeatureFlag"> | string
    category?: EnumFlagCategoryFilter<"FeatureFlag"> | $Enums.FlagCategory
    enabled?: BoolFilter<"FeatureFlag"> | boolean
    value?: JsonNullableFilter<"FeatureFlag">
    lastToggledBy?: StringNullableFilter<"FeatureFlag"> | string | null
    lastToggledAt?: DateTimeFilter<"FeatureFlag"> | Date | string
    toggleCount?: IntFilter<"FeatureFlag"> | number
    version?: IntFilter<"FeatureFlag"> | number
    createdAt?: DateTimeFilter<"FeatureFlag"> | Date | string
    updatedAt?: DateTimeFilter<"FeatureFlag"> | Date | string
  }

  export type FeatureFlagOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    category?: SortOrder
    enabled?: SortOrder
    value?: SortOrderInput | SortOrder
    lastToggledBy?: SortOrderInput | SortOrder
    lastToggledAt?: SortOrder
    toggleCount?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeatureFlagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: FeatureFlagWhereInput | FeatureFlagWhereInput[]
    OR?: FeatureFlagWhereInput[]
    NOT?: FeatureFlagWhereInput | FeatureFlagWhereInput[]
    displayName?: StringFilter<"FeatureFlag"> | string
    description?: StringFilter<"FeatureFlag"> | string
    category?: EnumFlagCategoryFilter<"FeatureFlag"> | $Enums.FlagCategory
    enabled?: BoolFilter<"FeatureFlag"> | boolean
    value?: JsonNullableFilter<"FeatureFlag">
    lastToggledBy?: StringNullableFilter<"FeatureFlag"> | string | null
    lastToggledAt?: DateTimeFilter<"FeatureFlag"> | Date | string
    toggleCount?: IntFilter<"FeatureFlag"> | number
    version?: IntFilter<"FeatureFlag"> | number
    createdAt?: DateTimeFilter<"FeatureFlag"> | Date | string
    updatedAt?: DateTimeFilter<"FeatureFlag"> | Date | string
  }, "id" | "key">

  export type FeatureFlagOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    category?: SortOrder
    enabled?: SortOrder
    value?: SortOrderInput | SortOrder
    lastToggledBy?: SortOrderInput | SortOrder
    lastToggledAt?: SortOrder
    toggleCount?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FeatureFlagCountOrderByAggregateInput
    _avg?: FeatureFlagAvgOrderByAggregateInput
    _max?: FeatureFlagMaxOrderByAggregateInput
    _min?: FeatureFlagMinOrderByAggregateInput
    _sum?: FeatureFlagSumOrderByAggregateInput
  }

  export type FeatureFlagScalarWhereWithAggregatesInput = {
    AND?: FeatureFlagScalarWhereWithAggregatesInput | FeatureFlagScalarWhereWithAggregatesInput[]
    OR?: FeatureFlagScalarWhereWithAggregatesInput[]
    NOT?: FeatureFlagScalarWhereWithAggregatesInput | FeatureFlagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FeatureFlag"> | string
    key?: StringWithAggregatesFilter<"FeatureFlag"> | string
    displayName?: StringWithAggregatesFilter<"FeatureFlag"> | string
    description?: StringWithAggregatesFilter<"FeatureFlag"> | string
    category?: EnumFlagCategoryWithAggregatesFilter<"FeatureFlag"> | $Enums.FlagCategory
    enabled?: BoolWithAggregatesFilter<"FeatureFlag"> | boolean
    value?: JsonNullableWithAggregatesFilter<"FeatureFlag">
    lastToggledBy?: StringNullableWithAggregatesFilter<"FeatureFlag"> | string | null
    lastToggledAt?: DateTimeWithAggregatesFilter<"FeatureFlag"> | Date | string
    toggleCount?: IntWithAggregatesFilter<"FeatureFlag"> | number
    version?: IntWithAggregatesFilter<"FeatureFlag"> | number
    createdAt?: DateTimeWithAggregatesFilter<"FeatureFlag"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FeatureFlag"> | Date | string
  }

  export type RemoteConfigWhereInput = {
    AND?: RemoteConfigWhereInput | RemoteConfigWhereInput[]
    OR?: RemoteConfigWhereInput[]
    NOT?: RemoteConfigWhereInput | RemoteConfigWhereInput[]
    id?: StringFilter<"RemoteConfig"> | string
    key?: StringFilter<"RemoteConfig"> | string
    displayName?: StringFilter<"RemoteConfig"> | string
    category?: EnumConfigCategoryFilter<"RemoteConfig"> | $Enums.ConfigCategory
    value?: JsonFilter<"RemoteConfig">
    valueType?: EnumConfigValueTypeFilter<"RemoteConfig"> | $Enums.ConfigValueType
    description?: StringFilter<"RemoteConfig"> | string
    lastUpdatedBy?: StringNullableFilter<"RemoteConfig"> | string | null
    version?: IntFilter<"RemoteConfig"> | number
    history?: JsonFilter<"RemoteConfig">
    createdAt?: DateTimeFilter<"RemoteConfig"> | Date | string
    updatedAt?: DateTimeFilter<"RemoteConfig"> | Date | string
  }

  export type RemoteConfigOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    displayName?: SortOrder
    category?: SortOrder
    value?: SortOrder
    valueType?: SortOrder
    description?: SortOrder
    lastUpdatedBy?: SortOrderInput | SortOrder
    version?: SortOrder
    history?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RemoteConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: RemoteConfigWhereInput | RemoteConfigWhereInput[]
    OR?: RemoteConfigWhereInput[]
    NOT?: RemoteConfigWhereInput | RemoteConfigWhereInput[]
    displayName?: StringFilter<"RemoteConfig"> | string
    category?: EnumConfigCategoryFilter<"RemoteConfig"> | $Enums.ConfigCategory
    value?: JsonFilter<"RemoteConfig">
    valueType?: EnumConfigValueTypeFilter<"RemoteConfig"> | $Enums.ConfigValueType
    description?: StringFilter<"RemoteConfig"> | string
    lastUpdatedBy?: StringNullableFilter<"RemoteConfig"> | string | null
    version?: IntFilter<"RemoteConfig"> | number
    history?: JsonFilter<"RemoteConfig">
    createdAt?: DateTimeFilter<"RemoteConfig"> | Date | string
    updatedAt?: DateTimeFilter<"RemoteConfig"> | Date | string
  }, "id" | "key">

  export type RemoteConfigOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    displayName?: SortOrder
    category?: SortOrder
    value?: SortOrder
    valueType?: SortOrder
    description?: SortOrder
    lastUpdatedBy?: SortOrderInput | SortOrder
    version?: SortOrder
    history?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RemoteConfigCountOrderByAggregateInput
    _avg?: RemoteConfigAvgOrderByAggregateInput
    _max?: RemoteConfigMaxOrderByAggregateInput
    _min?: RemoteConfigMinOrderByAggregateInput
    _sum?: RemoteConfigSumOrderByAggregateInput
  }

  export type RemoteConfigScalarWhereWithAggregatesInput = {
    AND?: RemoteConfigScalarWhereWithAggregatesInput | RemoteConfigScalarWhereWithAggregatesInput[]
    OR?: RemoteConfigScalarWhereWithAggregatesInput[]
    NOT?: RemoteConfigScalarWhereWithAggregatesInput | RemoteConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RemoteConfig"> | string
    key?: StringWithAggregatesFilter<"RemoteConfig"> | string
    displayName?: StringWithAggregatesFilter<"RemoteConfig"> | string
    category?: EnumConfigCategoryWithAggregatesFilter<"RemoteConfig"> | $Enums.ConfigCategory
    value?: JsonWithAggregatesFilter<"RemoteConfig">
    valueType?: EnumConfigValueTypeWithAggregatesFilter<"RemoteConfig"> | $Enums.ConfigValueType
    description?: StringWithAggregatesFilter<"RemoteConfig"> | string
    lastUpdatedBy?: StringNullableWithAggregatesFilter<"RemoteConfig"> | string | null
    version?: IntWithAggregatesFilter<"RemoteConfig"> | number
    history?: JsonWithAggregatesFilter<"RemoteConfig">
    createdAt?: DateTimeWithAggregatesFilter<"RemoteConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RemoteConfig"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    actorId?: StringFilter<"AuditLog"> | string
    actorEmail?: StringFilter<"AuditLog"> | string
    actorRole?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    resource?: StringFilter<"AuditLog"> | string
    resourceId?: StringNullableFilter<"AuditLog"> | string | null
    before?: JsonNullableFilter<"AuditLog">
    after?: JsonNullableFilter<"AuditLog">
    metadata?: JsonNullableFilter<"AuditLog">
    ip?: StringFilter<"AuditLog"> | string
    userAgent?: StringFilter<"AuditLog"> | string
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    actorId?: SortOrder
    actorEmail?: SortOrder
    actorRole?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    before?: SortOrderInput | SortOrder
    after?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    actorId?: StringFilter<"AuditLog"> | string
    actorEmail?: StringFilter<"AuditLog"> | string
    actorRole?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    resource?: StringFilter<"AuditLog"> | string
    resourceId?: StringNullableFilter<"AuditLog"> | string | null
    before?: JsonNullableFilter<"AuditLog">
    after?: JsonNullableFilter<"AuditLog">
    metadata?: JsonNullableFilter<"AuditLog">
    ip?: StringFilter<"AuditLog"> | string
    userAgent?: StringFilter<"AuditLog"> | string
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    actorId?: SortOrder
    actorEmail?: SortOrder
    actorRole?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    before?: SortOrderInput | SortOrder
    after?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    actorId?: StringWithAggregatesFilter<"AuditLog"> | string
    actorEmail?: StringWithAggregatesFilter<"AuditLog"> | string
    actorRole?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    resource?: StringWithAggregatesFilter<"AuditLog"> | string
    resourceId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    before?: JsonNullableWithAggregatesFilter<"AuditLog">
    after?: JsonNullableWithAggregatesFilter<"AuditLog">
    metadata?: JsonNullableWithAggregatesFilter<"AuditLog">
    ip?: StringWithAggregatesFilter<"AuditLog"> | string
    userAgent?: StringWithAggregatesFilter<"AuditLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    body?: StringFilter<"Notification"> | string
    data?: JsonNullableFilter<"Notification">
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    targetAudience?: EnumTargetAudienceFilter<"Notification"> | $Enums.TargetAudience
    targetUserIds?: StringNullableListFilter<"Notification">
    status?: EnumNotificationStatusFilter<"Notification"> | $Enums.NotificationStatus
    scheduledAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    sentAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    totalRecipients?: IntFilter<"Notification"> | number
    delivered?: IntFilter<"Notification"> | number
    opened?: IntFilter<"Notification"> | number
    failed?: IntFilter<"Notification"> | number
    createdBy?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
    data?: SortOrderInput | SortOrder
    type?: SortOrder
    targetAudience?: SortOrder
    targetUserIds?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    sentAt?: SortOrderInput | SortOrder
    totalRecipients?: SortOrder
    delivered?: SortOrder
    opened?: SortOrder
    failed?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    title?: StringFilter<"Notification"> | string
    body?: StringFilter<"Notification"> | string
    data?: JsonNullableFilter<"Notification">
    type?: EnumNotificationTypeFilter<"Notification"> | $Enums.NotificationType
    targetAudience?: EnumTargetAudienceFilter<"Notification"> | $Enums.TargetAudience
    targetUserIds?: StringNullableListFilter<"Notification">
    status?: EnumNotificationStatusFilter<"Notification"> | $Enums.NotificationStatus
    scheduledAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    sentAt?: DateTimeNullableFilter<"Notification"> | Date | string | null
    totalRecipients?: IntFilter<"Notification"> | number
    delivered?: IntFilter<"Notification"> | number
    opened?: IntFilter<"Notification"> | number
    failed?: IntFilter<"Notification"> | number
    createdBy?: StringFilter<"Notification"> | string
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    updatedAt?: DateTimeFilter<"Notification"> | Date | string
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
    data?: SortOrderInput | SortOrder
    type?: SortOrder
    targetAudience?: SortOrder
    targetUserIds?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    sentAt?: SortOrderInput | SortOrder
    totalRecipients?: SortOrder
    delivered?: SortOrder
    opened?: SortOrder
    failed?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    body?: StringWithAggregatesFilter<"Notification"> | string
    data?: JsonNullableWithAggregatesFilter<"Notification">
    type?: EnumNotificationTypeWithAggregatesFilter<"Notification"> | $Enums.NotificationType
    targetAudience?: EnumTargetAudienceWithAggregatesFilter<"Notification"> | $Enums.TargetAudience
    targetUserIds?: StringNullableListFilter<"Notification">
    status?: EnumNotificationStatusWithAggregatesFilter<"Notification"> | $Enums.NotificationStatus
    scheduledAt?: DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null
    sentAt?: DateTimeNullableWithAggregatesFilter<"Notification"> | Date | string | null
    totalRecipients?: IntWithAggregatesFilter<"Notification"> | number
    delivered?: IntWithAggregatesFilter<"Notification"> | number
    opened?: IntWithAggregatesFilter<"Notification"> | number
    failed?: IntWithAggregatesFilter<"Notification"> | number
    createdBy?: StringWithAggregatesFilter<"Notification"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type PushTokenWhereInput = {
    AND?: PushTokenWhereInput | PushTokenWhereInput[]
    OR?: PushTokenWhereInput[]
    NOT?: PushTokenWhereInput | PushTokenWhereInput[]
    id?: StringFilter<"PushToken"> | string
    userId?: StringFilter<"PushToken"> | string
    token?: StringFilter<"PushToken"> | string
    platform?: StringFilter<"PushToken"> | string
    isActive?: BoolFilter<"PushToken"> | boolean
    lastUsedAt?: DateTimeFilter<"PushToken"> | Date | string
    createdAt?: DateTimeFilter<"PushToken"> | Date | string
    updatedAt?: DateTimeFilter<"PushToken"> | Date | string
  }

  export type PushTokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    platform?: SortOrder
    isActive?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PushTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: PushTokenWhereInput | PushTokenWhereInput[]
    OR?: PushTokenWhereInput[]
    NOT?: PushTokenWhereInput | PushTokenWhereInput[]
    userId?: StringFilter<"PushToken"> | string
    platform?: StringFilter<"PushToken"> | string
    isActive?: BoolFilter<"PushToken"> | boolean
    lastUsedAt?: DateTimeFilter<"PushToken"> | Date | string
    createdAt?: DateTimeFilter<"PushToken"> | Date | string
    updatedAt?: DateTimeFilter<"PushToken"> | Date | string
  }, "id" | "token">

  export type PushTokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    platform?: SortOrder
    isActive?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PushTokenCountOrderByAggregateInput
    _max?: PushTokenMaxOrderByAggregateInput
    _min?: PushTokenMinOrderByAggregateInput
  }

  export type PushTokenScalarWhereWithAggregatesInput = {
    AND?: PushTokenScalarWhereWithAggregatesInput | PushTokenScalarWhereWithAggregatesInput[]
    OR?: PushTokenScalarWhereWithAggregatesInput[]
    NOT?: PushTokenScalarWhereWithAggregatesInput | PushTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PushToken"> | string
    userId?: StringWithAggregatesFilter<"PushToken"> | string
    token?: StringWithAggregatesFilter<"PushToken"> | string
    platform?: StringWithAggregatesFilter<"PushToken"> | string
    isActive?: BoolWithAggregatesFilter<"PushToken"> | boolean
    lastUsedAt?: DateTimeWithAggregatesFilter<"PushToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"PushToken"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PushToken"> | Date | string
  }

  export type RegionWhereInput = {
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    id?: StringFilter<"Region"> | string
    provider?: EnumCloudProviderFilter<"Region"> | $Enums.CloudProvider
    code?: StringFilter<"Region"> | string
    name?: StringFilter<"Region"> | string
    country?: StringFilter<"Region"> | string
    continent?: StringFilter<"Region"> | string
    gridIntensity?: FloatFilter<"Region"> | number
    gridIntensitySource?: StringFilter<"Region"> | string
    renewablePercentage?: FloatNullableFilter<"Region"> | number | null
    pue?: FloatFilter<"Region"> | number
    lat?: FloatFilter<"Region"> | number
    lng?: FloatFilter<"Region"> | number
    availableInstanceFamilies?: StringNullableListFilter<"Region">
    isPopular?: BoolFilter<"Region"> | boolean
  }

  export type RegionOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    code?: SortOrder
    name?: SortOrder
    country?: SortOrder
    continent?: SortOrder
    gridIntensity?: SortOrder
    gridIntensitySource?: SortOrder
    renewablePercentage?: SortOrderInput | SortOrder
    pue?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    availableInstanceFamilies?: SortOrder
    isPopular?: SortOrder
  }

  export type RegionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_code?: RegionProviderCodeCompoundUniqueInput
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    provider?: EnumCloudProviderFilter<"Region"> | $Enums.CloudProvider
    code?: StringFilter<"Region"> | string
    name?: StringFilter<"Region"> | string
    country?: StringFilter<"Region"> | string
    continent?: StringFilter<"Region"> | string
    gridIntensity?: FloatFilter<"Region"> | number
    gridIntensitySource?: StringFilter<"Region"> | string
    renewablePercentage?: FloatNullableFilter<"Region"> | number | null
    pue?: FloatFilter<"Region"> | number
    lat?: FloatFilter<"Region"> | number
    lng?: FloatFilter<"Region"> | number
    availableInstanceFamilies?: StringNullableListFilter<"Region">
    isPopular?: BoolFilter<"Region"> | boolean
  }, "id" | "provider_code">

  export type RegionOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    code?: SortOrder
    name?: SortOrder
    country?: SortOrder
    continent?: SortOrder
    gridIntensity?: SortOrder
    gridIntensitySource?: SortOrder
    renewablePercentage?: SortOrderInput | SortOrder
    pue?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    availableInstanceFamilies?: SortOrder
    isPopular?: SortOrder
    _count?: RegionCountOrderByAggregateInput
    _avg?: RegionAvgOrderByAggregateInput
    _max?: RegionMaxOrderByAggregateInput
    _min?: RegionMinOrderByAggregateInput
    _sum?: RegionSumOrderByAggregateInput
  }

  export type RegionScalarWhereWithAggregatesInput = {
    AND?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    OR?: RegionScalarWhereWithAggregatesInput[]
    NOT?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Region"> | string
    provider?: EnumCloudProviderWithAggregatesFilter<"Region"> | $Enums.CloudProvider
    code?: StringWithAggregatesFilter<"Region"> | string
    name?: StringWithAggregatesFilter<"Region"> | string
    country?: StringWithAggregatesFilter<"Region"> | string
    continent?: StringWithAggregatesFilter<"Region"> | string
    gridIntensity?: FloatWithAggregatesFilter<"Region"> | number
    gridIntensitySource?: StringWithAggregatesFilter<"Region"> | string
    renewablePercentage?: FloatNullableWithAggregatesFilter<"Region"> | number | null
    pue?: FloatWithAggregatesFilter<"Region"> | number
    lat?: FloatWithAggregatesFilter<"Region"> | number
    lng?: FloatWithAggregatesFilter<"Region"> | number
    availableInstanceFamilies?: StringNullableListFilter<"Region">
    isPopular?: BoolWithAggregatesFilter<"Region"> | boolean
  }

  export type InstanceTypeWhereInput = {
    AND?: InstanceTypeWhereInput | InstanceTypeWhereInput[]
    OR?: InstanceTypeWhereInput[]
    NOT?: InstanceTypeWhereInput | InstanceTypeWhereInput[]
    id?: StringFilter<"InstanceType"> | string
    provider?: EnumCloudProviderFilter<"InstanceType"> | $Enums.CloudProvider
    name?: StringFilter<"InstanceType"> | string
    displayName?: StringFilter<"InstanceType"> | string
    family?: StringFilter<"InstanceType"> | string
    category?: EnumInstanceCategoryFilter<"InstanceType"> | $Enums.InstanceCategory
    vCPUs?: IntFilter<"InstanceType"> | number
    memoryGB?: FloatFilter<"InstanceType"> | number
    cpuTdpWatts?: FloatFilter<"InstanceType"> | number
    storageType?: EnumStorageTypeFilter<"InstanceType"> | $Enums.StorageType
    onDemandHourlyUsd?: FloatNullableFilter<"InstanceType"> | number | null
    isPopular?: BoolFilter<"InstanceType"> | boolean
  }

  export type InstanceTypeOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    name?: SortOrder
    displayName?: SortOrder
    family?: SortOrder
    category?: SortOrder
    vCPUs?: SortOrder
    memoryGB?: SortOrder
    cpuTdpWatts?: SortOrder
    storageType?: SortOrder
    onDemandHourlyUsd?: SortOrderInput | SortOrder
    isPopular?: SortOrder
  }

  export type InstanceTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_name?: InstanceTypeProviderNameCompoundUniqueInput
    AND?: InstanceTypeWhereInput | InstanceTypeWhereInput[]
    OR?: InstanceTypeWhereInput[]
    NOT?: InstanceTypeWhereInput | InstanceTypeWhereInput[]
    provider?: EnumCloudProviderFilter<"InstanceType"> | $Enums.CloudProvider
    name?: StringFilter<"InstanceType"> | string
    displayName?: StringFilter<"InstanceType"> | string
    family?: StringFilter<"InstanceType"> | string
    category?: EnumInstanceCategoryFilter<"InstanceType"> | $Enums.InstanceCategory
    vCPUs?: IntFilter<"InstanceType"> | number
    memoryGB?: FloatFilter<"InstanceType"> | number
    cpuTdpWatts?: FloatFilter<"InstanceType"> | number
    storageType?: EnumStorageTypeFilter<"InstanceType"> | $Enums.StorageType
    onDemandHourlyUsd?: FloatNullableFilter<"InstanceType"> | number | null
    isPopular?: BoolFilter<"InstanceType"> | boolean
  }, "id" | "provider_name">

  export type InstanceTypeOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    name?: SortOrder
    displayName?: SortOrder
    family?: SortOrder
    category?: SortOrder
    vCPUs?: SortOrder
    memoryGB?: SortOrder
    cpuTdpWatts?: SortOrder
    storageType?: SortOrder
    onDemandHourlyUsd?: SortOrderInput | SortOrder
    isPopular?: SortOrder
    _count?: InstanceTypeCountOrderByAggregateInput
    _avg?: InstanceTypeAvgOrderByAggregateInput
    _max?: InstanceTypeMaxOrderByAggregateInput
    _min?: InstanceTypeMinOrderByAggregateInput
    _sum?: InstanceTypeSumOrderByAggregateInput
  }

  export type InstanceTypeScalarWhereWithAggregatesInput = {
    AND?: InstanceTypeScalarWhereWithAggregatesInput | InstanceTypeScalarWhereWithAggregatesInput[]
    OR?: InstanceTypeScalarWhereWithAggregatesInput[]
    NOT?: InstanceTypeScalarWhereWithAggregatesInput | InstanceTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InstanceType"> | string
    provider?: EnumCloudProviderWithAggregatesFilter<"InstanceType"> | $Enums.CloudProvider
    name?: StringWithAggregatesFilter<"InstanceType"> | string
    displayName?: StringWithAggregatesFilter<"InstanceType"> | string
    family?: StringWithAggregatesFilter<"InstanceType"> | string
    category?: EnumInstanceCategoryWithAggregatesFilter<"InstanceType"> | $Enums.InstanceCategory
    vCPUs?: IntWithAggregatesFilter<"InstanceType"> | number
    memoryGB?: FloatWithAggregatesFilter<"InstanceType"> | number
    cpuTdpWatts?: FloatWithAggregatesFilter<"InstanceType"> | number
    storageType?: EnumStorageTypeWithAggregatesFilter<"InstanceType"> | $Enums.StorageType
    onDemandHourlyUsd?: FloatNullableWithAggregatesFilter<"InstanceType"> | number | null
    isPopular?: BoolWithAggregatesFilter<"InstanceType"> | boolean
  }

  export type ProviderWhereInput = {
    AND?: ProviderWhereInput | ProviderWhereInput[]
    OR?: ProviderWhereInput[]
    NOT?: ProviderWhereInput | ProviderWhereInput[]
    id?: StringFilter<"Provider"> | string
    key?: EnumCloudProviderFilter<"Provider"> | $Enums.CloudProvider
    name?: StringFilter<"Provider"> | string
    shortName?: StringFilter<"Provider"> | string
    logoUrl?: StringNullableFilter<"Provider"> | string | null
    regionCount?: IntFilter<"Provider"> | number
    websiteUrl?: StringNullableFilter<"Provider"> | string | null
    carbonPageUrl?: StringNullableFilter<"Provider"> | string | null
    isActive?: BoolFilter<"Provider"> | boolean
    createdAt?: DateTimeFilter<"Provider"> | Date | string
  }

  export type ProviderOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    shortName?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    regionCount?: SortOrder
    websiteUrl?: SortOrderInput | SortOrder
    carbonPageUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type ProviderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: $Enums.CloudProvider
    AND?: ProviderWhereInput | ProviderWhereInput[]
    OR?: ProviderWhereInput[]
    NOT?: ProviderWhereInput | ProviderWhereInput[]
    name?: StringFilter<"Provider"> | string
    shortName?: StringFilter<"Provider"> | string
    logoUrl?: StringNullableFilter<"Provider"> | string | null
    regionCount?: IntFilter<"Provider"> | number
    websiteUrl?: StringNullableFilter<"Provider"> | string | null
    carbonPageUrl?: StringNullableFilter<"Provider"> | string | null
    isActive?: BoolFilter<"Provider"> | boolean
    createdAt?: DateTimeFilter<"Provider"> | Date | string
  }, "id" | "key">

  export type ProviderOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    shortName?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    regionCount?: SortOrder
    websiteUrl?: SortOrderInput | SortOrder
    carbonPageUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: ProviderCountOrderByAggregateInput
    _avg?: ProviderAvgOrderByAggregateInput
    _max?: ProviderMaxOrderByAggregateInput
    _min?: ProviderMinOrderByAggregateInput
    _sum?: ProviderSumOrderByAggregateInput
  }

  export type ProviderScalarWhereWithAggregatesInput = {
    AND?: ProviderScalarWhereWithAggregatesInput | ProviderScalarWhereWithAggregatesInput[]
    OR?: ProviderScalarWhereWithAggregatesInput[]
    NOT?: ProviderScalarWhereWithAggregatesInput | ProviderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Provider"> | string
    key?: EnumCloudProviderWithAggregatesFilter<"Provider"> | $Enums.CloudProvider
    name?: StringWithAggregatesFilter<"Provider"> | string
    shortName?: StringWithAggregatesFilter<"Provider"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"Provider"> | string | null
    regionCount?: IntWithAggregatesFilter<"Provider"> | number
    websiteUrl?: StringNullableWithAggregatesFilter<"Provider"> | string | null
    carbonPageUrl?: StringNullableWithAggregatesFilter<"Provider"> | string | null
    isActive?: BoolWithAggregatesFilter<"Provider"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Provider"> | Date | string
  }

  export type MobileUserCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    deviceId?: string | null
    pushToken?: string | null
    country?: string | null
    lastActiveAt?: Date | string
    calculationCount?: number
    totalCO2Tracked?: number
    carbonAlertThreshold?: number
    theme?: string
    notificationsEnabled?: boolean
    defaultProvider?: $Enums.CloudProvider | null
    status?: $Enums.MobileUserStatus
    banReason?: string | null
    bannedAt?: Date | string | null
    bannedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    calculations?: CalculationCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type MobileUserUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    deviceId?: string | null
    pushToken?: string | null
    country?: string | null
    lastActiveAt?: Date | string
    calculationCount?: number
    totalCO2Tracked?: number
    carbonAlertThreshold?: number
    theme?: string
    notificationsEnabled?: boolean
    defaultProvider?: $Enums.CloudProvider | null
    status?: $Enums.MobileUserStatus
    banReason?: string | null
    bannedAt?: Date | string | null
    bannedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    calculations?: CalculationUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type MobileUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calculationCount?: IntFieldUpdateOperationsInput | number
    totalCO2Tracked?: FloatFieldUpdateOperationsInput | number
    carbonAlertThreshold?: FloatFieldUpdateOperationsInput | number
    theme?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    defaultProvider?: NullableEnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider | null
    status?: EnumMobileUserStatusFieldUpdateOperationsInput | $Enums.MobileUserStatus
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    bannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calculations?: CalculationUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type MobileUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calculationCount?: IntFieldUpdateOperationsInput | number
    totalCO2Tracked?: FloatFieldUpdateOperationsInput | number
    carbonAlertThreshold?: FloatFieldUpdateOperationsInput | number
    theme?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    defaultProvider?: NullableEnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider | null
    status?: EnumMobileUserStatusFieldUpdateOperationsInput | $Enums.MobileUserStatus
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    bannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calculations?: CalculationUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MobileUserCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    deviceId?: string | null
    pushToken?: string | null
    country?: string | null
    lastActiveAt?: Date | string
    calculationCount?: number
    totalCO2Tracked?: number
    carbonAlertThreshold?: number
    theme?: string
    notificationsEnabled?: boolean
    defaultProvider?: $Enums.CloudProvider | null
    status?: $Enums.MobileUserStatus
    banReason?: string | null
    bannedAt?: Date | string | null
    bannedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MobileUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calculationCount?: IntFieldUpdateOperationsInput | number
    totalCO2Tracked?: FloatFieldUpdateOperationsInput | number
    carbonAlertThreshold?: FloatFieldUpdateOperationsInput | number
    theme?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    defaultProvider?: NullableEnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider | null
    status?: EnumMobileUserStatusFieldUpdateOperationsInput | $Enums.MobileUserStatus
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    bannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MobileUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calculationCount?: IntFieldUpdateOperationsInput | number
    totalCO2Tracked?: FloatFieldUpdateOperationsInput | number
    carbonAlertThreshold?: FloatFieldUpdateOperationsInput | number
    theme?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    defaultProvider?: NullableEnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider | null
    status?: EnumMobileUserStatusFieldUpdateOperationsInput | $Enums.MobileUserStatus
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    bannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalculationCreateInput = {
    id?: string
    provider: $Enums.CloudProvider
    region: string
    regionName: string
    instanceType: string
    instanceCount: number
    hoursPerMonth: number
    cpuUtilization: number
    storageGB?: number
    ramGB: number
    energyComputeKwh: number
    energyMemoryKwh: number
    energyStorageKwh: number
    energyTotalKwh: number
    co2GramsMonth: number
    co2KgMonth: number
    co2GramsHour: number
    gridIntensity: number
    gridIntensitySource?: $Enums.GridIntensitySource
    computePercentage: number
    memoryPercentage: number
    storagePercentage: number
    rating: $Enums.CarbonRating
    ratingColor: string
    realWorldEquivalent: string
    recommendation: string
    recommendedRegion?: string | null
    potentialReductionPct?: number | null
    source?: $Enums.CalculationSource
    apiKeyId?: string | null
    responseTimeMs: number
    sdkVersion?: string | null
    createdAt?: Date | string
    user: MobileUserCreateNestedOneWithoutCalculationsInput
  }

  export type CalculationUncheckedCreateInput = {
    id?: string
    userId: string
    provider: $Enums.CloudProvider
    region: string
    regionName: string
    instanceType: string
    instanceCount: number
    hoursPerMonth: number
    cpuUtilization: number
    storageGB?: number
    ramGB: number
    energyComputeKwh: number
    energyMemoryKwh: number
    energyStorageKwh: number
    energyTotalKwh: number
    co2GramsMonth: number
    co2KgMonth: number
    co2GramsHour: number
    gridIntensity: number
    gridIntensitySource?: $Enums.GridIntensitySource
    computePercentage: number
    memoryPercentage: number
    storagePercentage: number
    rating: $Enums.CarbonRating
    ratingColor: string
    realWorldEquivalent: string
    recommendation: string
    recommendedRegion?: string | null
    potentialReductionPct?: number | null
    source?: $Enums.CalculationSource
    apiKeyId?: string | null
    responseTimeMs: number
    sdkVersion?: string | null
    createdAt?: Date | string
  }

  export type CalculationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    region?: StringFieldUpdateOperationsInput | string
    regionName?: StringFieldUpdateOperationsInput | string
    instanceType?: StringFieldUpdateOperationsInput | string
    instanceCount?: IntFieldUpdateOperationsInput | number
    hoursPerMonth?: IntFieldUpdateOperationsInput | number
    cpuUtilization?: FloatFieldUpdateOperationsInput | number
    storageGB?: FloatFieldUpdateOperationsInput | number
    ramGB?: FloatFieldUpdateOperationsInput | number
    energyComputeKwh?: FloatFieldUpdateOperationsInput | number
    energyMemoryKwh?: FloatFieldUpdateOperationsInput | number
    energyStorageKwh?: FloatFieldUpdateOperationsInput | number
    energyTotalKwh?: FloatFieldUpdateOperationsInput | number
    co2GramsMonth?: FloatFieldUpdateOperationsInput | number
    co2KgMonth?: FloatFieldUpdateOperationsInput | number
    co2GramsHour?: FloatFieldUpdateOperationsInput | number
    gridIntensity?: FloatFieldUpdateOperationsInput | number
    gridIntensitySource?: EnumGridIntensitySourceFieldUpdateOperationsInput | $Enums.GridIntensitySource
    computePercentage?: FloatFieldUpdateOperationsInput | number
    memoryPercentage?: FloatFieldUpdateOperationsInput | number
    storagePercentage?: FloatFieldUpdateOperationsInput | number
    rating?: EnumCarbonRatingFieldUpdateOperationsInput | $Enums.CarbonRating
    ratingColor?: StringFieldUpdateOperationsInput | string
    realWorldEquivalent?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    recommendedRegion?: NullableStringFieldUpdateOperationsInput | string | null
    potentialReductionPct?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: EnumCalculationSourceFieldUpdateOperationsInput | $Enums.CalculationSource
    apiKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    responseTimeMs?: IntFieldUpdateOperationsInput | number
    sdkVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: MobileUserUpdateOneRequiredWithoutCalculationsNestedInput
  }

  export type CalculationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    region?: StringFieldUpdateOperationsInput | string
    regionName?: StringFieldUpdateOperationsInput | string
    instanceType?: StringFieldUpdateOperationsInput | string
    instanceCount?: IntFieldUpdateOperationsInput | number
    hoursPerMonth?: IntFieldUpdateOperationsInput | number
    cpuUtilization?: FloatFieldUpdateOperationsInput | number
    storageGB?: FloatFieldUpdateOperationsInput | number
    ramGB?: FloatFieldUpdateOperationsInput | number
    energyComputeKwh?: FloatFieldUpdateOperationsInput | number
    energyMemoryKwh?: FloatFieldUpdateOperationsInput | number
    energyStorageKwh?: FloatFieldUpdateOperationsInput | number
    energyTotalKwh?: FloatFieldUpdateOperationsInput | number
    co2GramsMonth?: FloatFieldUpdateOperationsInput | number
    co2KgMonth?: FloatFieldUpdateOperationsInput | number
    co2GramsHour?: FloatFieldUpdateOperationsInput | number
    gridIntensity?: FloatFieldUpdateOperationsInput | number
    gridIntensitySource?: EnumGridIntensitySourceFieldUpdateOperationsInput | $Enums.GridIntensitySource
    computePercentage?: FloatFieldUpdateOperationsInput | number
    memoryPercentage?: FloatFieldUpdateOperationsInput | number
    storagePercentage?: FloatFieldUpdateOperationsInput | number
    rating?: EnumCarbonRatingFieldUpdateOperationsInput | $Enums.CarbonRating
    ratingColor?: StringFieldUpdateOperationsInput | string
    realWorldEquivalent?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    recommendedRegion?: NullableStringFieldUpdateOperationsInput | string | null
    potentialReductionPct?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: EnumCalculationSourceFieldUpdateOperationsInput | $Enums.CalculationSource
    apiKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    responseTimeMs?: IntFieldUpdateOperationsInput | number
    sdkVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalculationCreateManyInput = {
    id?: string
    userId: string
    provider: $Enums.CloudProvider
    region: string
    regionName: string
    instanceType: string
    instanceCount: number
    hoursPerMonth: number
    cpuUtilization: number
    storageGB?: number
    ramGB: number
    energyComputeKwh: number
    energyMemoryKwh: number
    energyStorageKwh: number
    energyTotalKwh: number
    co2GramsMonth: number
    co2KgMonth: number
    co2GramsHour: number
    gridIntensity: number
    gridIntensitySource?: $Enums.GridIntensitySource
    computePercentage: number
    memoryPercentage: number
    storagePercentage: number
    rating: $Enums.CarbonRating
    ratingColor: string
    realWorldEquivalent: string
    recommendation: string
    recommendedRegion?: string | null
    potentialReductionPct?: number | null
    source?: $Enums.CalculationSource
    apiKeyId?: string | null
    responseTimeMs: number
    sdkVersion?: string | null
    createdAt?: Date | string
  }

  export type CalculationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    region?: StringFieldUpdateOperationsInput | string
    regionName?: StringFieldUpdateOperationsInput | string
    instanceType?: StringFieldUpdateOperationsInput | string
    instanceCount?: IntFieldUpdateOperationsInput | number
    hoursPerMonth?: IntFieldUpdateOperationsInput | number
    cpuUtilization?: FloatFieldUpdateOperationsInput | number
    storageGB?: FloatFieldUpdateOperationsInput | number
    ramGB?: FloatFieldUpdateOperationsInput | number
    energyComputeKwh?: FloatFieldUpdateOperationsInput | number
    energyMemoryKwh?: FloatFieldUpdateOperationsInput | number
    energyStorageKwh?: FloatFieldUpdateOperationsInput | number
    energyTotalKwh?: FloatFieldUpdateOperationsInput | number
    co2GramsMonth?: FloatFieldUpdateOperationsInput | number
    co2KgMonth?: FloatFieldUpdateOperationsInput | number
    co2GramsHour?: FloatFieldUpdateOperationsInput | number
    gridIntensity?: FloatFieldUpdateOperationsInput | number
    gridIntensitySource?: EnumGridIntensitySourceFieldUpdateOperationsInput | $Enums.GridIntensitySource
    computePercentage?: FloatFieldUpdateOperationsInput | number
    memoryPercentage?: FloatFieldUpdateOperationsInput | number
    storagePercentage?: FloatFieldUpdateOperationsInput | number
    rating?: EnumCarbonRatingFieldUpdateOperationsInput | $Enums.CarbonRating
    ratingColor?: StringFieldUpdateOperationsInput | string
    realWorldEquivalent?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    recommendedRegion?: NullableStringFieldUpdateOperationsInput | string | null
    potentialReductionPct?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: EnumCalculationSourceFieldUpdateOperationsInput | $Enums.CalculationSource
    apiKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    responseTimeMs?: IntFieldUpdateOperationsInput | number
    sdkVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalculationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    provider?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    region?: StringFieldUpdateOperationsInput | string
    regionName?: StringFieldUpdateOperationsInput | string
    instanceType?: StringFieldUpdateOperationsInput | string
    instanceCount?: IntFieldUpdateOperationsInput | number
    hoursPerMonth?: IntFieldUpdateOperationsInput | number
    cpuUtilization?: FloatFieldUpdateOperationsInput | number
    storageGB?: FloatFieldUpdateOperationsInput | number
    ramGB?: FloatFieldUpdateOperationsInput | number
    energyComputeKwh?: FloatFieldUpdateOperationsInput | number
    energyMemoryKwh?: FloatFieldUpdateOperationsInput | number
    energyStorageKwh?: FloatFieldUpdateOperationsInput | number
    energyTotalKwh?: FloatFieldUpdateOperationsInput | number
    co2GramsMonth?: FloatFieldUpdateOperationsInput | number
    co2KgMonth?: FloatFieldUpdateOperationsInput | number
    co2GramsHour?: FloatFieldUpdateOperationsInput | number
    gridIntensity?: FloatFieldUpdateOperationsInput | number
    gridIntensitySource?: EnumGridIntensitySourceFieldUpdateOperationsInput | $Enums.GridIntensitySource
    computePercentage?: FloatFieldUpdateOperationsInput | number
    memoryPercentage?: FloatFieldUpdateOperationsInput | number
    storagePercentage?: FloatFieldUpdateOperationsInput | number
    rating?: EnumCarbonRatingFieldUpdateOperationsInput | $Enums.CarbonRating
    ratingColor?: StringFieldUpdateOperationsInput | string
    realWorldEquivalent?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    recommendedRegion?: NullableStringFieldUpdateOperationsInput | string | null
    potentialReductionPct?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: EnumCalculationSourceFieldUpdateOperationsInput | $Enums.CalculationSource
    apiKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    responseTimeMs?: IntFieldUpdateOperationsInput | number
    sdkVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    refreshToken: string
    platform?: string | null
    osVersion?: string | null
    appVersion?: string | null
    deviceModel?: string | null
    ip?: string | null
    isActive?: boolean
    lastActivityAt?: Date | string
    expiresAt: Date | string
    createdAt?: Date | string
    user: MobileUserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userId: string
    refreshToken: string
    platform?: string | null
    osVersion?: string | null
    appVersion?: string | null
    deviceModel?: string | null
    ip?: string | null
    isActive?: boolean
    lastActivityAt?: Date | string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    osVersion?: NullableStringFieldUpdateOperationsInput | string | null
    appVersion?: NullableStringFieldUpdateOperationsInput | string | null
    deviceModel?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: MobileUserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    osVersion?: NullableStringFieldUpdateOperationsInput | string | null
    appVersion?: NullableStringFieldUpdateOperationsInput | string | null
    deviceModel?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    userId: string
    refreshToken: string
    platform?: string | null
    osVersion?: string | null
    appVersion?: string | null
    deviceModel?: string | null
    ip?: string | null
    isActive?: boolean
    lastActivityAt?: Date | string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    osVersion?: NullableStringFieldUpdateOperationsInput | string | null
    appVersion?: NullableStringFieldUpdateOperationsInput | string | null
    deviceModel?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    osVersion?: NullableStringFieldUpdateOperationsInput | string | null
    appVersion?: NullableStringFieldUpdateOperationsInput | string | null
    deviceModel?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyCreateInput = {
    id?: string
    name: string
    prefix: string
    hashedKey: string
    createdBy: string
    permissions?: ApiKeyCreatepermissionsInput | string[]
    requestsPerMinute?: number
    requestsPerDay?: number
    totalRequests?: number
    lastUsedAt?: Date | string | null
    todayRequests?: number
    todayResetAt?: Date | string
    status?: $Enums.ApiKeyStatus
    revokedAt?: Date | string | null
    revokedBy?: string | null
    revokeReason?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUncheckedCreateInput = {
    id?: string
    name: string
    prefix: string
    hashedKey: string
    createdBy: string
    permissions?: ApiKeyCreatepermissionsInput | string[]
    requestsPerMinute?: number
    requestsPerDay?: number
    totalRequests?: number
    lastUsedAt?: Date | string | null
    todayRequests?: number
    todayResetAt?: Date | string
    status?: $Enums.ApiKeyStatus
    revokedAt?: Date | string | null
    revokedBy?: string | null
    revokeReason?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    hashedKey?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    permissions?: ApiKeyUpdatepermissionsInput | string[]
    requestsPerMinute?: IntFieldUpdateOperationsInput | number
    requestsPerDay?: IntFieldUpdateOperationsInput | number
    totalRequests?: IntFieldUpdateOperationsInput | number
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    todayRequests?: IntFieldUpdateOperationsInput | number
    todayResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumApiKeyStatusFieldUpdateOperationsInput | $Enums.ApiKeyStatus
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    revokeReason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    hashedKey?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    permissions?: ApiKeyUpdatepermissionsInput | string[]
    requestsPerMinute?: IntFieldUpdateOperationsInput | number
    requestsPerDay?: IntFieldUpdateOperationsInput | number
    totalRequests?: IntFieldUpdateOperationsInput | number
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    todayRequests?: IntFieldUpdateOperationsInput | number
    todayResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumApiKeyStatusFieldUpdateOperationsInput | $Enums.ApiKeyStatus
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    revokeReason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyCreateManyInput = {
    id?: string
    name: string
    prefix: string
    hashedKey: string
    createdBy: string
    permissions?: ApiKeyCreatepermissionsInput | string[]
    requestsPerMinute?: number
    requestsPerDay?: number
    totalRequests?: number
    lastUsedAt?: Date | string | null
    todayRequests?: number
    todayResetAt?: Date | string
    status?: $Enums.ApiKeyStatus
    revokedAt?: Date | string | null
    revokedBy?: string | null
    revokeReason?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    hashedKey?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    permissions?: ApiKeyUpdatepermissionsInput | string[]
    requestsPerMinute?: IntFieldUpdateOperationsInput | number
    requestsPerDay?: IntFieldUpdateOperationsInput | number
    totalRequests?: IntFieldUpdateOperationsInput | number
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    todayRequests?: IntFieldUpdateOperationsInput | number
    todayResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumApiKeyStatusFieldUpdateOperationsInput | $Enums.ApiKeyStatus
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    revokeReason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    prefix?: StringFieldUpdateOperationsInput | string
    hashedKey?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    permissions?: ApiKeyUpdatepermissionsInput | string[]
    requestsPerMinute?: IntFieldUpdateOperationsInput | number
    requestsPerDay?: IntFieldUpdateOperationsInput | number
    totalRequests?: IntFieldUpdateOperationsInput | number
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    todayRequests?: IntFieldUpdateOperationsInput | number
    todayResetAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumApiKeyStatusFieldUpdateOperationsInput | $Enums.ApiKeyStatus
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedBy?: NullableStringFieldUpdateOperationsInput | string | null
    revokeReason?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureFlagCreateInput = {
    id?: string
    key: string
    displayName: string
    description?: string
    category: $Enums.FlagCategory
    enabled?: boolean
    value?: NullableJsonNullValueInput | InputJsonValue
    lastToggledBy?: string | null
    lastToggledAt?: Date | string
    toggleCount?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeatureFlagUncheckedCreateInput = {
    id?: string
    key: string
    displayName: string
    description?: string
    category: $Enums.FlagCategory
    enabled?: boolean
    value?: NullableJsonNullValueInput | InputJsonValue
    lastToggledBy?: string | null
    lastToggledAt?: Date | string
    toggleCount?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeatureFlagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumFlagCategoryFieldUpdateOperationsInput | $Enums.FlagCategory
    enabled?: BoolFieldUpdateOperationsInput | boolean
    value?: NullableJsonNullValueInput | InputJsonValue
    lastToggledBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastToggledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    toggleCount?: IntFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureFlagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumFlagCategoryFieldUpdateOperationsInput | $Enums.FlagCategory
    enabled?: BoolFieldUpdateOperationsInput | boolean
    value?: NullableJsonNullValueInput | InputJsonValue
    lastToggledBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastToggledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    toggleCount?: IntFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureFlagCreateManyInput = {
    id?: string
    key: string
    displayName: string
    description?: string
    category: $Enums.FlagCategory
    enabled?: boolean
    value?: NullableJsonNullValueInput | InputJsonValue
    lastToggledBy?: string | null
    lastToggledAt?: Date | string
    toggleCount?: number
    version?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeatureFlagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumFlagCategoryFieldUpdateOperationsInput | $Enums.FlagCategory
    enabled?: BoolFieldUpdateOperationsInput | boolean
    value?: NullableJsonNullValueInput | InputJsonValue
    lastToggledBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastToggledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    toggleCount?: IntFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeatureFlagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumFlagCategoryFieldUpdateOperationsInput | $Enums.FlagCategory
    enabled?: BoolFieldUpdateOperationsInput | boolean
    value?: NullableJsonNullValueInput | InputJsonValue
    lastToggledBy?: NullableStringFieldUpdateOperationsInput | string | null
    lastToggledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    toggleCount?: IntFieldUpdateOperationsInput | number
    version?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RemoteConfigCreateInput = {
    id?: string
    key: string
    displayName: string
    category: $Enums.ConfigCategory
    value: JsonNullValueInput | InputJsonValue
    valueType: $Enums.ConfigValueType
    description?: string
    lastUpdatedBy?: string | null
    version?: number
    history?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RemoteConfigUncheckedCreateInput = {
    id?: string
    key: string
    displayName: string
    category: $Enums.ConfigCategory
    value: JsonNullValueInput | InputJsonValue
    valueType: $Enums.ConfigValueType
    description?: string
    lastUpdatedBy?: string | null
    version?: number
    history?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RemoteConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    category?: EnumConfigCategoryFieldUpdateOperationsInput | $Enums.ConfigCategory
    value?: JsonNullValueInput | InputJsonValue
    valueType?: EnumConfigValueTypeFieldUpdateOperationsInput | $Enums.ConfigValueType
    description?: StringFieldUpdateOperationsInput | string
    lastUpdatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    history?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RemoteConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    category?: EnumConfigCategoryFieldUpdateOperationsInput | $Enums.ConfigCategory
    value?: JsonNullValueInput | InputJsonValue
    valueType?: EnumConfigValueTypeFieldUpdateOperationsInput | $Enums.ConfigValueType
    description?: StringFieldUpdateOperationsInput | string
    lastUpdatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    history?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RemoteConfigCreateManyInput = {
    id?: string
    key: string
    displayName: string
    category: $Enums.ConfigCategory
    value: JsonNullValueInput | InputJsonValue
    valueType: $Enums.ConfigValueType
    description?: string
    lastUpdatedBy?: string | null
    version?: number
    history?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RemoteConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    category?: EnumConfigCategoryFieldUpdateOperationsInput | $Enums.ConfigCategory
    value?: JsonNullValueInput | InputJsonValue
    valueType?: EnumConfigValueTypeFieldUpdateOperationsInput | $Enums.ConfigValueType
    description?: StringFieldUpdateOperationsInput | string
    lastUpdatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    history?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RemoteConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    category?: EnumConfigCategoryFieldUpdateOperationsInput | $Enums.ConfigCategory
    value?: JsonNullValueInput | InputJsonValue
    valueType?: EnumConfigValueTypeFieldUpdateOperationsInput | $Enums.ConfigValueType
    description?: StringFieldUpdateOperationsInput | string
    lastUpdatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    version?: IntFieldUpdateOperationsInput | number
    history?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    actorId: string
    actorEmail: string
    actorRole: string
    action: string
    resource: string
    resourceId?: string | null
    before?: NullableJsonNullValueInput | InputJsonValue
    after?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ip: string
    userAgent: string
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    actorId: string
    actorEmail: string
    actorRole: string
    action: string
    resource: string
    resourceId?: string | null
    before?: NullableJsonNullValueInput | InputJsonValue
    after?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ip: string
    userAgent: string
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    actorEmail?: StringFieldUpdateOperationsInput | string
    actorRole?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    before?: NullableJsonNullValueInput | InputJsonValue
    after?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ip?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    actorEmail?: StringFieldUpdateOperationsInput | string
    actorRole?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    before?: NullableJsonNullValueInput | InputJsonValue
    after?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ip?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    actorId: string
    actorEmail: string
    actorRole: string
    action: string
    resource: string
    resourceId?: string | null
    before?: NullableJsonNullValueInput | InputJsonValue
    after?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ip: string
    userAgent: string
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    actorEmail?: StringFieldUpdateOperationsInput | string
    actorRole?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    before?: NullableJsonNullValueInput | InputJsonValue
    after?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ip?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    actorId?: StringFieldUpdateOperationsInput | string
    actorEmail?: StringFieldUpdateOperationsInput | string
    actorRole?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    before?: NullableJsonNullValueInput | InputJsonValue
    after?: NullableJsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    ip?: StringFieldUpdateOperationsInput | string
    userAgent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    title: string
    body: string
    data?: NullableJsonNullValueInput | InputJsonValue
    type: $Enums.NotificationType
    targetAudience?: $Enums.TargetAudience
    targetUserIds?: NotificationCreatetargetUserIdsInput | string[]
    status?: $Enums.NotificationStatus
    scheduledAt?: Date | string | null
    sentAt?: Date | string | null
    totalRecipients?: number
    delivered?: number
    opened?: number
    failed?: number
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    title: string
    body: string
    data?: NullableJsonNullValueInput | InputJsonValue
    type: $Enums.NotificationType
    targetAudience?: $Enums.TargetAudience
    targetUserIds?: NotificationCreatetargetUserIdsInput | string[]
    status?: $Enums.NotificationStatus
    scheduledAt?: Date | string | null
    sentAt?: Date | string | null
    totalRecipients?: number
    delivered?: number
    opened?: number
    failed?: number
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    targetAudience?: EnumTargetAudienceFieldUpdateOperationsInput | $Enums.TargetAudience
    targetUserIds?: NotificationUpdatetargetUserIdsInput | string[]
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRecipients?: IntFieldUpdateOperationsInput | number
    delivered?: IntFieldUpdateOperationsInput | number
    opened?: IntFieldUpdateOperationsInput | number
    failed?: IntFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    targetAudience?: EnumTargetAudienceFieldUpdateOperationsInput | $Enums.TargetAudience
    targetUserIds?: NotificationUpdatetargetUserIdsInput | string[]
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRecipients?: IntFieldUpdateOperationsInput | number
    delivered?: IntFieldUpdateOperationsInput | number
    opened?: IntFieldUpdateOperationsInput | number
    failed?: IntFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    title: string
    body: string
    data?: NullableJsonNullValueInput | InputJsonValue
    type: $Enums.NotificationType
    targetAudience?: $Enums.TargetAudience
    targetUserIds?: NotificationCreatetargetUserIdsInput | string[]
    status?: $Enums.NotificationStatus
    scheduledAt?: Date | string | null
    sentAt?: Date | string | null
    totalRecipients?: number
    delivered?: number
    opened?: number
    failed?: number
    createdBy: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    targetAudience?: EnumTargetAudienceFieldUpdateOperationsInput | $Enums.TargetAudience
    targetUserIds?: NotificationUpdatetargetUserIdsInput | string[]
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRecipients?: IntFieldUpdateOperationsInput | number
    delivered?: IntFieldUpdateOperationsInput | number
    opened?: IntFieldUpdateOperationsInput | number
    failed?: IntFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    data?: NullableJsonNullValueInput | InputJsonValue
    type?: EnumNotificationTypeFieldUpdateOperationsInput | $Enums.NotificationType
    targetAudience?: EnumTargetAudienceFieldUpdateOperationsInput | $Enums.TargetAudience
    targetUserIds?: NotificationUpdatetargetUserIdsInput | string[]
    status?: EnumNotificationStatusFieldUpdateOperationsInput | $Enums.NotificationStatus
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalRecipients?: IntFieldUpdateOperationsInput | number
    delivered?: IntFieldUpdateOperationsInput | number
    opened?: IntFieldUpdateOperationsInput | number
    failed?: IntFieldUpdateOperationsInput | number
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PushTokenCreateInput = {
    id?: string
    userId: string
    token: string
    platform: string
    isActive?: boolean
    lastUsedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PushTokenUncheckedCreateInput = {
    id?: string
    userId: string
    token: string
    platform: string
    isActive?: boolean
    lastUsedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PushTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PushTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PushTokenCreateManyInput = {
    id?: string
    userId: string
    token: string
    platform: string
    isActive?: boolean
    lastUsedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PushTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PushTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegionCreateInput = {
    id?: string
    provider: $Enums.CloudProvider
    code: string
    name: string
    country: string
    continent: string
    gridIntensity: number
    gridIntensitySource?: string
    renewablePercentage?: number | null
    pue?: number
    lat: number
    lng: number
    availableInstanceFamilies?: RegionCreateavailableInstanceFamiliesInput | string[]
    isPopular?: boolean
  }

  export type RegionUncheckedCreateInput = {
    id?: string
    provider: $Enums.CloudProvider
    code: string
    name: string
    country: string
    continent: string
    gridIntensity: number
    gridIntensitySource?: string
    renewablePercentage?: number | null
    pue?: number
    lat: number
    lng: number
    availableInstanceFamilies?: RegionCreateavailableInstanceFamiliesInput | string[]
    isPopular?: boolean
  }

  export type RegionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    continent?: StringFieldUpdateOperationsInput | string
    gridIntensity?: FloatFieldUpdateOperationsInput | number
    gridIntensitySource?: StringFieldUpdateOperationsInput | string
    renewablePercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    pue?: FloatFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    availableInstanceFamilies?: RegionUpdateavailableInstanceFamiliesInput | string[]
    isPopular?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RegionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    continent?: StringFieldUpdateOperationsInput | string
    gridIntensity?: FloatFieldUpdateOperationsInput | number
    gridIntensitySource?: StringFieldUpdateOperationsInput | string
    renewablePercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    pue?: FloatFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    availableInstanceFamilies?: RegionUpdateavailableInstanceFamiliesInput | string[]
    isPopular?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RegionCreateManyInput = {
    id?: string
    provider: $Enums.CloudProvider
    code: string
    name: string
    country: string
    continent: string
    gridIntensity: number
    gridIntensitySource?: string
    renewablePercentage?: number | null
    pue?: number
    lat: number
    lng: number
    availableInstanceFamilies?: RegionCreateavailableInstanceFamiliesInput | string[]
    isPopular?: boolean
  }

  export type RegionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    continent?: StringFieldUpdateOperationsInput | string
    gridIntensity?: FloatFieldUpdateOperationsInput | number
    gridIntensitySource?: StringFieldUpdateOperationsInput | string
    renewablePercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    pue?: FloatFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    availableInstanceFamilies?: RegionUpdateavailableInstanceFamiliesInput | string[]
    isPopular?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RegionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    continent?: StringFieldUpdateOperationsInput | string
    gridIntensity?: FloatFieldUpdateOperationsInput | number
    gridIntensitySource?: StringFieldUpdateOperationsInput | string
    renewablePercentage?: NullableFloatFieldUpdateOperationsInput | number | null
    pue?: FloatFieldUpdateOperationsInput | number
    lat?: FloatFieldUpdateOperationsInput | number
    lng?: FloatFieldUpdateOperationsInput | number
    availableInstanceFamilies?: RegionUpdateavailableInstanceFamiliesInput | string[]
    isPopular?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InstanceTypeCreateInput = {
    id?: string
    provider: $Enums.CloudProvider
    name: string
    displayName: string
    family: string
    category: $Enums.InstanceCategory
    vCPUs: number
    memoryGB: number
    cpuTdpWatts: number
    storageType?: $Enums.StorageType
    onDemandHourlyUsd?: number | null
    isPopular?: boolean
  }

  export type InstanceTypeUncheckedCreateInput = {
    id?: string
    provider: $Enums.CloudProvider
    name: string
    displayName: string
    family: string
    category: $Enums.InstanceCategory
    vCPUs: number
    memoryGB: number
    cpuTdpWatts: number
    storageType?: $Enums.StorageType
    onDemandHourlyUsd?: number | null
    isPopular?: boolean
  }

  export type InstanceTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    name?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    category?: EnumInstanceCategoryFieldUpdateOperationsInput | $Enums.InstanceCategory
    vCPUs?: IntFieldUpdateOperationsInput | number
    memoryGB?: FloatFieldUpdateOperationsInput | number
    cpuTdpWatts?: FloatFieldUpdateOperationsInput | number
    storageType?: EnumStorageTypeFieldUpdateOperationsInput | $Enums.StorageType
    onDemandHourlyUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InstanceTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    name?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    category?: EnumInstanceCategoryFieldUpdateOperationsInput | $Enums.InstanceCategory
    vCPUs?: IntFieldUpdateOperationsInput | number
    memoryGB?: FloatFieldUpdateOperationsInput | number
    cpuTdpWatts?: FloatFieldUpdateOperationsInput | number
    storageType?: EnumStorageTypeFieldUpdateOperationsInput | $Enums.StorageType
    onDemandHourlyUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InstanceTypeCreateManyInput = {
    id?: string
    provider: $Enums.CloudProvider
    name: string
    displayName: string
    family: string
    category: $Enums.InstanceCategory
    vCPUs: number
    memoryGB: number
    cpuTdpWatts: number
    storageType?: $Enums.StorageType
    onDemandHourlyUsd?: number | null
    isPopular?: boolean
  }

  export type InstanceTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    name?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    category?: EnumInstanceCategoryFieldUpdateOperationsInput | $Enums.InstanceCategory
    vCPUs?: IntFieldUpdateOperationsInput | number
    memoryGB?: FloatFieldUpdateOperationsInput | number
    cpuTdpWatts?: FloatFieldUpdateOperationsInput | number
    storageType?: EnumStorageTypeFieldUpdateOperationsInput | $Enums.StorageType
    onDemandHourlyUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InstanceTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    name?: StringFieldUpdateOperationsInput | string
    displayName?: StringFieldUpdateOperationsInput | string
    family?: StringFieldUpdateOperationsInput | string
    category?: EnumInstanceCategoryFieldUpdateOperationsInput | $Enums.InstanceCategory
    vCPUs?: IntFieldUpdateOperationsInput | number
    memoryGB?: FloatFieldUpdateOperationsInput | number
    cpuTdpWatts?: FloatFieldUpdateOperationsInput | number
    storageType?: EnumStorageTypeFieldUpdateOperationsInput | $Enums.StorageType
    onDemandHourlyUsd?: NullableFloatFieldUpdateOperationsInput | number | null
    isPopular?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProviderCreateInput = {
    id?: string
    key: $Enums.CloudProvider
    name: string
    shortName: string
    logoUrl?: string | null
    regionCount?: number
    websiteUrl?: string | null
    carbonPageUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
  }

  export type ProviderUncheckedCreateInput = {
    id?: string
    key: $Enums.CloudProvider
    name: string
    shortName: string
    logoUrl?: string | null
    regionCount?: number
    websiteUrl?: string | null
    carbonPageUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
  }

  export type ProviderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    regionCount?: IntFieldUpdateOperationsInput | number
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    carbonPageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    regionCount?: IntFieldUpdateOperationsInput | number
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    carbonPageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderCreateManyInput = {
    id?: string
    key: $Enums.CloudProvider
    name: string
    shortName: string
    logoUrl?: string | null
    regionCount?: number
    websiteUrl?: string | null
    carbonPageUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
  }

  export type ProviderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    regionCount?: IntFieldUpdateOperationsInput | number
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    carbonPageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProviderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    name?: StringFieldUpdateOperationsInput | string
    shortName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    regionCount?: IntFieldUpdateOperationsInput | number
    websiteUrl?: NullableStringFieldUpdateOperationsInput | string | null
    carbonPageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumCloudProviderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CloudProvider | EnumCloudProviderFieldRefInput<$PrismaModel> | null
    in?: $Enums.CloudProvider[] | ListEnumCloudProviderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CloudProvider[] | ListEnumCloudProviderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCloudProviderNullableFilter<$PrismaModel> | $Enums.CloudProvider | null
  }

  export type EnumMobileUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MobileUserStatus | EnumMobileUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MobileUserStatus[] | ListEnumMobileUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MobileUserStatus[] | ListEnumMobileUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMobileUserStatusFilter<$PrismaModel> | $Enums.MobileUserStatus
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

  export type CalculationListRelationFilter = {
    every?: CalculationWhereInput
    some?: CalculationWhereInput
    none?: CalculationWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CalculationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MobileUserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    deviceId?: SortOrder
    pushToken?: SortOrder
    country?: SortOrder
    lastActiveAt?: SortOrder
    calculationCount?: SortOrder
    totalCO2Tracked?: SortOrder
    carbonAlertThreshold?: SortOrder
    theme?: SortOrder
    notificationsEnabled?: SortOrder
    defaultProvider?: SortOrder
    status?: SortOrder
    banReason?: SortOrder
    bannedAt?: SortOrder
    bannedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MobileUserAvgOrderByAggregateInput = {
    calculationCount?: SortOrder
    totalCO2Tracked?: SortOrder
    carbonAlertThreshold?: SortOrder
  }

  export type MobileUserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    deviceId?: SortOrder
    pushToken?: SortOrder
    country?: SortOrder
    lastActiveAt?: SortOrder
    calculationCount?: SortOrder
    totalCO2Tracked?: SortOrder
    carbonAlertThreshold?: SortOrder
    theme?: SortOrder
    notificationsEnabled?: SortOrder
    defaultProvider?: SortOrder
    status?: SortOrder
    banReason?: SortOrder
    bannedAt?: SortOrder
    bannedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MobileUserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    deviceId?: SortOrder
    pushToken?: SortOrder
    country?: SortOrder
    lastActiveAt?: SortOrder
    calculationCount?: SortOrder
    totalCO2Tracked?: SortOrder
    carbonAlertThreshold?: SortOrder
    theme?: SortOrder
    notificationsEnabled?: SortOrder
    defaultProvider?: SortOrder
    status?: SortOrder
    banReason?: SortOrder
    bannedAt?: SortOrder
    bannedBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MobileUserSumOrderByAggregateInput = {
    calculationCount?: SortOrder
    totalCO2Tracked?: SortOrder
    carbonAlertThreshold?: SortOrder
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

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumCloudProviderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CloudProvider | EnumCloudProviderFieldRefInput<$PrismaModel> | null
    in?: $Enums.CloudProvider[] | ListEnumCloudProviderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CloudProvider[] | ListEnumCloudProviderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCloudProviderNullableWithAggregatesFilter<$PrismaModel> | $Enums.CloudProvider | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCloudProviderNullableFilter<$PrismaModel>
    _max?: NestedEnumCloudProviderNullableFilter<$PrismaModel>
  }

  export type EnumMobileUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MobileUserStatus | EnumMobileUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MobileUserStatus[] | ListEnumMobileUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MobileUserStatus[] | ListEnumMobileUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMobileUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.MobileUserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMobileUserStatusFilter<$PrismaModel>
    _max?: NestedEnumMobileUserStatusFilter<$PrismaModel>
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

  export type EnumCloudProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.CloudProvider | EnumCloudProviderFieldRefInput<$PrismaModel>
    in?: $Enums.CloudProvider[] | ListEnumCloudProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.CloudProvider[] | ListEnumCloudProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumCloudProviderFilter<$PrismaModel> | $Enums.CloudProvider
  }

  export type EnumGridIntensitySourceFilter<$PrismaModel = never> = {
    equals?: $Enums.GridIntensitySource | EnumGridIntensitySourceFieldRefInput<$PrismaModel>
    in?: $Enums.GridIntensitySource[] | ListEnumGridIntensitySourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.GridIntensitySource[] | ListEnumGridIntensitySourceFieldRefInput<$PrismaModel>
    not?: NestedEnumGridIntensitySourceFilter<$PrismaModel> | $Enums.GridIntensitySource
  }

  export type EnumCarbonRatingFilter<$PrismaModel = never> = {
    equals?: $Enums.CarbonRating | EnumCarbonRatingFieldRefInput<$PrismaModel>
    in?: $Enums.CarbonRating[] | ListEnumCarbonRatingFieldRefInput<$PrismaModel>
    notIn?: $Enums.CarbonRating[] | ListEnumCarbonRatingFieldRefInput<$PrismaModel>
    not?: NestedEnumCarbonRatingFilter<$PrismaModel> | $Enums.CarbonRating
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

  export type EnumCalculationSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.CalculationSource | EnumCalculationSourceFieldRefInput<$PrismaModel>
    in?: $Enums.CalculationSource[] | ListEnumCalculationSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.CalculationSource[] | ListEnumCalculationSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumCalculationSourceFilter<$PrismaModel> | $Enums.CalculationSource
  }

  export type MobileUserRelationFilter = {
    is?: MobileUserWhereInput
    isNot?: MobileUserWhereInput
  }

  export type CalculationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    region?: SortOrder
    regionName?: SortOrder
    instanceType?: SortOrder
    instanceCount?: SortOrder
    hoursPerMonth?: SortOrder
    cpuUtilization?: SortOrder
    storageGB?: SortOrder
    ramGB?: SortOrder
    energyComputeKwh?: SortOrder
    energyMemoryKwh?: SortOrder
    energyStorageKwh?: SortOrder
    energyTotalKwh?: SortOrder
    co2GramsMonth?: SortOrder
    co2KgMonth?: SortOrder
    co2GramsHour?: SortOrder
    gridIntensity?: SortOrder
    gridIntensitySource?: SortOrder
    computePercentage?: SortOrder
    memoryPercentage?: SortOrder
    storagePercentage?: SortOrder
    rating?: SortOrder
    ratingColor?: SortOrder
    realWorldEquivalent?: SortOrder
    recommendation?: SortOrder
    recommendedRegion?: SortOrder
    potentialReductionPct?: SortOrder
    source?: SortOrder
    apiKeyId?: SortOrder
    responseTimeMs?: SortOrder
    sdkVersion?: SortOrder
    createdAt?: SortOrder
  }

  export type CalculationAvgOrderByAggregateInput = {
    instanceCount?: SortOrder
    hoursPerMonth?: SortOrder
    cpuUtilization?: SortOrder
    storageGB?: SortOrder
    ramGB?: SortOrder
    energyComputeKwh?: SortOrder
    energyMemoryKwh?: SortOrder
    energyStorageKwh?: SortOrder
    energyTotalKwh?: SortOrder
    co2GramsMonth?: SortOrder
    co2KgMonth?: SortOrder
    co2GramsHour?: SortOrder
    gridIntensity?: SortOrder
    computePercentage?: SortOrder
    memoryPercentage?: SortOrder
    storagePercentage?: SortOrder
    potentialReductionPct?: SortOrder
    responseTimeMs?: SortOrder
  }

  export type CalculationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    region?: SortOrder
    regionName?: SortOrder
    instanceType?: SortOrder
    instanceCount?: SortOrder
    hoursPerMonth?: SortOrder
    cpuUtilization?: SortOrder
    storageGB?: SortOrder
    ramGB?: SortOrder
    energyComputeKwh?: SortOrder
    energyMemoryKwh?: SortOrder
    energyStorageKwh?: SortOrder
    energyTotalKwh?: SortOrder
    co2GramsMonth?: SortOrder
    co2KgMonth?: SortOrder
    co2GramsHour?: SortOrder
    gridIntensity?: SortOrder
    gridIntensitySource?: SortOrder
    computePercentage?: SortOrder
    memoryPercentage?: SortOrder
    storagePercentage?: SortOrder
    rating?: SortOrder
    ratingColor?: SortOrder
    realWorldEquivalent?: SortOrder
    recommendation?: SortOrder
    recommendedRegion?: SortOrder
    potentialReductionPct?: SortOrder
    source?: SortOrder
    apiKeyId?: SortOrder
    responseTimeMs?: SortOrder
    sdkVersion?: SortOrder
    createdAt?: SortOrder
  }

  export type CalculationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    provider?: SortOrder
    region?: SortOrder
    regionName?: SortOrder
    instanceType?: SortOrder
    instanceCount?: SortOrder
    hoursPerMonth?: SortOrder
    cpuUtilization?: SortOrder
    storageGB?: SortOrder
    ramGB?: SortOrder
    energyComputeKwh?: SortOrder
    energyMemoryKwh?: SortOrder
    energyStorageKwh?: SortOrder
    energyTotalKwh?: SortOrder
    co2GramsMonth?: SortOrder
    co2KgMonth?: SortOrder
    co2GramsHour?: SortOrder
    gridIntensity?: SortOrder
    gridIntensitySource?: SortOrder
    computePercentage?: SortOrder
    memoryPercentage?: SortOrder
    storagePercentage?: SortOrder
    rating?: SortOrder
    ratingColor?: SortOrder
    realWorldEquivalent?: SortOrder
    recommendation?: SortOrder
    recommendedRegion?: SortOrder
    potentialReductionPct?: SortOrder
    source?: SortOrder
    apiKeyId?: SortOrder
    responseTimeMs?: SortOrder
    sdkVersion?: SortOrder
    createdAt?: SortOrder
  }

  export type CalculationSumOrderByAggregateInput = {
    instanceCount?: SortOrder
    hoursPerMonth?: SortOrder
    cpuUtilization?: SortOrder
    storageGB?: SortOrder
    ramGB?: SortOrder
    energyComputeKwh?: SortOrder
    energyMemoryKwh?: SortOrder
    energyStorageKwh?: SortOrder
    energyTotalKwh?: SortOrder
    co2GramsMonth?: SortOrder
    co2KgMonth?: SortOrder
    co2GramsHour?: SortOrder
    gridIntensity?: SortOrder
    computePercentage?: SortOrder
    memoryPercentage?: SortOrder
    storagePercentage?: SortOrder
    potentialReductionPct?: SortOrder
    responseTimeMs?: SortOrder
  }

  export type EnumCloudProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CloudProvider | EnumCloudProviderFieldRefInput<$PrismaModel>
    in?: $Enums.CloudProvider[] | ListEnumCloudProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.CloudProvider[] | ListEnumCloudProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumCloudProviderWithAggregatesFilter<$PrismaModel> | $Enums.CloudProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCloudProviderFilter<$PrismaModel>
    _max?: NestedEnumCloudProviderFilter<$PrismaModel>
  }

  export type EnumGridIntensitySourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GridIntensitySource | EnumGridIntensitySourceFieldRefInput<$PrismaModel>
    in?: $Enums.GridIntensitySource[] | ListEnumGridIntensitySourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.GridIntensitySource[] | ListEnumGridIntensitySourceFieldRefInput<$PrismaModel>
    not?: NestedEnumGridIntensitySourceWithAggregatesFilter<$PrismaModel> | $Enums.GridIntensitySource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGridIntensitySourceFilter<$PrismaModel>
    _max?: NestedEnumGridIntensitySourceFilter<$PrismaModel>
  }

  export type EnumCarbonRatingWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CarbonRating | EnumCarbonRatingFieldRefInput<$PrismaModel>
    in?: $Enums.CarbonRating[] | ListEnumCarbonRatingFieldRefInput<$PrismaModel>
    notIn?: $Enums.CarbonRating[] | ListEnumCarbonRatingFieldRefInput<$PrismaModel>
    not?: NestedEnumCarbonRatingWithAggregatesFilter<$PrismaModel> | $Enums.CarbonRating
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCarbonRatingFilter<$PrismaModel>
    _max?: NestedEnumCarbonRatingFilter<$PrismaModel>
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

  export type EnumCalculationSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CalculationSource | EnumCalculationSourceFieldRefInput<$PrismaModel>
    in?: $Enums.CalculationSource[] | ListEnumCalculationSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.CalculationSource[] | ListEnumCalculationSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumCalculationSourceWithAggregatesFilter<$PrismaModel> | $Enums.CalculationSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCalculationSourceFilter<$PrismaModel>
    _max?: NestedEnumCalculationSourceFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshToken?: SortOrder
    platform?: SortOrder
    osVersion?: SortOrder
    appVersion?: SortOrder
    deviceModel?: SortOrder
    ip?: SortOrder
    isActive?: SortOrder
    lastActivityAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshToken?: SortOrder
    platform?: SortOrder
    osVersion?: SortOrder
    appVersion?: SortOrder
    deviceModel?: SortOrder
    ip?: SortOrder
    isActive?: SortOrder
    lastActivityAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshToken?: SortOrder
    platform?: SortOrder
    osVersion?: SortOrder
    appVersion?: SortOrder
    deviceModel?: SortOrder
    ip?: SortOrder
    isActive?: SortOrder
    lastActivityAt?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumApiKeyStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApiKeyStatus | EnumApiKeyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApiKeyStatus[] | ListEnumApiKeyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApiKeyStatus[] | ListEnumApiKeyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApiKeyStatusFilter<$PrismaModel> | $Enums.ApiKeyStatus
  }

  export type ApiKeyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    prefix?: SortOrder
    hashedKey?: SortOrder
    createdBy?: SortOrder
    permissions?: SortOrder
    requestsPerMinute?: SortOrder
    requestsPerDay?: SortOrder
    totalRequests?: SortOrder
    lastUsedAt?: SortOrder
    todayRequests?: SortOrder
    todayResetAt?: SortOrder
    status?: SortOrder
    revokedAt?: SortOrder
    revokedBy?: SortOrder
    revokeReason?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeyAvgOrderByAggregateInput = {
    requestsPerMinute?: SortOrder
    requestsPerDay?: SortOrder
    totalRequests?: SortOrder
    todayRequests?: SortOrder
  }

  export type ApiKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    prefix?: SortOrder
    hashedKey?: SortOrder
    createdBy?: SortOrder
    requestsPerMinute?: SortOrder
    requestsPerDay?: SortOrder
    totalRequests?: SortOrder
    lastUsedAt?: SortOrder
    todayRequests?: SortOrder
    todayResetAt?: SortOrder
    status?: SortOrder
    revokedAt?: SortOrder
    revokedBy?: SortOrder
    revokeReason?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    prefix?: SortOrder
    hashedKey?: SortOrder
    createdBy?: SortOrder
    requestsPerMinute?: SortOrder
    requestsPerDay?: SortOrder
    totalRequests?: SortOrder
    lastUsedAt?: SortOrder
    todayRequests?: SortOrder
    todayResetAt?: SortOrder
    status?: SortOrder
    revokedAt?: SortOrder
    revokedBy?: SortOrder
    revokeReason?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeySumOrderByAggregateInput = {
    requestsPerMinute?: SortOrder
    requestsPerDay?: SortOrder
    totalRequests?: SortOrder
    todayRequests?: SortOrder
  }

  export type EnumApiKeyStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApiKeyStatus | EnumApiKeyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApiKeyStatus[] | ListEnumApiKeyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApiKeyStatus[] | ListEnumApiKeyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApiKeyStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApiKeyStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApiKeyStatusFilter<$PrismaModel>
    _max?: NestedEnumApiKeyStatusFilter<$PrismaModel>
  }

  export type EnumFlagCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.FlagCategory | EnumFlagCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.FlagCategory[] | ListEnumFlagCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.FlagCategory[] | ListEnumFlagCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumFlagCategoryFilter<$PrismaModel> | $Enums.FlagCategory
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
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type FeatureFlagCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    category?: SortOrder
    enabled?: SortOrder
    value?: SortOrder
    lastToggledBy?: SortOrder
    lastToggledAt?: SortOrder
    toggleCount?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeatureFlagAvgOrderByAggregateInput = {
    toggleCount?: SortOrder
    version?: SortOrder
  }

  export type FeatureFlagMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    category?: SortOrder
    enabled?: SortOrder
    lastToggledBy?: SortOrder
    lastToggledAt?: SortOrder
    toggleCount?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeatureFlagMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    displayName?: SortOrder
    description?: SortOrder
    category?: SortOrder
    enabled?: SortOrder
    lastToggledBy?: SortOrder
    lastToggledAt?: SortOrder
    toggleCount?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FeatureFlagSumOrderByAggregateInput = {
    toggleCount?: SortOrder
    version?: SortOrder
  }

  export type EnumFlagCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FlagCategory | EnumFlagCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.FlagCategory[] | ListEnumFlagCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.FlagCategory[] | ListEnumFlagCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumFlagCategoryWithAggregatesFilter<$PrismaModel> | $Enums.FlagCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFlagCategoryFilter<$PrismaModel>
    _max?: NestedEnumFlagCategoryFilter<$PrismaModel>
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
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumConfigCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfigCategory | EnumConfigCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ConfigCategory[] | ListEnumConfigCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfigCategory[] | ListEnumConfigCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumConfigCategoryFilter<$PrismaModel> | $Enums.ConfigCategory
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumConfigValueTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfigValueType | EnumConfigValueTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConfigValueType[] | ListEnumConfigValueTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfigValueType[] | ListEnumConfigValueTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConfigValueTypeFilter<$PrismaModel> | $Enums.ConfigValueType
  }

  export type RemoteConfigCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    displayName?: SortOrder
    category?: SortOrder
    value?: SortOrder
    valueType?: SortOrder
    description?: SortOrder
    lastUpdatedBy?: SortOrder
    version?: SortOrder
    history?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RemoteConfigAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type RemoteConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    displayName?: SortOrder
    category?: SortOrder
    valueType?: SortOrder
    description?: SortOrder
    lastUpdatedBy?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RemoteConfigMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    displayName?: SortOrder
    category?: SortOrder
    valueType?: SortOrder
    description?: SortOrder
    lastUpdatedBy?: SortOrder
    version?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RemoteConfigSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type EnumConfigCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfigCategory | EnumConfigCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ConfigCategory[] | ListEnumConfigCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfigCategory[] | ListEnumConfigCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumConfigCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ConfigCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConfigCategoryFilter<$PrismaModel>
    _max?: NestedEnumConfigCategoryFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumConfigValueTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfigValueType | EnumConfigValueTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConfigValueType[] | ListEnumConfigValueTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfigValueType[] | ListEnumConfigValueTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConfigValueTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConfigValueType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConfigValueTypeFilter<$PrismaModel>
    _max?: NestedEnumConfigValueTypeFilter<$PrismaModel>
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    actorId?: SortOrder
    actorEmail?: SortOrder
    actorRole?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    before?: SortOrder
    after?: SortOrder
    metadata?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    actorId?: SortOrder
    actorEmail?: SortOrder
    actorRole?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    actorId?: SortOrder
    actorEmail?: SortOrder
    actorRole?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    resourceId?: SortOrder
    ip?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type EnumTargetAudienceFilter<$PrismaModel = never> = {
    equals?: $Enums.TargetAudience | EnumTargetAudienceFieldRefInput<$PrismaModel>
    in?: $Enums.TargetAudience[] | ListEnumTargetAudienceFieldRefInput<$PrismaModel>
    notIn?: $Enums.TargetAudience[] | ListEnumTargetAudienceFieldRefInput<$PrismaModel>
    not?: NestedEnumTargetAudienceFilter<$PrismaModel> | $Enums.TargetAudience
  }

  export type EnumNotificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusFilter<$PrismaModel> | $Enums.NotificationStatus
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
    data?: SortOrder
    type?: SortOrder
    targetAudience?: SortOrder
    targetUserIds?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrder
    totalRecipients?: SortOrder
    delivered?: SortOrder
    opened?: SortOrder
    failed?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    totalRecipients?: SortOrder
    delivered?: SortOrder
    opened?: SortOrder
    failed?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
    type?: SortOrder
    targetAudience?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrder
    totalRecipients?: SortOrder
    delivered?: SortOrder
    opened?: SortOrder
    failed?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
    type?: SortOrder
    targetAudience?: SortOrder
    status?: SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrder
    totalRecipients?: SortOrder
    delivered?: SortOrder
    opened?: SortOrder
    failed?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    totalRecipients?: SortOrder
    delivered?: SortOrder
    opened?: SortOrder
    failed?: SortOrder
  }

  export type EnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type EnumTargetAudienceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TargetAudience | EnumTargetAudienceFieldRefInput<$PrismaModel>
    in?: $Enums.TargetAudience[] | ListEnumTargetAudienceFieldRefInput<$PrismaModel>
    notIn?: $Enums.TargetAudience[] | ListEnumTargetAudienceFieldRefInput<$PrismaModel>
    not?: NestedEnumTargetAudienceWithAggregatesFilter<$PrismaModel> | $Enums.TargetAudience
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTargetAudienceFilter<$PrismaModel>
    _max?: NestedEnumTargetAudienceFilter<$PrismaModel>
  }

  export type EnumNotificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationStatusFilter<$PrismaModel>
    _max?: NestedEnumNotificationStatusFilter<$PrismaModel>
  }

  export type PushTokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    platform?: SortOrder
    isActive?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PushTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    platform?: SortOrder
    isActive?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PushTokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    platform?: SortOrder
    isActive?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RegionProviderCodeCompoundUniqueInput = {
    provider: $Enums.CloudProvider
    code: string
  }

  export type RegionCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    code?: SortOrder
    name?: SortOrder
    country?: SortOrder
    continent?: SortOrder
    gridIntensity?: SortOrder
    gridIntensitySource?: SortOrder
    renewablePercentage?: SortOrder
    pue?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    availableInstanceFamilies?: SortOrder
    isPopular?: SortOrder
  }

  export type RegionAvgOrderByAggregateInput = {
    gridIntensity?: SortOrder
    renewablePercentage?: SortOrder
    pue?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type RegionMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    code?: SortOrder
    name?: SortOrder
    country?: SortOrder
    continent?: SortOrder
    gridIntensity?: SortOrder
    gridIntensitySource?: SortOrder
    renewablePercentage?: SortOrder
    pue?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    isPopular?: SortOrder
  }

  export type RegionMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    code?: SortOrder
    name?: SortOrder
    country?: SortOrder
    continent?: SortOrder
    gridIntensity?: SortOrder
    gridIntensitySource?: SortOrder
    renewablePercentage?: SortOrder
    pue?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
    isPopular?: SortOrder
  }

  export type RegionSumOrderByAggregateInput = {
    gridIntensity?: SortOrder
    renewablePercentage?: SortOrder
    pue?: SortOrder
    lat?: SortOrder
    lng?: SortOrder
  }

  export type EnumInstanceCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.InstanceCategory | EnumInstanceCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.InstanceCategory[] | ListEnumInstanceCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstanceCategory[] | ListEnumInstanceCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumInstanceCategoryFilter<$PrismaModel> | $Enums.InstanceCategory
  }

  export type EnumStorageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StorageType | EnumStorageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StorageType[] | ListEnumStorageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StorageType[] | ListEnumStorageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStorageTypeFilter<$PrismaModel> | $Enums.StorageType
  }

  export type InstanceTypeProviderNameCompoundUniqueInput = {
    provider: $Enums.CloudProvider
    name: string
  }

  export type InstanceTypeCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    name?: SortOrder
    displayName?: SortOrder
    family?: SortOrder
    category?: SortOrder
    vCPUs?: SortOrder
    memoryGB?: SortOrder
    cpuTdpWatts?: SortOrder
    storageType?: SortOrder
    onDemandHourlyUsd?: SortOrder
    isPopular?: SortOrder
  }

  export type InstanceTypeAvgOrderByAggregateInput = {
    vCPUs?: SortOrder
    memoryGB?: SortOrder
    cpuTdpWatts?: SortOrder
    onDemandHourlyUsd?: SortOrder
  }

  export type InstanceTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    name?: SortOrder
    displayName?: SortOrder
    family?: SortOrder
    category?: SortOrder
    vCPUs?: SortOrder
    memoryGB?: SortOrder
    cpuTdpWatts?: SortOrder
    storageType?: SortOrder
    onDemandHourlyUsd?: SortOrder
    isPopular?: SortOrder
  }

  export type InstanceTypeMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    name?: SortOrder
    displayName?: SortOrder
    family?: SortOrder
    category?: SortOrder
    vCPUs?: SortOrder
    memoryGB?: SortOrder
    cpuTdpWatts?: SortOrder
    storageType?: SortOrder
    onDemandHourlyUsd?: SortOrder
    isPopular?: SortOrder
  }

  export type InstanceTypeSumOrderByAggregateInput = {
    vCPUs?: SortOrder
    memoryGB?: SortOrder
    cpuTdpWatts?: SortOrder
    onDemandHourlyUsd?: SortOrder
  }

  export type EnumInstanceCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InstanceCategory | EnumInstanceCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.InstanceCategory[] | ListEnumInstanceCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstanceCategory[] | ListEnumInstanceCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumInstanceCategoryWithAggregatesFilter<$PrismaModel> | $Enums.InstanceCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInstanceCategoryFilter<$PrismaModel>
    _max?: NestedEnumInstanceCategoryFilter<$PrismaModel>
  }

  export type EnumStorageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StorageType | EnumStorageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StorageType[] | ListEnumStorageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StorageType[] | ListEnumStorageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStorageTypeWithAggregatesFilter<$PrismaModel> | $Enums.StorageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStorageTypeFilter<$PrismaModel>
    _max?: NestedEnumStorageTypeFilter<$PrismaModel>
  }

  export type ProviderCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    shortName?: SortOrder
    logoUrl?: SortOrder
    regionCount?: SortOrder
    websiteUrl?: SortOrder
    carbonPageUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type ProviderAvgOrderByAggregateInput = {
    regionCount?: SortOrder
  }

  export type ProviderMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    shortName?: SortOrder
    logoUrl?: SortOrder
    regionCount?: SortOrder
    websiteUrl?: SortOrder
    carbonPageUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type ProviderMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    name?: SortOrder
    shortName?: SortOrder
    logoUrl?: SortOrder
    regionCount?: SortOrder
    websiteUrl?: SortOrder
    carbonPageUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type ProviderSumOrderByAggregateInput = {
    regionCount?: SortOrder
  }

  export type CalculationCreateNestedManyWithoutUserInput = {
    create?: XOR<CalculationCreateWithoutUserInput, CalculationUncheckedCreateWithoutUserInput> | CalculationCreateWithoutUserInput[] | CalculationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CalculationCreateOrConnectWithoutUserInput | CalculationCreateOrConnectWithoutUserInput[]
    createMany?: CalculationCreateManyUserInputEnvelope
    connect?: CalculationWhereUniqueInput | CalculationWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type CalculationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CalculationCreateWithoutUserInput, CalculationUncheckedCreateWithoutUserInput> | CalculationCreateWithoutUserInput[] | CalculationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CalculationCreateOrConnectWithoutUserInput | CalculationCreateOrConnectWithoutUserInput[]
    createMany?: CalculationCreateManyUserInputEnvelope
    connect?: CalculationWhereUniqueInput | CalculationWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
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

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableEnumCloudProviderFieldUpdateOperationsInput = {
    set?: $Enums.CloudProvider | null
  }

  export type EnumMobileUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.MobileUserStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CalculationUpdateManyWithoutUserNestedInput = {
    create?: XOR<CalculationCreateWithoutUserInput, CalculationUncheckedCreateWithoutUserInput> | CalculationCreateWithoutUserInput[] | CalculationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CalculationCreateOrConnectWithoutUserInput | CalculationCreateOrConnectWithoutUserInput[]
    upsert?: CalculationUpsertWithWhereUniqueWithoutUserInput | CalculationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CalculationCreateManyUserInputEnvelope
    set?: CalculationWhereUniqueInput | CalculationWhereUniqueInput[]
    disconnect?: CalculationWhereUniqueInput | CalculationWhereUniqueInput[]
    delete?: CalculationWhereUniqueInput | CalculationWhereUniqueInput[]
    connect?: CalculationWhereUniqueInput | CalculationWhereUniqueInput[]
    update?: CalculationUpdateWithWhereUniqueWithoutUserInput | CalculationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CalculationUpdateManyWithWhereWithoutUserInput | CalculationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CalculationScalarWhereInput | CalculationScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type CalculationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CalculationCreateWithoutUserInput, CalculationUncheckedCreateWithoutUserInput> | CalculationCreateWithoutUserInput[] | CalculationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CalculationCreateOrConnectWithoutUserInput | CalculationCreateOrConnectWithoutUserInput[]
    upsert?: CalculationUpsertWithWhereUniqueWithoutUserInput | CalculationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CalculationCreateManyUserInputEnvelope
    set?: CalculationWhereUniqueInput | CalculationWhereUniqueInput[]
    disconnect?: CalculationWhereUniqueInput | CalculationWhereUniqueInput[]
    delete?: CalculationWhereUniqueInput | CalculationWhereUniqueInput[]
    connect?: CalculationWhereUniqueInput | CalculationWhereUniqueInput[]
    update?: CalculationUpdateWithWhereUniqueWithoutUserInput | CalculationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CalculationUpdateManyWithWhereWithoutUserInput | CalculationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CalculationScalarWhereInput | CalculationScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type MobileUserCreateNestedOneWithoutCalculationsInput = {
    create?: XOR<MobileUserCreateWithoutCalculationsInput, MobileUserUncheckedCreateWithoutCalculationsInput>
    connectOrCreate?: MobileUserCreateOrConnectWithoutCalculationsInput
    connect?: MobileUserWhereUniqueInput
  }

  export type EnumCloudProviderFieldUpdateOperationsInput = {
    set?: $Enums.CloudProvider
  }

  export type EnumGridIntensitySourceFieldUpdateOperationsInput = {
    set?: $Enums.GridIntensitySource
  }

  export type EnumCarbonRatingFieldUpdateOperationsInput = {
    set?: $Enums.CarbonRating
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumCalculationSourceFieldUpdateOperationsInput = {
    set?: $Enums.CalculationSource
  }

  export type MobileUserUpdateOneRequiredWithoutCalculationsNestedInput = {
    create?: XOR<MobileUserCreateWithoutCalculationsInput, MobileUserUncheckedCreateWithoutCalculationsInput>
    connectOrCreate?: MobileUserCreateOrConnectWithoutCalculationsInput
    upsert?: MobileUserUpsertWithoutCalculationsInput
    connect?: MobileUserWhereUniqueInput
    update?: XOR<XOR<MobileUserUpdateToOneWithWhereWithoutCalculationsInput, MobileUserUpdateWithoutCalculationsInput>, MobileUserUncheckedUpdateWithoutCalculationsInput>
  }

  export type MobileUserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<MobileUserCreateWithoutSessionsInput, MobileUserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: MobileUserCreateOrConnectWithoutSessionsInput
    connect?: MobileUserWhereUniqueInput
  }

  export type MobileUserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<MobileUserCreateWithoutSessionsInput, MobileUserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: MobileUserCreateOrConnectWithoutSessionsInput
    upsert?: MobileUserUpsertWithoutSessionsInput
    connect?: MobileUserWhereUniqueInput
    update?: XOR<XOR<MobileUserUpdateToOneWithWhereWithoutSessionsInput, MobileUserUpdateWithoutSessionsInput>, MobileUserUncheckedUpdateWithoutSessionsInput>
  }

  export type ApiKeyCreatepermissionsInput = {
    set: string[]
  }

  export type ApiKeyUpdatepermissionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumApiKeyStatusFieldUpdateOperationsInput = {
    set?: $Enums.ApiKeyStatus
  }

  export type EnumFlagCategoryFieldUpdateOperationsInput = {
    set?: $Enums.FlagCategory
  }

  export type EnumConfigCategoryFieldUpdateOperationsInput = {
    set?: $Enums.ConfigCategory
  }

  export type EnumConfigValueTypeFieldUpdateOperationsInput = {
    set?: $Enums.ConfigValueType
  }

  export type NotificationCreatetargetUserIdsInput = {
    set: string[]
  }

  export type EnumNotificationTypeFieldUpdateOperationsInput = {
    set?: $Enums.NotificationType
  }

  export type EnumTargetAudienceFieldUpdateOperationsInput = {
    set?: $Enums.TargetAudience
  }

  export type NotificationUpdatetargetUserIdsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumNotificationStatusFieldUpdateOperationsInput = {
    set?: $Enums.NotificationStatus
  }

  export type RegionCreateavailableInstanceFamiliesInput = {
    set: string[]
  }

  export type RegionUpdateavailableInstanceFamiliesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumInstanceCategoryFieldUpdateOperationsInput = {
    set?: $Enums.InstanceCategory
  }

  export type EnumStorageTypeFieldUpdateOperationsInput = {
    set?: $Enums.StorageType
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumCloudProviderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CloudProvider | EnumCloudProviderFieldRefInput<$PrismaModel> | null
    in?: $Enums.CloudProvider[] | ListEnumCloudProviderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CloudProvider[] | ListEnumCloudProviderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCloudProviderNullableFilter<$PrismaModel> | $Enums.CloudProvider | null
  }

  export type NestedEnumMobileUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MobileUserStatus | EnumMobileUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MobileUserStatus[] | ListEnumMobileUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MobileUserStatus[] | ListEnumMobileUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMobileUserStatusFilter<$PrismaModel> | $Enums.MobileUserStatus
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumCloudProviderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CloudProvider | EnumCloudProviderFieldRefInput<$PrismaModel> | null
    in?: $Enums.CloudProvider[] | ListEnumCloudProviderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CloudProvider[] | ListEnumCloudProviderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCloudProviderNullableWithAggregatesFilter<$PrismaModel> | $Enums.CloudProvider | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCloudProviderNullableFilter<$PrismaModel>
    _max?: NestedEnumCloudProviderNullableFilter<$PrismaModel>
  }

  export type NestedEnumMobileUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MobileUserStatus | EnumMobileUserStatusFieldRefInput<$PrismaModel>
    in?: $Enums.MobileUserStatus[] | ListEnumMobileUserStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.MobileUserStatus[] | ListEnumMobileUserStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumMobileUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.MobileUserStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMobileUserStatusFilter<$PrismaModel>
    _max?: NestedEnumMobileUserStatusFilter<$PrismaModel>
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

  export type NestedEnumCloudProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.CloudProvider | EnumCloudProviderFieldRefInput<$PrismaModel>
    in?: $Enums.CloudProvider[] | ListEnumCloudProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.CloudProvider[] | ListEnumCloudProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumCloudProviderFilter<$PrismaModel> | $Enums.CloudProvider
  }

  export type NestedEnumGridIntensitySourceFilter<$PrismaModel = never> = {
    equals?: $Enums.GridIntensitySource | EnumGridIntensitySourceFieldRefInput<$PrismaModel>
    in?: $Enums.GridIntensitySource[] | ListEnumGridIntensitySourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.GridIntensitySource[] | ListEnumGridIntensitySourceFieldRefInput<$PrismaModel>
    not?: NestedEnumGridIntensitySourceFilter<$PrismaModel> | $Enums.GridIntensitySource
  }

  export type NestedEnumCarbonRatingFilter<$PrismaModel = never> = {
    equals?: $Enums.CarbonRating | EnumCarbonRatingFieldRefInput<$PrismaModel>
    in?: $Enums.CarbonRating[] | ListEnumCarbonRatingFieldRefInput<$PrismaModel>
    notIn?: $Enums.CarbonRating[] | ListEnumCarbonRatingFieldRefInput<$PrismaModel>
    not?: NestedEnumCarbonRatingFilter<$PrismaModel> | $Enums.CarbonRating
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

  export type NestedEnumCalculationSourceFilter<$PrismaModel = never> = {
    equals?: $Enums.CalculationSource | EnumCalculationSourceFieldRefInput<$PrismaModel>
    in?: $Enums.CalculationSource[] | ListEnumCalculationSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.CalculationSource[] | ListEnumCalculationSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumCalculationSourceFilter<$PrismaModel> | $Enums.CalculationSource
  }

  export type NestedEnumCloudProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CloudProvider | EnumCloudProviderFieldRefInput<$PrismaModel>
    in?: $Enums.CloudProvider[] | ListEnumCloudProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.CloudProvider[] | ListEnumCloudProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumCloudProviderWithAggregatesFilter<$PrismaModel> | $Enums.CloudProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCloudProviderFilter<$PrismaModel>
    _max?: NestedEnumCloudProviderFilter<$PrismaModel>
  }

  export type NestedEnumGridIntensitySourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GridIntensitySource | EnumGridIntensitySourceFieldRefInput<$PrismaModel>
    in?: $Enums.GridIntensitySource[] | ListEnumGridIntensitySourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.GridIntensitySource[] | ListEnumGridIntensitySourceFieldRefInput<$PrismaModel>
    not?: NestedEnumGridIntensitySourceWithAggregatesFilter<$PrismaModel> | $Enums.GridIntensitySource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGridIntensitySourceFilter<$PrismaModel>
    _max?: NestedEnumGridIntensitySourceFilter<$PrismaModel>
  }

  export type NestedEnumCarbonRatingWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CarbonRating | EnumCarbonRatingFieldRefInput<$PrismaModel>
    in?: $Enums.CarbonRating[] | ListEnumCarbonRatingFieldRefInput<$PrismaModel>
    notIn?: $Enums.CarbonRating[] | ListEnumCarbonRatingFieldRefInput<$PrismaModel>
    not?: NestedEnumCarbonRatingWithAggregatesFilter<$PrismaModel> | $Enums.CarbonRating
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCarbonRatingFilter<$PrismaModel>
    _max?: NestedEnumCarbonRatingFilter<$PrismaModel>
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

  export type NestedEnumCalculationSourceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CalculationSource | EnumCalculationSourceFieldRefInput<$PrismaModel>
    in?: $Enums.CalculationSource[] | ListEnumCalculationSourceFieldRefInput<$PrismaModel>
    notIn?: $Enums.CalculationSource[] | ListEnumCalculationSourceFieldRefInput<$PrismaModel>
    not?: NestedEnumCalculationSourceWithAggregatesFilter<$PrismaModel> | $Enums.CalculationSource
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCalculationSourceFilter<$PrismaModel>
    _max?: NestedEnumCalculationSourceFilter<$PrismaModel>
  }

  export type NestedEnumApiKeyStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApiKeyStatus | EnumApiKeyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApiKeyStatus[] | ListEnumApiKeyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApiKeyStatus[] | ListEnumApiKeyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApiKeyStatusFilter<$PrismaModel> | $Enums.ApiKeyStatus
  }

  export type NestedEnumApiKeyStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApiKeyStatus | EnumApiKeyStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApiKeyStatus[] | ListEnumApiKeyStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApiKeyStatus[] | ListEnumApiKeyStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApiKeyStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApiKeyStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApiKeyStatusFilter<$PrismaModel>
    _max?: NestedEnumApiKeyStatusFilter<$PrismaModel>
  }

  export type NestedEnumFlagCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.FlagCategory | EnumFlagCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.FlagCategory[] | ListEnumFlagCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.FlagCategory[] | ListEnumFlagCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumFlagCategoryFilter<$PrismaModel> | $Enums.FlagCategory
  }

  export type NestedEnumFlagCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FlagCategory | EnumFlagCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.FlagCategory[] | ListEnumFlagCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.FlagCategory[] | ListEnumFlagCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumFlagCategoryWithAggregatesFilter<$PrismaModel> | $Enums.FlagCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFlagCategoryFilter<$PrismaModel>
    _max?: NestedEnumFlagCategoryFilter<$PrismaModel>
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
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumConfigCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfigCategory | EnumConfigCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ConfigCategory[] | ListEnumConfigCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfigCategory[] | ListEnumConfigCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumConfigCategoryFilter<$PrismaModel> | $Enums.ConfigCategory
  }

  export type NestedEnumConfigValueTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfigValueType | EnumConfigValueTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConfigValueType[] | ListEnumConfigValueTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfigValueType[] | ListEnumConfigValueTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConfigValueTypeFilter<$PrismaModel> | $Enums.ConfigValueType
  }

  export type NestedEnumConfigCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfigCategory | EnumConfigCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.ConfigCategory[] | ListEnumConfigCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfigCategory[] | ListEnumConfigCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumConfigCategoryWithAggregatesFilter<$PrismaModel> | $Enums.ConfigCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConfigCategoryFilter<$PrismaModel>
    _max?: NestedEnumConfigCategoryFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumConfigValueTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfigValueType | EnumConfigValueTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ConfigValueType[] | ListEnumConfigValueTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfigValueType[] | ListEnumConfigValueTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumConfigValueTypeWithAggregatesFilter<$PrismaModel> | $Enums.ConfigValueType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConfigValueTypeFilter<$PrismaModel>
    _max?: NestedEnumConfigValueTypeFilter<$PrismaModel>
  }

  export type NestedEnumNotificationTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeFilter<$PrismaModel> | $Enums.NotificationType
  }

  export type NestedEnumTargetAudienceFilter<$PrismaModel = never> = {
    equals?: $Enums.TargetAudience | EnumTargetAudienceFieldRefInput<$PrismaModel>
    in?: $Enums.TargetAudience[] | ListEnumTargetAudienceFieldRefInput<$PrismaModel>
    notIn?: $Enums.TargetAudience[] | ListEnumTargetAudienceFieldRefInput<$PrismaModel>
    not?: NestedEnumTargetAudienceFilter<$PrismaModel> | $Enums.TargetAudience
  }

  export type NestedEnumNotificationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusFilter<$PrismaModel> | $Enums.NotificationStatus
  }

  export type NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationType | EnumNotificationTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationType[] | ListEnumNotificationTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationTypeWithAggregatesFilter<$PrismaModel> | $Enums.NotificationType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationTypeFilter<$PrismaModel>
    _max?: NestedEnumNotificationTypeFilter<$PrismaModel>
  }

  export type NestedEnumTargetAudienceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TargetAudience | EnumTargetAudienceFieldRefInput<$PrismaModel>
    in?: $Enums.TargetAudience[] | ListEnumTargetAudienceFieldRefInput<$PrismaModel>
    notIn?: $Enums.TargetAudience[] | ListEnumTargetAudienceFieldRefInput<$PrismaModel>
    not?: NestedEnumTargetAudienceWithAggregatesFilter<$PrismaModel> | $Enums.TargetAudience
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTargetAudienceFilter<$PrismaModel>
    _max?: NestedEnumTargetAudienceFilter<$PrismaModel>
  }

  export type NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationStatus | EnumNotificationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationStatus[] | ListEnumNotificationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationStatusWithAggregatesFilter<$PrismaModel> | $Enums.NotificationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationStatusFilter<$PrismaModel>
    _max?: NestedEnumNotificationStatusFilter<$PrismaModel>
  }

  export type NestedEnumInstanceCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.InstanceCategory | EnumInstanceCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.InstanceCategory[] | ListEnumInstanceCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstanceCategory[] | ListEnumInstanceCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumInstanceCategoryFilter<$PrismaModel> | $Enums.InstanceCategory
  }

  export type NestedEnumStorageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.StorageType | EnumStorageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StorageType[] | ListEnumStorageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StorageType[] | ListEnumStorageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStorageTypeFilter<$PrismaModel> | $Enums.StorageType
  }

  export type NestedEnumInstanceCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InstanceCategory | EnumInstanceCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.InstanceCategory[] | ListEnumInstanceCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.InstanceCategory[] | ListEnumInstanceCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumInstanceCategoryWithAggregatesFilter<$PrismaModel> | $Enums.InstanceCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInstanceCategoryFilter<$PrismaModel>
    _max?: NestedEnumInstanceCategoryFilter<$PrismaModel>
  }

  export type NestedEnumStorageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StorageType | EnumStorageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.StorageType[] | ListEnumStorageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.StorageType[] | ListEnumStorageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumStorageTypeWithAggregatesFilter<$PrismaModel> | $Enums.StorageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStorageTypeFilter<$PrismaModel>
    _max?: NestedEnumStorageTypeFilter<$PrismaModel>
  }

  export type CalculationCreateWithoutUserInput = {
    id?: string
    provider: $Enums.CloudProvider
    region: string
    regionName: string
    instanceType: string
    instanceCount: number
    hoursPerMonth: number
    cpuUtilization: number
    storageGB?: number
    ramGB: number
    energyComputeKwh: number
    energyMemoryKwh: number
    energyStorageKwh: number
    energyTotalKwh: number
    co2GramsMonth: number
    co2KgMonth: number
    co2GramsHour: number
    gridIntensity: number
    gridIntensitySource?: $Enums.GridIntensitySource
    computePercentage: number
    memoryPercentage: number
    storagePercentage: number
    rating: $Enums.CarbonRating
    ratingColor: string
    realWorldEquivalent: string
    recommendation: string
    recommendedRegion?: string | null
    potentialReductionPct?: number | null
    source?: $Enums.CalculationSource
    apiKeyId?: string | null
    responseTimeMs: number
    sdkVersion?: string | null
    createdAt?: Date | string
  }

  export type CalculationUncheckedCreateWithoutUserInput = {
    id?: string
    provider: $Enums.CloudProvider
    region: string
    regionName: string
    instanceType: string
    instanceCount: number
    hoursPerMonth: number
    cpuUtilization: number
    storageGB?: number
    ramGB: number
    energyComputeKwh: number
    energyMemoryKwh: number
    energyStorageKwh: number
    energyTotalKwh: number
    co2GramsMonth: number
    co2KgMonth: number
    co2GramsHour: number
    gridIntensity: number
    gridIntensitySource?: $Enums.GridIntensitySource
    computePercentage: number
    memoryPercentage: number
    storagePercentage: number
    rating: $Enums.CarbonRating
    ratingColor: string
    realWorldEquivalent: string
    recommendation: string
    recommendedRegion?: string | null
    potentialReductionPct?: number | null
    source?: $Enums.CalculationSource
    apiKeyId?: string | null
    responseTimeMs: number
    sdkVersion?: string | null
    createdAt?: Date | string
  }

  export type CalculationCreateOrConnectWithoutUserInput = {
    where: CalculationWhereUniqueInput
    create: XOR<CalculationCreateWithoutUserInput, CalculationUncheckedCreateWithoutUserInput>
  }

  export type CalculationCreateManyUserInputEnvelope = {
    data: CalculationCreateManyUserInput | CalculationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    refreshToken: string
    platform?: string | null
    osVersion?: string | null
    appVersion?: string | null
    deviceModel?: string | null
    ip?: string | null
    isActive?: boolean
    lastActivityAt?: Date | string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    refreshToken: string
    platform?: string | null
    osVersion?: string | null
    appVersion?: string | null
    deviceModel?: string | null
    ip?: string | null
    isActive?: boolean
    lastActivityAt?: Date | string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CalculationUpsertWithWhereUniqueWithoutUserInput = {
    where: CalculationWhereUniqueInput
    update: XOR<CalculationUpdateWithoutUserInput, CalculationUncheckedUpdateWithoutUserInput>
    create: XOR<CalculationCreateWithoutUserInput, CalculationUncheckedCreateWithoutUserInput>
  }

  export type CalculationUpdateWithWhereUniqueWithoutUserInput = {
    where: CalculationWhereUniqueInput
    data: XOR<CalculationUpdateWithoutUserInput, CalculationUncheckedUpdateWithoutUserInput>
  }

  export type CalculationUpdateManyWithWhereWithoutUserInput = {
    where: CalculationScalarWhereInput
    data: XOR<CalculationUpdateManyMutationInput, CalculationUncheckedUpdateManyWithoutUserInput>
  }

  export type CalculationScalarWhereInput = {
    AND?: CalculationScalarWhereInput | CalculationScalarWhereInput[]
    OR?: CalculationScalarWhereInput[]
    NOT?: CalculationScalarWhereInput | CalculationScalarWhereInput[]
    id?: StringFilter<"Calculation"> | string
    userId?: StringFilter<"Calculation"> | string
    provider?: EnumCloudProviderFilter<"Calculation"> | $Enums.CloudProvider
    region?: StringFilter<"Calculation"> | string
    regionName?: StringFilter<"Calculation"> | string
    instanceType?: StringFilter<"Calculation"> | string
    instanceCount?: IntFilter<"Calculation"> | number
    hoursPerMonth?: IntFilter<"Calculation"> | number
    cpuUtilization?: FloatFilter<"Calculation"> | number
    storageGB?: FloatFilter<"Calculation"> | number
    ramGB?: FloatFilter<"Calculation"> | number
    energyComputeKwh?: FloatFilter<"Calculation"> | number
    energyMemoryKwh?: FloatFilter<"Calculation"> | number
    energyStorageKwh?: FloatFilter<"Calculation"> | number
    energyTotalKwh?: FloatFilter<"Calculation"> | number
    co2GramsMonth?: FloatFilter<"Calculation"> | number
    co2KgMonth?: FloatFilter<"Calculation"> | number
    co2GramsHour?: FloatFilter<"Calculation"> | number
    gridIntensity?: FloatFilter<"Calculation"> | number
    gridIntensitySource?: EnumGridIntensitySourceFilter<"Calculation"> | $Enums.GridIntensitySource
    computePercentage?: FloatFilter<"Calculation"> | number
    memoryPercentage?: FloatFilter<"Calculation"> | number
    storagePercentage?: FloatFilter<"Calculation"> | number
    rating?: EnumCarbonRatingFilter<"Calculation"> | $Enums.CarbonRating
    ratingColor?: StringFilter<"Calculation"> | string
    realWorldEquivalent?: StringFilter<"Calculation"> | string
    recommendation?: StringFilter<"Calculation"> | string
    recommendedRegion?: StringNullableFilter<"Calculation"> | string | null
    potentialReductionPct?: FloatNullableFilter<"Calculation"> | number | null
    source?: EnumCalculationSourceFilter<"Calculation"> | $Enums.CalculationSource
    apiKeyId?: StringNullableFilter<"Calculation"> | string | null
    responseTimeMs?: IntFilter<"Calculation"> | number
    sdkVersion?: StringNullableFilter<"Calculation"> | string | null
    createdAt?: DateTimeFilter<"Calculation"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    refreshToken?: StringFilter<"Session"> | string
    platform?: StringNullableFilter<"Session"> | string | null
    osVersion?: StringNullableFilter<"Session"> | string | null
    appVersion?: StringNullableFilter<"Session"> | string | null
    deviceModel?: StringNullableFilter<"Session"> | string | null
    ip?: StringNullableFilter<"Session"> | string | null
    isActive?: BoolFilter<"Session"> | boolean
    lastActivityAt?: DateTimeFilter<"Session"> | Date | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type MobileUserCreateWithoutCalculationsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    deviceId?: string | null
    pushToken?: string | null
    country?: string | null
    lastActiveAt?: Date | string
    calculationCount?: number
    totalCO2Tracked?: number
    carbonAlertThreshold?: number
    theme?: string
    notificationsEnabled?: boolean
    defaultProvider?: $Enums.CloudProvider | null
    status?: $Enums.MobileUserStatus
    banReason?: string | null
    bannedAt?: Date | string | null
    bannedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type MobileUserUncheckedCreateWithoutCalculationsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    deviceId?: string | null
    pushToken?: string | null
    country?: string | null
    lastActiveAt?: Date | string
    calculationCount?: number
    totalCO2Tracked?: number
    carbonAlertThreshold?: number
    theme?: string
    notificationsEnabled?: boolean
    defaultProvider?: $Enums.CloudProvider | null
    status?: $Enums.MobileUserStatus
    banReason?: string | null
    bannedAt?: Date | string | null
    bannedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type MobileUserCreateOrConnectWithoutCalculationsInput = {
    where: MobileUserWhereUniqueInput
    create: XOR<MobileUserCreateWithoutCalculationsInput, MobileUserUncheckedCreateWithoutCalculationsInput>
  }

  export type MobileUserUpsertWithoutCalculationsInput = {
    update: XOR<MobileUserUpdateWithoutCalculationsInput, MobileUserUncheckedUpdateWithoutCalculationsInput>
    create: XOR<MobileUserCreateWithoutCalculationsInput, MobileUserUncheckedCreateWithoutCalculationsInput>
    where?: MobileUserWhereInput
  }

  export type MobileUserUpdateToOneWithWhereWithoutCalculationsInput = {
    where?: MobileUserWhereInput
    data: XOR<MobileUserUpdateWithoutCalculationsInput, MobileUserUncheckedUpdateWithoutCalculationsInput>
  }

  export type MobileUserUpdateWithoutCalculationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calculationCount?: IntFieldUpdateOperationsInput | number
    totalCO2Tracked?: FloatFieldUpdateOperationsInput | number
    carbonAlertThreshold?: FloatFieldUpdateOperationsInput | number
    theme?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    defaultProvider?: NullableEnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider | null
    status?: EnumMobileUserStatusFieldUpdateOperationsInput | $Enums.MobileUserStatus
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    bannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type MobileUserUncheckedUpdateWithoutCalculationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calculationCount?: IntFieldUpdateOperationsInput | number
    totalCO2Tracked?: FloatFieldUpdateOperationsInput | number
    carbonAlertThreshold?: FloatFieldUpdateOperationsInput | number
    theme?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    defaultProvider?: NullableEnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider | null
    status?: EnumMobileUserStatusFieldUpdateOperationsInput | $Enums.MobileUserStatus
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    bannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MobileUserCreateWithoutSessionsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    deviceId?: string | null
    pushToken?: string | null
    country?: string | null
    lastActiveAt?: Date | string
    calculationCount?: number
    totalCO2Tracked?: number
    carbonAlertThreshold?: number
    theme?: string
    notificationsEnabled?: boolean
    defaultProvider?: $Enums.CloudProvider | null
    status?: $Enums.MobileUserStatus
    banReason?: string | null
    bannedAt?: Date | string | null
    bannedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    calculations?: CalculationCreateNestedManyWithoutUserInput
  }

  export type MobileUserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    passwordHash: string
    name: string
    deviceId?: string | null
    pushToken?: string | null
    country?: string | null
    lastActiveAt?: Date | string
    calculationCount?: number
    totalCO2Tracked?: number
    carbonAlertThreshold?: number
    theme?: string
    notificationsEnabled?: boolean
    defaultProvider?: $Enums.CloudProvider | null
    status?: $Enums.MobileUserStatus
    banReason?: string | null
    bannedAt?: Date | string | null
    bannedBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    calculations?: CalculationUncheckedCreateNestedManyWithoutUserInput
  }

  export type MobileUserCreateOrConnectWithoutSessionsInput = {
    where: MobileUserWhereUniqueInput
    create: XOR<MobileUserCreateWithoutSessionsInput, MobileUserUncheckedCreateWithoutSessionsInput>
  }

  export type MobileUserUpsertWithoutSessionsInput = {
    update: XOR<MobileUserUpdateWithoutSessionsInput, MobileUserUncheckedUpdateWithoutSessionsInput>
    create: XOR<MobileUserCreateWithoutSessionsInput, MobileUserUncheckedCreateWithoutSessionsInput>
    where?: MobileUserWhereInput
  }

  export type MobileUserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: MobileUserWhereInput
    data: XOR<MobileUserUpdateWithoutSessionsInput, MobileUserUncheckedUpdateWithoutSessionsInput>
  }

  export type MobileUserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calculationCount?: IntFieldUpdateOperationsInput | number
    totalCO2Tracked?: FloatFieldUpdateOperationsInput | number
    carbonAlertThreshold?: FloatFieldUpdateOperationsInput | number
    theme?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    defaultProvider?: NullableEnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider | null
    status?: EnumMobileUserStatusFieldUpdateOperationsInput | $Enums.MobileUserStatus
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    bannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calculations?: CalculationUpdateManyWithoutUserNestedInput
  }

  export type MobileUserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    deviceId?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calculationCount?: IntFieldUpdateOperationsInput | number
    totalCO2Tracked?: FloatFieldUpdateOperationsInput | number
    carbonAlertThreshold?: FloatFieldUpdateOperationsInput | number
    theme?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    defaultProvider?: NullableEnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider | null
    status?: EnumMobileUserStatusFieldUpdateOperationsInput | $Enums.MobileUserStatus
    banReason?: NullableStringFieldUpdateOperationsInput | string | null
    bannedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bannedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calculations?: CalculationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CalculationCreateManyUserInput = {
    id?: string
    provider: $Enums.CloudProvider
    region: string
    regionName: string
    instanceType: string
    instanceCount: number
    hoursPerMonth: number
    cpuUtilization: number
    storageGB?: number
    ramGB: number
    energyComputeKwh: number
    energyMemoryKwh: number
    energyStorageKwh: number
    energyTotalKwh: number
    co2GramsMonth: number
    co2KgMonth: number
    co2GramsHour: number
    gridIntensity: number
    gridIntensitySource?: $Enums.GridIntensitySource
    computePercentage: number
    memoryPercentage: number
    storagePercentage: number
    rating: $Enums.CarbonRating
    ratingColor: string
    realWorldEquivalent: string
    recommendation: string
    recommendedRegion?: string | null
    potentialReductionPct?: number | null
    source?: $Enums.CalculationSource
    apiKeyId?: string | null
    responseTimeMs: number
    sdkVersion?: string | null
    createdAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    id?: string
    refreshToken: string
    platform?: string | null
    osVersion?: string | null
    appVersion?: string | null
    deviceModel?: string | null
    ip?: string | null
    isActive?: boolean
    lastActivityAt?: Date | string
    expiresAt: Date | string
    createdAt?: Date | string
  }

  export type CalculationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    region?: StringFieldUpdateOperationsInput | string
    regionName?: StringFieldUpdateOperationsInput | string
    instanceType?: StringFieldUpdateOperationsInput | string
    instanceCount?: IntFieldUpdateOperationsInput | number
    hoursPerMonth?: IntFieldUpdateOperationsInput | number
    cpuUtilization?: FloatFieldUpdateOperationsInput | number
    storageGB?: FloatFieldUpdateOperationsInput | number
    ramGB?: FloatFieldUpdateOperationsInput | number
    energyComputeKwh?: FloatFieldUpdateOperationsInput | number
    energyMemoryKwh?: FloatFieldUpdateOperationsInput | number
    energyStorageKwh?: FloatFieldUpdateOperationsInput | number
    energyTotalKwh?: FloatFieldUpdateOperationsInput | number
    co2GramsMonth?: FloatFieldUpdateOperationsInput | number
    co2KgMonth?: FloatFieldUpdateOperationsInput | number
    co2GramsHour?: FloatFieldUpdateOperationsInput | number
    gridIntensity?: FloatFieldUpdateOperationsInput | number
    gridIntensitySource?: EnumGridIntensitySourceFieldUpdateOperationsInput | $Enums.GridIntensitySource
    computePercentage?: FloatFieldUpdateOperationsInput | number
    memoryPercentage?: FloatFieldUpdateOperationsInput | number
    storagePercentage?: FloatFieldUpdateOperationsInput | number
    rating?: EnumCarbonRatingFieldUpdateOperationsInput | $Enums.CarbonRating
    ratingColor?: StringFieldUpdateOperationsInput | string
    realWorldEquivalent?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    recommendedRegion?: NullableStringFieldUpdateOperationsInput | string | null
    potentialReductionPct?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: EnumCalculationSourceFieldUpdateOperationsInput | $Enums.CalculationSource
    apiKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    responseTimeMs?: IntFieldUpdateOperationsInput | number
    sdkVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalculationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    region?: StringFieldUpdateOperationsInput | string
    regionName?: StringFieldUpdateOperationsInput | string
    instanceType?: StringFieldUpdateOperationsInput | string
    instanceCount?: IntFieldUpdateOperationsInput | number
    hoursPerMonth?: IntFieldUpdateOperationsInput | number
    cpuUtilization?: FloatFieldUpdateOperationsInput | number
    storageGB?: FloatFieldUpdateOperationsInput | number
    ramGB?: FloatFieldUpdateOperationsInput | number
    energyComputeKwh?: FloatFieldUpdateOperationsInput | number
    energyMemoryKwh?: FloatFieldUpdateOperationsInput | number
    energyStorageKwh?: FloatFieldUpdateOperationsInput | number
    energyTotalKwh?: FloatFieldUpdateOperationsInput | number
    co2GramsMonth?: FloatFieldUpdateOperationsInput | number
    co2KgMonth?: FloatFieldUpdateOperationsInput | number
    co2GramsHour?: FloatFieldUpdateOperationsInput | number
    gridIntensity?: FloatFieldUpdateOperationsInput | number
    gridIntensitySource?: EnumGridIntensitySourceFieldUpdateOperationsInput | $Enums.GridIntensitySource
    computePercentage?: FloatFieldUpdateOperationsInput | number
    memoryPercentage?: FloatFieldUpdateOperationsInput | number
    storagePercentage?: FloatFieldUpdateOperationsInput | number
    rating?: EnumCarbonRatingFieldUpdateOperationsInput | $Enums.CarbonRating
    ratingColor?: StringFieldUpdateOperationsInput | string
    realWorldEquivalent?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    recommendedRegion?: NullableStringFieldUpdateOperationsInput | string | null
    potentialReductionPct?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: EnumCalculationSourceFieldUpdateOperationsInput | $Enums.CalculationSource
    apiKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    responseTimeMs?: IntFieldUpdateOperationsInput | number
    sdkVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalculationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    provider?: EnumCloudProviderFieldUpdateOperationsInput | $Enums.CloudProvider
    region?: StringFieldUpdateOperationsInput | string
    regionName?: StringFieldUpdateOperationsInput | string
    instanceType?: StringFieldUpdateOperationsInput | string
    instanceCount?: IntFieldUpdateOperationsInput | number
    hoursPerMonth?: IntFieldUpdateOperationsInput | number
    cpuUtilization?: FloatFieldUpdateOperationsInput | number
    storageGB?: FloatFieldUpdateOperationsInput | number
    ramGB?: FloatFieldUpdateOperationsInput | number
    energyComputeKwh?: FloatFieldUpdateOperationsInput | number
    energyMemoryKwh?: FloatFieldUpdateOperationsInput | number
    energyStorageKwh?: FloatFieldUpdateOperationsInput | number
    energyTotalKwh?: FloatFieldUpdateOperationsInput | number
    co2GramsMonth?: FloatFieldUpdateOperationsInput | number
    co2KgMonth?: FloatFieldUpdateOperationsInput | number
    co2GramsHour?: FloatFieldUpdateOperationsInput | number
    gridIntensity?: FloatFieldUpdateOperationsInput | number
    gridIntensitySource?: EnumGridIntensitySourceFieldUpdateOperationsInput | $Enums.GridIntensitySource
    computePercentage?: FloatFieldUpdateOperationsInput | number
    memoryPercentage?: FloatFieldUpdateOperationsInput | number
    storagePercentage?: FloatFieldUpdateOperationsInput | number
    rating?: EnumCarbonRatingFieldUpdateOperationsInput | $Enums.CarbonRating
    ratingColor?: StringFieldUpdateOperationsInput | string
    realWorldEquivalent?: StringFieldUpdateOperationsInput | string
    recommendation?: StringFieldUpdateOperationsInput | string
    recommendedRegion?: NullableStringFieldUpdateOperationsInput | string | null
    potentialReductionPct?: NullableFloatFieldUpdateOperationsInput | number | null
    source?: EnumCalculationSourceFieldUpdateOperationsInput | $Enums.CalculationSource
    apiKeyId?: NullableStringFieldUpdateOperationsInput | string | null
    responseTimeMs?: IntFieldUpdateOperationsInput | number
    sdkVersion?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    osVersion?: NullableStringFieldUpdateOperationsInput | string | null
    appVersion?: NullableStringFieldUpdateOperationsInput | string | null
    deviceModel?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    osVersion?: NullableStringFieldUpdateOperationsInput | string | null
    appVersion?: NullableStringFieldUpdateOperationsInput | string | null
    deviceModel?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    platform?: NullableStringFieldUpdateOperationsInput | string | null
    osVersion?: NullableStringFieldUpdateOperationsInput | string | null
    appVersion?: NullableStringFieldUpdateOperationsInput | string | null
    deviceModel?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivityAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use MobileUserCountOutputTypeDefaultArgs instead
     */
    export type MobileUserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MobileUserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MobileUserDefaultArgs instead
     */
    export type MobileUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MobileUserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CalculationDefaultArgs instead
     */
    export type CalculationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CalculationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionDefaultArgs instead
     */
    export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ApiKeyDefaultArgs instead
     */
    export type ApiKeyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ApiKeyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FeatureFlagDefaultArgs instead
     */
    export type FeatureFlagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FeatureFlagDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RemoteConfigDefaultArgs instead
     */
    export type RemoteConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RemoteConfigDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDefaultArgs instead
     */
    export type NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PushTokenDefaultArgs instead
     */
    export type PushTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PushTokenDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RegionDefaultArgs instead
     */
    export type RegionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RegionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InstanceTypeDefaultArgs instead
     */
    export type InstanceTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InstanceTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProviderDefaultArgs instead
     */
    export type ProviderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProviderDefaultArgs<ExtArgs>

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