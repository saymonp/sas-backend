import * as dotenv from "dotenv";
dotenv.config();

const authConfig = {
  privateKey: String(process.env.PRIVATE_KEY),
  publicKey: String(process.env.PUBLIC_KEY),
};

export default authConfig;
