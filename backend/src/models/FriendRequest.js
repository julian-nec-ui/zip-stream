import mongoose from "mongoose";
import "dotenv/config";

const EXPIRATION_TIME = process.env.FRIEND_REQUEST_EXPIRATION_TIME || 48;

const friendRequestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "cancelled"],
    default: "pending",
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  acceptedAt: {
    type: Date,
    default: null
  },
  deletedAt: {
    type: Date,
    default: null
  },
  cancelledAt: {
    type: Date,
    default: null
  },
  rejectedAt: {
    type: Date,
    default: null
  }
},
  {
    timestamps: true
  }
);

// indexes for improved query performance
friendRequestSchema.index({ sender: 1, receiver: 1 }, { unique: true });
friendRequestSchema.index({ receiver: 1, status: 1 });
friendRequestSchema.index({ sender: 1, status: 1 });

// presave hook to update updatedAt and acceptedAt and rejectedAt
friendRequestSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  
  if(this.isModified("status") && this.status === "accepted") {
    this.acceptedAt = Date.now();
  }

  if(this.isModified("status") && this.status === "rejected") {
    this.rejectedAt = Date.now();
  }

  next();
});

// virtual hook to check if the request expired
friendRequestSchema.virtual("isExpired").get(function () {

  if(this.status !== "pending") {
    return false;
  }

  const now = new Date();
  const createdAt = new Date(this.createdAt);
  const difference = (now - createdAt) / (60 * 60 * 1000); // in hours

  return difference > EXPIRATION_TIME;
});

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

export default FriendRequest;