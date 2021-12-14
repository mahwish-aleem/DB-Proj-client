import React from 'react';
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// filtered view of departments use case
function ViewTasksDepartment(){
  let navigate = useNavigate();
  let { department, position, rollno } = useParams();
  const [tasksList, setTasksList] = useState([]);
  const[emptyTable, setEmptyTable]  = useState(false);
  const [input, setInput] = useState("");
  let pos = "";
  let tempList = [] ;

  // get dept list from db for error checking
  const getDeptList = () => {
    // axios req
    Axios.get("https://group11-db-project.herokuapp.com/getDeptList").then((response) => {
    // store dept list
    for (let i = 0; i < response.data.length; i++) {
        tempList[i] = response.data[i].dept_name ;
    }

    });
  };

  getDeptList() ;  

  // function to send axios request to backend for obtaining members table information
  const ViewTasksFiltered = (input) => {
      if (tempList.includes(input)) // if user entered valid dept name
      {
        Axios.post("https://group11-db-project.herokuapp.com/viewTasksDepartment", {input: input}).then((response) => {
          // store tuple information in membersList using setter
          setTasksList(response.data);
          if(response.data.length === 0)
          {
            setEmptyTable(true);
          }
        });

      }
      else // if user entred invalid dept name
      {
        alert("Department Does Not Exist!");
        navigate("/homepage/" + department + "/" + position + "/" + rollno);
      }
 
};

// if no tasks then print message
if(emptyTable)
{             
    return(
        <div className="emptyBackButton">
          <h2>No Tasks Present </h2>
          <button id='panel_button'
            onClick={(event) => [navigate("/viewtasks/" + department + "/" + position + "/" + rollno)]}>
            Back
          </button>
        </div>
    );
}

return (
// printing members table information.
// using map function: val is a tuple in the members table
    <div>
        {tasksList.map((val, key) => { 
            return (
                <div className="viewTasks">
                   <h3>Task ID: {val.task_id}</h3>
                    <h3>Task Name: {val.task_name}</h3>
                    <h3>Funds Allocated: {val.funds_allocated}</h3>
                    <h3>Assigned Department: {val.assigned_dept}</h3>
                    <h3>Status: {val.status}</h3>
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
          onClick={(event) => [ViewTasksFiltered(input)]}>
          Search
        </button>

        <button id='panel_button'
            // takes user back to homepage
            onClick={(event) => [navigate("/viewtasks/" + department + "/" + position + "/" + rollno)]}>
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

export default (ViewTasksDepartment);