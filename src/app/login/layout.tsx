// LoginLayout.tsx
import React, { ReactNode } from "react";

interface LoginLayoutProps {
    children: ReactNode; // Define children as a prop
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
    return (
        <div className="fixed inset-0 bg-pink-100 flex items-center justify-center z-50">
            <div className="relative bg-white p-3 md:p-5 lg:p-8 rounded-2xl shadow-xl w-full max-w-md">
                {children}
            </div>
        </div>
    );
};

export default LoginLayout;
