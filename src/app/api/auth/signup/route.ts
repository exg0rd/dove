'use server'

import { NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { loginSessionSet } from '@/app/actions/actions';

const prisma = new PrismaClient()


export async function POST(req: any, res: any) {
    if (req.method === 'POST') {

        const data = await req.json();

        const { username, email, password } = data;

        try {
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email: email },
                        { username: username }
                    ]
                }
            });

            // Generate salt and hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = await prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    password: hashedPassword,
                }
            })

            const session = await loginSessionSet(newUser);
            return NextResponse.json({username: username}, { status: 200});
    
        } catch (error) {
            return NextResponse.json({errors: 'Имя или почта уже используется.'}, { status: 401});
        }
    
    } else {
        return NextResponse.json({error: 'METHOD UNALLOWED.'}, { status: 405});
    }
}
