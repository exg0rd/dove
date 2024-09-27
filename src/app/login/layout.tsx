// LoginLayout.tsx
import React, { ReactNode } from "react";

interface AuthFormLayoutProps {
    children: ReactNode;
}

export const AuthFormLayout: React.FC<AuthFormLayoutProps> = ({ children }) => {
    return (
        <div className="fixed inset-0 bg-pink-100 flex items-center justify-center z-50">
            <div className="bg-white m-3 p-6 rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                {children}
            </div>
        </div>
    );
};

export default AuthFormLayout;
