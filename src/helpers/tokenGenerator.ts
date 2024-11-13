import crypto from "crypto";

export const TokenGenerator = ()=>{

  const tokenSecret = crypto.randomBytes(64).toString("hex");
  return tokenSecret;

}