
import { useSelector, useDispatch } from "react-redux";
import {
    deleteTask,
    updateTaskStatus,
} from "./tasksSlice";
import TaskItem from "./TaskItem";

function TaskList({
    search,
    statusFilter,
    priorityFilter,
    sortBy,
    onEdit,
}) {
    const tasks = useSelector((state) => state.tasks.items);
    const loading = useSelector((state) => state.tasks.loading);
    const error = useSelector ((state) => state.tasks.error);
    
    const dispatch = useDispatch();
    if (loading) {
    return <p>Loading tasks...</p>;
  }
  if (error) {
    return <p>{error}</p>;
    }

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "all" ||
            task.status === statusFilter;

        const matchesPriority =
            priorityFilter === "all" ||
            task.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sortBy === "dueDate") {
    return (a.dueDate || "").localeCompare(b.dueDate || "");
}

        if (sortBy === "priority") {
            const priorityOrder = {
                high: 1,
                medium: 2,
                low: 3,
            };

            return (
                priorityOrder[a.priority] -
                priorityOrder[b.priority]
            );
        }

        return 0;
    });

    function handleDelete(id) {
        const confirmed = window.confirm(
            "The deleted task cannot be restored. Are you sure?"
        );

        if (confirmed) {
            dispatch(deleteTask(id));
        }
    }

    function handleStatusChange(id, status) {
        dispatch(updateTaskStatus({ id, status }));
    }

    if (sortedTasks.length === 0) {
        return <p className="empty-message">No tasks found.</p>;
    }

    return (
        <div className="task-list">
            {sortedTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                />
            ))}
        </div>
    );
}

export default TaskList;