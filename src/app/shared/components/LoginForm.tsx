"use client";
import React from "react";
import { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import Link from "next/link";
import { AuthFormInput } from "./AuthFormInput";
import { SubmitButton } from "./SubmitButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginValidate } from "@/app/validation/auth";

export const LoginForm: React.FC = () => {
    const [formErrors, setFormErrors] = useState<any>({});

    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event?.preventDefault();
        const formData = new FormData(event?.currentTarget);

        const { username, password, errors } = loginValidate(formData);

        if (errors) {
            setFormErrors(errors);
            return;
        }

        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            router.push("/profile");
        } else {
            const errorData = await response.json();
            setFormErrors({
                ...formErrors,
                username: errorData.errors
            });
        }
    }

    return (
        <>
            <Logo
                iconSize="64"
                className="my-8"
            />
            <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                <AuthFormInput
                    type="username"
                    description="Имя пользователя"
                    errorDescription={formErrors.username}
                />
                <AuthFormInput
                    type="password"
                    description="Пароль"
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
