import { z } from "zod";

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

export type FormState =
    | {
          errors?: {
              username?: string[];
              email?: string[];
              password?: string[];
              repeatPassword?: string[];
          };
          message?: string;
      }
    | undefined;
