import mongoose from "mongoose";
export interface Group {
  name: string;
  admin: string;
  members: string[];
  messages: { sender: string; message: string }[];
}

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  admin: { type: String, required: true },
  members: [{ type: String, required: true }],
});

export const GroupModel = mongoose.model("Group", groupSchema);
