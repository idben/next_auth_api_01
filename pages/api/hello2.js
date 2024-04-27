import { createRouter } from "next-connect";

const router = createRouter();

router.get((req, res) => {
  res.status(200).json({message: "使用 GET 方法"});
});

router.post((req, res) => {
  res.status(200).json({message: "使用 POST 方法"});
});

router.delete((req, res) => {
  res.status(200).json({message: "使用 DELETE 方法"});
});

router.put((req, res) => {
  res.status(200).json({message: "使用 PUT 方法"});
});

export default router.handler({
  onError: (err, req, res) => {
    console.log(err);
    res.status(err.statusCode || 500).json({message: err.message});
  },
  onNoMatch: (req, res) => {
    res.status(404).json({ message: `路由 ${req.method} ${req.url} 找不到` });
  },
});