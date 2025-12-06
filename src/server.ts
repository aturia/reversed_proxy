import express from 'express';
import { customReversedProxy } from './proxy';

const app = express();
const PORT = process.env.PORT || 3000;

// Reverse proxy middleware
app.use('/api/users',customReversedProxy);

app.get('/', (req, res) => {
  res.send('Bae mimi Lan Anh!');
});

app.get("/health", (_, res) => {
  res.json({ status: "I love Lan Anh So much", port: PORT });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});