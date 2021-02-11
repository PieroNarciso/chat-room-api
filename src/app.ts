import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { createServer } from 'http';
import { Server }  from 'socket.io';
import 'reflect-metadata';
import connectRedis from 'connect-redis';
import redis from 'redis';

import connectDB from './db';
import config from './config';


const app = express();

// Sync DATABASE
connectDB
  .then(_ =>  console.log('DB Connected'))
  .catch(err => console.error(err));


const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (origin) {
        if (config.CORS_ORIGIN_WHITELIST.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    },
    methods: ['GET', 'POST']
  },
});

// Import sockets
import sockets from './sockets/index';
sockets();


// Middlewares
app.use(cors({
  origin: config.CORS_ORIGIN_WHITELIST,
  credentials: true,
  exposedHeaders: ['Set-Cookie'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config Session
const RedisStore = connectRedis(session);
const redisClient = redis.createClient(config.REDIS_URL);
app.use(
  session({
    name: config.SESSION_NAME,
    store: new RedisStore({ client: redisClient }),
    secret: config.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: true,
    },
  })
);

// Routes middleware
import userRoutes from './routes/user.routes';
import messageRoutes from './routes/message.routes';
app.use(config.API_VERSION, userRoutes);
app.use(config.API_VERSION, messageRoutes);

app.get('/', (_req, res) => {
  res.send('API Express App');
});


server.listen(8081, () => {
  console.log('Server started in PORT 8081');
});
