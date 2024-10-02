import React from "react";

interface Props {
    task: IDailyTask;
}

export interface IDailyTask {
    startTime: Date;
    endTime: Date;
    completed: boolean;
    name: string;
    description: string;
}

export const DailyTask: React.FC<Props> = ({ task }) => {
    return (
        <div className="text-sm md:text-xl font-light grid grid-cols-6 bg-pink-100 rounded-xl border-pink-300 py-3 md:py-8">
            <div className="font-extrabold col-span-1 border-r-4 border-pink-800">
                <p>{task.startTime.toLocaleTimeString("RU", {hour:'2-digit', minute: '2-digit'})}</p>
                <p>{task.endTime.toLocaleTimeString("RU", {hour:'2-digit', minute: '2-digit'})}</p>
            </div>
            <div className="justify-center col-span-5">
                <p className="medium">{task.name}</p>
                <p>{task.completed}</p>
            </div>
        </div>
    );
};
