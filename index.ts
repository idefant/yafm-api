import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import errorMiddleware from './middlewares/errorMiddleware';
import baseRouter from './routes/baseRouter';
import userRouter from './routes/userRouter';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

app.use(cors());
app.use(express.json());

app.use('/', userRouter);
app.use('/base', baseRouter);

app.use(errorMiddleware);

app.listen(port, async () => {
  console.log(`YAFM API listening on port ${port}`);
});
