import React, { useEffect } from 'react'
import { useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// shows view tasks use case
// same implementation as view members use case
function ViewTasks() {
    const [tasksList, setTasksList] = useState([]);
    const [emptyTable, setEmptyTable] = useState(false);
    let navigate = useNavigate();
    let { position, department, rollno } = useParams();
    // use effect used to avoid printing in an infinite loop because of useState
    useEffect(() => {
        // axios req to get tasks table info from backend
        Axios.get("https://group11-db-project.herokuapp.com/viewTasks").then((response) => {
            console.log(response.data);
            setTasksList(response.data);
            if(response.data.length === 0)
            {
                setEmptyTable(true);
            }
        });
    }, [] );

    // if table empty, print message
    if(emptyTable)
    {             
        return(
            <div className="emptyBackButton">
            <h2> No Tasks Present </h2>
            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Back to HomePage
            </button>
            </div>
        );
    }

    return (
        <div>
            {tasksList.map((val, key) => {
                return (
                    <div className="viewTasks">
                        <h3>Task ID: {val.task_id}</h3>
                        <h3>Task Name: {val.task_name}</h3>
                        <h3>Funds Allocated: Rs. {val.funds_allocated}</h3>
                        <h3>Assigned Department: {val.assigned_dept}</h3>
                        <h3>Status: {val.status}</h3>
                    </div>)
            })}
            <button id='panel_button'
                onClick={(event) => [navigate("/viewtasks/" + department + "/" + position + "/" + rollno)]}>
                Back
            </button>
        </div>
    )
}

export default ViewTasks;
