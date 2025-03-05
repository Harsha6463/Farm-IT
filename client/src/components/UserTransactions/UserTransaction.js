import React, { useState, useEffect } from "react";
import "./UserTransactions.css";
import Navbar from "../Navbar/Navbar";
import {  NavLink } from "react-router-dom";
import API from "../../API";

const UserTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("");

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/transactions/my-transactions");
      setTransactions(data);
      setUserType(data.role);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <Navbar UserType={"farmer"} />
      <div className="user-transactions">
        <div style={{marginTop:"100px"}} className="dashboard-content">
          <div className="transactions-title">
            <h1 id="heading2">My Transactions</h1>
          </div>
          {loading ? (
            <p className="loading-message">Loading transactions...</p>
          ) : (
            <div className="transactions-list">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <div key={transaction._id} className="transaction-card">
                    <h2>Type: {transaction.type}</h2>
                    <p>
                      <b>Amount:</b> Rs{" "}
                      {transaction.amount.toFixed(2)}
                    </p>
                    <p>
                      <b>From:</b> {transaction.from.firstName}{" "}
                      {transaction.from.lastName}
                    </p>
                    <p>
                      <b>To:</b> {transaction.to.firstName}{" "}
                      {transaction.to.lastName}
                    </p>
                    <p>
                      <b>Status:</b> {transaction.status}
                    </p>
                    <p>
                      <b>Date:</b>{" "}
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="no-transactions">No transactions found.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <NavLink to={`/issue/${userType}`}>
        <button className="report-issue-btn">Issue?</button>
      </NavLink>
    </>
  );
};

export default UserTransactions;