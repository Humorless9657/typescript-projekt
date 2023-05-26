import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import limit from 'express-rate-limit';
import helmet from 'helmet';
import { developerRouter } from './developer/developer.router';
import { gameRouter } from './game/game.router';
import { userRouter } from './user/user.router';
import { authenticateToken } from './user/user.middleware';

dotenv.config();

// exits with error 1 if there's no defined port in .env
if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const rateLimiter = limit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests :)"
});

// init express
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.disable('x-powered-by');

app.use('/api/devs', developerRouter);
app.use('/api/games', gameRouter);
app.use('/api/users', userRouter);

// to delete; shows logged in user's token info
app.get('/tokeninfo', authenticateToken, (req, res) => {
    // @ts-ignore
    res.json(req.user);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});