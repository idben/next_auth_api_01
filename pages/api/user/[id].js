import { createRouter } from "next-connect";

const router = createRouter();

router.get((req, res) => {
  const { id } = req.query;
  res.status(200).json({message: `獲取特定 ID 的使用者 ${id}`});
});
  
router.put((req, res) => {
  const { id } = req.query;
  res.status(200).json({message: `更新特定 ID 的使用者 ${id}`});
});

router.delete((req, res) => {
  const { id } = req.query;
  res.status(200).json({message: `刪除特定 ID 的使用者 ${id}`});
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