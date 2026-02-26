import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        💸 ExpenseTracker
      </Link>

      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/add" className="nav-link">Add Expense</Link>
            <button className="nav-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
