function Header() {
    return (
        <header className="header">
            <div>
                <h1>Task Management</h1>
                <p>Manage your daily work in one place.</p>
            </div>

            <div className="workspace">
                <span className="workspace-icon">C</span>

                <div>
                    <strong>Chirag</strong>
                    <p>My Workspace</p>
                </div>
            </div>
        </header>
    );
}

export default Header;