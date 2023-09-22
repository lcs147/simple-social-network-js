import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import morgan from 'morgan';

import authRouter from './routes/auth.js';
import postRouter from './routes/post.js';
import userRouter from './routes/user.js';

import { errorHandlerMiddleware } from './middleware/errorHandler.js';

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

app.get('/', (req, res) => {
  res.send('homepage');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/user', userRouter);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => console.log(`Server is listening on port ${port}`));
} catch (error) {
  console.log(error);
}
