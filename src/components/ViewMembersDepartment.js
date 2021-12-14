import React from 'react';
import { useState} from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


// filtered view of members use case (according to department)
function ViewMembersDepartment(){
  let navigate = useNavigate();
  let { department, position, rollno } = useParams();
  const [membersList, setMembersList] = useState([]);
  const [emptyTable, setEmptyTable] = useState(false);
  const [input, setInput] = useState("");
  let tempList = [] ;
  let pos = "";
  // ftn to get list of depts from backend for error checking
  const getDeptList = () => {
    Axios.get("https://group11-db-project.herokuapp.com/getDeptList").then((response) => {

        for (let i = 0; i < response.data.length; i++) {
            tempList[i] = response.data[i].dept_name ;
        }
    });
};

  getDeptList() ;   

  // function to send axios request to backend for obtaining members table information
  // use effect used to avoid printing in an infinite loop because of useState
  const ViewMembersFiltered = (input) => {
      // if user entered valid dept name
      if (tempList.includes(input))
      {
        console.log("input in axios", input);
        Axios.post("https://group11-db-project.herokuapp.com/viewMembersDepartment", {input: input}).then((response) => {
            // store tuple information in membersList using setter
            setMembersList(response.data);
            console.log("res length in view members pos", response.data.length);
            if(response.data.length === 0)
            {
              setEmptyTable(true);
            }
        });
      }

      else // if user entered invalid dept name
      {
        alert("Department Does Not Exist!");
        navigate("/homepage/" + department + "/" + position + "/" + rollno);
      }
      
};
// if no members present, print message
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

        <label>Search: </label>
                <input 
                type="text"
                placeholder="Type here..."
                onChange={(event) => {
                    setInput(event.target.value);
            }}
            /> 
          <button
            onClick={(event) => [ViewMembersFiltered(input)]}>
            Search
          </button>

          <button id='panel_button'
              // takes user back to homepage
              onClick={(event) => [navigate("/viewmembers/" + department + "/" + position + "/" + rollno)]}>
              Back
          </button>

          <footer> 
              If you don't know the departments, then go to "View Departments"
              <button
                onClick={(event) => [navigate("/viewdepartments/" + department + "/" + position + "/" + rollno )]}>
                View Departments
              </button>
          </footer>
    </div>);

}

export default (ViewMembersDepartment);