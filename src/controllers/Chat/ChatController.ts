import { Request, Response } from "express";
import app from "../../app";

interface User {
  id: string;
  username: string;
  room: string;
}

const users: User[] = [];

// Join user to chat
export const userJoin = (id: string, username: string, room: string) => {
  const user = { id, username, room };

  users.push(user);

  return user;
};

// Get current user
export const getCurrentUser = (id: string) => {
  return users.find((user) => user.id === id);
};

// User leaves chat
export const userLeave = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};
