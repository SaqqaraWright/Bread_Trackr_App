import React, {useState} from 'react';
import{Link, useHistory} from "react-router-dom";
import axios from 'axios';


const AddNew = ()=>{        
     //form info stored in state variables
    let [name, setName] = useState(""); //make sure all of these match what is in the model, so that it doesn't cause issues with validations later on.
    let [category, setCategory] = useState("");
    let [amount, setAmount] = useState("");
    let [date, setDate] = useState("");


    let [formErrors, setFormErrors] = useState({})

    const history = useHistory();

    const submitHandler = (e) =>{
        e.preventDefault()
        console.log("button clicked")
         //objectify the info
        let formInfo = {name, category, amount, date};
        axios.post("http://localhost:8000/api/expenses", formInfo)
        .then(res=>{
            console.log("response after posting-->", res)

            // this "if statement" below means that if there are errors and validation errors that we need to save, then to save those validation errors into state
            if(res.data.error){
                setFormErrors(res.data.error.errors);
            }
            else{ //"else statement" here means that there are no errors; therefore clear out the form
            setName("")
            setCategory("")
            setAmount("")
            setDate("")
            history.push("/userdash")
            
            }
        })
        .catch(err=>console.log("errrr", err))
    }

    return(
        <>
        <div className="navBar flex"> {/*place space between on flex*/}
            <h2 className="blue"><span id="brown">Bread</span>Trackr</h2>
            <div className="flex">
                <p className="text-white">[d/l mode toggle]</p>
                <p><Link to="/userdash">Return To Dashboard</Link></p>
                <p><Link to="/">Logout</Link></p>
            </div>
        </div>  
        <div className="form-container">
            <div className="form">
                <form onSubmit={submitHandler}>
                    <h3 className="mb-2">Add New Expense</h3>
                    <div className="mb-2">
                        <label htmlFor=''></label>
                        <input type="text" name="name" id="" placeholder="Company Name" onChange={(e)=>setName(e.target.value)}/>
                        <p className='text-danger'>{formErrors.name?.message}</p>
                    </div>
                    <div>
                        <select value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                            <option value="default">Choose a Category</option> {/*Note: that default hidden on the top tag just hides the default message, if just set to default then will be unselectable but show by default*/}
                            <option value="restaurant">Restaurant</option>
                            <option value="groceries">Groceries</option>
                            <option value="rent">Rent</option>
                            <option value="utilites">Utilities</option>
                            <option value="household">Household</option>
                            <option value="shopping">Shopping</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="miscellaneous">Miscellaneous</option>
                        </select>
                        <p className='text-danger'>{formErrors.category?.message}</p>
                    </div>
                    <div className="mb-2">
                        <label htmlFor=''></label>
                        <input type="text" name="amount" id="" placeholder="amount" onChange={(e)=>setAmount(e.target.value)} />
                        <p className='text-danger'>{formErrors.amount?.message}</p>
                    </div>
                    <div className="mb-2">
                        <label htmlFor=''></label>
                        <input type="date" name="date" id="" placeholder="Date" onChange={(e)=>setDate(e.target.value)} />
                        <p className='text-danger'>{formErrors.date?.message}</p>
                    </div>
                    <button className="btn">Add</button>
                </form>
            </div>
        </div>
        </>
    )
};

export default AddNew;