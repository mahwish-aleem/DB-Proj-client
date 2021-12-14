import React from 'react';
import Axios from "axios"
import { useState } from "react"

import { useNavigate, useParams } from "react-router-dom";

function AddFunds() { 
    // declaring variables
    const [amount, setAmount] = useState(0);
    
    let transactionNature = "" ;
    let navigate = useNavigate();
    let { department, position, rollno } = useParams(); // extracting values from params
    let lastModifiedBy = rollno;
    
    // ftn when funds are added into society funds
    const creditFunds = () => {
        transactionNature = "Credit" ;
        // axios req to backend
        Axios.post("https://group11-db-project.herokuapp.com/insertFunds", {
        lastModifiedBy: lastModifiedBy,
        amount: amount,
        transactionNature:transactionNature,
        }).then(() => {
            alert("New Funds entry added!");
        });  
    };

    // ftn when funds are withdrawn from society funds
    const debitFunds = () => {
        transactionNature = "Debit" ;
        // axios req to backend
        Axios.post("https://group11-db-project.herokuapp.com/insertFunds", {
        lastModifiedBy: lastModifiedBy,
        amount: amount,
        transactionNature:transactionNature,

        }).then(() => {
            alert("New Funds entry added!");
        });  
    };
    // input and button fields
    return (
        <div>
            <label>Amount:</label>
                <input 
                type="number"
                onChange={(event) => {
                    setAmount(event.target.value);
            }}
            />
            <button
                onClick={(event) => [creditFunds(), navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Credit Funds
            </button>  
            <button
                onClick={(event) => [debitFunds(), navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Debit Funds
            </button>   
            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (AddFunds);
