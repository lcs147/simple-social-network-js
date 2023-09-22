import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import mongoose from 'mongoose';

import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';

app.use(express.json());
app.get('/', (req, res) => {
  res.send('homepage');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postsRouter);

const port = process.env.PORT || 8000;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => console.log(`Server is listening on port ${port}`));
} catch (error) {
  console.log(error);
}
