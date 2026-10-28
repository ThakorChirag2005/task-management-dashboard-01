function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
    return (
        <div className="task-card">
            <h3>{task.title}</h3>

            <p>{task.description || "No description"}</p>

            <p>
                Priority: <span className={`badge ${task.priority}`}>
                    {task.priority}
                </span>
            </p>

            <p>
                Status: <span className={`badge ${task.status}`}>
                    {task.status === "in-progress"
                        ? "In Progress"
                        : task.status}
                </span>
            </p>

            <p>Due Date: {task.dueDate}</p>

            <label>Change Status</label>

            <select
                value={task.status}
                onChange={(event) =>
                    onStatusChange(task.id, event.target.value)
                }
            >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <div className="task-actions">
                <button onClick={() => onEdit(task)}>
                    Edit
                </button>

                <button onClick={() => onDelete(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskItem;