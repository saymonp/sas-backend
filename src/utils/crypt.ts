const crypto = require("crypto");
const algorithm = "aes-256-ctr";
const iv = crypto.randomBytes(16);

interface Hash {
  iv: string;
  content: string;
}

export const encrypt = (text: string, key: string) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

export const decrypt = (hash: Hash, key: string) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(hash.iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};
