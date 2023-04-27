import { db } from '../utils/db.server';

type User = {
    id: number;
    username: string;
    password: string;
};

const getUser = async(id: number): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            id,
        },
    });
};

const createUser = async(user: Omit<User, "id">): Promise<User> => {
    const { username, password } = user;
    return db.user.create({
        data: {
            username,
            password,
        },
        select: {
            id: true,
            username: true,
            password: true,
        },
    });
};

const deleteUser = async (id: number): Promise<void> => {
    await db.user.delete({
        where: {
            id,
        },
    });
};

export { getUser, createUser, deleteUser };