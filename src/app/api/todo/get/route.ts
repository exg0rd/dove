"use server";

import { getSession } from "@/app/actions/actions";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: any, res: any) {
    if (req.method === "POST") {
        const session = await getSession();
        const userId = session.userId;

        let responseBody;

        try {
            responseBody = await prisma.todoTask.findMany({
                where: {
                    userId
                }
            })
        } catch(error) {
            console.log(error);
            return NextResponse.json({error: error}, { status: 500});
        }
        return NextResponse.json({tasks: responseBody}, { status: 200});
    }
}
