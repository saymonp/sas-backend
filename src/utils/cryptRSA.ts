import crypto from "crypto";
import fs from "fs";
import keysConfig from "../config/key";

export const encryptRSA = (toEncrypt: string) => {
  const publicKey = fs.readFileSync(keysConfig.publicKey, "utf8");
  const buffer = Buffer.from(toEncrypt, "utf8");
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
};

export const decryptRSA = (toDecrypt: string) => {
  const privateKey = fs.readFileSync(keysConfig.privateKey, "utf8");
  const buffer = Buffer.from(toDecrypt, "base64");
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey.toString(),
      passphrase: "",
    },
    buffer
  );
  return decrypted.toString("utf8");
};
