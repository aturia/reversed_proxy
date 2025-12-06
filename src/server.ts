import express from 'express';
import { customReversedProxy } from './proxy';
import { timeoutRetryProxy } from './proxy/timeoutRetryProxy';

const app = express();
const PORT = process.env.PORT || 3000;

// Reverse proxy middleware
app.use('/api/users', customReversedProxy);

// Timeour retry proxy middleware
app.use('/api/timeout-retry/users', timeoutRetryProxy);

app.get('/', (req, res) => {
  res.send('Hello from the Reverse Proxy Server!');
});

app.get("/health", (_, res) => {
  res.json({ status: "health", port: PORT });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});