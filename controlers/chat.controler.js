import { Chat } from "../models/chatModel.js";

export const chataccess = async (req, res) => {
  const { userid } = req.body;
  if (!userid) {
    return res.status(400).json({ message: "Select the user" });
  }

  try {
    let chat = await Chat.findOne({
      isGroupChat: false,
      participants: { $all: [req.user._id, userid] },
    })
      .populate("participants", "-password")
      .populate({
        path: "lastMessage",
        populate: { path: "sender", select: "name email _id" },
      });

    if (chat) {
      return res.status(200).json(chat);
    }

    const newChat = {
      isGroupChat: false,
      participants: [req.user._id, userid],
      chatName: "sender",
    };

    const createdChat = await Chat.create(newChat);

    const populatedChat = await Chat.findById(createdChat._id).populate(
      "participants",
      "-password"
    );

    return res.status(201).json(populatedChat);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed" });
  }
};

export const fetchchat = async (req, res) => {
  try {
    let chat = await Chat.find({
      participants: { $in: [req.user._id] },
    })
      .populate("participants", "-password")
      .populate("groupAdmin", "-password")
      .populate({
        path: "lastMessage",
        populate: { path: "sender", select: "name email _id" },
      });

    if (chat) {
      res.status(200).json(chat);
    }
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed" });
  }
};

export const createGroup = async (req, res) => {
  const { name, users } = req.body;
  try {
    if (!name) {
      throw new Error("you have not chosen name");
    } else if (users.length < 1) {
      throw new Error("you should at least choose two participants");
    }
    let chat = {
      isGroupChat: true,
      chatName: name,
      participants: [req.user._id, ...users],

      groupAdmin: req.user._id,
    };

    const create = await Chat.create(chat);
    res.status(201).json(create);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.query.id);

    res.status(201).json({ message: "deleted successfully" });
  } catch (err) {
    res.status(401).json({ message: err.message || "failed" });
  }
};

export const renameGroup = async (req, res) => {
  try {
    const { id, name } = req.body;
    if (!id || !name) {
      throw new Error("fill all the informations");
    }
    let find = await Chat.findById(id);
    if (!find) {
      throw new Error("there is no chat");
    }
    find.chatName = name;
    await find.save();

    res.status(201).json(find);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
