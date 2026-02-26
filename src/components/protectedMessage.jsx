import { Link } from "react-router-dom";

const ProtectedMessage = () => {
  return (
    <div className="protected-message animate-fade-up">
      <span className="protected-icon">🔒</span>
      <h2 className="protected-title">Access Restricted</h2>
      <p className="protected-text">
        You need to be logged in to view this page.
      </p>
      <Link to="/login" className="btn-primary" style={{ width: "auto", marginTop: "1rem" }}>
        Go to Login
      </Link>
    </div>
  );
};

export default ProtectedMessage;
