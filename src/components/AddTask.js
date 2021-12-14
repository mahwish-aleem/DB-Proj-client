
import React from 'react';
import Axios from "axios"
import { useState } from "react"

import { useNavigate, useParams } from "react-router-dom";

function AddTask() { 
    // decalring variables
    const [taskName, setTaskName] = useState("");
    const [fundsAllocated, setFundsAllocated] = useState(0);
    const [assignedDept, setAssignedDept] = useState("");
    const [status, setStatus] = useState("Pending");

    
    let navigate = useNavigate();
    let { department, position, rollno } = useParams(); // extracting variables using params
    let transactionNature = "" ;
    let lastModifiedBy = rollno ; 
    let tempList = [] ;

    const getDeptList = () => {
        // axios req to get dept list for error checking
        Axios.get("https://group11-db-project.herokuapp.com/getDeptList").then((response) => {
        // store dept list
        for (let i = 0; i < response.data.length; i++) {
            tempList[i] = response.data[i].dept_name ;
        }
        });
    };

    getDeptList() ;

    const insertTask = () => {

        // if user wrote valid dept name:
        if (tempList.includes(assignedDept))
        {
            // axios req to insert tuple in task table
            Axios.post("https://group11-db-project.herokuapp.com/insertTask", {
            taskName: taskName,
            fundsAllocated: fundsAllocated,
            assignedDept: assignedDept,
            status: status,
            }).then(() => {
                alert("New Task added!");
            });

            // when tasks tuple is added, funds is automatically updated to withdraw amount from society funds
            transactionNature = "Debit" ;
            Axios.post("https://group11-db-project.herokuapp.com/insertFunds", {
            lastModifiedBy: lastModifiedBy,
            amount: fundsAllocated,
            transactionNature:transactionNature,
            }).then(() => {
                alert("New Funds entry added!");
            });  
        }

        else // if user wrote invalid dept name throw error
        {
            alert("Department Does Not Exist!");
            navigate("/homepage/" + department + "/" + position + "/" + rollno);
        }
    };
    // input fields and buttons
    return (
        <div>
            <label>Task Name</label>
                <input 
                type="text"
                onChange={(event) => {
                    setTaskName(event.target.value);
            }}
            />
            
            <label>Assigned Department:</label>
                <input 
                type="text"
                onChange={(event) => {
                    setAssignedDept(event.target.value);
            }}
            />

            <label>Funds Allocated:</label>
                <input 
                type="number"
                onChange={(event) => {
                    setFundsAllocated(event.target.value);
            }}
            />

            <button
                onClick={(event) => [insertTask(), navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Add Task
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Back to HomePage
            </button>
        </div>
    );
}

export default (AddTask);
