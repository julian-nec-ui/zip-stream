import User from "../models/User.js";
export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const reccomendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // Exclude the current user
        { $id: { $nin: currentUser.friends } }, // Exclude friends of the current user
        { isOnboarded: true }
      ]
    });

    res.status(200).json({ message: "Recommended users fetched successfully.", reccomendedUsers });

  } catch (error) {
    console.error("Error getting recommended users:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate("friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );

    res.status(200).json({ message: "My friends fetched successfully.", friends: user.friends });
  } catch (error) {
    console.error("Error getting my friends:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function sendFriendsRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    // prevent sending request to yourself
    if (myId === recipientId) {
      return res.status(400).json({ message: "You cannot send a friend request to yourself." });
    }

    // check if the invited user exists
    const invitedUser = await User.findById(recipientId);
    if (!invitedUser) {
      return res.status(404).json({ message: "Recipient not found." });
    }

    // check if the invited user is already friends with the sender
    if (invitedUser.friends.includes(myId)) {
      return res.status(400).json({ message: "You are already friends with this user." });
    }

    // check if the recipient already has an invite from the sender or vice versa
    const existingRequest = await FriendRequest.findOne({
      $or: [
        {sender: myId, receiver: recipientId},
        {sender: recipientId, receiver: myId}
      ]
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent or vice versa." });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      receiver: recipientId
    });

    if(!friendRequest) {
      return res.status(500).json({ message: "Internal server error." });
    }

    return res.status(201).json({ message: "Friend request sent successfully." });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function acceptFriendsRequest(req, res){
  try {
    const myId = req.user.id;
    const { id: requestId } = req.params;

    const friendRequest = await FriendRequest.findById(requestId);

    if(!friendRequest) {
      return res.status(404).json({ message: "Friend request not found." });
    }

    if(friendRequest.receiver.toString() !== myId) {
      return res.status(403).json({ message: "You are not authorized to accept this friend request." });
    }

    const sender = await User.findById(friendRequest.sender);

    if(!sender) {
      return res.status(404).json({ message: "Sender not found." });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // add to friends list
    sender.friends.push(myId);
    await sender.save();

    // add to friends list
    // $addToSet only adds unique values
    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.receiver }
    });

    await User.findByIdAndUpdate(friendRequest.receiver, {
      $addToSet: { friends: friendRequest.sender }
    });

    res.status(200).json({ message: "Friend request accepted successfully." }); 

  } catch (error) {
    console.error("Error accepting friend request:", error);
    res.status(500).json({ message: "Internal server error." });  
  }
}

export async function getFriendsRequest(req, res) {
  try {
    const incomingRequests = await FriendsRequest.find({
      receiver: req.user.id,
      status: "pending"
    }).populate("receiver", "fullName profilePic");

    const acceptedRequests = await FriendsRequest.find({
      receiver: req.user.id,
      status: "accepted"
    }).populate("receiver", "fullName profilePic");

    res.status(200).json({ incomingRequests, acceptedRequests });
  } catch (error) {
    console.error("Error getting friend requests:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function getOutgoingFriendsRequest(req, res) {
  try {
    const outgoingRequests = await FriendsRequest.find({
      sender: req.user.id,
      status: "pending"
    }).populate("receiver", "fullName profilePic");

    res.status(200).json({ outgoingRequests });
  } catch (error) {
    console.error("Error getting outgoing friend requests:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
}