export const _IS_NODE_ENVIRONMENT =
  typeof process !== "undefined" && process.versions != null && process.versions.node != null;

export const INSPECT = _IS_NODE_ENVIRONMENT ? require("node:util").inspect.custom : Symbol("custom-inspect");
