import {Chart, PieChart} from "chart.js";
import React, { useState, useEffect, createRef } from 'react';
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import axios from 'axios';


const MyChart =()=>{

    // let chart= createRef()

    const [expenses, setExpenses] = useState(
        {  
            type:"pie",
            data: 
            {
                labels:[],
                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: [],
                    }
                ]

            },
            options:{}
        }
    );


    useEffect(()=>{
        axios.get("http://localhost:8000/api/expenses")//translates to make a request to this route i.e axios.get("http://localhost:8000...") and send back any cookies that have been collected--> {withCredentials: true} (that's what this part is about), so that when the route hits and goes to the loggedInUser function located in the controller that it has cookies available to pull from to get info about the user.
            .then(res=>{
                console.log("got expenses!!", res)
                if(res.data.results){
                    let _expenses={...expenses}
                    for(let expense of res.data.results){
                        console.log(expense);
                        _expenses.data.labels.push(expense.category);
                        _expenses.data.datasets[0].data.push(expense.amount);
                        _expenses.data.datasets[0].label=expense.name
                    }
                    //this means the user is logged in and can access this page
                    setExpenses(_expenses)
                    let chart= document.getElementById("myChart"); 
                    new Chart( chart, _expenses)                   
                }                  
                
            })
            .catch(err=>{
                //this means someone who is not logged in tried to access the dashboard
                console.log("err when getting logged in user", err)
            })
    }, [])
    
    if(expenses.data.labels.length > 0){
        return(
            <>
                <canvas id="myChart"></canvas>

    
            </>
        )

    }
    return <p>Loading...</p>


};

export default MyChart;