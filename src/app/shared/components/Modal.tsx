import React, { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { LoginForm } from "./LoginForm";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    if (!isMounted || !isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white p-3 md:p-5 lg:p-8 rounded-lg shadow-md w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-1 right-1 text-pink-600 text-3xl leading-4 hover:text-pink-600/20">
                    &times;
                </button>
                <div className="space-y-6">{children}</div>
            </div>
        </div>
    );
};
