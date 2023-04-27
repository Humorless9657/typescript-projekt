import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as DeveloperService from './developer.service';
import { authenticateToken } from '../user/user.middleware';

const developerRouter = express.Router();

// DEVELOPER ENDPOINTS
// GET: All Developers
developerRouter.get('/', async (req: Request, res: Response) => {
    try {
        const devs = await DeveloperService.getAllDevelopers();
        return res.status(200).json(devs);
    } catch {
        return res.status(500);
    }
});

// GET: A single Developer by ID
developerRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const dev = await DeveloperService.getOneDeveloper(id);
        if (dev !== null) {
            return res.status(200).json(dev);
        } else {
            return res.status(404).json(`Developer with id: ${id} was not found.`);
        }
    } catch {
        return res.status(500);
    }
});

// POST: Create a new Developer
developerRouter.post('/', authenticateToken, body('name').isString(), body('headquarters').isString(), async(req: Request, res: Response) => {
    // checks if there are any validation errors
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
        return res.status(400).json(valErrors);
    }

    try {
        const dev = req.body;
        const newDev = await DeveloperService.createDeveloper(dev);
        return res.status(201).json(`Developer ${newDev.name} with id: ${newDev.id} was successfully added.`);
    } catch {
        return res.status(500);
    }
});

// PUT: Update an existing Developer
developerRouter.put('/:id', authenticateToken, body('name').isString(), body('headquarters').isString(), async(req: Request, res: Response) => {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
        return res.status(400).json(valErrors);
    }
    
    const id: number = parseInt(req.params.id, 10);
    if ((await DeveloperService.getOneDeveloper(id)) === null) {
        return res.status(404).json(`Developer with id: ${id} was not found.`);
    }

    try {
        const dev = req.body;
        const updatedDev = await DeveloperService.updateDeveloper(dev, id);
        return res.status(200).json(`Developer ${updatedDev.name} with id: ${updatedDev.id} was successfully updated.`);
    }  catch {
        return res.status(500);
    }
});

// DELETE: Developer
developerRouter.delete('/:id', authenticateToken, async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if ((await DeveloperService.getOneDeveloper(id)) === null) {
        return res.status(404).json(`Developer with id: ${id} was not found.`);
    }

    try {
        await DeveloperService.deleteDeveloper(id);
        return res.status(204).json(`Developer with id: ${id} was deleted.`);
    }   catch {
        return res.status(500);
    }
});

export { developerRouter };