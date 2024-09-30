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
import { MenuIcon, Plus, Save } from "lucide-react";
import Carousel from "./Carousel";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

// task interface

const MOCK_DATA = {
    tasks: [
        {
            className: "",
            description: "Купить продукты",
            name: "Покупка продуктов",
            order: 1,
            date: "2023-03-15T10:00:00.000Z",
            status: "finished",
        },
        {
            className: "",
            description: "Подготовить презентацию",
            name: "Презентация проекта",
            order: 2,
            date: "2023-03-16T14:30:00.000Z",
            status: "not started",
        },
        {
            className: "",
            description: "Позвонить Ивану по поводу встречи",
            name: "Собеседование с Иваном",
            order: 3,
            date: "2023-03-17T09:00:00.000Z",
            status: "progress",
        },
        {
            className: "",
            description: "Просмотреть и ответить на письма",
            name: "Управление электронной почтой",
            order: 4,
            date: "2023-03-18T08:00:00.000Z",
            status: "finished",
        },
        {
            className: "",
            description: "Принять участие в командной встрече",
            name: "Командная встреча",
            order: 5,
            date: "2023-03-19T11:00:00.000Z",
            status: "finished",
        },
    ],
};

export const TodoList: React.FC<Props> = ({ className }) => {
    const [isHidden, setIsHidden] = useState(false);
    const [scale, setScale] = useState(1);
    const [statusFilter, setStatusFilter] = useState("not started");
    const [todayDate, setTodayDate] = useState(new Date().toLocaleDateString('RU'))
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
                    "container mx-auto md:mt-3 px-4 py-12"
                )}>
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-extrabold">
                        Список задач
                    </h2>
                    <p className="font-bold">{todayDate}</p>
                    <Button onClick={handleToggleVisibility}>
                        <MenuIcon />
                    </Button>
                </div>

                <div
                    className={cn(
                        "mt-2 md:p-2 flex flex-col round-xl shadow-sm",
                        `animated-component ${isHidden ? "hidden" : ""}`
                    )}
                    style={{
                        transform: `scaleY(${scale})`,
                        transformOrigin: "top",
                    }}>
                    <div className="flex">
                        <Button className="rounded-full mr-1 mt-2">
                            <Plus/>
                        </Button>
                        <Button className="rounded-full mr-auto mt-2 text-lg">
                            <Save/>
                        </Button>
                        <Select
                            onValueChange={(value) => setStatusFilter(value)}
                            defaultValue="not started">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Статус" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="not started">
                                    Предстоящие
                                </SelectItem>
                                <SelectItem value="progress">
                                    В процессе
                                </SelectItem>
                                <SelectItem value="finished">
                                    Завершенные
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col mt-3">
                        <ol>
                            {MOCK_DATA.tasks
                                .filter((task) => task.status === statusFilter)
                                .map((task) => (
                                    <React.Fragment key={task.name}>
                                        <TodoListTask
                                            className="rounded-lg gap-2 p-2 m-2"
                                            name={task.name}
                                            description={task.description}
                                            order={task.order}
                                            date={new Date(task.date)}
                                            status={task.status}
                                        />
                                    </React.Fragment>
                                ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};
