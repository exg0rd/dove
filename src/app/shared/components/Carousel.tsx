"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";

import { comforta } from "@/app/layout";
import { cn } from "@/app/lib/utils";

const Carousel = () => {
    const [currentWeekStart, setCurrentWeekStart] = useState(
        getStartOfWeek(new Date())
    );
    const [currentDay, setCurrentDay] = useState(new Date().getDate())

    function getStartOfWeek(date) {
        const day = date.getUTCDay(); // Получаем день недели (0 - воскресенье, 1 - понедельник и т.д.)
        const diff = date.getDate() - day; // Разница между текущей датой и началом недели
        return new Date(date.setDate(diff)); // Возвращаем дату начала недели
    }

    const daysInWeek = Array.from({ length: 7 }, (_, i) => {
        const day = new Date(currentWeekStart);
        day.setDate(currentWeekStart.getDate() + i);
        return day;
    });

    const nextWeek = () => {
        const nextWeekStart = new Date(currentWeekStart);
        nextWeekStart.setDate(currentWeekStart.getDate() + 7);
        setCurrentWeekStart(nextWeekStart);
    };

    const prevWeek = () => {
        const prevWeekStart = new Date(currentWeekStart);
        prevWeekStart.setDate(currentWeekStart.getDate() - 7);
        setCurrentWeekStart(prevWeekStart);
    };

    return (
        <div
            className={cn(
                comforta.className,
                "container mx-auto md:mt-3 px-4 py-12"
            )}>
            <h2 className="mr-auto text-xl font-extrabold">
                Задачи по расписанию
            </h2>
            <div className="mt-5 flex justify-between w-full mb-4">
                <Button
                    onClick={prevWeek}
                    className="px-4 py-2 text-white rounded">
                    <ArrowLeft />
                </Button>
                <h2 className="text-lg font-bold">
                    {currentWeekStart.toLocaleString("ru-RU", {
                        month: "long",
                        year: "numeric",
                    })}
                </h2>
                <Button
                    onClick={nextWeek}
                    className="px-4 py-2 text-white rounded">
                    <ArrowRight />
                </Button>
            </div>
            <div className="flex justify-between w-full text-sm">
                {daysInWeek.map((day) => (
                    <div
                        key={day.toISOString()}
                        className={`flex flex-col items-center border-pink-300 border rounded-full px-3 py-4 sm:px-6 sm:py-8 ${
                            day.getDate() === currentDay ? "bg-pink-300" : ""
                        }`}>
                        <div className="font-semibold">
                            {day.toLocaleString("ru-RU", { weekday: "short" })}
                        </div>
                        <div className="text-lg">{day.getDate()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
