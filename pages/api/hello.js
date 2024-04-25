// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import multer from 'multer';

const upload = multer();

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req, res) {
  if (req.method === "POST" && req.headers["content-type"].startsWith("multipart/form-data")) {
    upload.none()(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Multer error: ' + err.message });
      }
      const {account, password} = req.body;
      res.status(200).json({ account, password });
    });
  }else{
    res.status(200).json({ name: "John Doe" });
  }
}
