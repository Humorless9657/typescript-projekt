import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import * as UserService from './user.service';
import { generateAccessToken } from './user.middleware';
import { authenticateToken } from './user.middleware';

const userRouter = express.Router();

// USER ENDPOINTS
// POST: Login User
userRouter.post('/login', body('id').isInt(), body('username').isString(), body('password').isString(), async(req: Request, res: Response) => {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
        return res.status(400).json(valErrors);
    }

    const id: number = parseInt(req.body.id, 10);
    const user = await UserService.getUser(id);
    if (user === null) {
        return res.status(404).json(`User with id: ${id} was not found.`);
    }

    try {
        // compares the password entered by the user with the hashed password stored in the db; usernames must also match
        if (await bcrypt.compare(req.body.password, user.password) && req.body.username === user.username) {
            // serializes the user
            const accessToken = generateAccessToken(user);
            res.status(201).json({ accessToken: accessToken });
        } else {
            return res.status(401).json('Invalid login credentials.');
        }
    } catch {
        return res.status(500);
    }
});

// POST: Create a new User
userRouter.post('/signup', body('username').isString(), body('password').isString(), async(req: Request, res: Response) => {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
        return res.status(400).json(valErrors);
    }
    try {
        // auto gen a salt and hash
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { username: req.body.username, password: hashedPassword };
        const newUser = await UserService.createUser(user);
        return res.status(201).json(`User ${newUser.username} with id: ${newUser.id} was successfully created.`);
    } catch {
        return res.status(500);
    }
});

// DELETE: User
// User can only delete a record matching their id
userRouter.delete('/:id', authenticateToken, async(req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    if ((await UserService.getUser(id)) === null) {
        return res.status(404).json(`User with id: ${id} was not found.`);
    }
    
    // gets the user id from the token and compares it with the url one
    // @ts-ignore
    if (req.user.id !== id) {
        return res.status(403).json(`No permission to delete user with id: ${id}.`);
    }

    try {
        await UserService.deleteUser(id);
        return res.status(204).json(`User with id: ${id} was deleted.`);
    }   catch {
        return res.status(500);
    }
});

export { userRouter };