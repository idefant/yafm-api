/* eslint-disable no-console */
import dotenv from 'dotenv';
import express from 'express';

import errorMiddleware from './middlewares/errorMiddleware';
import changeRouter from './routes/changeRouter';
import userRouter from './routes/userRouter';
import versionRouter from './routes/versionRouter';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/', userRouter);
app.use('/version', versionRouter);
app.use('/change', changeRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`YAFM API listening on port ${port}`);
});
