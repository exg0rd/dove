import "./globals.css";

import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: ["300"], subsets: ["cyrillic"] });

import { cn } from "@/app/lib/utils";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"></meta>
            <body>
                <main
                    className={cn(
                        roboto.className,
                        "mx-auto max-w-[1280px] min-h-screen"
                    )}>

                    {children}
                </main>
            </body>
        </html>
    );
}
