import React from "react";
import { ProfileLayout } from "./layout";
import { Header } from "../shared/components/Header";
import { getSession } from "../actions/actions";
import { TodoList } from "../shared/components/TodoList";
import Carousel from "../shared/components/Carousel";

interface ProfileProps {
    children: React.ReactNode;
}

export async function Profile({ children }: ProfileProps) {
    const session = await getSession();
    const username = session.username;

    return (
        <ProfileLayout>
            <Header username={username}/>
            <div>
                <TodoList></TodoList>
                <Carousel/>
            </div>
            {children}
        </ProfileLayout>
    );
}

export default Profile;
