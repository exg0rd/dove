"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { comforta } from "@/app/layout";
import { cn } from "@/lib/utils";
import { TodoListTask } from "./TodoTask";
import { MenuIcon, Plus, Save } from "lucide-react";
import Modal from "./Modal";
import { ToDoForm } from "./ToDoForm";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

// task interface

export const TodoList: React.FC<Props> = ({ className }) => {
    const [isHidden, setIsHidden] = useState(false);
    const [scale, setScale] = useState(1);
    const [statusFilter, setStatusFilter] = useState("not started");
    const [openModal, setOpenModal] = useState(false);
    const [toDoTasks, setToDoTasks] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch("/api/todo/get", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: "",
                });
                if (!response.ok) {
                    throw new Error(`ERROR status ${response.status}`);
                }
                const data = await response.json();
                setToDoTasks(data.tasks);
            } catch (error) {
                console.log("ERROR FETCH", error);
            }
        };

        fetchTodos();
    }, []);

    const todayDate = new Date().toLocaleString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

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

    const handleOpen = () => {
        setOpenModal(!openModal);
    };

    const handleAddTask = async (newTask) => {
        try {
            const response = await fetch("/api/todo/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                const addedTask = await response.json();
                console.log(addedTask)
                console.log(toDoTasks);
                if (toDoTasks.length > 0) {
                    setToDoTasks(prevTasks => [...prevTasks, addedTask.task]);
                } else {
                    setToDoTasks(addedTask);
                }
                return true;
            } else {
                throw new Error("Failed to add task");
            }
        } catch (error) {
            console.error("Error adding task:", error);
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
                    <h2 className="text-xl font-extrabold">Список задач</h2>
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
                    <div className="flex items-center">
                        <Button
                            className="rounded-full mr-1 mt-2"
                            onClick={handleOpen}>
                            <Plus />
                        </Button>
                        <Button className="rounded-full mr-auto mt-2 text-lg">
                            <Save />
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
                            {toDoTasks.length > 0 ? (
                                toDoTasks
                                    .filter(
                                        (task) => task.status === statusFilter
                                    )
                                    .map((task) => {
                                        return (
                                            <React.Fragment key={task.name}>
                                                <TodoListTask
                                                    className="rounded-lg gap-2 p-2 m-2"
                                                    name={task.name}
                                                    description={
                                                        task.description
                                                    }
                                                    order={task.order}
                                                    time={task.time}
                                                    status={task.status}
                                                />
                                            </React.Fragment>
                                        );
                                    })
                            ) : (
                                <p className="text-center">Пока нет задач</p>
                            )}
                        </ol>
                    </div>
                </div>
            </div>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                title={"Новая задача"}
                formName="todoform">
                <ToDoForm
                    formName="todoform"
                    addTask={handleAddTask}
                />
            </Modal>
        </div>
    );
};
