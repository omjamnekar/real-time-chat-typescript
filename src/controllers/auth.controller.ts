import { Request, Response } from "express";
import { users } from "../models/user.model";
import { hashPassword, comparePassword } from "../util/hash.util";
import { generateToken } from "../util/jwt.util";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const exists = users.find((u) => u.email === email);
  if (exists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
  const hashed = await hashPassword(password);
  users.push({ email, password: hashed });

  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = generateToken(user.email);
  res.status(200).json({ token });
};
