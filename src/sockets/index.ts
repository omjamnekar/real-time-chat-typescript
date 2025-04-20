import { Server, Socket } from "socket.io";
import {
  createMessage,
  getMessagesByRoom,
} from "../controllers/message.controller";

import { Group } from "../models/group";

const groups: Group[] = [];

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("User connected: ", socket.id);

    socket.on("createGroup", async ({ room, sender }) => {
      const existing = groups.find((g) => g.name === room);
      if (existing) {
        socket.emit("errorMsg", "Group already exists");
        return;
      }

      const group: Group = {
        name: room,
        admin: sender,
        members: [sender],
        messages: [],
      };

      groups.push(group);
      socket.join(room);

      // ✅ Use correct room name for DB
      const oldMessages = await getMessagesByRoom(room);
      socket.emit("previousMessages", oldMessages);
    });

    socket.on("joinRoom", async ({ room, sender }) => {
      const group = groups.find((g) => g.name === room);
      if (!group) {
        socket.emit("errorMsg", "Group not found");
        return;
      }

      if (!group.members.includes(sender)) {
        group.members.push(sender);
      }

      socket.join(room);

      // ✅ Again, use correct string value
      const oldMessages = await getMessagesByRoom(room);
      socket.emit("previousMessages", oldMessages);
    });

    socket.on("sendMessage", async ({ room, message, sender }) => {
      const group = groups.find((g) => g.name === room);
      if (!group || !group.members.includes(sender)) {
        socket.emit("errorMsg", "You are not in this group.");
        return;
      }

      await createMessage({ room, sender, message });
      io.to(room).emit("receiveMessage", { message, sender });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
