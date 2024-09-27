import React, { ReactNode } from "react";
import { AuthFormLayout } from "./layout";
import { LoginForm } from "../shared/components/LoginForm";

const LoginPage: React.FC = () => {
    return (
        <AuthFormLayout>
            <LoginForm />
        </AuthFormLayout>
    );
};

export default LoginPage;
