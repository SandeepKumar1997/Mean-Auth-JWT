import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const verifyToken = jwt.verify(token, process.env.SECRET);
      req.user = await User.findById(verifyToken.userId).select("-password");
      next();
    } catch (error) {
      res.status(400);
      throw new Error("Invalid Token");
    }
  } else {
    res.status(201);
    throw new Error("Token not found");
  }
});

export { protect };
