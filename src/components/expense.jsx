import { Link } from "react-router-dom";

const ExpenseCard = ({ expense, onDelete }) => {
  return (
    <div className="border rounded p-4 flex justify-between items-center mb-3">
      <div>
        <h3 className="font-semibold">{expense.title}</h3>
        <p>₹ {expense.amount}</p>
        <p className="text-sm text-gray-600">
          Category: {expense.category}
        </p>
      </div>

      <div className="flex gap-2">
        <Link
          to={`/edit/${expense._id}`}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(expense._id)}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExpenseCard;
