import { useState } from "react";
import { createExpense } from "../api/expense.api";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: ""
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createExpense(expense);
      navigate("/");
    } catch (err) {
      alert("Failed to add expense");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Expense</h2>

      <form onSubmit={handleSubmit} className="w-96">
        <input
          name="title"
          placeholder="Title"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <button className="bg-blue-500 text-white p-2 w-full">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
