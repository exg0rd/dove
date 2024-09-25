'use server'
import { SignupFormSchema, FormState } from "../shared/lib/definitions";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()


export async function signup(state: FormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        repeatPassword: formData.get("repeatPassword")
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { username, email, password } = validatedFields.data;

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            }
        });
        if (existingUser) {
            return {
                errors: {
                    email: existingUser.email === email || existingUser.username === username ? "Почта или имя пользователя уже заняты." : undefined,
                },
            };
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
            }
        })

    } catch (error) {
        console.log(error);
        return {
            errors : {
                password: 'Что - то пошло не так. Повторите попытку позже.',
                success: false
            }
          };
    }

    return { message : "Регистрация успешна!"}
}
