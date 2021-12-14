import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// shows view department use case
// same implementation as view members use case
function ViewDepts() {
    const [deptsList, setDeptsList] = useState([]);
    const[emptyTable, setEmptyTable]  = useState(false);
    let navigate = useNavigate();
    let {position, department, rollno} = useParams();
    // use effect used to avoid printing in an infinite loop because of useState
    useEffect( () => {
        // axios req to backend to get dept info
        Axios.get("https://group11-db-project.herokuapp.com/viewDepts").then((response) => {
            setDeptsList(response.data);
            if(response.data.length === 0)
            {
                setEmptyTable(true);
            }
        });
      }, [] );

      // if table empty then print message
      if(emptyTable === true)
      {
          return(
              <div className="emptyBackButton">
                <h2> No Departments Present </h2>
                <button
                    onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                    Back to HomePage
                </button>
              </div>
          );
      }

      else
      {
        return(
            <div>
            {deptsList.map((val, key) => {
                return(
                    <div className="View">
                        <h3>Department Name: {val.dept_name}</h3>
                        <h3>Director ID: {val.dir_id}</h3>
                        <h3>No. of Members: {val.no_of_members}</h3>
                    </div>)
            })}
            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Back to HomePage
            </button>
        </div>
        );

      }
}

export default ViewDepts
