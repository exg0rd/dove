import React from "react";
import { ProfileLayout } from "./layout";
import { Header } from "../shared/components/Header";
import { getSession } from "../actions/actions";
import { TodoList } from "../shared/components/TodoList";

interface ProfileProps {
    children: React.ReactNode;
}

export async function Profile({ children }: ProfileProps) {
    const session = await getSession();
    const username = session.username;

    return (
        <ProfileLayout>
            <Header username={username}/>
            <div className="grid grid-rows-2">
                <TodoList></TodoList>
            </div>
            {children}
        </ProfileLayout>
    );
}

export default Profile;
