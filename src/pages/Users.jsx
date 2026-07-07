import { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import "../css/Users.css";

function Users() {
    // State
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("default");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    // Fetch API
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    // Search + Sort
    const filteredUsers = users
        .filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return a.name.localeCompare(b.name);
            }

            if (sortOrder === "desc") {
                return b.name.localeCompare(a.name);
            }

            return 0;
        });

    // Dashboard Cards
    const totalUsers = users.length;

    const totalCompanies = new Set(
        users.map((user) => user.company.name)
    ).size;

    const totalCities = new Set(
        users.map((user) => user.address.city)
    ).size;

    // Pagination
    const lastUserIndex = currentPage * usersPerPage;
    const firstUserIndex = lastUserIndex - usersPerPage;

    const currentUsers = filteredUsers.slice(
        firstUserIndex,
        lastUserIndex
    );

    const totalPages = Math.ceil(
        filteredUsers.length / usersPerPage
    );

    return (
        <div className="users-container">

            <h1 className="users-title">
                Users Management
            </h1>

            {/* Dashboard Cards */}

            <div className="dashboard-cards">

                <div className="card">
                    <h3>Total Users</h3>
                    <h2>{totalUsers}</h2>
                </div>

                <div className="card">
                    <h3>Companies</h3>
                    <h2>{totalCompanies}</h2>
                </div>

                <div className="card">
                    <h3>Cities</h3>
                    <h2>{totalCities}</h2>
                </div>

            </div>

            {/* Search */}

            <input
                className="search-box"
                type="text"
                placeholder="🔍 Search by Name..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                }}
            />

            {/* Sort */}

            <div className="sort-container">

                <label>Sort By:</label>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="default">Default</option>
                    <option value="asc">Name A-Z</option>
                    <option value="desc">Name Z-A</option>
                </select>

            </div>

            {/* Loading */}

            {loading ? (

                <div className="loading">
                    Loading Users...
                </div>

            ) : (

                <>
                    <div className="table-container">

                        <table>

                            <thead>

                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Company</th>
                                    <th>City</th>
                                    <th>Website</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {currentUsers.map((user) => (

                                    <tr key={user.id}>

                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.company.name}</td>
                                        <td>{user.address.city}</td>
                                        <td>{user.website}</td>

                                        <td>

                                            <button
                                                className="view-btn"
                                                onClick={() =>
                                                    alert(
`User Details

Name: ${user.name}

Username: ${user.username}

Email: ${user.email}

Phone: ${user.phone}

Company: ${user.company.name}

City: ${user.address.city}

Website: ${user.website}`
                                                    )
                                                }
                                            >
                                                <FaEye />
                                            </button>

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    alert("Edit Feature Coming Soon")
                                                }
                                            >
                                                <FaEdit />
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    alert("Delete Feature Coming Soon")
                                                }
                                            >
                                                <FaTrash />
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                    {/* Pagination */}

                    <div className="pagination">

                        <button
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage(currentPage - 1)
                            }
                        >
                            Previous
                        </button>

                        <span>
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() =>
                                setCurrentPage(currentPage + 1)
                            }
                        >
                            Next
                        </button>

                    </div>

                </>

            )}

        </div>
    );
}

export default Users;