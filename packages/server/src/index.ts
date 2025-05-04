import e, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { argv } from 'process';
import { fileURLToPath } from 'url';
import { getEnvArgs } from './helpers/argv.helper';
import { createServer } from 'http';
import { Server, ServerOptions } from 'socket.io';

const { PORT, NODE_ENV, CLIENT_URL } = getEnvArgs(argv);

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

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
  const clientDistPath = path.resolve(_dirname, '../../client/dist');
  app.use(e.static(clientDistPath));

  app.get(/.*/, (_: Request, res: Response) => {
    res.sendFile(path.join(clientDistPath, 'index.html'), (error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
  });
}

io.on('connection', () => {
  console.log('Connection established.');
});

const server = httpServer.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}; Mode: ${NODE_ENV}`
  );
});

export default app;

export { server };
