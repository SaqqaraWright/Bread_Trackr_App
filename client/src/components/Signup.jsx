import React, {useState} from 'react';
import{Link, useHistory} from "react-router-dom"
import axios from 'axios';

//may need to import PropTypes from 'prop-types'; [up here]

const Signup = () => {
    
    //form info stored in state variables
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");

    let [formErrors, setFormErrors] = useState({})

    const history = useHistory();

    const submitHandler = (e) =>{ //could've named submitHandler Signup if I wanted to instead; however, just left it as is.
        e.preventDefault()
        console.log("button clicked")
        //objectify the info
        let formInfo = {firstName, lastName, email, password, confirmPassword};
        axios.post("http://localhost:8000/api/users/register", formInfo, {withCredentials: true}) //in axios call in react it requires that send form info with credentials set to true, this is the only way that the cookie will get attached to the user and will work. Without the "withCredential: true" this will not work.
            .then(res=>{
                console.log("res after registering", res)
                if(res.data.errors){
                    setFormErrors(res.data.errors)
                }else{
                    //redirect to dashboard
                    history.push("/userdash")
                }
            })
            .catch(err=>{
                console.log("err after register", err)
            })
    }




    return(
        <>
        <div className="navBar">
            <h2 className="blue"><span id="brown">Bread</span>Trackr</h2>
        </div>
        <div className="form-container">
            <div className="form">
                <form onSubmit={submitHandler}>
                    <h3 className="mb-2">Signup</h3>
                    <div className="mb-2">
                        <label htmlFor=''></label>
                        <input type="text" name="firstName" id="" placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)}/>
                        <p className='text-danger'>{formErrors.firstName?.message}</p>
                    </div>
                    <div className="mb-2">
                        <label htmlFor=''></label>
                        <input type="text" name="lastName" id="" placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)} />
                        <p className='text-danger'>{formErrors.lastName?.message}</p>
                    </div>
                    <div className="mb-2">
                        <label htmlFor=''></label>
                        <input type="text" name="email" id="" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                        <p className='text-danger'>{formErrors.email?.message}</p>
                    </div>
                    <div className="mb-2">
                        <label htmlFor=''></label>
                        <input type="password" name="password" id="" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                        <p className='text-danger'>{formErrors.password?.message}</p>
                    </div>
                    <div className="mb-2">
                        <label htmlFor=''></label>
                        <input type="password" name="confirmPassword" id="" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)} />
                        <p className="text-danger">{formErrors.confirmPassword?.message}</p>
                    </div>
                    <p>Already have an account? Click here to <Link to="/">Log in.</Link></p>
                    <button className="btn">Sign up</button>
                </form>
            </div>
        </div>
        
        </>
    );

};


export default Signup;