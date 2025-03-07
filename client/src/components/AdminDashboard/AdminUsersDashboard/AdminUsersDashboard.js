import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import API from "../../../API";
import "./AdminUsersDashboard.css";

const AdminUsersDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
      if (selectedUser._id === userId) {
        setSelectedUser((prevUser) => ({
          ...prevUser,
          isVerified: true,
        }));
      }
    } catch (error) {
      console.error("Error while verifying user:", error);
    }
  };

  const openPopup = (user) => {
    setSelectedUser(user);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Navbar UserType={"admin"} />
      <div className="admin-dashboard">
        <div className="dashboard-content">
          <h1 className="title" style={{ marginTop: "50px" }}>Users Dashboard</h1>
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
                  <h2>{user.firstName} {user.lastName}</h2>
                  <p><b>Email:</b> {user.email}</p>
                  <p><b>Role:</b> {user.role}</p>
                  <button
                    className="view-details-btn"
                    onClick={() => openPopup(user)}
                  >
                    User Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-users">No users found.</p>
          )}
        </div>
      </div>

      {showPopup && selectedUser && (
        <div className="popup-overlay">
          <div className="popup-container">
            <button className="close-popup-btn" onClick={closePopup}>X</button>
            <h2 style={{color:"blue"}}>User Details</h2>
            <p><b>Name:</b> {selectedUser.firstName} {selectedUser.lastName}</p>
            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Role:</b> {selectedUser.role}</p>
            <p><b>Verified:</b> {selectedUser.isVerified ? "Yes" : "No"}</p>
            {!selectedUser.isVerified && (
              <button
                className="verify-btn"
                onClick={() => verifyUser(selectedUser._id)}
              >
                Verify User
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUsersDashboard;
