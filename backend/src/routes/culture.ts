import { Router } from 'express';
import { smartMagelangService } from '../services/smartMagelangService';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const records = await smartMagelangService.getContentsByCategory('Budaya');
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch culture contents' });
  }
});

export default router;
