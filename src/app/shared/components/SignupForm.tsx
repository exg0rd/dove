"use client";
import React, { useState } from "react";
import { FormEvent, useEffect } from "react";

import { useRouter } from "next/navigation";

import { Logo } from "./Logo";
import { AuthFormInput } from "./AuthFormInput";
import { SubmitButton } from "./SubmitButton";
import { signupValidate } from "@/app/validation/auth";

export const SignupForm: React.FC = () => {

    const router = useRouter();

    const [formErrors, setFormErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);

    function handleServerResponse(errorData) {
        setLoading(false);
        setFormErrors({
            ...formErrors,
            username: errorData.errors
        });
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event?.preventDefault();
        const formData = new FormData(event?.currentTarget);
        setLoading(true);

        const { username, email, password, errors } = signupValidate(formData);

        if (errors) {
            setFormErrors(errors);
            return;
        }

        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            router.push('/profile');
        } else {
            const errorData = await response.json();
            handleServerResponse(errorData);
        }
    }

    return (
        <>
            <Logo
                iconSize="64"
                className="my-4"
            />
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
                method="POST">
                <AuthFormInput
                    type="email"
                    description="Электронная почта"
                    errorDescription={formErrors.email} // fix this
                />
                <AuthFormInput
                    type="username"
                    description="Имя пользователя"
                    errorDescription={formErrors?.username}
                />
                <AuthFormInput
                    type="password"
                    description="Пароль"
                    errorDescription={formErrors.password}
                />
                <AuthFormInput
                    type="repeatPassword"
                    description="Повторите пароль"
                    errorDescription={formErrors.repeatPassword}
                />
                <SubmitButton loading={loading} className="bg-pink-700 text-sm">
                    Зарегистрироваться
                </SubmitButton>
            </form>
        </>
    );
};
