"use client";
import React from "react";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginValidate } from "@/app/validation/auth";

import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import Link from "next/link";
import { AuthFormInput } from "./AuthFormInput";
import { SubmitButton } from "./SubmitButton";

export const LoginForm: React.FC = () => {

    const router = useRouter();
    
    const [formErrors, setFormErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event?.preventDefault();
        setLoading(true);
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
            setLoading(false);
            router.push('/profile');
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
