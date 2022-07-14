import React, {useState} from 'react';
import{Link} from "react-router-dom"
import axios from 'axios';
import {useHistory} from "react-router-dom";

const Login = () => {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    let [loginFormErrors, setLoginFormErrors] = useState("")
    
    const history = useHistory();

    const submitHandler = (e) =>{
        e.preventDefault();
        //put the form info into an object {objectify it}
        let formInfo ={email, password}
        axios.post("http://localhost:8000/api/users/login", formInfo, {withCredentials: true})
            .then(res=>{
                console.log("response when logging in", res)
                if(res.data.error){
                    setLoginFormErrors(res.data.error)
                }else{
                    history.push("/userdash")
                }
            })
            .catch(err=>console.log("err when logging in:", err))
    }




    return(
        <>
        <div className="navBar">
            <h2 className="blue"><span id="brown">Bread</span>Trackr</h2>
        </div>
        <div className=" form-container">
            <form className="form" onSubmit={submitHandler}>
                <h3>Login</h3>
                <div className="mb-2">
                    <label htmlFor=''></label>
                    <input type="text" name="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor=''></label>
                    <input type="password" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    <p className="text-danger">{loginFormErrors}</p>
                </div>
                <p>Don't have an account? Click here to <Link to="/signup">Sign up.</Link></p>
                <button className="btn">Login</button>
            </form>
        </div>
        
        </>
    );

};



export default Login;