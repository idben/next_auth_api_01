import { createRouter } from "next-connect";

const router = createRouter();

router.post((req, res) => {
  res.status(200).json({message: "使用者登入"});
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});