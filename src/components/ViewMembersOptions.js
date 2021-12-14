import React from 'react'
import { useNavigate, useParams } from "react-router-dom";

// page to choose filtered view of members
function ViewMembersOptions(){
  let navigate = useNavigate();
  let { department, position, rollno } = useParams();

  return (
        <div>
            <button // viewing all members use case
                onClick={(event) => [navigate("/viewmembersall/" + department + "/" + position + "/" + rollno)]}>
                View All Members
            </button>            
            
            <button // filter by position
              onClick={(event) => [navigate("/viewmembersposition/" + department + "/" + position + "/" + rollno)]}>
              Filter Members By Position 
            </button>

            <button // filter by department
              onClick={(event) => [navigate("/viewmembersdepartment/" + department + "/" + position + "/" + rollno )]}>
              Filter Members by Department
            </button>

            <button id='panel_button'
                // takes user back to homepage
                onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Back to HomePage
            </button>
        </div>
    )
}

export default (ViewMembersOptions);