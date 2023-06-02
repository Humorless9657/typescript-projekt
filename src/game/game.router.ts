import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as GameService from './game.service';
import { getOneDeveloper } from '../developer/developer.service';
import { authenticateToken } from '../user/user.middleware';

const gameRouter = express.Router();

// GAME ENDPOINTS
// GET: All Games
gameRouter.get('/', async (req: Request, res: Response) => {
    try {
        const games = await GameService.getAllGames();
        return res.status(200).json(games);
    } catch {
        return res.status(500);
    }
});

// GET: A single Game by ID
gameRouter.get('/:id', async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const game = await GameService.getOneGame(id);
        if (game) {
            return res.status(200).json(game);
        } else {
            return res.status(404).json(`Game with id: ${id} was not found.`);
        }
    } catch {
        return res.status(500);
    }
})

// POST: Create a new Game
gameRouter.post('/', authenticateToken, body("title").isString(), body("genre").isString(), body("platform").isString(), body("datePublished").isDate(), body("multiplayerMode").isBoolean(), body("metacriticScore").isInt(), body("developerId").isInt(), async(req: Request, res: Response) => {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
        return res.status(400).json(valErrors);
    }

    // checks if developer matching the provided id exists
    const devId: number = parseInt(req.body.developerId, 10);
    if ((await getOneDeveloper(devId)) === null) {
        return res.status(404).json(`Developer with id: ${devId} was not found.`);
    }

    try {
        const game = req.body;
        const newGame = await GameService.createGame(game);
        return res.status(201).json(`Game ${newGame.title} with id: ${newGame.id} was successfully added.`);
    } catch {
        return res.status(500);
    }
})

// PUT: Update an existing Game
gameRouter.put('/:id', authenticateToken, body("title").isString(), body("genre").isString(), body("platform").isString(), body("datePublished").isDate(), body("multiplayerMode").isBoolean(), body("metacriticScore").isInt(), body("developerId").isInt(), async(req: Request, res: Response) => {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
        return res.status(400).json(valErrors);
    }
    
    const id: number = parseInt(req.params.id, 10);
    if ((await GameService.getOneGame(id)) === null) {
        return res.status(404).json(`Game with id: ${id} was not found.`);
    }

    const devId: number = parseInt(req.body.developerId, 10);
    if ((await getOneDeveloper(devId)) === null) {
        return res.status(404).json(`Developer with id: ${devId} was not found.`);
    }
    
    try {
        const game = req.body;
        const updatedGame = await GameService.updateGame(game, id);
        return res.status(200).json(`Game ${updatedGame.title} with id: ${updatedGame.id} was successfully updated.`);
    } catch {
        return res.status(500);
    }
});

// DELETE: Game
gameRouter.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if ((await GameService.getOneGame(id)) === null) {
        return res.status(404).json(`Game with id: ${id} was not found.`);
    }

    try {
        await GameService.deleteGame(id);
        return res.status(204).json(`Game with id: ${id} was deleted.`);
    }  catch {
        return res.status(500);
    }
});

export { gameRouter };