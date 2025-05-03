import e, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { argv } from 'process';
import { fileURLToPath } from 'url';
import { getEnvArgs } from './helpers/argv.helper';

const { PORT, NODE_ENV, CLIENT_URL } = getEnvArgs(argv);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Application = e();

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
    res.sendFile(path.join(clientDistPath, 'index.html'), (error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
  });
}

const server = app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}; Mode: ${NODE_ENV}`
  );
});

export default app;

export { server };
