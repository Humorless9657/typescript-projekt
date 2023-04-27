import { db } from '../utils/db.server';

type Developer = {
    id: number;
    name: string;
    headquarters: string;
};

// Type Developer array with Developer objects and its properties
const getAllDevelopers = async(): Promise<Developer[]> => {
    return db.developer.findMany({
        select: {
            id: true,
            name: true,
            headquarters: true,
        },
    });
};

// Type Developer or null since there might not be a developer that matches the id
const getOneDeveloper = async(id: number): Promise<Developer | null> => {
    return db.developer.findUnique({
        where: {
            id,
        },
    });
};

// ID is ommited - it'll be added automatically
const createDeveloper = async(dev: Omit<Developer, "id">): Promise<Developer> => {
    const { name, headquarters } = dev;
    return db.developer.create({
        data: {
            name,
            headquarters,
        },
        select: {
            id: true,
            name: true,
            headquarters: true,
        },
    });
};

const updateDeveloper = async(dev: Omit<Developer, "id">, id: number): Promise<Developer> => {
    const { name, headquarters } = dev;
    return db.developer.update({
        where: {
            id,
        },
        data: {
            name,
            headquarters,
        },
        select: {
            id: true,
            name: true,
            headquarters: true,
        },
    });
};

// Type void because it returns nothing
const deleteDeveloper = async (id: number): Promise<void> => {
    await db.developer.delete({
        where: {
            id,
        },
    });
};

export { Developer, getAllDevelopers, getOneDeveloper, createDeveloper, updateDeveloper, deleteDeveloper };