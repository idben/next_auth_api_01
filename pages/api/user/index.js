import { createRouter } from "next-connect";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

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

router.get(async (req, res) => {
  try {
    const users = await db.data.users.map(u => {
      const {password, ...others} = u;
      return others;
    });
    if(!users){
      let err = new Error("找不到使用者");
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({status: "success", users});
  } catch (error) {
    console.error("處理過程中發生錯誤:", error);
    res.status(error.statusCode || 500).json({
      status: "error", 
      error: error.message?error.message:"註冊過程中發生錯誤"
    });
  }
});

router
  .use(upload.none())
  .post(async (req, res) => {
    const { account, password, name, mail, head } = req.body;
    const check1 = await db.data.users.find(u => u.account === account);
    const check2 = await db.data.users.find(u => u.mail === mail);
    if(check1 || check2){
      let err = new Error("信箱或帳號已經被使用過");
      err.statusCode = 500;
      throw err;
    }
    const id = uuidv4();
    try {
      const user = {id, account, password, name, mail, head}
      await db.update(({ users }) => users.push(user))
      res.status(200).json({
        status: "success",
        message: "註冊成功",
        id
      });
    } catch (error) {
      console.error("註冊過程中發生錯誤:", error);
      res.status(error.statusCode || 500).json({
        status: "error", 
        error: error.message? error.message: "註冊過程中發生錯誤"
      });
    }
  });

// router.post("/login", (req, res) => {
//   res.status(200).json({message: "使用者登入"});
// });

// router.get("/logout", (req, res) => {
//   res.status(200).json({message: "使用者登出"});
// });

// router.get("/status", (req, res) => {
//   res.status(200).json({message: "檢查使用者登入狀態"});
// });

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