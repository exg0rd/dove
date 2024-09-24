import React, { ReactNode } from "react";
import AuthFormLayout from "./layout";
import { LoginForm } from "../shared/components/LoginForm";

interface PageProps {
    children: ReactNode;
}

const LoginPage: React.FC<PageProps> = ({ children }) => {
    return (
        <AuthFormLayout>
            <LoginForm />
        </AuthFormLayout>
    );
};

export default LoginPage;
