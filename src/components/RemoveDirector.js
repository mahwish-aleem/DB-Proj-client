import React from 'react';
import Axios from "axios"
import { useState } from "react"

import { useNavigate, useParams } from "react-router-dom";

function RemoveDirector() { 
    // declaring variables
    const [deptName, setDeptName] = useState("");
    
    let navigate = useNavigate();
    let { department, position, rollno } = useParams(); // extracting values from params
    // let lastModifiedBy = rollno;
    
    // ftn when funds are added into society funds
    const removeDirector = () => {
        // axios req to backend
        Axios.post("https://group11-db-project.herokuapp.com/removeDirector", {
        deptName:deptName,
        }).then((response) => {
           // console.log("response ka data: ", response.data);
            if (response.data === "No Director Exists for this Department")
            {
                alert("No Director Exists for this Department!")
                
            }
            else if(response.data === "Done")
            {
                alert("Director Removed!");
            }
            else if(response.data == "Department Does Not Exist")
            {
                alert("Invalid Department Name!");
            }
            
            //receive response and display error
        });  
    };

    // input and button fields
    return (
        <div>
            <label>Remove by Department: </label>
                <input 
                type="text"
                placeholder="Type here..."
                onChange={(event) => {
                    setDeptName(event.target.value);
            }}
            /> 
           
            <button
                onClick={(event) => [removeDirector(), navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Remove Director
            </button>   
            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (RemoveDirector);
