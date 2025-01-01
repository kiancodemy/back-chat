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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
    },

    
    Messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true, 
  }
);

export const Chat = model("Chat", chatSchema);
