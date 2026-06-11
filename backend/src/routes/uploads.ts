import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`)
});

function imageFileFilter(_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed'));
  }
  cb(null, true);
}

const avatarUpload = multer({ storage, fileFilter: imageFileFilter });
const imageUpload = multer({ storage, fileFilter: imageFileFilter });

router.post('/avatar', (req: Request, res: Response) => {
  avatarUpload.single('avatar')(req as any, res as any, (err: any) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'Upload failed' });
    }

    const file = (req as any).file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    res.json({ url: `/uploads/${file.filename}` });
  });
});

router.post('/image', (req: Request, res: Response) => {
  imageUpload.single('image')(req as any, res as any, (err: any) => {
    if (err) {
      return res.status(400).json({ error: err.message || 'Upload failed' });
    }

    const file = (req as any).file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    res.json({ url: `/uploads/${file.filename}` });
  });
});

export default router;
