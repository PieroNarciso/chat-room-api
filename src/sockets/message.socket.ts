import { getConnection, getRepository } from 'typeorm';
import { Socket, Namespace } from 'socket.io';
import { io } from '../app';

import { Message } from '../models';
import { IMessage } from '../interfaces';

const msgSocket = io.of('/messages');


msgSocket.on('connection', (socket: Socket) => {
  socket.send('Bienvenido al servidor');

  socket.on('sendMessage', async (data: IMessage) => {
    if (!data.userId) return;
    const message = new Message();
    message.msg = data.msg;
    message.userId = data.userId;
    const createdMsg = await getConnection().manager.save(message);
    const resMsg = await getRepository(Message).findOne({
      id: createdMsg.id
    });
    msgSocket.emit('sendMessage', resMsg);
  });
  socket.on('disconnect', () => {
    console.log('Disconnected');
  });

  socket.on('typing', (data: string) => {
    socket.broadcast.emit('typing', data);
  });
});

export default (): Namespace => msgSocket;
