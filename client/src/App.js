import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import { ToastContainer } from "react-toastify";
import HomePage from "./components/HomePage/HomePage";
import InvestorFeed from "./components/InvestorFeed/InvestorFeed";
import FarmerDashboard from "./components/FarmerDashboard/FarmerDashboard/FarmerDashboard";
import AddFarm from "./components/FarmerDashboard/AddFarm/AddFarm";
import LoanRequest from "./components/FarmerDashboard/LoanRequest/LoanRequest";
import Issue from "./components/IssuePage/Issue";
import AdminUsersDashboard from "./components/AdminDashboard/AdminUsersDashboard/AdminUsersDashboard";
import AdminLoansDashboard from "./components/AdminDashboard/AdminLoansDashboard/AdminLoansDashboard";
import AdminFarmsDashboard from "./components/AdminDashboard/AdminFarmsDashboard/AdminFarmsDashboard";
import AdminIssuesDashboard from "./components/AdminDashboard/AdminIssuesDashboard/AdminIssuesDashboard";
import InvestorPanel from "./components/InvestorDashboard/InvestorPanel";
import MyLoan from "./components/Myloans/MyLoan";
import UserTransactions from "./components/UserTransactions/UserTransaction";
import InvestorTracking from "./components/Tracking/InvestorTracking";
import UserIssues from "./components/UserIssues/UserIssues";




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/investorFeed" element={<InvestorFeed />} />
          <Route path="/investorDashboard" element={<InvestorPanel />} />
          <Route path="/farmerDashboard" element={<FarmerDashboard />} />
          <Route path="/addFarm" element={<AddFarm />} />
          <Route path="/loanRequest/:farmId" element={<LoanRequest />} />
          <Route path="/userissues" element={<UserIssues />} />
          <Route path="/issue/:userType" element={<Issue />} />
          <Route path="/loanRequest/:farmId" element={<LoanRequest />} />
          <Route path="/investorTracking" element={<InvestorTracking />} />
          <Route path="/my-loans" element={<MyLoan />} />
          <Route path="/userTransactions" element={<UserTransactions />} />
          
        
          <Route
            path="/adminUsersDashboard"
            element={<AdminUsersDashboard />}
          />
          <Route
            path="/adminLoansDashboard"
            element={<AdminLoansDashboard />}
          />
          <Route
            path="/adminFarmsDashboard"
            element={<AdminFarmsDashboard />}
          />
          <Route
            path="/adminIssuesDashboard"
            element={<AdminIssuesDashboard />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
