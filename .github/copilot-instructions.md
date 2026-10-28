# Repository Guidelines

## Build, lint, and test

- `npm run dev` starts the Vite development server.
- `npm run build` creates the production build in `dist/`.
- `npm run preview` serves the production build locally.
- `npm run lint` runs ESLint across the project. To lint one file, run `npx eslint src/features/tasks/TaskForm.jsx` (replace the path as needed).
- There is currently no test script, test runner, or single-test command configured.

## Architecture

- `src/main.jsx` mounts the React app and wraps it in React Redux's `Provider` using the store from `src/app/store.js`.
- The store registers `src/features/tasks/tasksSlice.js` under `state.tasks`. The slice owns task data and exports `addTask`, `deleteTask`, and `updateTaskStatus`.
- Task UI is organized under `src/features/`: `TaskForm.jsx` dispatches `addTask`, and `TaskList.jsx` reads `state.tasks` with `useSelector`.
- `src/App.jsx` is still the Vite starter screen and does not render the task components yet. Integrate task UI there when changing the rendered dashboard.
- `src/index.css` defines global styles and theme variables; `src/App.css` contains app-level styles. Vite uses the React plugin, and ESLint is configured in `eslint.config.js`.

## Codebase conventions

- Use React function components and hooks, with JSX in `.jsx` files. Keep Redux state transitions in the Toolkit slice and interact with them through dispatched exported actions.
- The task state is an array of task records. `addTask` generates an ID with `nanoid()` and sets status to `pending`; existing seed records use numeric IDs while generated IDs are strings, so treat IDs as opaque and preserve their type when passing them to actions.
- Existing task statuses include `pending`, `in progress`, and `completed`. Preserve exact status values across seed data, UI, and reducers unless deliberately normalizing them consistently.
- The project uses native JavaScript ES modules and relative imports; Vite and ESLint configuration are at the repository root.
