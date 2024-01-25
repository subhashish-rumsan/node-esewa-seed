const crypto = require("crypto");

const createSignature = (message) => {
  const secret = "8gBm/:&EnhH.1/q";

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);

  const hashInBase64 = hmac.digest("base64");
  return hashInBase64;
};

module.exports = createSignature;
