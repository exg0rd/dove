"use server";

import { getSession } from "@/app/actions/actions";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: any, res: any) {
    if (req.method === "POST") {
        const session = await getSession();
        const userId = session.userId;
                
        const body = await req.json();
        const { name, description, time } = body;

        console.log(name, description, time);

        try {
            const task = await prisma.todoTask.create({
                data: {
                    name, description, time, userId
                }
            })
            return NextResponse.json({success: true, task : task}, { status: 200});
        } catch(error) {
            console.log(error);
            return NextResponse.json({error: error}, { status: 500});
        }
    }
}
