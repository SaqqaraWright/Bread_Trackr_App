const User = require("../models/user.model");
const jwt =require("jsonwebtoken");
const bcrypt = require("bcrypt");


class UserController {
    
    //admin controller features for getting all users
    getAllUsers = (req, res) =>{
        User.find()
            .then(allUsers=>{
                res.json({results: allUsers})
            })
            .catch(err=>{
                res.json({error: err})
            })
    }
    register = (req, res) => { //nested promise version
        User.find({email: req.body.email}) //Note: req.body.email --> represents the information in the form
            .then(usersWithEmail=>{
                console.log("response when finding user", usersWithEmail)
                if(usersWithEmail.length ===0){//this means the email is not taken and that we can create a new user with this email
                    User.create(req.body)
                        .then(user => {
                            //when the .then() happens that means that the user from the form was successfully created and is stored in that variable "user" which has info about the user that was just put into the db, including the field _id.
                            const userToken = jwt.sign({
                                id: user._id,
                                firstName: user.firstName
                            }, process.env.SECRET_KEY);

                            //respond with a cookie called "usertoken" which contains the JWT from above called userToken AND also respond with json w/info about the user that just got created.
                            res
                                .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                                    httpOnly: true
                                })
                                .json({ msg: "success!", user: user });
                    })
                        .catch(err => res.json(err));
                    
                }else{
                    //else --> the email is already taken so we will send back an error message
                    res.json({errors: {email:{ message: "Email is taken"}}})
                }
            })
            .catch(err=>console.log("errrrr", err))

    }

    login = async(req, res) => { //async await function version
        const user = await User.findOne({ email: req.body.email }); //see if user exists in the database

        if(user === null) {
            // email not found in users collection
            return res.json({error: "User not found"});
        }

        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if(!correctPassword) {
            // password wasn't a match!
            return res.json({error: "Password is incorrect"});
        }

        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id,
            firstName: user.firstName
        }, process.env.SECRET_KEY);

        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    }

    logout = (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }

    getLoggedInUser = (req, res) =>{
        //use the info stored in the cookie to get the id of the logged in user and query the db to find a user with that id, and return with info about the logged in user
        
        const decodedJWT =jwt.decode(req.cookies.usertoken, {complete: true}) //this basically says to the controller to decode the jwt to get all of the logged user info from the cookie: usertoken.

        User.findOne({_id: decodedJWT.payload.id})
            .then(foundUser=>{
                res.json({results: foundUser})
            })
            .catch(err=>{
                res.json(err)
            })
    }

}

module.exports = new UserController();