"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: any, res: any) {
    if (req.method === "POST") {
        const body = await req.json();
        const { username, password } = body;

        const existingUser = await prisma.user.findFirst({
            where: {
                username: username,
            },
        });
        if (
            existingUser &&
            (await bcrypt.compare(password, existingUser.password))
        ) {
            return NextResponse.json({ username: username }, { status: 200 });
        } else {
            return NextResponse.json(
                { errors: "Неправильный логин или пароль" },
                { status: 401 }
            );
        }
    }
}
