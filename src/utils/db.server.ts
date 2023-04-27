import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

// checks if prisma client connection already exists, if it doesn't it creates a new one

declare global {
    var __db: PrismaClient | undefined;
}

if (!global.__db) {
    global.__db = new PrismaClient();
}

db = global.__db;

export { db };