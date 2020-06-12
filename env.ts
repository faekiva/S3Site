import { config } from "dotenv";

config();

export const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
export const accessKey = process.env.AWS_ACCESS_KEY;