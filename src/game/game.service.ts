import { db } from '../utils/db.server';
import type { Developer } from '../developer/developer.service';

type GameRetrieveData = {
    id: number;
    title: string;
    genre: string;
    platform: string;
    datePublished: Date;
    multiplayerMode: boolean;
    metacriticScore: number;
    developer: Developer; // develeloperId acts as a foreign key
};

type GameAddData = {
    title: string;
    genre: string;
    platform: string;
    datePublished: Date;
    multiplayerMode: boolean;
    metacriticScore: number;
    developerId: number;
};

const getAllGames = async(): Promise<GameRetrieveData[]> => {
    return db.game.findMany({
        select: {
            id: true,
            title: true,
            genre: true,
            platform: true,
            datePublished: true,
            multiplayerMode: true,
            metacriticScore: true,
            developer: {
                select: {
                    id: true,
                    name: true,
                    headquarters: true,
                },
            },
        },
    });
};

const getOneGame = async(id: number): Promise<GameRetrieveData | null> => {
    return db.game.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            title: true,
            genre: true,
            platform: true,
            datePublished: true,
            multiplayerMode: true,
            metacriticScore: true,
            developer: {
                select: {
                    id: true,
                    name: true,
                    headquarters: true,
                },
            },
        },
    });
};

// parameter game is of type GameAddData to avoid giving the id and developer attributes
const createGame = async (game: GameAddData): Promise<GameRetrieveData> => {
    const { title, genre, platform, datePublished, multiplayerMode, metacriticScore, developerId } = game;
    const parsedDate: Date = new Date(datePublished);

    return db.game.create({
        data: {
            title,
            genre,
            platform,
            datePublished: parsedDate,
            multiplayerMode,
            metacriticScore,
            developerId,
        },
        select: {
            id: true,
            title: true,
            genre: true,
            platform: true,
            datePublished: true,
            multiplayerMode: true,
            metacriticScore: true,
            developer: {
                select: {
                    id: true,
                    name: true,
                    headquarters: true,
                },
            },
        },
    });
};

const updateGame = async (game: GameAddData, id: number): Promise<GameRetrieveData> => {
    const { title, genre, platform, datePublished, multiplayerMode, metacriticScore, developerId } = game;
    const parsedDate: Date = new Date(datePublished); 
    
    return db.game.update({
        where: {
            id,
        },
        data: {
            title,
            genre,
            platform,
            datePublished: parsedDate,
            multiplayerMode,
            metacriticScore,
            developerId,
        },
        select: {
            id: true,
            title: true,
            genre: true,
            platform: true,
            datePublished: true,
            multiplayerMode: true,
            metacriticScore: true,
            developer: {
                select: {
                    id: true,
                    name: true,
                    headquarters: true,
                },
            },
        },
    });
};

const deleteGame = async (id: number): Promise<void> => {
    await db.game.delete({
        where: {
            id,
        },
    });
};

export { getAllGames, getOneGame, createGame, updateGame, deleteGame };