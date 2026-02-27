import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const location         = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        💸 ExpenseTracker
      </Link>

      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/"        className={isActive("/")}>Dashboard</Link>
            <Link to="/add"     className={isActive("/add")}>Add Expense</Link>
            <Link to="/profile" className={isActive("/profile")}>Profile</Link>
            <button className="nav-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"  className="nav-link">Login</Link>
            <Link to="/signup" className="nav-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
