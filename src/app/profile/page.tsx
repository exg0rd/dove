import React from "react";
import { ProfileLayout } from "./layout";
import { Header } from "../shared/components/Header";
import { getSession } from "../actions/actions";
import { TodoList } from "../shared/components/TodoList";
import Carousel from "../shared/components/DayCarousel";

interface ProfileProps {
    children: React.ReactNode;
}

export async function Profile({ children }: ProfileProps) {
    const session = await getSession();
    const username = session.username;

    return (
        <ProfileLayout>
            <Header username={username} />
            <TodoList></TodoList>
            <Carousel />
            {children}
        </ProfileLayout>
    );
}

export default Profile;
