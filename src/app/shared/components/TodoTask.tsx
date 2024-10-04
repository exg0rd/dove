import React from "react";
import { Trash2 } from "lucide-react";
import { handleCompleteTask } from "@/app/services/todo/service";

interface iTodoListTaskProps {
    className?: string;
    id: string;
    description?: string;
    name: string;
    time: string;
    type?: string;
    status: "not started" | "in progress" | "completed";
    updateTask: (arg0: string) => void;
    deleteTask: (arg0: string) => void;
}

export const TodoListTask: React.FC<iTodoListTaskProps> = ({
    className,
    description,
    name,
    id,
    time,
    status,
    updateTask,
    deleteTask,
}) => {
    const handleUpdateTask = () => {
        updateTask(id);
    };

    const handleDeleteTask = () => {
        deleteTask(id);
    };


    return (
        <li>
            <div className={className}>
                <div className="flex p-1 sm:p-2 items-center text-xs sm:text-md md:text-lg">
                    {status !== "completed" && (
                        <input
                            type="radio"
                            className="h-8 w-8 appearance-none rounded-full border accent-pink-300 checked:bg-pink-700 border-pink-300"
                            onChange={handleUpdateTask}></input>
                    )}
                    {status === "completed" && (
                        <Trash2
                            className="h-6 w-6 text-pink-700"
                            onClick={handleDeleteTask}
                        />
                    )}
                    <div className="ml-10">
                        <p className="font-extrabold">{name}</p>
                        {description && <p>{description}</p>}
                    </div>
                    <div className="ml-auto">
                        <p className="tabular-nums">{time}</p>
                    </div>
                </div>
            </div>
        </li>
    );
};
