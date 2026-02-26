import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addExpense } from "../api/expense.api";

const CATEGORIES = [
  "Food",
            "Transport",
            "Utilities",
            "Entertainment",
            "Healthcare",
            "Rent",
            "Shopping",
            "ElectricBill",
            "GasBill",
            "WaterBill",
            "Other"
];

const AddExpense = () => {
  const [form, setForm]     = useState({ title: "", amount: "", category: "", date: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.amount || !form.category) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await addExpense(form);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to add expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">

      <div className="form-page-header">
        <h1 className="form-page-title">Add Expense</h1>
        <p className="form-page-subtitle">Record a new spending entry</p>
      </div>

      <div className="form-card animate-fade-up">

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              className="form-input"
              name="title"
              placeholder="e.g. Grocery shopping"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Amount (₹) *</label>
              <input
                className="form-input"
                name="amount"
                type="number"
                placeholder="0"
                min="1"
                value={form.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Date</label>
              <input
                className="form-input"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              className="form-select"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <Link to="/" className="btn-secondary" style={{ textAlign: "center" }}>
              Cancel
            </Link>
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? <span className="loader-inline" /> : "Add Expense"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddExpense;
