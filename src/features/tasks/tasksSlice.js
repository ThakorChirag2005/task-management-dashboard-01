import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async () => {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();

        return data.map((item, index) => ({
            id: `api-${item.id}`,
            title: item.title,
            description: "",
            priority: ["high", "medium", "low", "medium"][index],
            status: item.completed ? "completed" : "pending",
            dueDate: `2026-11-${String(index + 5).padStart(2, "0")}`,
        }));
    }
);

const sampleTasks = [
    {
        id: 1,
        title: "Learn React Hooks",
        description: "",
        priority: "high",
        status: "in-progress",
        dueDate: "2026-11-05",
    },
    {
        id: 2,
        title: "Build Login Page",
        description: "",
        priority: "medium",
        status: "pending",
        dueDate: "2026-11-07",
    },
    {
        id: 3,
        title: "Practice Redux Toolkit",
        description: "",
        priority: "high",
        status: "completed",
        dueDate: "2026-11-10",
    },
    {
        id: 4,
        title: "Create Dashboard UI",
        description: "",
        priority: "low",
        status: "pending",
        dueDate: "2026-11-12",
    },
];

function loadTasks() {
    try {
        const savedTasks = localStorage.getItem("tasks");

        if (savedTasks !== null) {
            return JSON.parse(savedTasks);
        }

        return sampleTasks;
    } catch {
        return sampleTasks;
    }
}

const tasksSlice = createSlice({
    name: "tasks",

    initialState: {
        items: loadTasks(),
        loading: false,
        error: null,
    },

    reducers: {
        addTask: (state, action) => {
            state.items.push({
                ...action.payload,
                id: Date.now(),
            });
        },

        editTask: (state, action) => {
            const index = state.items.findIndex(
                (task) => task.id === action.payload.id
            );

            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },

        deleteTask: (state, action) => {
            state.items = state.items.filter(
                (task) => task.id !== action.payload
            );
        },

        updateTaskStatus: (state, action) => {
            const task = state.items.find(
                (task) => task.id === action.payload.id
            );

            if (task) {
                task.status = action.payload.status;
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;

                const existingTasks = state.items.filter(
                    (task) => !String(task.id).startsWith("api-")
                );

                state.items = [
                    ...existingTasks,
                    ...action.payload,
                ];
            })

            .addCase(fetchTasks.rejected, (state) => {
                state.loading = false;
                state.error = "Tasks load કરવામાં error આવ્યો.";
            });
    },
});

export const {
    addTask,
    editTask,
    deleteTask,
    updateTaskStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;
