import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Chat Schema
const chatSchema = new Schema(
  {
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    chatName: {
      type: String,
      required: function () {
        return this.isGroupChat;
      },
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId, // Array of users involved in the chat
        ref: "User",
        required: true,
      },
    ],
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User(s) managing the group
      ref: "User",
    },

    //messages: [messageSchema]//
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User(s) managing the group
      ref: "Message",
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

export const Chat = model("Chat", chatSchema);
