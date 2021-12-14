import React from 'react'
import Axios from "axios";
import { useState } from "react";
// import { Navigate } from 'react-router';
import { useNavigate, useParams } from "react-router-dom";
// page 1
function SignUp() { // { pageData, setPageData, setPage }) {
    // declaring variables to catch and store from backend
    const [rollNo, setRollNo] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    // function to send axios request to backend for sign up
    const addUsers = () => {
        // error checking to detect correct lums email
        if(email.substring(8, email.length) === "@lums.edu.pk")
        {
            // send axios request to register user (add in users table)
            Axios.post("https://group11-db-project.herokuapp.com/register",{
            rollNo: rollNo,
            email: email,
            password: password,
            }).then((response) => {
                // if user does not exist in members table, sign up fails
                if(response.data === "Does not exist")
                {
                    alert("Failed! Sign up not authorized.");
                    // takes user back to welcome page
                }
                else if(response.data === "Duplicate Error")
                {
                    alert("This Roll No. already has an account.");
                }
                else // else sign up successful
                {
                    console.log("success");
                    alert("Sign up successful. You can now Log In.");
                    // takes user to log in page
                    navigate("/signin");
                }
            });
        }
        else // alert user that enetred email is not valid
        {
            alert("Email not Authorised! Please enter your LUMS email.");
        }
    };

    return (
        // take input from user
        <div className="SignUp">
            <label>Roll No./ID:</label>
            <input 
                type="number"
                onChange={(event) => {
                setRollNo(event.target.value);
            }}/>
            <label>LUMS Email:</label>
                <input 
                type="text"
                onChange={(event) => {
                setEmail(event.target.value);
            }}/>
            <label>Password:</label>
                <input 
                type="text"
                onChange={(event) => {
                    setPassword(event.target.value);
            }}/>
            <button
                onClick={(event) => [addUsers()]}>
                Join
            </button>
            <button id='panel_button'
                // take back to Welcome Page
                onClick={(event) => [navigate("/")]}>
                Back
            </button>
        </div>
    );
}


export default SignUp;
