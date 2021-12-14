import React from 'react';
import Axios from "axios"
import { useState } from "react"

import { useNavigate, useParams } from "react-router-dom";

function AddDirector() { 
    // declaring variables
    const [rollNo, setRollNo] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [deptName, setDeptName] = useState("");
    let pos = "";
    let tempList = [] ;

    let navigate = useNavigate();
    let { position, department, rollno } = useParams(); // extracting values through params
    
    // ftn to get list of departments from db
    const getDeptList = () => {
        // axios req to get dept list for error checking
        Axios.get("https://group11-db-project.herokuapp.com/getDeptList").then((response) => {

        // store dept names
        for (let i = 0; i < response.data.length; i++) {
            tempList[i] = response.data[i].dept_name ;
        }

        });
    };

    getDeptList() ;  

    const insertDirector = () => {
        // if user entered a valid department name,
        if (tempList.includes(deptName))
        {
            pos = "Director"; 
            Axios.post("https://group11-db-project.herokuapp.com/insertDirector", {
            rollNo: rollNo,
            firstName: firstName,
            lastName: lastName,
            deptName: deptName,
            pos: pos,
            }).then((response) => {
                if(response.data === "Duplicate Error")
                {
                    alert("Director already exists.");
                }
                else if(response.data === "Already Present")
                {
                    alert("Director for this department already present!");
                }
                else
                {
                    alert("New Director added! They can now Sign Up.");
                }

            });

        }

        else // if user entered invalid dept name i.e. one that does not exist
        {
            alert("Department Does Not Exist!");
            navigate("/homepage/" + department + "/" + position + "/" + rollno);
        }
         
        
    };
    // inpiut fields and buttons
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
            <label>Department:</label>
                <input 
                type="text"
                onChange={(event) => {
                    setDeptName(event.target.value);
            }}
            />

        <button
            onClick={(event) => [insertDirector(), navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
            Add Director
        </button>    

        <button id='panel_button'
            onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
            Back to HomePage
        </button>
        </div>
    );
}

export default (AddDirector);
