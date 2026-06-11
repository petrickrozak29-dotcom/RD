import { Router, Request, Response } from 'express';
import * as authService from '../services/authService';
import notificationService from '../services/notificationService';
const router = Router();

function authenticate(req: Request, res: Response, next: any) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    const token = authHeader.split(' ')[1];
    const decoded = authService.verifyToken(token);
    (req as any).userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId as string;
    const notifications = await notificationService.getForUser(userId);
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil notifikasi' });
  }
});

router.patch('/:id/read', authenticate, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updated = await notificationService.markAsRead(id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Gagal menandai notifikasi' });
  }
});

export default router;
