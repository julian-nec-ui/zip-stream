import {axiosInstance} from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  console.log("signup data = ", signupData);
  return response.data;
}

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
}

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
}

export const getAuthUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Error getting auth user:", error);
    return null;
  }
}

export const completeOnboarding = async (onboardingData) => {
  const response = await axiosInstance.post("/auth/onboarding", onboardingData);
  return response.data;
}

export async function getUserFriends(){
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export async function getRecommendedUsers(){
  const response = await axiosInstance.get("/users");
  return response.data;
}

export async function getOutgoingFriendRequests(){
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(receiverId){
  const response = await axiosInstance.post(`/users/friend-request/${receiverId}`);
  return response.data;
}

export async function getFriendsRequest(){
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId){
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken(){
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}