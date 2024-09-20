import { Request, Response } from "express";
import { prisma } from "../app";

interface TypeData {
    id: number;
    email: string;
    password: string;
    name: string;
}

export const register = async (req: Request, res: Response) => {
    const userData: TypeData = req.body;

    try {
        if (typeof userData.email !== 'string' || typeof userData.password !== 'string') {
            return res.status(400).send({ message: 'Invalid Email and Password format' })
        }

        const emailExists = await prisma.user.findUnique({
            where: { email: userData.email }
        });

        if (emailExists) {
            return res.status(400).send({ message: 'User already exists' });
        }


        await prisma.user.create({ data: userData });

        res.status(200).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};
