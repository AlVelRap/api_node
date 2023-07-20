const VERSION = "1";
const REST = "rest";
const API = "api";
const JWT_SECRET = process.env.JWT_SECRET || "my-secret";
const JWT_LIFE = Number(process.env.JWT_LIFE) || 60 * 60 * 24 * 365;
const DIGEST_PASSWORD = process.env.DIGEST_PASSWORD || "sha256";
const JWT_ALGORITHM = process.env.JWT_ALGORITHM || "HS256";
module.exports = {
  VERSION,
  REST,
  API,
  JWT_SECRET,
  JWT_LIFE,
  DIGEST_PASSWORD,
  JWT_ALGORITHM,
};
