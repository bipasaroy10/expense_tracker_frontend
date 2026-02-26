import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getExpenseById, updateExpense } from "../api/expense.api";
import Loader from "../components/loader";

const CATEGORIES = [
  "Food",
  "Travel",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "Bills",
  "Other",
];

const EditExpense = () => {
  const { id }    = useParams();
  const navigate  = useNavigate();

  const [form, setForm]       = useState({ title: "", amount: "", category: "", date: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExpenseById(id);
        setForm({
          title:    data.title    || "",
          amount:   data.amount   || "",
          category: data.category || "",
          date:     data.date ? data.date.slice(0, 10) : "",
        });
      } catch {
        setError("Failed to load expense.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await updateExpense(id, form);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to update expense.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="form-page">

      <div className="form-page-header">
        <h1 className="form-page-title">Edit Expense</h1>
        <p className="form-page-subtitle">Update your spending entry</p>
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
            <button className="btn-primary" type="submit" disabled={saving}>
              {saving ? <span className="loader-inline" /> : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditExpense;
