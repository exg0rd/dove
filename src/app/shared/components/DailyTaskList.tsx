import React from "react";
import { IDailyTask, DailyTask } from "./DailyTask";

interface Props {
    tasks: IDailyTask[];
}

export const DailyTaskList: React.FC<Props> = ({ tasks }) => {
    return (
        <div className="space-y-4">
            {tasks.map((task, index) => (
                <DailyTask
                    key={index}
                    task={task}
                />
            ))}
        </div>
    );
};
