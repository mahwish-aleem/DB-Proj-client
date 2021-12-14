import React from 'react';
import Axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

function AddMember() { 
    // declaring variables
    const [rollNo, setRollNo] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [deptName, setDeptName] = useState("");
    let pos = "";
    let tempList = [] ;
    let { department, position, rollno } = useParams(); // extracting variables using params
    let navigate = useNavigate();

    // ftn to get list of departments from db
    const getDeptList = () => {
        // axios req to get dept list for error checking
        Axios.get("https://group11-db-project.herokuapp.com/getDeptList").then((response) => {
        // store dpt names
        for (let i = 0; i < response.data.length; i++) {
            tempList[i] = response.data[i].dept_name ;
        }
        });
    };

    getDeptList() ;    
    const insertMember = () => {
        // if user entered a valid department name
        if (tempList.includes(deptName))
        {
            pos = "Member";
            // axios req to insert tuple into members table
            Axios.post("https://group11-db-project.herokuapp.com/insertMember", {
            rollNo: rollNo,
            firstName: firstName,
            lastName: lastName,
            deptName: deptName,
            pos: pos,
            }).then((response) => {

                if(response.data === "Duplicate Error") // if dup entry, give error
                {
                    alert("Member already exists.")
                }
                else
                {
                    alert("New Member added! They can now Sign Up.");
                }
           
            });
        }

        else // if user entered invalid dept name, give error
        {
            alert("Department Does Not Exist!");
            navigate("/homepage/" + department + "/" + position + "/" + rollno);
        }
    };
    // input fields and buttons
    return (
        <div>
            <label>First Name:</label>
            <input 
                type="text"
                onChange={(event) => {
                    setFirstName(event.target.value);
            }}/>
            <label>Last Name:</label>
                <input 
                type="text"
                onChange={(event) => {
                    setLastName(event.target.value);
            }}
            />
            <label>Roll No.:</label>
                <input 
                type="number"
                onChange={(event) => {
                    setRollNo(event.target.value);
            }}
            />
            <label>Department:</label>
                <input 
                type="text"
                onChange={(event) => {
                    setDeptName(event.target.value);
            }}
            />
            <button
                onClick={(event) => [insertMember(), navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Add Member
            </button>    

            <button id='panel_button'
                onClick={(event) => [navigate("/homepage/" + department + "/" + position + "/" + rollno)]}>
                Back to HomePage
            </button>
        </div>
        
    );
}

export default (AddMember);
