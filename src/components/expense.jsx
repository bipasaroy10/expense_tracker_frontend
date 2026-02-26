import { Link } from "react-router-dom";

const ExpenseCard = ({ expense, onDelete }) => {
  return (
    <div className="expense-item">

      {/* Left — Info */}
      <div className="expense-info">
        <span className="expense-name">{expense.title}</span>
        <span className="expense-category">{expense.category}</span>
        {expense.date && (
          <span className="expense-date">
            {new Date(expense.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        )}
      </div>

      {/* Right — Amount + Actions */}
      <div className="expense-right">
        <span className="expense-amount">− ₹{Number(expense.amount).toLocaleString()}</span>

        <div className="expense-actions">
          <Link
            to={`/edit/${expense._id}`}
            className="btn-icon edit"
            title="Edit"
          >
            ✎
          </Link>
          <button
            className="btn-icon delete"
            onClick={() => onDelete(expense._id)}
            title="Delete"
          >
            ✕
          </button>
        </div>
      </div>

    </div>
  );
};

export default ExpenseCard;
