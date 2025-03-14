import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import routes from './routes/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
