import { createRouter } from "next-connect";

const router = createRouter();

router.get((req, res) => {
  res.status(200).json({message: "使用者登出"});
});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});