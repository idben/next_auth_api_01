import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.NEXT_PUBLIC_TOKEN_SECRET_KEY;

const checkToken2 = async (token) => {
  try {
    console.log(`secret key ${secretKey}`);
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });

    return decoded
  } catch (err) {
    return err;
  }
};

export default checkToken2;
