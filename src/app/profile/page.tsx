import React from "react";
import { ProfileLayout } from "./layout";
import { Header } from "../shared/components/Header";
import RootLayout from "../layout";
import { getSession } from "../actions/actions";

interface ProfileProps {
    children: React.ReactNode;
}

export async function Profile({ children }: ProfileProps) {
    const session = await getSession();
    const username = session.username;

    return (
        <ProfileLayout>
            <Header username={username} />
            <h1 className="text-xl text-center mt-20">
                Welcome back, {username}!
            </h1>
            {children}
        </ProfileLayout>
    );
}

export default Profile;
