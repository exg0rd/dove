'use client'

import React, { useRef } from "react";

import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Bungee } from "next/font/google";
import { cn } from "../lib/utils";
import { LogInIcon } from "lucide-react";
import { LoginForm } from "./LoginForm";
import { Modal } from "./Modal";

const bungeeFont = Bungee({
    weight: "400",
    subsets: ["latin"],
});

export const Header: React.FC = () => {

    const loginFormRef = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    function handleLoginButtonClick() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }


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
                    <Button
                        variant={"default"}
                        className="font-extrabold"
                        onClick={handleLoginButtonClick}>
                        <>
                            <LogInIcon/>
                             Войти
                        </>
                    </Button>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <LoginForm ref={loginFormRef} />
            </Modal>
        </header>
    );
};
