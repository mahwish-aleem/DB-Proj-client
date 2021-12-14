import React from 'react';
import Axios from "axios"
import { useState } from "react"

import { useNavigate, useParams } from "react-router-dom";

function AddSponsor() { 
    // declaring variables
    const [sponsorName, setSponsorName] = useState("");
    const [amountSponsored, setAmountSponsored] = useState(0);
    let transactionNature = "" ;
    let { department, position, rollno } = useParams(); // extracting values using params
    let lastModifiedBy = rollno;

    let navigate = useNavigate();
    
    const insertSponsor = () => {
        // axios req to insert tuple in sponsors table
        Axios.post("https://group11-db-project.herokuapp.com/insertSponsor", {
        sponsorName: sponsorName,
        amountSponsored: amountSponsored,
        }).then(() => {
        
            alert("New Sponsor added!");
        });

        // after sponsor is added, automatically add correspnding entry in funds table
        transactionNature = "Credit" ;
        Axios.post("https://group11-db-project.herokuapp.com/insertFunds", {
        lastModifiedBy: lastModifiedBy,
        amount: amountSponsored,
        transactionNature:transactionNature,

        }).then(() => {
        console.log("success");
        alert("New Funds entry added!");
        });  
 
    };
    // input fields and buttons
    return (
        <div>
            <label>Sponsor Name:</label>
                <input 
                type="text"
                onChange={(event) => {
                    setSponsorName(event.target.value);
            }}
            />
            <label>Amount Sponsored:</label>
                <input 
                type="number"
                onChange={(event) => {
                    setAmountSponsored(event.target.value);
            }}
            />   
            <button
                onClick={(event) => [insertSponsor(), navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Add Sponsor
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Back to HomePage
            </button>
        </div>
        

    );
}

export default (AddSponsor);
