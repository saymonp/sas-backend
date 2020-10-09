import * as dotenv from "dotenv";
dotenv.config();

const keysConfig = {
  privateKey: String(process.env.PRIVATE_KEY),
  publicKey: String(process.env.PUBLIC_KEY),
};

export default keysConfig;
