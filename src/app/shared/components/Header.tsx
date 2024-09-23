import React from "react";

import { Logo } from "./Logo";
import { Button } from "./Button";

import { Bungee } from "next/font/google";
import { cn } from "../lib/utils";

const bungeeFont = Bungee({
    weight: "400",
    subsets: ["latin"],
});

export const Header: React.FC = () => {
    return (
        <header>
            <div className="flex justify-between mt-5 mx-2 items-center">
                <div
                    className={cn(
                        bungeeFont.className,
                        "flex items-center gap-4"
                    )}>
                    <Logo className="w-[64px] h-[64px]" />
                    <div>
                        <h2 className="text-pink-300 text-4xl">Dove</h2>
                        <h4 className="text-pink-500 text-sm">
                            Do what you love
                        </h4>
                    </div>
                </div>
                <div>
                    <Button variant={"primary"} className="font-extrabold tracking-wider text-pink-300 text-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#f9a8d4">
                            <path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z" />
                        </svg>
                        Войти
                    </Button>
                </div>
            </div>
        </header>
    );
};
