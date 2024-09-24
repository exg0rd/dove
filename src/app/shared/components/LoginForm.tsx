import React from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

interface Props {
    className?: string;
}

export const LoginForm: React.FC = () => {
    return (
        <>
          <Logo iconSize="64" className="my-8"/>
            <form className="space-y-6">
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
                        required
                        className="bg-gray-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
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
                        required
                        className="bg-gray-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <Button
                    variant={"default"}
                    className="bg-pink-700 font-bold">
                    Войти
                </Button>
                <Button
                    variant={"ghost"}
                    className="mx-3 text-pink-700 font-bold">
                    Создать аккаунт
                </Button>
            </form>
        </>
    );
};
