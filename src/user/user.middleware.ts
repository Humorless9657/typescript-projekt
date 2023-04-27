import { NextFunction } from 'express';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

function generateAccessToken(user: any) {
    return jwt.sign(user, TOKEN_SECRET, { expiresIn: '120s' }); // token valid for 120s
}

// require athentication for post, put, delete routes
function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    // returns either a token (if it exists) or undefined; gets just the token (without the word 'Bearer')
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null || token == undefined || token.length == 0) {
        return res.status(401).json('Invalid token.');
    };

    // verifies the token; callback function takes an error and the serialized value (the user object from the POST: Login User route)
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json('Authentication required.');
        } else { // user verified
        // @ts-ignore
        req.user = user;
        next();
        };
    });
};

export { generateAccessToken, authenticateToken };