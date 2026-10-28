
import { useSelector } from "react-redux";

function TaskSummary() {
    const tasks = useSelector((state) => state.tasks.items) || [];

    const totalTasks = tasks.length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "pending"
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === "in-progress"
    ).length;

    const completedTasks = tasks.filter(
        (task) => task.status === "completed"
    ).length;

    return (
        <div className="summary-grid">
            <div className="summary-card">
                <p>Total Tasks</p>
                <h2>{totalTasks}</h2>
            </div>

            <div className="summary-card">
                <p>Pending</p>
                <h2>{pendingTasks}</h2>
            </div>

            <div className="summary-card">
                <p>In Progress</p>
                <h2>{inProgressTasks}</h2>
            </div>

            <div className="summary-card">
                <p>Completed</p>
                <h2>{completedTasks}</h2>
            </div>
        </div>
    );
}

export default TaskSummary;
