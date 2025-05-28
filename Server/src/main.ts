import dotenv from 'dotenv';
import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './routers';
import { createContext } from './core/trpc/context';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import https from 'https';
import { readCertificates } from './utils/readCertificates';
import path from 'path';

const env = process.env.NODE_ENV || 'development';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

dotenv.config({
  path: path.resolve(__dirname, `../.env.${env}`),
  override: true,
});

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '1000mb' }));
app.use(cookieParser());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.listen(4000, () => {
    console.log('Milim backend is running on http://localhost:4000/trpc');
  });
}

if (process.env.NODE_ENV === 'production') {
  const { privateKey, certificate } = readCertificates();

  const server = https.createServer(
    {
      key: privateKey,
      cert: certificate,
    },
    app
  );

  server.listen(4000, () => {
    console.log('Milim backend is running on https://localhost:4000/trpc');
  });
}
