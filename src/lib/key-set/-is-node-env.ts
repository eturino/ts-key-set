export const _IS_NODE_ENVIRONMENT =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;

// Symbol.for("nodejs.util.inspect.custom") is util.inspect.custom, without
// requiring node:util - a dynamic require breaks the ESM bundle at import time.
export const INSPECT = _IS_NODE_ENVIRONMENT
  ? Symbol.for("nodejs.util.inspect.custom")
  : Symbol("custom-inspect");
