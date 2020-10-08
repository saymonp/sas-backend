import { Request, Response, NextFunction } from "express";
import socketio from "socket.io";

import app from "../app";
import {
  getCurrentUser,
  userLeave,
  userJoin,
} from "../controllers/Chat/ChatController";

export const ioConnection = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let io: socketio.Server = app.get("io");
  //everything related to io will go here
  io.on("connection", (socket) => {
    //when new user join room
    socket.on("joinRoom", ({ username, roomname }) => {
      //* create user
      const user = userJoin(socket.id, username, roomname);
      console.log(socket.id, "=id");
      socket.join(user.room);

      //* emit message to user to welcome him/her
      socket.emit("message", {
        userId: user.id,
        username: user.username,
        text: `Welcome ${user.username}`,
      });

      //* Broadcast message to everyone except user that he has joined
      socket.broadcast.to(user.room).emit("message", {
        userId: user.id,
        username: user.username,
        text: `${user.username} has joined the chat`,
      });
    });

    //when somebody send text
    socket.on("chat", (text) => {
      //* get user room and emit message
      const currentUser = getCurrentUser(socket.id);
      if (currentUser) {
        const user = currentUser;

        io.to(user.room).emit("message", {
          userId: user.id,
          username: user.username,
          text: text,
        });
      }
    });

    // Disconnect , when user leave room
    socket.on("disconnect", () => {
      // * delete user from users & emit that user has left the chat
      const user = userLeave(socket.id);

      if (user) {
        io.to(user.room).emit("message", {
          userId: user.id,
          username: user.username,
          text: `${user.username} has left the chat`,
        });
      }
    });
  });
};
