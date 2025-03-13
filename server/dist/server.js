// server/src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';
dotenv.config();
const app = express();
// Enable CORS for all origins
app.use(cors());
app.use(express.json());
app.use(routes);
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
