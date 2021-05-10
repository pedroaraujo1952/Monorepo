import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (request, response) => response.json({ ok: 'true' }));

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('Server running on port 3333'));
