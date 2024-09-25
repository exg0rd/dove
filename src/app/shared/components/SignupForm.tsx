"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { useFormState, useFormStatus } from 'react-dom'
import { signup } from "@/app/api/auth";

export const SignupForm: React.FC = () => {
    // reuse inputs maybe as components?
    const [state, action] = useFormState(signup, undefined);

    return (
        <>
            <Logo
                iconSize="64"
                className="my-4"
            />
            <form
                className="space-y-6"
                action={action}>
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-lg font-extrabold text-pink-700">
                        Электронная почта
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Электронная почта"
                        required
                        className="bg-gray-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-400 focus:border-pink-500 block w-full p-2.5"
                    />
                    {state?.errors?.email && (
                        <p className="mt-3 text-sm text-red-300">
                            {state.errors.email}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-lg font-extrabold text-pink-700">
                        Имя пользователя
                    </label>
                    <input
                        id="username"
                        name="username"
                        placeholder="Имя пользователя"
                        required
                        className="bg-gray-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-400 focus:border-pink-500 block w-full p-2.5"
                    />
                    {state?.errors?.username && (
                        <p className="mt-3 text-sm text-red-300">
                            {state.errors.username}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-lg font-extrabold text-pink-700">
                        Пароль
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Пароль"
                        required
                        className="bg-gray-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-400 focus:border-pink-500 block w-full p-2.5"
                    />
                    {state?.errors?.password && (
                        <div className="mt-3">
                            <ul>
                                {state.errors.password.map((error) => (
                                    <li
                                        className="text-sm text-red-300"
                                        key={error}>
                                        {error}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="repeatPassword"
                        className="block mb-2 text-lg font-extrabold text-pink-700">
                        Повторите пароль
                    </label>
                    <input
                        id="repeatPassword"
                        name="repeatPassword"
                        type="password"
                        placeholder="Пароль"
                        required
                        className="bg-gray-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-400 focus:border-pink-500 block w-full p-2.5"
                    />
                    {state?.errors?.repeatPassword && (
                        <p className="mt-3 text-sm text-red-300">
                            {state.errors.repeatPassword}
                        </p>
                    )}
                </div>
               <SubmitButton/>
            </form>
        </>
    );
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending}
            type="submit"
            variant={'default'}
            className="flex bg-pink-700 text-sm">
            Создать аккаунт
        </Button>
    );
}
