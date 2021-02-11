import { Socket, Namespace } from 'socket.io';
import { io } from '../app';

import { Message } from '../models/message.model';
import { IMessage } from '../interfaces/message.interface';

const msgSocket = io.of('/messages');


msgSocket.on('connection', (socket: Socket) => {
  socket.send('Bienvenido al servidor');

  socket.on('sendMessage', async (data: IMessage) => {
    const newMsg = await Message.create({
      userId: data.userId,
      content: data.content,
    });
    const fetchUser = await Message.findByPk(newMsg.id, {
      include: 'user'
    });
    console.log(fetchUser);
    msgSocket.emit('sendMessage', newMsg);
  });
  socket.on('disconnect', () => {
    console.log('Disconnected');
  });

  socket.on('typing', (data: string) => {
    socket.broadcast.emit('typing', data);
  });
});

export default (): Namespace => msgSocket;
