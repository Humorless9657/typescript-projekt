import express from 'express';
import type {Request, Response} from 'express';
import {SteamApiService} from './steam.api.service';

const apiService = new SteamApiService('https://store.steampowered.com/api/appdetails?appids=');
const steamApiRouter = express.Router();

// GET: A single Game from Steam by Id
steamApiRouter.get('/:gameId', async (req: Request, res: Response) => {
    const gameId: number = parseInt(req.params.gameId, 10);

    try {
        const game = await apiService.getGameById(gameId);
        if (game) {
            return res.status(200).json(game);
        } else {
            return res.status(404).json(`Game with id: ${gameId} was not found in Steam API.`);
        }
    } catch {
        return res.status(500);
    }
})

export {steamApiRouter}