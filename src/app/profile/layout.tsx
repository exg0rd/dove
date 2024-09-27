import React from "react";

interface ProfileLayoutProps {
    children?: React.ReactNode;
}

export async function ProfileLayout({ children }: ProfileLayoutProps) {
    return <div>{children}</div>;
}

export default ProfileLayout;
