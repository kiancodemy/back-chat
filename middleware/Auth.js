import User from "../models/usermodel.js";
import jwt from "jsonwebtoken";
export const AuthLogin = async (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    if (!token) {
      throw new Error("you are not loged in");
    }
    let decoded = jwt.verify(token, process.env.SECRETJWT);
    const findUser = await User.findById(decoded.id);
    req.user = findUser;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message || "you are not loged in " });
  }
};
