import e, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { argv } from 'process';
import { getEnvArgs } from './helpers/argv.helper.js';
import { createServer } from 'http';
import { Server, ServerOptions } from 'socket.io';
import { initCounterNamespace } from './sockets/namespaces/counter.namespace.js';

const { PORT, NODE_ENV, CLIENT_URL } = getEnvArgs(argv);

const socketIoServerOptions: Partial<ServerOptions> = {
  cors:
    NODE_ENV === 'dev'
      ? {
          origin: CLIENT_URL,
          methods: ['GET'],
        }
      : undefined,
};

const app: Application = e();
const httpServer = createServer(app);
const io = new Server(httpServer, socketIoServerOptions);

if (NODE_ENV === 'dev') {
  app.use(
    cors({
      origin: CLIENT_URL,
      credentials: true,
    })
  );

  console.log('Not serving static content in development mode.');
} else if (NODE_ENV === 'prod') {
  const clientDistPath = path.resolve(__dirname, '../../client/dist');
  app.use(e.static(clientDistPath));

  app.get(/.*/, (_: Request, res: Response) => {
    const filePath = path.join(clientDistPath, 'index.html');
    res.sendFile(filePath, (error) => {
      if (error && !res.headersSent) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      } else if (error) {
        console.error('Error after headers were sent:', error);
      }
    });
  });
}

initCounterNamespace(io);

const server = httpServer.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}; Mode: ${NODE_ENV}`
  );
});

export default app;

export { server };
