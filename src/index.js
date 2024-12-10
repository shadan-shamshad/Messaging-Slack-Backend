import express from 'express';
import { StatusCodes } from 'http-status-codes';

import connectDB from './config/dbConfig.js';
import mailer from './config/mailConfig.js';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/apiRouter.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({
    message: 'pong'
  });
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
  const mailResponse = await mailer.sendMail({
    from: 'shadanshamshad@gmail.com',
    to: 'shadanshamshad@gmail.com',
    subject: 'Welcome Mail',
    text: 'Welcome to the Application'
  });

  console.log(mailResponse);
});

// jSzFhXItaF3kdbn5

