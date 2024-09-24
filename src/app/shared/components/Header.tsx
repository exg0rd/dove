'use client'

import React, { useRef } from "react";

import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

import { LogInIcon } from "lucide-react";
import Link from "next/link";



export const Header: React.FC = () => {
    return (
        <header>
            <div className="flex justify-between mt-5 mx-2 items-center">
               <Logo iconSize="64"/>
                <div>
                    <Button
                        variant={"default"}
                        className="font-extrabold">
                        <>
                            <LogInIcon/>
                            <Link href="/login">Войти</Link>
                        </>
                    </Button>
                </div>
            </div>
        </header>
    );
};
