import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    room: String,
    sender: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);
