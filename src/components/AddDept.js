import React from 'react';
import Axios from "axios"
import { useState } from "react"

import { useNavigate, useParams } from "react-router-dom";

function AddDept() { 
    // declaring variables
    const [rollNo, setRollNo] = useState(0);
    const [deptName, setDeptName] = useState("");
     let noOfMembers = 0 ;
    let navigate = useNavigate();
    // extracting info using params
    let { position, department, rollno } = useParams();
   
    // insert dept ftn to send axios req to backend
    const insertDept = () => {
        Axios.post("https://group11-db-project.herokuapp.com/insertDept", {
        rollNo: rollNo,
        deptName: deptName,
        noOfMembers: noOfMembers,
        }).then((response) => {
            // if db detect dup entry, display error
            if(response.data === "Duplicate Error")
            {
                alert("Department already exists.")
            }
            else // else confirm that the department was added
            {
                alert("New Department added!");
            }
        });

    };
    // input fields and buttons
    return (
        <div>
            <label>Department:</label>
                <input 
                type="text"
                onChange={(event) => {
                    setDeptName(event.target.value);
            }}
            />
        <button
            onClick={(event) => [insertDept(), navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
            Add Department
        </button>    

        <button id='panel_button'
            onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
            Back to HomePage
        </button>
        </div>
        

    );
}

export default (AddDept);
