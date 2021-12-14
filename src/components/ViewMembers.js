import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// page 4 
// shows View Members Use Case

function ViewMembers() {
    // variable to store tuples recieved from backend

    const [membersList, setMembersList] = useState([]);

    const[emptyTable, setEmptyTable]  = useState(false);

    let { department, position, rollno } = useParams();

    let navigate = useNavigate();

    // function to send axios request to backend for obtaining members table information
    // use effect used to avoid printing in an infinite loop because of useState
    useEffect(() => {
        console.log("hello jee");
        Axios.get("https://group11-db-project.herokuapp.com/viewMembers").then((response) => {
            // store tuple information in membersList using setter
            setMembersList(response.data);
            if(response.data.length === 0)
            {
                setEmptyTable(true);
            }
        });
    }, [] ) ;

    if(emptyTable)
    {             
        return(
            <div className="emptyBackButton">
              <h2>No Members Present </h2>
              <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Back to HomePage
              </button>
            </div>
        );
    }
    
    return (
    // printing members table information.
    // using map function: val is a tuple in the members table
        <div>
            {membersList.map((val, key) => { 
                return (
                    <div className="View">
                        <h3>Name: {val.f_name + " " + val.l_name}</h3>
                        <h3>Roll No.: {val.user_id}</h3>
                        <h3>Department: {val.dept_name}</h3>
                        <h3>Position: {val.position}</h3>
                    </div>)
            })}
            <button id='panel_button'
                // takes user back to homepage
                onClick={(event) => [navigate("/viewmembers/" + department + "/" + position + "/" + rollno)]}>
                Back
            </button>
        </div>);
}

export default ViewMembers
