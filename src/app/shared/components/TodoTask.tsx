import React from "react";
import { Trash2 } from "lucide-react";

interface iTodoListTaskProps {
    className?: string;
    description?: string;
    name: string;
    order: number;
    date: Date;
    type?: string;
    status: "not started" | "in progress" | "finished";
}

export const TodoListTask: React.FC<iTodoListTaskProps> = ({
    className,
    description,
    name,
    order,
    date,
    status,
}) => {
    // Combine the dynamic bg class with any existing classes

    return (
        <li>
            <div className={className}>
                <div className="flex p-1 sm:p-2 items-center text-xs sm:text-md md:text-lg">
                    {status !== "finished" && (
                        <input
                            type="radio"
                            className="h-8 w-8 appearance-none rounded-full border accent-pink-300 checked:bg-pink-700 border-pink-300"></input>
                    )}
                     {status === "finished" && (
                        <Trash2 className="h-6 w-6 text-pink-700"/>
                    )}
                    <div className="ml-10">
                        <p className="font-extrabold">{name}</p>
                        {description && <p>{description}</p>}
                    </div>
                    <div className="ml-auto">
                        <p className="tabular-nums">
                            {date.toLocaleTimeString("RU", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </li>
    );
};
