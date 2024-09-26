"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import Link from "next/link";
import { AuthFormInput } from "./AuthFormInput";
import { useFormState, useFormStatus } from "react-dom";
import { login } from "@/app/api/auth";
import { SubmitButton } from "./SubmitButton";

export const LoginForm: React.FC = () => {
    const [state, action] = useFormState(login, undefined);

    return (
        <>
            <Logo
                iconSize="64"
                className="my-8"
            />
            <form className="space-y-6" method="POST" action={action}>
                <AuthFormInput
                    type="username"
                    description="Имя пользователя"
                    errorDescription={state?.errors?.username}
                />
                <AuthFormInput
                    type="password"
                    description="Пароль"
                    errorDescription={state?.errors?.password}
                    successDescription={state?.message}
                />
                <SubmitButton className="bg-pink-700 text-sm">Войти</SubmitButton>
                <Button
                    variant={"ghost"}
                    className="mx-3 text-pink-700 font-bold">
                    <Link href="/signup">Создать аккаунт</Link>
                </Button>
            </form>
        </>
    );
};
