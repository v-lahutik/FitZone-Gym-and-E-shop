import jwt, { SignOptions } from "jsonwebtoken";
import { promisify } from "util";

interface Payload {
    id: string;
    email: string;
    role?: string;
    [key: string]: any;  
  }
  

// export const createToken = async (payload: Payload, secret: string, options?: SignOptions): Promise<string> => {
//   const asyncToken = promisify(jwt.sign);
//   return await asyncToken(payload, secret, options);
// };


// export const verifyToken = async (token: string, secret: string): Promise<any> => {
//   const asyncVerify = promisify(jwt.verify);
//   return await asyncVerify(token, secret);
// };



// Create token
export const createJwtToken = async (
  payload: Payload,
  secret: string,
  options?: SignOptions
): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options || {}, (err, token) => {
      if (err || !token) {
        reject(err || new Error("Token creation failed"));
      } else {
        resolve(token);
      }
    });
  });
};

// Verify token
export const verifyToken = async (
  token: string,
  secret: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
