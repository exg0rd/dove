"use client";
import React, { FormEvent, useEffect, useState } from "react";

interface Props {
    className?: string;
    addTask: (arg0: any) => boolean;
    formName: string;
}

export const ToDoForm: React.FC<Props> = ({ addTask, formName }) => {
    // tasks should be updated on successfull response
    const [description, setDescription] = useState(
        localStorage.getItem("descriptiondraft") || ""
    );
    const [time, setTime] = useState(localStorage.getItem("timedraft") || "");
    const [name, setName] = useState(localStorage.getItem("namedraft") || "");

    useEffect(() => {
        if (description && time) {
            return () => {
                localStorage.setItem("namedraft", name);
                localStorage.setItem("descriptiondraft", description);
                localStorage.setItem("timedraft", time);
            };
        }
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const status = await addTask({ name, description, time });
            if (status === true) {
                localStorage.removeItem("namedraft");
                localStorage.removeItem("descriptiondraft");
                localStorage.removeItem("timedraft");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    return (
        <form method="POST" onSubmit={handleSubmit} id={formName}>
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
                        value={name}
                        required
                        className="bg-gray-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-400 focus:border-pink-500 block w-full p-2.5"
                        onChange={handleNameChange}></input>
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
                        value={description}
                        required
                        className="min-h-[150px] resize-none bg-gray-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-400 focus:border-pink-500 block w-full p-2.5"
                        onChange={handleDescriptionChange}></textarea>
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
                        value={time}
                        required
                        className="bg-gray-50 border border-pink-300 text-pink-900 text-sm rounded-lg focus:ring-pink-400 focus:border-pink-500 block w-full p-2.5"
                        onChange={handleTimeChange}></input>
                </div>
            </div>
        </form>
    );
};
