import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './routers';
import { createContext } from './core/trpc/context';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173/',
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url); // Log the incoming request
  next();
});

app.use((req, res, next) => {
  console.log('CORS Headers:', res.getHeaders());
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(4000, () => {
  console.log('Milim backend is running on http://localhost:4000/trpc');
});
