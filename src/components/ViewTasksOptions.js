import React from 'react'
import { useNavigate, useParams } from "react-router-dom";

// view tasks filtered options page
function ViewTasksOptions(){ 
  let navigate = useNavigate();
  let { department, position, rollno } = useParams();
  console.log("POS DEPT", position, department);

  return (
        <div>
            <button // view all tasks use case
                onClick={(event) => [navigate("/viewtasksall/" + department + "/" + position + "/" + rollno)]}>
                View All Tasks
            </button>            
            
            <button // view tasks by dept use case (filtered view)
              onClick={(event) => [navigate("/viewtasksdepartment/" + department + "/" + position + "/" + rollno)]}>
              View Department Specific Tasks
            </button>

            <button id='panel_button'
                // takes user back to homepage
                onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Back to HomePage
            </button>
        </div>
    )
}

export default (ViewTasksOptions);