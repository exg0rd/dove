export const handleAddTask = async (newTask) => {
    console.log(newTask)
    try {
        const response = await fetch("/api/todo/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask.formData),
        });

        if (response.ok) {
            const addedTask = await response.json();
            return {addedTask : addedTask, success: true}
          
        } else {
            return {addedTask : undefined, success: false}
        }
    } catch (error) {
        console.error("Error adding task:", error);
        return {addedTask : undefined, success: false}
    }
};

export const handleCompleteTask = async (taskId : string) => {
    try {
        const response = await fetch("/api/todo/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskId),
        });

        const {updatedTask, success} = await response.json();
        return {updatedTask, success};
          
    } catch (error) {
        console.error("Error adding task:", error);
        return {updatedTask : undefined, status: false}
    }
};


export const handleApiDeleteTask = async(taskId : string) => {
    try {
        const response = await fetch("/api/todo/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskId),
        });

        const {deletedTask, success} = await response.json();
        return {deletedTask, success};
          
    } catch (error) {
        console.error("Error deleting task:", error);
        return {updatedTask : undefined, status: false}
    }
}