import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {

  try {
    const jwtToken = req.cookies.jwt;

    if (!jwtToken) {
      return res.status(401).json({ message: "Unauthorized!" })
    }

    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, {
      algorithms: ["HS256"],
      ignoreExpiration: false
    });

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized! - Invalid token!" })
    }

    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user!" })
    }

    req.user = user;
    next();

  } catch (error) {
    console.error("Error in protected route:", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};