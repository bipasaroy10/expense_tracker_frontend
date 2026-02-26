import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExpenseCard from "../components/expense";
import Loader from "../components/loader";
import { getExpenses, deleteExpense } from "../api/expense.api";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      console.log("API response:", res.data);

      // Your API returns { data: [...], message: "...", success: true }
      const data = res.data?.data || [];
      setExpenses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load expenses.");
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch {
      setError("Failed to delete expense.");
    }
  };

  if (loading) return <Loader />;

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Overview of your spending</p>
        </div>
        <Link to="/add" className="btn-add">+ Add Expense</Link>
      </div>

      {/* Stats */}
      <div className="stats-grid stagger">
        <div className="stat-card animate-fade-up">
          <div className="stat-label">Total Spent</div>
          <div className="stat-value negative">₹{totalSpent.toLocaleString()}</div>
          <div className="stat-trend">All time</div>
        </div>
        <div className="stat-card animate-fade-up">
          <div className="stat-label">Transactions</div>
          <div className="stat-value accent">{expenses.length}</div>
          <div className="stat-trend">Recorded expenses</div>
        </div>
        <div className="stat-card animate-fade-up">
          <div className="stat-label">Avg per Entry</div>
          <div className="stat-value">
            ₹{expenses.length ? Math.round(totalSpent / expenses.length).toLocaleString() : 0}
          </div>
          <div className="stat-trend">Per transaction</div>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {/* Expense List */}
      <div className="expense-section">
        <div className="expense-section-header">
          <h2 className="expense-section-title">Recent Expenses</h2>
          <span className="expense-count">{expenses.length} entries</span>
        </div>

        {expenses.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-icon">🧾</span>
            <p className="empty-state-title">No expenses yet</p>
            <p className="empty-state-text">
              Start tracking by adding your first expense.
            </p>
            <Link to="/add" className="btn-add">+ Add Expense</Link>
          </div>
        ) : (
          expenses.map((expense) => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

    </div>
  );
};

export default Dashboard;
8