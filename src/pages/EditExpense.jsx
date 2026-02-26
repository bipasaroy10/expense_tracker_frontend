import { useEffect, useState } from "react";
import { updateExpense, getExpenses } from "../api/expense.api";
import { useNavigate, useParams } from "react-router-dom";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: ""
  });

  useEffect(() => {
    loadExpense();
  }, []);

  const loadExpense = async () => {
    const res = await getExpenses();
    const found = res.data.data.find((e) => e._id === id);
    setExpense(found);
  };

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateExpense(id, expense);
    navigate("/");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Expense</h2>

      <form onSubmit={handleSubmit} className="w-96">
        <input
          name="title"
          value={expense.title}
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          name="amount"
          type="number"
          value={expense.amount}
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <input
          name="category"
          value={expense.category}
          className="border p-2 w-full mb-3"
          onChange={handleChange}
        />

        <button className="bg-green-600 text-white p-2 w-full">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditExpense;
