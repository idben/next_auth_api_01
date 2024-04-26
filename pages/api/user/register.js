import { createRouter } from "next-connect";

const router = createRouter();
  
router.post((req, res) => {
  res.status(200).json({message: "註冊一個使用者"});
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});