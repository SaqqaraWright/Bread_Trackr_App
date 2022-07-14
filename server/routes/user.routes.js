const UserController = require("../controllers/user.controller");


module.exports = (app)=>{
    // admin routes for viewing all users in system and deleting users accounts
    app.get("/api/users", UserController.getAllUsers)
    app.post("/api/users/register", UserController.register)
    app.post("/api/users/login", UserController.login)
    app.get("/api/users/getloggedinuser", UserController.getLoggedInUser) //Note: instead of using /:id to find the user this method finds the user using the cookie and gets the jwt and decodes, gaining access to the user data including their id.
}