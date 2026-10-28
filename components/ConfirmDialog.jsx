function ConfirmDialog({ message, onConfirm, onCancel }) {
    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <p>{message}</p>

                <button onClick={onConfirm}>
                    Confirm
                </button>

                <button onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default ConfirmDialog;