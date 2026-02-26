function Dashboard() {
  return (
    <div className="container">
      <h2>Expense Tracker</h2>

      <input placeholder="Amount" />
      <input placeholder="Category" />
      <button>Add Expense</button>

      <ul>
        <li>
          Food - ₹500
          <button>Delete</button>
        </li>
        <li>
          Travel - ₹1000
          <button>Delete</button>
        </li>
      </ul>
    </div>
  );
}

export default Dashboard;