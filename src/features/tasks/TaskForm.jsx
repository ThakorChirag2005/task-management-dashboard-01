import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "./tasksSlice";

function TaskForm({ editingTask, setEditingTask }) {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [status, setStatus] = useState("pending");
    const [dueDate, setDueDate] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setPriority(editingTask.priority);
            setStatus(editingTask.status);
            setDueDate(editingTask.dueDate);
        }
    }, [editingTask]);

    function handleSubmit(event) {
        event.preventDefault();

        if (!title.trim()) {
            setError("Please enter a task title.");
            return;
        }

        if (!dueDate || Number.isNaN(Date.parse(dueDate))) {
            setError("Please select a valid due date.");
            return;
        }

        const task = {
            title: title.trim(),
            description: description.trim(),
            priority,
            status,
            dueDate,
        };

        if (editingTask) {
            dispatch(
                editTask({
                    ...task,
                    id: editingTask.id,
                })
            );

            setEditingTask(null);
        } else {
            dispatch(addTask(task));
        }

        setTitle("");
        setDescription("");
        setPriority("medium");
        setStatus("pending");
        setDueDate("");
        setError("");
    }

    function handleCancel() {
        setEditingTask(null);
        setTitle("");
        setDescription("");
        setPriority("medium");
        setStatus("pending");
        setDueDate("");
        setError("");
    }

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h2>{editingTask ? "Edit Task" : "Create New Task"}</h2>

            <label>Task Title</label>
            <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Enter task title"
            />

            <label>Description</label>
            <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Enter task description"
            />

            <label>Priority</label>
            <select
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <label>Status</label>
            <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
            >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <label>Due Date</label>
            <input
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">
                {editingTask ? "Update Task" : "Add Task"}
            </button>

            {editingTask && (
                <button type="button" onClick={handleCancel}>
                    Cancel
                </button>
            )}
        </form>
    );
}

export default TaskForm;