import { createRouter } from "next-connect";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import multer from "multer";
import jwt from "jsonwebtoken";
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
  
router.get(checkToken, (req, res) => {
  const user = req.decoded;
  const token = jwt.sign({
    id: user.id,
    account: user.account,
    name: user.name,
    mail: user.mail,
    head: user.head 
  }, secretKey, { expiresIn: "30m" });
  res.status(200).json({status: "success", message: "登入狀態", token});
});

export default router.handler({
  onError: (err, req, res) => {
    console.log(err);
    res.status(err.statusCode || 500).json({status: "error", error: err.message});
  },
  onNoMatch: (req, res) => {
    res.status(404).json({
      status: "error", 
      error: `路由 ${req.method} ${req.url} 找不到`
    });
  },
});