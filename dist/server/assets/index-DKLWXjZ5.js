import { aS as sql, aj as is, C as Column } from "./db-CUDmDlFP.js";
import { B, a, b, c, d, D, e, f, E, g, F, I, M, N, h, O, i, P, j, Q, R, k, l, S, m, n, o, T, p, q, V, r, W, t, u, v, w, x, y, z, A, G, H, J, L, U, X, Y, Z, _, $, a0, a1, a2, a4, a5, a6, a7, a8, a9, aa, ab, ac, ad, ae, af, ag, ah, ak, al, am, an, ao, ap, aq, ar, as, at, au, av, aw, ax, ay, az, aA, aC, aD, aE, aF, aG, aH, aI, aJ, aK, aL, aM, aN, aO, aP, aQ, aT } from "./db-CUDmDlFP.js";
import "./server-D8bsbDCT.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "fs";
import "path";
import "util";
function count(expression) {
  return sql`count(${expression || sql.raw("*")})`.mapWith(Number);
}
function countDistinct(expression) {
  return sql`count(distinct ${expression})`.mapWith(Number);
}
function avg(expression) {
  return sql`avg(${expression})`.mapWith(String);
}
function avgDistinct(expression) {
  return sql`avg(distinct ${expression})`.mapWith(String);
}
function sum(expression) {
  return sql`sum(${expression})`.mapWith(String);
}
function sumDistinct(expression) {
  return sql`sum(distinct ${expression})`.mapWith(String);
}
function max(expression) {
  return sql`max(${expression})`.mapWith(is(expression, Column) ? expression : String);
}
function min(expression) {
  return sql`min(${expression})`.mapWith(is(expression, Column) ? expression : String);
}
function toSql(value) {
  return JSON.stringify(value);
}
function l2Distance(column, value) {
  if (Array.isArray(value)) {
    return sql`${column} <-> ${toSql(value)}`;
  }
  return sql`${column} <-> ${value}`;
}
function l1Distance(column, value) {
  if (Array.isArray(value)) {
    return sql`${column} <+> ${toSql(value)}`;
  }
  return sql`${column} <+> ${value}`;
}
function innerProduct(column, value) {
  if (Array.isArray(value)) {
    return sql`${column} <#> ${toSql(value)}`;
  }
  return sql`${column} <#> ${value}`;
}
function cosineDistance(column, value) {
  if (Array.isArray(value)) {
    return sql`${column} <=> ${toSql(value)}`;
  }
  return sql`${column} <=> ${value}`;
}
function hammingDistance(column, value) {
  if (Array.isArray(value)) {
    return sql`${column} <~> ${toSql(value)}`;
  }
  return sql`${column} <~> ${value}`;
}
function jaccardDistance(column, value) {
  if (Array.isArray(value)) {
    return sql`${column} <%> ${toSql(value)}`;
  }
  return sql`${column} <%> ${value}`;
}
export {
  B as BaseName,
  Column,
  a as ColumnAliasProxyHandler,
  b as ColumnBuilder,
  c as Columns,
  d as ConsoleLogWriter,
  D as DefaultLogger,
  e as DrizzleError,
  f as DrizzleQueryError,
  E as ExtraConfigBuilder,
  g as ExtraConfigColumns,
  F as FakePrimitiveParam,
  I as IsAlias,
  M as Many,
  N as Name,
  h as NoopLogger,
  O as One,
  i as OriginalName,
  P as Param,
  j as Placeholder,
  Q as QueryPromise,
  R as Relation,
  k as RelationTableAliasProxyHandler,
  l as Relations,
  S as SQL,
  m as Schema,
  n as StringChunk,
  o as Subquery,
  T as Table,
  p as TableAliasProxyHandler,
  q as TransactionRollbackError,
  V as View,
  r as ViewBaseConfig,
  W as WithSubquery,
  t as aliasedRelation,
  u as aliasedTable,
  v as aliasedTableColumn,
  w as and,
  x as applyMixins,
  y as arrayContained,
  z as arrayContains,
  A as arrayOverlaps,
  G as asc,
  avg,
  avgDistinct,
  H as between,
  J as bindIfParam,
  cosineDistance,
  count,
  countDistinct,
  L as createMany,
  U as createOne,
  X as createTableRelationsHelpers,
  Y as desc,
  Z as entityKind,
  _ as eq,
  $ as exists,
  a0 as extractTablesRelationalConfig,
  a1 as fillPlaceholders,
  a2 as getColumnNameAndConfig,
  a4 as getOperators,
  a5 as getOrderByOperators,
  a6 as getTableColumns,
  a7 as getTableLikeName,
  a8 as getTableName,
  a9 as getTableUniqueName,
  aa as getViewName,
  ab as getViewSelectedFields,
  ac as gt,
  ad as gte,
  hammingDistance,
  ae as hasOwnEntityKind,
  af as haveSameKeys,
  ag as ilike,
  ah as inArray,
  innerProduct,
  is,
  ak as isConfig,
  al as isDriverValueEncoder,
  am as isNotNull,
  an as isNull,
  ao as isSQLWrapper,
  ap as isTable,
  aq as isView,
  jaccardDistance,
  l1Distance,
  l2Distance,
  ar as like,
  as as lt,
  at as lte,
  au as mapColumnsInAliasedSQLToAlias,
  av as mapColumnsInSQLToAlias,
  aw as mapRelationalRow,
  ax as mapResultRow,
  ay as mapUpdateSet,
  max,
  min,
  az as name,
  aA as ne,
  aC as noopDecoder,
  aD as noopEncoder,
  aE as noopMapper,
  aF as normalizeRelation,
  aG as not,
  aH as notBetween,
  aI as notExists,
  aJ as notIlike,
  aK as notInArray,
  aL as notLike,
  aM as or,
  aN as orderSelectedFields,
  aO as param,
  aP as placeholder,
  aQ as relations,
  sql,
  sum,
  sumDistinct,
  aT as textDecoder
};
