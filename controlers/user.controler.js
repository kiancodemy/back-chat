import User from "../models/usermodel.js";
import { makeJwt } from "../function/jwtmaker.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
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
    res.status(401).json({ message: err.message || "you faced error " });
  }
};

export default signup;

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("fill al the sections");
    }

    const find = await User.findOne({ email });

    if (!find) {
      throw new Error("email is not valid");
    }
    if (find && (await find.comparePassword(password))) {
      makeJwt(res, find._id);
    }
    res
      .status(201)
      .json({ _id: find._id, email: find.email, username: find.username });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "");
    res.status(201).json({ message: "Loged out successfully" });
  } catch (err) {
    res.status(401).json({ message: err.message || "failed to logout" });
  }
};
export const AllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const search = req.query.search || "";

    const query = {
      _id: { $ne: loggedInUserId },
      ...(search && {
        $or: [
          { username: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      }),
    };

    const users = await User.find(query).select("-password");
    res.status(201).json(users);
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error.message || "Something went wrong" });
  }
};
