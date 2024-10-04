"use server";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: any, res: any) {
    if (req.method === "POST") {
        const body = await req.json();
        const taskId = body;

        console.log(taskId);

        let responseBody;

        try {
            responseBody = await prisma.todoTask.update({
                where: {
                    id: taskId,
                },
                data: {
                    status: "completed",
                },
            });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: error }, { status: 500 });
        }
        return NextResponse.json({ updatedTask: taskId, success: true }, { status: 200 });
    }
}
