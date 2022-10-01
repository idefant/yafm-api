/* eslint-disable no-console */
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import errorMiddleware from './middlewares/errorMiddleware';
import baseRouter from './routes/baseRouter';
import changeRouter from './routes/changeRouter';
import userRouter from './routes/userRouter';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/', userRouter);
app.use('/base', baseRouter);
app.use('/change', changeRouter);

app.use(errorMiddleware);

app.listen(port, async () => {
  await mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017');
  console.log(`YAFM API listening on port ${port}`);
});
