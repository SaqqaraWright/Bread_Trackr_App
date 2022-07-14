import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from 'axios';
import { useHistory } from "react-router-dom";


const Edit = ()=>{ 
    const history = useHistory(); //initialize history so that we can redirect using history.push()
    const { _id } = useParams(); //this has to match the id in the app.js path.

    const [expenseInfo, setExpenseInfo] = useState({
        name : "",
        category : "",
        amount: "",
        date: "",
    });

    //state variable to store validation errors inside of
    let [errors, setErrors] = useState({});


    const changeHandler = (e) => {
        setExpenseInfo({
            ...expenseInfo,
            [e.target.name]: e.target.value,
            [e.target.category]: e.target.value,
            [e.target.amount]: e.target.value,
            [e.target.date]: e.target.value,
        });
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/expenses/${_id}`)
            .then(res => {
                console.log("response-->", res)
                // console.table(res.data.results) //shows object data in a table--nicely organized
                if(res.data.error){
                    setErrors(res.data.error.errors);
                }
                else{
                    setExpenseInfo({
                        name: res.data.results.name, //this state variable contains info about the particular expense that I want to populate in my form
                        category: res.data.results.category,
                        amount: res.data.results.amount,
                        date: res.data.results.date,
                    })
                }
            })
            .catch(err => console.log(err))
    }, [])  


    const submitHandler = (e) => {
        e.preventDefault();

        console.log('submit handler name: ', expenseInfo);
        axios.put(`http://localhost:8000/api/expenses/${_id}`, expenseInfo)
            .then(res => {
                console.log(res)
                if (res.data.error) {
                    console.log("hello")
                    setErrors(res.data.error.errors);
                    console.log({ errors })
                }
                else { //"else statement" here means that there are no errors; therefore clear out the form
                    history.push("/userdash") //redirect after submitting form
                }
            })
            .catch(err => console.log(err))
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
                    <h3 className="mb-2">Edit Expense</h3>
                    <div className="mb-2">
                        <label htmlFor=''></label>
                        <input type="text" name="name" id="" placeholder="Company Name" onChange={changeHandler} value={expenseInfo.name}/>
                        <p className='text-danger'>{errors.name?.message}</p>
                    </div>
                    <div>
                        <select name="category" value={expenseInfo.category} onChange={changeHandler}> {/*Note: it is very important to have the name="input value here" on the input or select tag on the edit form otherwise it will not allow you to change/edit the previous data input */}
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
                        <p className='text-danger'>{errors.category?.message}</p>
                    </div>
                    {/* <div className="mb-2">
                        <label htmlFor=''></label>
                        <input type="text" name="item" id="" placeholder="Item Purchased" onChange={changeHandler} value={expenseInfo.category} />
                        <p className='text-danger'>{errors.category?.message}</p>
                    </div> */}
                    <div className="mb-2">
                        <label htmlFor=''></label>
                        <input type="text" name="amount" id="" placeholder="amount" onChange={changeHandler} value={expenseInfo.amount} />
                        <p className='text-danger'>{errors.amount?.message}</p>
                    </div>
                    <div className="mb-2">
                        <label htmlFor=''></label>
                        <input type="date" name="date" id="" placeholder="Date" onChange={changeHandler} value={expenseInfo.date} />
                        <p className='text-danger'>{errors.date?.message}</p>
                    </div>
                    <button className="btn">Edit</button>
                </form>
            </div>
        </div>
        </>
    );
};

export default Edit;