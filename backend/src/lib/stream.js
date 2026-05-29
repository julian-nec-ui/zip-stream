import {StreamChat} from "stream-chat";
import "dotenv/config";

const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_API_SECRET;

if(!API_KEY || !API_SECRET) {
  console.error("Missing Stream API key or secret");
  throw new Error("Missing Stream API key or secret");
}

const streamClient = StreamChat.getInstance(API_KEY, API_SECRET);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    return userData;
  } catch (error) {
    console.error("Error creating/updating Stream user:", error);
    throw error;
  }
}

export const generateStreamToken = (userId) => {
  try {
    const userString = userId.toString();
    return streamClient.createToken(userId);
    return token;
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
}