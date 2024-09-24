import React, { ReactNode } from "react";
import AuthFormLayout from "../login/layout"; // cursed
import { SignupForm } from "../shared/components/SignupForm";

interface PageProps {
    children: ReactNode;
}

const SignupPage: React.FC<PageProps> = ({ children }) => {
    return (
        <AuthFormLayout>
            <SignupForm />
        </AuthFormLayout>
    );
};

export default SignupPage;
