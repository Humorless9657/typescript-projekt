import express from 'express';
import cors, { CorsOptions } from 'cors';
import limit from 'express-rate-limit';
import helmet from 'helmet';
import { developerRouter } from './developer/developer.router';
import { gameRouter } from './game/game.router';
import { userRouter } from './user/user.router';
import { steamApiRouter} from "./api/steam.api.router";

type ServerConfig = {
  port: number;
  corsoptions: CorsOptions;
  limiter: {
    time: number;
    max: number;
    message: string;
  };
};
const createServer = ({ corsoptions, limiter }: ServerConfig) => {
    const app = express();
    app.use(helmet());
    app.use(cors(corsoptions));
    app.use(express.json());
    app.disable('x-powered-by');
  
    app.use(limit({
      windowMs: limiter.time,
      max: limiter.max,
      message: limiter.message,
    }));
  
    app.use('/api/devs', developerRouter);
    app.use('/api/games', gameRouter);
    app.use('/api/users', userRouter);

    app.use('/api/steam', steamApiRouter);

    return app;
  };
  
  const startServer = ({ port, corsoptions, limiter }: ServerConfig) => {
    const app =  createServer({
        port: 3000, // Twój numer portu
        corsoptions: {
          // Opcje CORS
        },
        limiter: {
          time: 1000, // Czas w ms
          max: 10, // Maksymalna liczba żądań
          message: 'Too many requests', // Wiadomość w przypadku przekroczenia limitu
        },
      });
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  };
  
  export { ServerConfig, startServer,createServer };