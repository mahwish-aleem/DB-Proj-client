import React from 'react';
import Axios from "axios"
import { useState } from "react"

import { useNavigate, useParams } from "react-router-dom";

function RemoveSponsor() { 
    // declaring variables
    const [sponsorName, setSponsorName] = useState(0);
    
    let navigate = useNavigate();
    let { department, position, rollno } = useParams(); // extracting values from params
    // let lastModifiedBy = rollno;
    
    // ftn when funds are added into society funds
    const removeSponsor = () => {
        // axios req to backend
        Axios.post("https://group11-db-project.herokuapp.com/removeSponsor", {
        sponsorName:sponsorName,
        }).then((response) => {
           // console.log("response ka data: ", response.data);
            if (response.data === "Sponsor does not exist")
            {
                alert("Sponsor Does not Exist!")
                
            }
            else if(response.data === "Done")
            {
                alert("Sponsor Removed!");
            }

            
            //receive response and display error
        });  
    };

    // input and button fields
    return (
        <div>
            <label>Remove by Sponsor Name: </label>
                <input 
                type="text"
                placeholder="Type here..."
                onChange={(event) => {
                    setSponsorName(event.target.value);
            }}
            /> 
           
            <button
                onClick={(event) => [removeSponsor(), navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Remove Sponsor
            </button>   
            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (RemoveSponsor);
