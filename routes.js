import express from 'express';
import pool from './db.js';

const router = express.Router();

// ✅ POST progress
router.post('/progress/:id', async (req, res) => {
  const { id: user_id } = req.params;
  const { symbol } = req.body;

  try {
    await pool.query(
      `INSERT INTO user_progress (user_id, element_symbol)
       VALUES ($1, $2)
       ON CONFLICT (user_id, element_symbol) DO NOTHING`,
      [user_id, symbol]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save user progress' });
  }
});

// ✅ GET progress
router.get('/progress/:id', async (req, res) => {
  const { id: user_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT element_symbol FROM user_progress WHERE user_id = $1`,
      [user_id]
    );
    const completedSymbols = result.rows.map(row => row.element_symbol);
    res.json({ completedSymbols });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user progress' });
  }
});

export default router;
