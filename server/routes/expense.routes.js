const ExpenseController = require("../controllers/expense.controller");


module.exports = (app)=>{
    // app.get("/api/hello", ExpenseController.sayHello); //this was just for testing purposes only.
    app.get("/api/expenses", ExpenseController.findAllExpenses);
    app.post("/api/expenses", ExpenseController.createExpense);
    app.get("/api/expenses/:id", ExpenseController.findOneExpense);
    app.put("/api/expenses/:id", ExpenseController.updateExpense);
    app.delete("/api/expenses/:id", ExpenseController.deleteExpense);
}