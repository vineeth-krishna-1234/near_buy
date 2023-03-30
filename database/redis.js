import { Redis } from "@upstash/redis";
import * as dotenv from "dotenv";
dotenv.config();

export const redisConnection = async () => {
  let createClient = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_KEY,
  });
  try {
    await createClient.set("hari", "divrt");
    const data = await createClient.get("hari");
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
