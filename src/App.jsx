import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import AddExpense from "./pages/addExpense";
import EditExpense from "./pages/editExpense";
import './App.css';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add" element={<AddExpense/>} />
        <Route path="/edit/:id" element={<EditExpense/>} />
      </Routes>
    </>
  );
}

export default App;
