import jwt from "jsonwebtoken";

const SECRET = "your_secret_key"; // Use env variable in production

export const generateToken = (email: string): string => {
  return jwt.sign({ email }, SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token: string): string | object => {
  return jwt.verify(token, SECRET);
};
