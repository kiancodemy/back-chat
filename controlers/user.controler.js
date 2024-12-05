import User from "../models/usermodel.js";
import { makeJwt } from "../function/jwtmaker.js";

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (username || email || password) {
      throw new Error("fill al the sections");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    res
      .status(201)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "you faced error " });
  }
};

export default signup;

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email || password) {
      throw new Error("fill al the sections");
    }

    const find = await User.find({ email });
    if (!find) {
      throw new Error("email is not valid");
    }
    if (find && (await comparePassword(password))) {
      makeJwt(find._id);
    }
    res.status(201).json(find).select("-password");
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
