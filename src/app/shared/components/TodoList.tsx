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
import {
    handleApiDeleteTask,
    handleCompleteTask,
} from "@/app/services/todo/service";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

// task interface

//!!! PROVIDE STORE SO YOU CAN ADD TASKS CLIENTSIDE, CHANGE STATUS AND DELETE FROM COMPLETED AND SEND IT IN ONE REQUEST !!!

export const TodoList: React.FC<Props> = ({ className }) => {
    const [isHidden, setIsHidden] = useState(false);
    const [scale, setScale] = useState(1);
    const [statusFilter, setStatusFilter] = useState("not started");
    const [openModal, setOpenModal] = useState(false);
    const [toDoTasks, setToDoTasks] = useState([]); // add memos

    useEffect(() => {
        // вынести
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

    const handleMoveTask = async (id: string) => {
        const response = await handleCompleteTask(id);
        if (response.success === true) {
            setToDoTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id ? { ...task, status: "completed" } : task
                )
            );
            // }
        }
    };
    // tasks state and proper ... for tasks

    const handleDeleteTask = async (id: string) => {
        const response = await handleApiDeleteTask(id);
        if (response.success === true) {
            setToDoTasks((prevTasks) =>
                prevTasks.filter((task) => task.id !== id)
            );
            // }
        }
    };

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
                                <SelectItem value="completed">
                                    Завершенные
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col mt-3">
                        <ol>
                            {toDoTasks.filter(
                                (task) => task.status === statusFilter
                            ).length > 0 ? (
                                toDoTasks
                                    .filter(
                                        (task) => task.status === statusFilter
                                    )
                                    .map((task) => (
                                        <React.Fragment key={task.id}>
                                            <TodoListTask
                                                className="rounded-lg gap-2 p-2 m-2"
                                                id={task.id}
                                                name={task.name}
                                                description={task.description}
                                                time={task.time}
                                                status={task.status}
                                                updateTask={handleMoveTask}
                                                deleteTask={handleDeleteTask}
                                            />
                                        </React.Fragment>
                                    ))
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
                    setTasks={setToDoTasks}
                />
            </Modal>
        </div>
    );
};
