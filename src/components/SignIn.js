import React from 'react'
import Axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SignIn() {
    // declaring variables to catch and store from backend
    const [rollNo, setRollNo] = useState(0);
    const [password, setPassword] = useState("");
    
    let navigate = useNavigate();
    let {position, department, rollno} = useParams();
    // let department;
    // let position;

    // function to send axios request to backend for log in
    const logIn = () => {
        Axios.post("https://group11-db-project.herokuapp.com/signin", {
        rollNo: rollNo,
        password: password,
        }).then((response) => {
            // response received will be user's position (or error), so can be checked if the person is in EC
            position = response.data[0].position; // recheck
            department = response.data[0].dept_name;
            rollno = response.data[0].user_id;
            // if error message received from backend, then report error to the user
            if(response.data === "Does not exist")
            {
                alert("Failed! Account not recognised. Please sign up or check sign in details.");
            }
            else // else if no error message received, the user is logged in
            {
                alert("Logged In succesfully");
                navigate("/homepage/" + department + "/" + position + "/" + rollno);
            }
        });
    };

    return (
        // taking user input for sign up
        <div>
            <label>Roll No.:</label>
            <input 
                type="number"
                onChange={(event) => {
                setRollNo(event.target.value);
            }}/>
            <label>Password:</label>
                <input 
                type="text"
                onChange={(event) => {
                setPassword(event.target.value);
            }}
            />
            <button
                onClick={(event) => [logIn()]}>
                Log In
            </button>
            <button id='panel_button'
                // take user back to welcome page
                onClick={(event) => [navigate("/")]}>
                Back
            </button>
        </div>
    )
}



export default SignIn;
