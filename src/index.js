
import express from 'express';
import { createServer } from 'http';
import { StatusCodes } from 'http-status-codes';
import { Server } from 'socket.io';

import bullServerAdapter from './config/bullBoardConfig.js';
import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/apiRouter.js';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/ui', bullServerAdapter.getRouter());

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({
    message: 'pong'
  });
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('messagefromClient', (data) => {
    console.log('Message from Client', data);

    io.emit('new Message', data.toUpperCase());
  });

 
});


server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

// jSzFhXItaF3kdbn5

