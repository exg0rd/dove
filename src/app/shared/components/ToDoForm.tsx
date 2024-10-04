"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { handleAddTask } from "@/app/services/todo/service";

interface Props {
    className?: string;
    setTasks: (arg0: any) => boolean;
    formName: string;
}

export const ToDoForm: React.FC<Props> = ({ setTasks, formName }) => {
    // tasks should be updated on successfull response
    const [formData, setFormData] = useState({
        name: "" || localStorage.getItem("namedraft"),
        description: "" || localStorage.getItem("descriptiondraft"),
        time: "" || localStorage.getItem("timedraft"),
    });

    useEffect(() => {
        if (formData) {
            return () => {
                localStorage.setItem("namedraft", formData.name);
                localStorage.setItem("descriptiondraft", formData.description);
                localStorage.setItem("timedraft", formData.time);
            };
        }
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const status = await handleAddTask({ formData });
            if (status.success === true) {
                localStorage.removeItem("namedraft");
                localStorage.removeItem("descriptiondraft");
                localStorage.removeItem("timedraft");

                setTasks(prev => [...prev, status.addedTask.task])
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        console.log(name, value)

        setFormData({...formData, [name] : value })
        console.log(formData)
    };

    return (
        <form
            method="POST"
            onSubmit={handleSubmit}
            id={formName}
            onChange={handleInputChange}>
            <div className="flex flex-col mt-5 p-3 gap-3">
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-lg font-extrabold text-pink-700">
                        Название задачи
                    </label>
                    <input
                        type="text"
                        id="taskname"
                        name="name"
                        placeholder="Название задачи..."
                        value={formData.name}
                        required
                        className="bg-gray-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-400 focus:border-pink-500 block w-full p-2.5"></input>
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="block mb-2 text-lg font-extrabold text-pink-700">
                        Описание задачи
                    </label>
                    <textarea
                        id="taskdescription"
                        name="description"
                        placeholder="Описание задачи..."
                        value={formData.description}
                        className="min-h-[150px] resize-none bg-gray-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-400 focus:border-pink-500 block w-full p-2.5"></textarea>
                </div>
                <div>
                    <label
                        htmlFor="time"
                        className="block mb-2 text-lg font-extrabold text-pink-700">
                        Время
                    </label>
                    <input
                        id="tasktime"
                        type="time"
                        name="time"
                        placeholder="Время..."
                        value={formData.time}
                        required
                        className="bg-gray-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-400 focus:border-pink-500 block w-full p-2.5"></input>
                </div>
            </div>
        </form>
    );
};
