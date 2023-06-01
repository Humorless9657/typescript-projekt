import express from 'express';
import cors, { CorsOptions } from 'cors';
import limit from 'express-rate-limit';
import helmet from 'helmet';
import { developerRouter } from './developer/developer.router';
import { gameRouter } from './game/game.router';
import { userRouter } from './user/user.router';

type ServerConfig = {
    port: number,
    corsoptions: CorsOptions,
    limiter: {
        time: number,
        max: number,
        message: string
    }
};

const startServer = ({ port, corsoptions, limiter }: ServerConfig) => {
    const app = express();
    app.use(helmet());
    app.use(cors(corsoptions));
    app.use(express.json());
    app.disable('x-powered-by'); 

    app.use(limit({
        windowMs: limiter.time,
        max: limiter.max,
        message: limiter.message
    }));

    app.use('/api/devs', developerRouter);
    app.use('/api/games', gameRouter);
    app.use('/api/users', userRouter);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};

export { ServerConfig, startServer };