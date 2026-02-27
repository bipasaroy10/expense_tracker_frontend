import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/protected.route";
import Navbar from "./components/navbar";
import Dashboard from "./pages/dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddExpense from "./pages/addExpense";
import EditExpense from "./pages/editExpense";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/"          element={<Dashboard />} />
          <Route path="/add"       element={<AddExpense />} />
          <Route path="/edit/:id"  element={<EditExpense />} />
          <Route path="/profile"   element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
