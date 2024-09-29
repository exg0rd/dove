"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { comforta } from "@/app/layout";
import { cn } from "@/app/lib/utils";
import { TodoListTask } from "./TodoTask";
import { MenuIcon } from "lucide-react";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

const MOCK_DATA = {
    tasks: [
        {
            className: "",
            description: "Buy groceries",
            name: "Grocery Shopping",
            order: 1,
            date: "2023-03-15T10:00:00.000Z",
            status: "finished",
        },
        {
            className: "",
            description: "Prepare presentation slides",
            name: "Project Presentation",
            order: 2,
            date: "2023-03-16T14:30:00.000Z",
            status: "not started",
        },
        {
            className: "",
            description: "Call John about meeting",
            name: "Follow-up Call",
            order: 3,
            date: "2023-03-17T09:00:00.000Z",
            status: "in progress",
        },
        {
            className: "",
            description: "Review and respond to emails",
            name: "Email Management",
            order: 4,
            date: "2023-03-18T08:00:00.000Z",
            status: "finished",
        },
        {
            className: "",
            description: "Attend team meeting",
            name: "Team Meeting",
            order: 5,
            date: "2023-03-19T11:00:00.000Z",
            status: "finished",
        },
    ],
};

const statusPriority: Record<> = {
    "not started": 0,
    "in progress": 1,
    finished: 2,
};

export const TodoList: React.FC<Props> = ({ className }) => {
    const [isHidden, setIsHidden] = useState(false);
    const [scale, setScale] = useState(1);
    // tasks state and proper ... for tasks

    const handleToggleVisibility = () => {
        if (!isHidden) {
            setScale(0);
            setTimeout(() => {
                setIsHidden(true);
            }, 300);
        } else {
            setIsHidden(false);
            setTimeout(() => {
                setScale(1);
            }, 50);
        }
    };

    return (
        <div className={className}>
            <div
                className={cn(
                    comforta.className,
                    "container mx-auto mt-5 px-4 py-12"
                )}>
                <div className="flex justify-between">
                    <h2 className="text-3xl font-extrabold mt-3">
                        Список задач
                    </h2>
                    <Button onClick={handleToggleVisibility}>
                        <MenuIcon />
                    </Button>
                </div>

                <div
                    className={cn(
                        "mt-5 p-3 min-h-[300px] flex flex-col round-xl shadow-lg",
                        `animated-component ${isHidden ? "hidden" : ""}`
                    )}
                    style={{
                        transform: `scaleY(${scale})`,
                        transformOrigin: "top",
                    }}>
                    <div className="flex justify-between">
                        <Button className="rounded-full text-xl leading-loose">
                            +
                        </Button>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Фильтры" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col mt-3">
                        <ol>
                            {MOCK_DATA.tasks
                                .sort(
                                    (a, b) =>
                                        statusPriority[a.status] -
                                        statusPriority[b.status]
                                )
                                .map((task, index, sortedTasks) => {
                                    const isLastInProgress =
                                        task.status === "in progress" &&
                                        (index === sortedTasks.length - 1 ||
                                            sortedTasks[index + 1].status !==
                                                "in progress");

                                    return (
                                        <React.Fragment key={task.name}>
                                            <TodoListTask
                                                className="rounded-lg gap-2 p-2 m-2"
                                                name={task.name}
                                                description={task.description}
                                                order={task.order}
                                                date={new Date(task.date)}
                                                status={task.status}
                                            />
                                            {isLastInProgress && <hr className="my-3 border-t-4 border-green-600"/>}
                                        </React.Fragment>
                                    );
                                })}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};
