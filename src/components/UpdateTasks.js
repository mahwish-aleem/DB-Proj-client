import React, { useEffect } from 'react'
import { useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// update task use case
function UpdateTasks() { 
    const [taskID, setTaskID] = useState(0);
    let navigate = useNavigate();
    let { position, department, rollno } = useParams();

    let status = "" ;
   
    // function to update status field to "Pending"
    const updateTasktoPending = () => {
        // axios req to backend to update field
            status = "Pending" ;
            Axios.post("https://group11-db-project.herokuapp.com/updateTask", {
            taskID: taskID,
            status: status,
            }).then(() => {
                alert("Task Updated!");
            }); 
     };
     // function to uodate status field to "Done"
     const updateTasktoDone = () => {
            // axios req to backend to update field
            status = "Done" ;
            Axios.post("https://group11-db-project.herokuapp.com/updateTask", {
            taskID: taskID,
            status: status,
            }).then(() => {
                alert("Task Updated!");
            });
     };

    return (
        <div>
            <label>Task ID:</label>
                <input 
                type="number"
                onChange={(event) => {
                    setTaskID(event.target.value);
            }}
            />
            <button
                onClick={(event) => [updateTasktoPending(), navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Update Status to "Pending"
            </button>   

            <button
                onClick={(event) => [updateTasktoDone(), navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Update Status to "Done"
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Back to HomePage
            </button>
        </div>
        

    );
}

export default (UpdateTasks);
