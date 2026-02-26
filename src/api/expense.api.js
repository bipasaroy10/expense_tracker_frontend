import api from "./axios.api";

export const createExpense = (data) =>
  api.post("/expenses/create", data);

export const getExpenses = () =>
  api.get("/expenses/get");

export const updateExpense = (id, data) =>
  api.put(`/expenses/update/${id}`, data);

export const deleteExpense = (id) =>
  api.delete(`/expenses/delete/${id}`);

export const updateCategory = (id, data) =>
  api.patch(`/expenses/updateCategory/${id}`, data);
