"use client";

import React from "react";

import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

import { LogInIcon, LogOutIcon, Router } from "lucide-react";
import Link from "next/link";
import { User } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

export function Header({ username }: User) {
    const router = useRouter();

    async function handleLogout() {
        // shoud not be here
        fetch("/api/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username }),
        }).then((response) => {
            if (response.ok) router.push("/");
        });
    }

    return (
        <header>
            <div className="flex justify-between mt-5 mx-2 items-center">
                <Logo iconSize="64" />
                <div>
                    <Button
                        variant={"default"}
                        className="font-medium"
                        onClick={username ? handleLogout : undefined}>
                        <p>{username}</p>
                        {!username ? (
                            <>
                                <LogInIcon />
                                <Link href="/login">Войти</Link>
                            </>
                        ) : (
                            <>
                                <LogOutIcon />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </header>
    );
}
