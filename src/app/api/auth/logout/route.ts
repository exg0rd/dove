"use server";

import { logoutSession } from "@/app/actions/actions";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        await logoutSession();
        return NextResponse.json(
            { message: "success" },
            { status: 200 }
        );
    } else {
        return NextResponse.json(
            { errors: "Failed to logout" },
            { status: 401 }
        );
    }
}
