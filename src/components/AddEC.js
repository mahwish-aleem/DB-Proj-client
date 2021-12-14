
import React from 'react';
import Axios from "axios"
import { useState } from "react"

import { useNavigate, useParams } from "react-router-dom";

function AddEC() { 
    // declaring variables
    const [rollNo, setRollNo] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [pos, setPosition] = useState("");

    let navigate = useNavigate();
    let { department, position, rollno } = useParams(); // extracting values from params

    // list to check if correct position is entered
    let possiblePos = ["President", "Vice President", "Treasurer", "General Secretary"];
    let deptName = "" ;

    const insertEC = () => {
        // if valid position
        if (possiblePos.includes(pos))
        {
            deptName = "EC" ;
            // axios req to backend
            Axios.post("https://group11-db-project.herokuapp.com/insertEC", {
            rollNo: rollNo,
            firstName: firstName,
            lastName: lastName,
            deptName: deptName,
            pos: pos,
            }).then((response) => {

            if(response.data === "Duplicate Error")
            {
                alert("EC Member already exists.");
            }
            else if(response.data === "Already Present")
            {
                alert("EC Position already exists.");
            }
            else
            {
                alert("New EC Member added! They can now Sign Up.");
            }
            });
        }
        else // if valid position is not added, then display error
        {
            alert("Position Does Not Exist!");
            navigate("/homepage/" + department + "/" + position + "/" + rollno);
        } 
    };
    // buttons and input fields
    return (
        <div>
            <label>First Name:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setFirstName(event.target.value);
            }}/>
            <label>Last Name:</label>
                <input 
                type="text"
                onChange={(event) => {
                    setLastName(event.target.value);
            }}
            />
            <label>Roll No.:</label>
                <input 
                type="number"
                onChange={(event) => {
                    setRollNo(event.target.value);
            }}
            />
            <label>Position:</label>
                <input 
                type="text"
                onChange={(event) => {
                    setPosition(event.target.value);
            }}
            />
            <button
                onClick={(event) => [insertEC(), navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Add EC Member
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Back to HomePage
            </button>
        </div>
    );
}

export default (AddEC);
