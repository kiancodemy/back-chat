import { Chat } from "../models/chatModel.js";
import { Message } from "../models/message.js";

export const sendMessages = async (req, res) => {
  const { content, chatid } = req.body;
  try {
    if (!content || !chatid) {
      throw new Error("write some message");
    }
    const create = await Message.create({
      sender: req.user._id,
      content,
      chat: chatid,
    });
    console.log(create._id);
    const populatedMessage = await create.populate("sender", "-password");

    let find = await Chat.findById(chatid);
    if (!find) {
      throw new Error("the chat has be deleted");
    }
    find.Messages.push(create._id);
    await find.save();
    res.status(201).json(populatedMessage);
  } catch (err) {
    res.status(401).json({ message: err.message || "failed" });
  }
};

export const getMessages = async (req, res) => {
  const id = req.params.id;

  try {
    const find = await Chat.findById(id).populate({
      path: "Messages",
      populate: { path: "sender", select: "name email _id picture" },
    });

    res.status(201).json(find);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
