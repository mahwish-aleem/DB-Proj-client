import React from 'react';
import Axios from "axios"
import { useState } from "react"

import { useNavigate, useParams } from "react-router-dom";

function RemoveMember() { 
    // declaring variables
    const [rollNo, setRollNo] = useState(0);
    
    let navigate = useNavigate();
    let { department, position, rollno } = useParams(); // extracting values from params
    // let lastModifiedBy = rollno;
    
    // ftn when funds are added into society funds
    const removeMember = () => {
        // axios req to backend
        Axios.post("https://group11-db-project.herokuapp.com/removeMember", {
        rollNo:rollNo,
        }).then((response) => {
            //console.log("response ka data: ", response.data);
            if (response.data.affectedRows === 0)
            {
                alert("Invalid Member ID!");
            }
            else
            {
                alert("Member Removed!");
            }
            
            //receive response and display error
        });  
    };

    // input and button fields
    return (
        <div>
            <label>Remove by Roll Number: </label>
                <input 
                type="number"
                placeholder="Type here..."
                onChange={(event) => {
                    setRollNo(event.target.value);
            }}
            /> 
           
            <button
                onClick={(event) => [removeMember(), navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Remove Member
            </button>   
            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (RemoveMember);
