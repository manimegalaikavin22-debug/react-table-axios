import "./UserModal.css";

function UserModal({ user, onClose }) {

    if (!user) return null;

    return (
        <div className="modal-overlay">

            <div className="modal">

                <h2>User Details</h2>

                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Company:</strong> {user.company.name}</p>
                <p><strong>City:</strong> {user.address.city}</p>
                <p><strong>Website:</strong> {user.website}</p>

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    Close
                </button>

            </div>

        </div>
    );
}

export default UserModal;