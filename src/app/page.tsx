import { Header } from "./shared/components/Header";

import { Roboto } from "next/font/google";
import { cn } from "./shared/lib/utils";

const roboto = Roboto({weight: ['300'], subsets: ['cyrillic']})

export default function Home() {
    return (
        <main className={cn(roboto.className, "mx-auto max-w-[1280px] min-h-screen")}>
            <Header />
        </main>
        
    );
}
