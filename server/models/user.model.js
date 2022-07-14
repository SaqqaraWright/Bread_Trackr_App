const mongoose = require('mongoose');
const bcrypt = require("bcrypt");



const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [3, "First name must be at least 3 characters long"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [3, "Last name must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test (val), //tests the value from form with this regular expression pattern to validate if the pattern is in an email format
            message: 'Please enter a valid email',
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
},
{ timestamps: true }
);

// add this after UserSchema is defined
//This creates a virtual field called "confirm" that is used just to validate the password matches confirmPassword --> the getter and setter above are just creating temporary fields for _confirmPassword
UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

//before (pre) running the other validations on the model, validate the user objects password matches. If they don't match, this.invalidate() will create a validation error message
UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) { //this.confirmPassword could be typo maybe missing underscore. ie this._confirmPassword like up above
        this.invalidate('confirmPassword', 'Passwords must match');
    }
    next(); //after the above process is done, go to the next usual step
});

//before (pre) saving the user to the db (this means we have passed the validations), hash the user's password (encrypt it)
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports = mongoose.model('User', UserSchema);

