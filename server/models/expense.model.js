const mongoose = require('mongoose');

//The purpose of this file is to describe how my pets table (collection) should look

//instructions for what the pets table should look like below:

const ExpenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Company name is required!"],
        minlength: [3, "Company name must be at least 3 characters long!"]
    },
    category: {
        type: String,
        required: [true, "Category is required!"],
        minlength: [3, "Item category must be at least 3 characters long!"]
    },
    amount: {
        type: Number,
        required: [true, "Amount is required!"],
        min: [1, "Amount must be at least $1.00!"]
    },
    date: { 
        type: Date,
        required: [true, "Date is required"],
        min: ['01-01-2015', "Date can't be before 2015"]
    },
    user_id: { //this allows me to essentially join the ExpenseSchema to the UserSchema creating a one-to-many relationship between the two. This way each individual user has their own expenses that show up in their dashboard as opposed to a collective of everyone's expenses in addition to their own.
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{ timestamps: true }
);

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;