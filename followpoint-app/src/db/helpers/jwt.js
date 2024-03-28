import jwt from "jsonwebtoken";
import * as jose from "jose";

const secret = process.env.JWT_SECRET;

export const createToken = (payload) => {
  return jwt.sign(payload, secret);
};

export const decodeToken = async (token) => {
  const secretKey = new TextEncoder().encode(secret);
  const payload = await jose.jwtVerify(token, secretKey);
  return payload.payload;
};
