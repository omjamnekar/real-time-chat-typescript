import { Message } from "../models/Message";

export const createMessage = async ({
  room,
  sender,
  message,
}: {
  room: string;
  sender: string;
  message: string;
}) => {
  return await Message.create({
    room,
    sender,
    message,
  });
};

export const getMessagesByRoom = async (room: string) => {
  return await Message.find({ room }).sort({ createdAt: 1 });
};
