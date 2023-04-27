// Adds default data to the db

import { db } from '../src/utils/db.server';

type User = {
    username: string;
    password: string;
};

type Developer = {
    name: string;
    headquarters: string;
};

type Game = {
    title: string;
    genre: string;
    platform: string;
    datePublished: Date;
    multiplayerMode: boolean;
    metacriticScore: number;
};


function generateUsers(): Array<User> {
    return [
        {
            username: "John",
            password: "$2b$10$Fh1Ee7v9GNvCOqL.6L.ymuIIb.MpGathreccOz5LLCbM9pyP6Xdpa", // = 'password'
        },
    ];
};

function generateDevelopers(): Array<Developer> {
    return [
        {
            name: 'Insomniac Games',
            headquarters: 'Burbank, US',
        },
        {
            name: 'FromSoftware',
            headquarters: 'Tokyo, Japan',
        },
    ];
};

function generateGames(): Array<Game> {
    return [
        {
            title: 'Ratchet & Clank: Rift Apart',
            genre: 'Platform',
            platform: 'PlayStation 5',
            datePublished: new Date('2021-06-11'),
            multiplayerMode: false,
            metacriticScore: 88,
        },
        {
            title: 'Spider-Man',
            genre: 'Action-adventure',
            platform: 'PlayStation 4',
            datePublished: new Date('2018-09-07'),
            multiplayerMode: false,
            metacriticScore: 87,
        },
    ];
};


async function seed() {
    await Promise.all(
        generateUsers().map((user) => {
            const { username, password } = user;
            return db.user.create({
                data: {
                    username,
                    password,
                },
            });
        })
    );

    await Promise.all(
        generateDevelopers().map((developer) => {
            return db.developer.create({
                data: {
                    name: developer.name,
                    headquarters: developer.headquarters,
                },
            });
        })
    );
    
    const insomniac = await db.developer.findFirst({
        where: {
            name: 'Insomniac Games',
        },
    });

    await Promise.all(
        generateGames().map((game) => {
            const { title, genre, platform, datePublished, multiplayerMode, metacriticScore } = game;
            return db.game.create({
                data: {
                    title,
                    genre,
                    platform,
                    datePublished,
                    multiplayerMode,
                    metacriticScore,
                    developerId: insomniac!.id,
                },
            });
        })
    );
};

seed();