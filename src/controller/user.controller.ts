import { Request, Response } from "express";
import { prisma } from "../app";

export const register = async (req: Request, res: Response) => {
    const userData = req.body

    await prisma.user.create({data: userData})

    res.status(200).send({message: 'User registered successfully'})
}