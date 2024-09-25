'use server'
import { SignupFormSchema, FormState, LoginFormSchema } from "../../lib/definitions";
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

export async function login(state: FormState, formData: FormData) {
    const validatedFields = LoginFormSchema.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { username, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                    username: username ,
            }
        });
        if (existingUser && await bcrypt.compare(password, existingUser.password)) {
            return { success: true, message: 'success' };
        } else {
            return { errors: { password: 'Неправильное имя пользователя или пароль.' } };
        }

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
