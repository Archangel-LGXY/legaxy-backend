import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ✅ This is the missing piece:
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
