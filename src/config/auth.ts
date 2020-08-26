import * as dotenv from "dotenv";
dotenv.config();

const authConfig = {
    secret: String(process.env.SECRET),
};

export default authConfig;
