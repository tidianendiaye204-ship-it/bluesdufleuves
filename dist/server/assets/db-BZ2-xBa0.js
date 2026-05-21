import { b as drizzle, s as schema } from "./schema-BzPAZZ25.js";
async function withRetry(operation, maxRetries = 3, delayMs = 500) {
  let attempt = 1;
  while (attempt <= maxRetries) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) {
        console.error(`DB Operation failed after ${maxRetries} attempts:`, error);
        throw error;
      }
      console.warn(`DB Operation failed (attempt ${attempt}/${maxRetries}). Retrying in ${delayMs}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      delayMs *= 2;
      attempt++;
    }
  }
  throw new Error("Unreachable");
}
function getDb(d1) {
  return drizzle(d1, { schema });
}
export {
  getDb as g,
  withRetry as w
};
