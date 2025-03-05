import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import API from "../../../API";
import "./AdminUsersDashboard.css";

const AdminUsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await API.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyUser = async (userId) => {
    try {
      await API.put(`/admin/users/${userId}/verify`);
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isVerified: true } : user
        )
      );
    } catch (error) {
      console.error("Error while verifying user:", error);
    }
  };

  return (
    <>
      <Navbar UserType={"admin"} />
      <div className="admin-dashboard">
        <div className="dashboard-content">
          <h1 id="heading2" style={{ marginTop: "100px" }}>Users Dashboard</h1>
          {loading ? (
            <p className="loading-message">
              <b>Loading users...</b>
            </p>
          ) : users.length > 0 ? (
            <div className="user-list">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="user-card"
                  style={{
                    backgroundColor: user.isVerified ? "#e0ffa3" : "cornsilk", 
                  }}
                >
                  <h2>
                    {user.firstName} {user.lastName}
                  </h2>
                  <p>
                    <b>Email:</b> {user.email}
                  </p>
                  <p>
                    <b>Role:</b> {user.role}
                  </p>
                  <p>
                    <b>Verified:</b> {user.isVerified ? "Yes" : "No"}
                  </p>
                  {!user.isVerified && (
                    <button
                      className="verify-btn"
                      onClick={() => verifyUser(user._id)}
                    >
                      Verify User
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-users">No users found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminUsersDashboard;
