import { cn } from "@/app/lib/utils";
import React from "react";

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
    status
}) => {

    const bgColorClasses = {
        "not started": "bg-gray-100",
        "in progress": "bg-yellow-100",
        "finished": "bg-green-100",
    };

    // Combine the dynamic bg class with any existing classes

    return (
        <li>
            <div className={cn(className, bgColorClasses[status])}>
                <div className="flex justify-between p-1 sm:p-2 lg:p-3">
                    <div>
                        <p className="font-extrabold text-lg">{name}</p>
                        {description && <p>{description}</p>}
                    </div>
                    <div>
                        {status !== 'finished' && <input type="checkbox"></input>}
                        <p>{date.toLocaleTimeString('RU', {hour: '2-digit', minute: '2-digit'})}</p>
                    </div>
                </div>
            </div>
        </li>
    );
};
