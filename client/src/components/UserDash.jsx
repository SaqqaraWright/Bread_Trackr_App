import React, {useEffect, useState} from 'react';
import{Link} from "react-router-dom";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import PieChart from './PieChart';


const UserDash = ()=>{  

    const [allExpenses, setAllExpenses] = useState([]) //this allows me to save all variables
    const [deleteToggle, setDeleteToggle] = useState(false)
    const history = useHistory();

    // const sortArray = (x,y) => {
    //     return x.date.localeCompare(y.date);
    // }

             //This state as well as axios.get call pertains to the user database and logiin specifically

    let [loggedInUser, setLoggedInUser] = useState({})
    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/getloggedinuser", {withCredentials: true})//translates to make a request to this route i.e axios.get("http://localhost:8000...") and send back any cookies that have been collected--> {withCredentials: true} (that's what this part is about), so that when the route hits and goes to the loggedInUser function located in the controller that it has cookies available to pull from to get info about the user.
            .then(res=>{
                console.log("res when getting logged in user", res)
                if(res.data.results){
                    //this means the user is logged in and can access this page
                    setLoggedInUser(res.data.results)                    
                }                  
                
            })
            .catch(err=>{
                //this means someone who is not logged in tried to access the dashboard
                console.log("err when getting logged in user", err)
                history.push("/")
            })
    }, [])
                    // this axios. get call pertains to the Expenses Database specifically
    useEffect(()=>{
        axios.get("http://localhost:8000/api/expenses")
            .then(res=>{
                console.log("response-->", res.data.results);
                setAllExpenses(res.data.results); //remember to tag this: .sort(sortArray) onto the end of results for the sort by date feature
            })
            .catch(err=>{
                console.log("errr", err)
            })

    }, [deleteToggle])

    const deleteExpense = (_id)=>{
        console.log("deleting...")
        axios.delete(`http://localhost:8000/api/expenses/${_id}`)
            .then(res=>{
                console.log("res after deleting!", res);
                setDeleteToggle(!deleteToggle)
            })
            .catch(err=>console.log(err))        
    }



    return(
        <>
            <div className="navBar flex"> {/*place space between on flex*/}
                <h2 className="blue"><span id="brown">Bread</span>Trackr</h2>
                <div className="flex">
                    <p className="text-white">[d/l mode toggle]</p>
                    <p className="light-link"><Link to="/">Logout</Link></p>
                </div>
            </div>    
            <div className="container">
                <div className="bottomline">
                    <div>
                        <h4>Hello {loggedInUser.firstName},</h4>
                        <div className="App">
                            <h5>Your Total Expenses: (input number here)</h5>
                            <PieChart></PieChart>
                        </div>
                    </div>
                    <p className="text-align-right"><Link to="/add/new">Add New Expense</Link></p>
                </div>
                {
                    allExpenses.map((expenseObj, idx)=>{
                        return (
                            <div key={idx} className="flex bottomline"> 
                                <div>
                                    <p>Company Name: {expenseObj.name}</p>
                                    <p>Category: {expenseObj.category}</p>
                                    <p>Amount Paid: {expenseObj.amount}</p>
                                    <p>Date of Purchase: {expenseObj.date}</p>
                                </div>
                                <div className="flex">
                                    <Link to={`/edit/${expenseObj._id}`}>
                                        <img src="pencil_image_for_edit.png" alt="pencil icon for edit" className="icon" />{/*remember to re-upload icons with transparent background*/}
                                    </Link>
                                    <img src="trash_delete_icon.png" alt="trash can icon for delete" className="icon" onClick={(e)=>{deleteExpense(expenseObj._id)}} />
                                </div> 
                            </div>
                        );
                        
                    })
                }
            </div>  
        
        </>
    );
};

export default UserDash;