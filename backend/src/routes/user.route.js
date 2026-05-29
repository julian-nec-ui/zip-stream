import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getRecommendedUsers,
  getMyFriends,
  sendFriendsRequest,
  acceptFriendsRequest,
  getFriendsRequest,
  getOutgoingFriendsRequest
} from "../controllers/user.controller.js";

const router = express.Router();

//apply auth middleware to all routes
router.use(protectRoute);
router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);
router.post("/friends-request/:id", sendFriendsRequest);
router.put("/friends-request/:id/accept", acceptFriendsRequest);
router.get("/friends-request", getFriendsRequest);
router.get("/friends-request-outgoing", getOutgoingFriendsRequest)

export default router;