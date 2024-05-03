import { createRouter } from "next-connect";
import jwt from "jsonwebtoken";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import multer from "multer";
import dotenv from "dotenv";
import checkToken from "@/middleware/checkToken";

dotenv.config();
const secretKey = process.env.NEXT_PUBLIC_TOKEN_SECRET_KEY;

const upload = multer();

export const config = {
  api: {
    bodyParser: false,
  },
}

const defaultData = { users: [], products: []};
const db = new Low(new JSONFile('./data/db.json'), defaultData);
await db.read();

const router = createRouter();


router.get(checkToken, async (req, res) => {
  try {
    const token = jwt.sign({
      id: undefined,
      account: undefined,
      name: undefined,
      mail: undefined,
      head: undefined 
    }, secretKey, { expiresIn: "-10s" });
    res.status(200).json({status: "success", message: "登出成功", token});
  } catch (error) {
    console.error("登入過程中發生錯誤:", error);
    res.status(error.statusCode || 500).json({
      status: "error", 
      error: error.message? error.message: "登入過程中發生錯誤"
    });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    console.log(err);
    res.status(err.statusCode || 500).json({
      status: "error", 
      error: err.message?err.message:"錯誤發生"
    });
  },
  onNoMatch: (req, res) => {
    res.status(404).json({
      status: "error", 
      error: `路由 ${req.method} ${req.url} 找不到`
    });
  },
});