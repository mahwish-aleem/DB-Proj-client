import './App.css';
import { useState } from "react";
import React from 'react';
// import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Routes, Route, useHistory} from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

// importing page components
//import Welcome from "./components/Welcome";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import HomePage from "./components/HomePage";
import ViewMembers from "./components/ViewMembers";
import AddMember from "./components/AddMember";
import ViewDepartments from "./components/ViewDepts";
import Welcome from './components/Welcome';
import ViewTasks from './components/ViewTasks';
import ViewFunds from './components/ViewFunds';
import ViewSponsors from './components/ViewSponsors';
import AddDirector from './components/AddDirector';
import AddEC from './components/AddEC';
import AddDept from './components/AddDept';
import AddTask from './components/AddTask';
import AddSponsor from './components/AddSponsor';
import ViewMembersOptions from './components/ViewMembersOptions';
import ViewMembersPosition from './components/ViewMembersPosition.js';
import ViewMembersDepartment from './components/ViewMembersDepartment';
import ViewTasksOptions from './components/ViewTasksOptions';
import ViewTasksDepartment from './components/ViewTasksDepartment';
import UpdateTasks from './components/UpdateTasks';
import AddFunds from './components/AddFunds';
import RemoveMember from './components/RemoveMember';
import RemoveDirector from './components/RemoveDirector';
import RemoveEC from './components/RemoveEC';
import RemoveSponsor from './components/RemoveSponsor';

function App()
{
  return (

  <div className="App">
      <div className="Header">
         <h1 id="panel"> Society Management System </h1>
      </div>
      <div className="body">
    {/* router for navigating pages */}
    <Router>
      <Routes>
        {/* public pages*/}
        <Route path="/" element={<Welcome/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />  
        {/* private pages */}   
        <Route exact path="/homepage/:department/:position/:rollno" element={<HomePage/>} />
        <Route exact path="/viewmembers/:department/:position/:rollno" element={<ViewMembersOptions/>} />
        <Route exact path="/viewtasksall/:department/:position/:rollno" element={<ViewTasks/>} />
        <Route exact path="/viewdepartments/:department/:position/:rollno" element={<ViewDepartments/>} />
        <Route exact path="/viewmembersall/:department/:position/:rollno" element={<ViewMembers/>} />
        <Route exact path="/viewmembersposition/:department/:position/:rollno" element={<ViewMembersPosition/>} />
        <Route exact path="/viewmembersdepartment/:department/:position/:rollno" element={<ViewMembersDepartment/>} />
        <Route exact path="/viewtasksdepartment/:department/:position/:rollno" element={<ViewTasksDepartment/>} />
        <Route exact path="/viewtasks/:department/:position/:rollno" element={<ViewTasksOptions/>} />

        {/* special access pages */}
        <Route exact path="/viewfunds/:department/:position/:rollno" element={<ViewFunds/>} />
        <Route exact path="/viewsponsors/:department/:position/:rollno" element={<ViewSponsors/>} />

        <Route exact path="/updatetasks/:department/:position/:rollno" element={<UpdateTasks/>} />
        <Route exact path="/addmember/:department/:position/:rollno" element={<AddMember/>} />
        <Route exact path="/adddirector/:department/:position/:rollno" element={<AddDirector/>} />
        <Route exact path="/addec/:department/:position/:rollno" element={<AddEC/>} />
        <Route exact path="/adddept/:department/:position/:rollno" element={<AddDept/>} />
        <Route exact path="/addtask/:department/:position/:rollno" element={<AddTask/>} />
        <Route exact path="/addsponsor/:department/:position/:rollno" element={<AddSponsor/>} />
        <Route exact path="/addfunds/:department/:position/:rollno" element={<AddFunds/>} />
        <Route exact path="/removemember/:department/:position/:rollno" element={<RemoveMember/>} />
        <Route exact path="/removedirector/:department/:position/:rollno" element={<RemoveDirector/>} />
        <Route exact path="/removeec/:department/:position/:rollno" element={<RemoveEC/>} />
        <Route exact path="/removesponsor/:department/:position/:rollno" element={<RemoveSponsor/>} />
      </Routes>
    </Router>
      </div>
     </div>
    
  );

}

export default App;
