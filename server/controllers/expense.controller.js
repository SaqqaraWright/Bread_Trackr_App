const Expense = require("../models/expense.model"); //import the model so that the controller knows how to talk to the database to query the database


// module.exports.sayHello = (req, res)=>{
//     res.json({msg: "check yo' expenses right now!"})
// } //this was just for testing purposes only

module.exports.findAllExpenses= (req, res)=>{
    Expense.find() //this is a method not a function
    .then(allExpenses=>{
        res.json({results: allExpenses})
    })
    .catch(err=>{
        res.json({msg: "Something went wrong", error: err})
    })
    
}

module.exports.createExpense = (req, res)=>{
    //req.body represents form information
    Expense.create(req.body)
    .then(newlyCreatedExpense=>{
        res.json({results: newlyCreatedExpense})
    })
    .catch(err=>{
        res.json({msg:"Something went wrong", error: err})
    })
}

module.exports.findOneExpense = (req, res)=>{
    Expense.findOne({_id: req.params.id})
    .then(foundExpense=>{
        res.json({results: foundExpense})
    })
    .catch(err=>{
        res.json({msg: "Something went wrong", error: err})
    })
}

module.exports.updateExpense = (req, res)=>{
    Expense.findOneAndUpdate(
        {_id: req.params.id}, //specify which expense to update
        req.body, //specify the form information to update the expense with
        { new: true, runValidators: true }
        )
        .then(updatedExpense=>{
            res.json({results: updatedExpense})
        })
        .catch(err=>{
            res.json({msg: "Something went wrong", error: err})
        })
}

module.exports.deleteExpense = (req, res)=>{
    Expense.deleteOne({_id: req.params.id})
    .then(deletedExpense=>{
        res.json({results: deletedExpense})
    })
    .catch(err=>{
        res.json({msg: "Something went wrong", error: err})
    })
}