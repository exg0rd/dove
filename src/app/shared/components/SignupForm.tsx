"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { useFormState, useFormStatus } from "react-dom";
import { signup } from "@/app/api/auth";
import { AuthFormInput } from "./AuthFormInput";
import { Spinner } from "./Spinner";
import { SubmitButton } from "./SubmitButton";

export const SignupForm: React.FC = () => {
    const [state, action] = useFormState(signup, undefined);

    return (
        <>
            <Logo
                iconSize="64"
                className="my-4"
            />
            <form
                className="space-y-6"
                action={action} method="POST">
                <AuthFormInput
                    type="email"
                    description="Электронная почта"
                    errorDescription={state?.errors?.email}
                />
                <AuthFormInput
                    type="username"
                    description="Имя пользователя"
                    errorDescription={state?.errors?.username}
                />
                <AuthFormInput
                    type="password"
                    description="Пароль"
                    errorDescription={state?.errors?.password}
                />
                <AuthFormInput
                    type="repeatPassword"
                    description="Повторите пароль"
                    errorDescription={state?.errors?.repeatPassword}
                />
                <SubmitButton className="bg-pink-700 text-sm">Зарегистрироваться</SubmitButton>
            </form>
        </>
    );
};
