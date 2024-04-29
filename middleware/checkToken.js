import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.NEXT_PUBLIC_TOKEN_SECRET_KEY;
// const secretKey = "benbenben";

const checkToken = async (req, res, next) => {
  let token = req.headers["authorization"];

  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7);

    try {
      const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      });

      req.decoded = decoded;
      next();
    } catch (err) {
      return res.status(401).json({status: "error", error: "登入驗證失效，請重新登入。"});
    }
  } else {
    return res.status(401).json({status: "error", error: "無登入驗證資料，請重新登入。"});
  }
};

export default checkToken;
