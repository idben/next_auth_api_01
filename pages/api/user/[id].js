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

router.get((req, res) => {
  const { id } = req.query;
  try {
    const findUser = db.data.users.find(u => u.id === id);
    if(findUser) {
      const {password, ...user} = findUser;
      res.status(200).json({status: "success", message: "資料取得成功", user});
    }else{
      res.status(401).json({status: "error", error: "找不到使用者"});
    }
  } catch (error) {
    console.error("登入過程中發生錯誤:", error);
    res.status(500).json({
      status: "error",
      message: "登入過程中發生錯誤",
      error: error.message });
  }
});
  
router
  .use(upload.none())
  .put(checkToken, async (req, res) => {
    const { id, password, name, mail, head } = req.query;
    const { id: tokenID } = req.decoded;
    if(id !== tokenID){
      res.status(403).json({status: "error", error: "修改禁止，沒有權限"});
    }
    try {
      const user = db.data.users.find(u => u.id === id);
      if(user) {
        Object.assign(user, { password, name, mail, head });
        await db.write();
        res.status(200).json({status: "success", message: "資料修改成功", user});
      }else{
        res.status(401).json({status: "error", error: "找不到使用者" });
      }
    } catch (error) {
      console.error("更新過程中發生錯誤:", error);
      res.status(500).json({
        status: "error",
        message: "更新過程中發生錯誤", 
        error: error.message });
    }
  });

router.delete(checkToken, async (req, res) => {
  const { id } = req.query;
  const { id: tokenID } = req.decoded;
  if(id !== tokenID){
    res.status(403).json({status: "error", error: "刪除禁止，沒有權限"});
  }
  try {
    const user = db.data.users.find(u => u.id === id);
    if(user) {
      db.data.users = db.data.users.filter( u => u.id !== id);
      await db.write();
      const token = jwt.sign({
        id: undefined,
        account: undefined,
        name: undefined,
        mail: undefined,
        head: undefined 
      }, secretKey, { expiresIn: "-10s" });
      res.status(200).json({status: "success", message: "刪除成功，已登出系統", token});
    }else{
      res.status(401).json({status: "error", error: "找不到使用者"});
    }
  } catch (error) {
    console.error("刪除過程中發生錯誤:", error);
    res.status(500).json({
      status: "error", 
      message: "刪除過程中發生錯誤", 
      error: error.message });
  }
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