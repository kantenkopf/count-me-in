import { Namespace, Server } from 'socket.io';
import { getCounter, setCounter, getCounterHistoy } from '@/sockets/stores/counter.store';


export const initCounterNamespace = (io: Server): Namespace => {
  const counterNamespace = io.of('/counter');

  counterNamespace.on('connection', (socket) => {
    console.log('New client connected to /counter namespace.');

    socket.on('counter:get', () => {
      console.log(`${socket.id} requested current counter value.`);
      socket.emit('counter:update', getCounter());
    });

    socket.on('counter:increment', () => {
      console.log(`Counter incremented by ${socket.id}.`);

      setCounter();

      console.log(`Counter history updated: ${getCounterHistoy()}`);

      counterNamespace.emit('counter:update', getCounter());
    });

    socket.on('error', (err) => {
      console.error('Socket error:', err);
    });

    socket.on('disconnect', () => {
      console.log(`${socket.id} disconnected from /counter namespace.`);
    });
  });

  return counterNamespace;
};
