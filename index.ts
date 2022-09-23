/* eslint-disable no-console */
import dotenv from 'dotenv';
import express, { NextFunction, Response, Request } from 'express';

import HttpException from './models/HttpException';
import userRouter from './routes/userRouter';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.use('/', userRouter);

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.use((err: HttpException, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.errorCode).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`YAFM API listening on port ${port}`);
});
