import React from 'react';
import Axios from "axios"
import { useState } from "react"

import { useNavigate, useParams } from "react-router-dom";

function RemoveEC() { 
    // declaring variables
    const [pos, setPos] = useState("");
    
    let navigate = useNavigate();
    let { department, position, rollno } = useParams(); // extracting values from params
    // let lastModifiedBy = rollno;
    let possiblePos = ["President", "Vice President", "Treasurer", "General Secretary"];
    // ftn when funds are added into society funds
    const removeEC = () => {
        // axios req to backend
        if (possiblePos.includes(pos))
        {
            Axios.post("https://group11-db-project.herokuapp.com/removeEC", {
            pos:pos,
            }).then((response) => {
            // console.log("response ka data: ", response.data);
                if (response.data === "Position does not exist")
                {
                    alert("Position is not filled!")
                }
                else if(response.data === "Done")
                {
                    alert("EC Member Removed!");
                }
                
                //receive response and display error
            });  
        }
        else
        {
            alert("Invalid Position!");
        }
        
    };

    // input and button fields
    return (
        <div>
            <label>Remove by Position of EC Member: </label>
                <input 
                type="text"
                placeholder="Type here..."
                onChange={(event) => {
                    setPos(event.target.value);
            }}
            /> 
           
            <button
                onClick={(event) => [removeEC(), navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Remove EC Member
            </button>   
            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (RemoveEC);
