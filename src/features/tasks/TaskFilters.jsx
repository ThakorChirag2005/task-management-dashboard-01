function TaskFilters({
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
}) {
    return (
        <div className="task-filters">
            <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />

            <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
            >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <select
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value)}
            >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            
            <select
                 value={sortBy}
                 onChange={(event) => setSortBy(event.target.value)}
        >
                  <option value="dueDate">Sort by Due Date</option>
                  <option value="priority">Sort by Priority</option>
             </select>
            
        </div>
    );
}

export default TaskFilters;