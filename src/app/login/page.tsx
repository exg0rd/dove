import React, { ReactNode } from "react";
import LoginLayout from "./layout";
import { LoginForm } from "../shared/components/LoginForm";

interface PageProps {
    children: ReactNode;
}

const LoginPage: React.FC<PageProps> = ({ children }) => {
    return (
        <LoginLayout>
            <LoginForm />
        </LoginLayout>
    );
};

export default LoginPage;
