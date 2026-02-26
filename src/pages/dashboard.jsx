import { useEffect, useState } from "react";
import { getExpenses, deleteExpense } from "../api/expense.api";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const res = await getExpenses();
    setExpenses(res.data.data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">My Expenses</h1>

      {expenses.map((exp) => (
        <div key={exp._id} className="border p-3 my-2">
          <p>{exp.title} - ₹{exp.amount}</p>
          <button onClick={() => deleteExpense(exp._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
