import { z } from "zod";
import { SessionOptions } from "iron-session";

export const SignupFormSchema = z.object({
    username: z
        .string()
        .min(6, {
            message: "Имя пользователя должно содержать минимум 6 символов",
        })
        .trim(),
    email: z.string().email({ message: "Введите корректную почту" }).trim(),
    password: z
        .string()
        .min(8, { message: "Пароль должен содержать минимум 8 символов" })
        .regex(/[a-zA-Z]/, { message: "Пароль должен включать в себя буквы." })
        .regex(/[0-9]/, { message: "Пароль должен включать в себя цифры." })
        .regex(/[^a-zA-Z0-9]/, {
            message: "Пароль должен включать в себя специальные символы.",
        })
        .trim(),
    repeatPassword: z.string().trim(),
}).refine((data) => data.password === data.repeatPassword, {
    message: "Пароли не совпадают",
    path: ["repeatPassword"], 
});

export const LoginFormSchema = z.object({
    username: z
        .string()
        .min(6, {
            message: "Имя пользователя должно содержать минимум 6 символов",
        })
        .trim(),
    password: z
        .string()
        .trim(),
});

export type FormState =
    | {
          errors?: {
              username?: string[] | string;
              email?: string[] | string;
              password?: string[] | string;
              repeatPassword?: string[] | string;
          };
          message?: string;
      }
    | undefined;

export interface SessionData {
    userId?: number;
    username?: string;
    isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
    isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET!,
    cookieName: "dove-session",
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  };

export interface User {
    id?: number;
    username?: string;
}