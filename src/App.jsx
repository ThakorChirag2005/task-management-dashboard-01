import { useEffect, useState } from "react";
import { store } from "./app/store.js";
import { useDispatch } from "react-redux";
import { fetchTasks } from "./features/tasks/tasksSlice.js";
import Header from "../components/Header.jsx";
import TaskForm from "./features/tasks/TaskForm.jsx";
import TaskList from "./features/tasks/TaskList.jsx";
import TaskFilters from "./features/tasks/TaskFilters.jsx";
import TaskSummary from "./features/tasks/TaskSummary.jsx";

function App() {
    const dispatch = useDispatch();
    const [darkMode, setDarkMode] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [sortBy,setSortBy] =useState("dueDate");

   useEffect(() => {
    dispatch(fetchTasks());
}, [dispatch]);

 useEffect(() => {
        const saveTasks = () => {
            localStorage.setItem(
                "tasks",
                JSON.stringify(store.getState().tasks.items)
            );
        };

        saveTasks();

        const unsubscribe = store.subscribe(saveTasks);

        return unsubscribe;
    }, []);

   return (
    <div className={darkMode ? "app dark-mode" : "app"}>
            <Header />

            <main className="container">
                <div className="welcome-section">
                    <h2>Welcome back, Chirag!</h2>
                    <p>Here is an overview of your tasks.</p>
                   
                     <button
                     className="theme-button"
                    onClick={() => setDarkMode(!darkMode)}
        >
                        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                            </button>

    
                </div>

                <TaskSummary />

                <div className="content-grid">
                    <TaskForm
                        editingTask={editingTask}
                        setEditingTask={setEditingTask}
                    />

                    <div className="tasks-section">
                        <TaskFilters
                            search={search}
                            setSearch={setSearch}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            priorityFilter={priorityFilter}
                            setPriorityFilter={setPriorityFilter}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                        />

                       <TaskList
                         onEdit={setEditingTask}
                         search={search}
                         statusFilter={statusFilter}
                          priorityFilter={priorityFilter}
                         sortBy={sortBy}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
