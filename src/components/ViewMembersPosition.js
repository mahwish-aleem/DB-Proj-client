import React from 'react';
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// 
function ViewMembersPosition(){
  let navigate = useNavigate();
  let { department, position, rollno } = useParams();
  const [membersList, setMembersList] = useState([]);
  const[emptyTable, setEmptyTable]  = useState(false);
  let pos = "";

  // function to send axios request to backend for obtaining members table information
  const ViewMembersFiltered = (pos) => {
      console.log("pos in axios", pos);
      Axios.post("https://group11-db-project.herokuapp.com/viewMembersPosition", {pos: pos}).then((response) => {
          // store tuple information in membersList using setter
          setMembersList(response.data);
          console.log("res length in view members pos", response.data.length);
          if(response.data.length === 0)
          {
            setEmptyTable(true);
          }
      });
};

// if empty table, no members present, print message
if(emptyTable)
{             
    return(
        <div className="emptyBackButton">
          <h2>No Members Present </h2>
          <button id='panel_button'
            onClick={(event) => [navigate("/viewmembers/" + department + "/" + position + "/" + rollno)]}>
            Back
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
        <button
          onClick={(event) => [ViewMembersFiltered("Director")]}>
          View Directors
        </button>

        <button
          onClick={(event) => [ViewMembersFiltered("Member")]}>
          View Members
        </button>

        <button id='panel_button'
            // takes user back to homepage
            onClick={(event) => [navigate("/viewmembers/" + department + "/" + position + "/" + rollno)]}>
            Back
        </button>
    </div>);

}

export default (ViewMembersPosition);