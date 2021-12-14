import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import PopulateData from './PopulateData';

// Main screen displaying all available options as buttons
function HomePage(){ 
  let navigate = useNavigate();
  let { department, position, rollno } = useParams();

  // authorisation functions for all use cases which require authentication
  const addMember = () => {
    // only someone who is in the EC or Directorate can add member
    if(department === "EC" || position === "Director")
    {
      return(
        navigate("/addmember/" + department + "/" + position + "/" + rollno)
      )
    }

    else
    {
      return(
        alert("Unauthorized Action! Request Failed"),
        navigate("/homepage/" + department + "/" + position + "/" + rollno)
      )
      
    }
  };

  const removeMember = () => {
    // only someone who is in the EC or Directorate can add member
    if(department === "EC")
    {
      return(
        navigate("/removemember/" + department + "/" + position + "/" + rollno)
      )
    }

    else
    {
      return(
        alert("Unauthorized Action! Request Failed"),
        navigate("/homepage/" + department + "/" + position + "/" + rollno)
      )
      
    }
  };

  const removeDirector = () => {
    // only someone who is in the EC or Directorate can add member
    if(department === "EC" || position === "Director")
    {
      return(
        navigate("/removedirector/" + department + "/" + position + "/" + rollno)
      )
    }

    else
    {
      return(
        alert("Unauthorized Action! Request Failed"),
        navigate("/homepage/" + department + "/" + position + "/" + rollno)
      )
      
    }
  };

  
  const removeEC = () => {
    // only someone who is in the EC or Directorate can add member
    if(position === "President")
    {
      return(
        navigate("/removeec/" + department + "/" + position + "/" + rollno)
      )
    }

    else
    {
      return(
        alert("Unauthorized Action! Request Failed"),
        navigate("/homepage/" + department + "/" + position + "/" + rollno)
      )
      
    }
  };

  const removeSponsor = () => {
    // only someone who is in the EC or Directorate can add member
    if(department === "EC" || (department === "Finance" && position === "Director"))
    {
      return(
        navigate("/removesponsor/" + department + "/" + position + "/" + rollno)
      )
    }

    else
    {
      return(
        alert("Unauthorized Action! Request Failed"),
        navigate("/homepage/" + department + "/" + position + "/" + rollno)
      )
      
    }
  };

  const addDept = () => {
    // only EC can add a dept
    if(department === "EC")
    {
      return(
        navigate("/addDept/" + department + "/" + position + "/" + rollno)
      )
    }
    else
    {
      return(
        alert("Unauthorized Action! Request Failed"),
        navigate("/homepage/" + department + "/" + position + "/" + rollno)
      )
      
    }
  };

  const addEC = () => {
    // only president can add ec member
    if(position === "President")
    {
      return(
        navigate("/addEC/" + department + "/" + position + "/" + rollno)
      )
    }

    else
    {
      return(
        alert("Unauthorized Action! Request Failed"),
        navigate("/homepage/" + department + "/" + position + "/" + rollno)
      )
      
    }
  };

  const viewFunds = () => {
    // only EC or director finance can view funds
    if(department === "EC" || (department === "Finance" && position === "Director"))
    {
      return(
        navigate("/viewfunds/" + department + "/" + position + "/" + rollno)
      )
    }

    else
    {
      return(
        alert("Unauthorized Action! Request Failed"),
        navigate("/homepage/" + department + "/" + position + "/" + rollno)
      )
      
    }
  };

  const viewSponsors = () => {
    // only EC or director finance can view funds
    if(department === "EC" || (department === "Finance" && position === "Director"))
    {
      return(
        navigate("/viewsponsors/" + department + "/" + position + "/" + rollno)
      )
    }

    else
    {
      return(
        alert("Unauthorized Action! Request Failed"),
        navigate("/homepage/" + department + "/" + position + "/" + rollno)
      )
      
    }
  };

  const addDirector = () => {
    // only EC can add director
    if(department === "EC")
    {
      return(
        navigate("/adddirector/" + department + "/" + position + "/" + rollno)
      )
    }

    else
    {
      return(
        alert("Unauthorized Action! Request Failed"),
        navigate("/homepage/" + department + "/" + position + "/" + rollno)
      )
      
    }
  };

  
  const addTask = () => {
    // only EC and directorate can add tasks
    if(department === "EC" || position === "Director")
    {
      return(
        navigate("/addtask/" + department + "/" + position + "/" + rollno)
      )
    }

    else
    {
      
      return(
        alert("Unauthorized Action! Request Failed"),
        navigate("/homepage/" + department + "/" + position + "/" + rollno)
      )
      
    }
  };

  const updateTask = () => {
    // only EC and Directorate can add
    if(department === "EC" || position === "Director")
    {
      return(
        navigate("/updatetasks/" + department + "/" + position + "/" + rollno)
      )
    }

    else
    {
      return(
        alert("Unauthorized Action! Request Failed"),
        navigate("/homepage/" + department + "/" + position + "/" + rollno)
      )
      
    }
  };

    
  const addSponsor = () => {
    // only EC or director finance can view funds
    if(department === "EC"  || (department === "Finance" && position === "Director"))
    {
      return(
        navigate("/addsponsor/" + department + "/" + position + "/" + rollno)
      )
    }
    else
    {
      
      return(
        alert("Unauthorized Action! Request Failed"),
        navigate("/homepage/" + department + "/" + position + "/" + rollno)
      )
      
    }
  };

  const addFunds = () => {
    // only EC or director finance can view funds
    if(department === "EC"  || (department === "Finance" && position === "Director"))
    {
      return(
        navigate("/addfunds/" + department + "/" + position + "/" + rollno)
      )
    }

    else
    {
      
      return(
        alert("Unauthorized Action! Request Failed"),
        navigate("/homepage/" + department + "/" + position + "/" + rollno)
      )
      
    }
  };

  const logOut = () => {
    Axios.post("https://group11-db-project.herokuapp.com/logout", {
    rollNo: rollno,
    }).then((response) => {
        // response received will be user's position (or error), so can be checked if the person is in EC
          alert("Logged Out succesfully");
    });
};

  return (
        <div>
            <button
                onClick={(event) => [navigate("/viewmembers/" + department + "/" + position + "/" + rollno)]}>
                View Members
            </button>     

             <button
              onClick={(event) => [navigate("/viewdepartments/" + department + "/" + position + "/" + rollno)]}>
              View Departments
            </button>       
        
            <button
              onClick={(event) => [navigate("/viewtasks/" + department + "/" + position + "/" + rollno)]}>
              View Tasks
            </button>

            <button
              onClick={(event) => [viewFunds()]}>
              View Funds
            </button>

            <button
              onClick={(event) => [viewSponsors()]}>
              View Sponsors
            </button>

            <button
              onClick={(event) => [addMember()]}>
              Add Member  
            </button>

            <button
              onClick={(event) => [addDirector()]}>
              Add Director
            </button>

            <button
              onClick={(event) => [addEC()]}>
              Add EC Member
            </button>

            <button
              onClick={(event) => [addDept()]}>
              Add Department
            </button>

            <button
              onClick={(event) => [addTask()]}>
              Add Tasks
            </button>

            <button
              onClick={(event) => [updateTask()]}>
              Update Tasks
            </button>

            <button
               onClick={(event) => [addFunds()]}>
               Add Funds
            </button>

            <button
              onClick={(event) => [addSponsor()]}>
              Add Sponsors
            </button>

            <button
              onClick={(event) => [removeMember()]}>
              Remove Member
            </button>

            <button
              onClick={(event) => [removeDirector()]}>
              Remove Director
            </button>

            <button
               onClick={(event) => [removeEC()]}>
               Remove EC Member
            </button>

            <button
               onClick={(event) => [removeSponsor()]}>
               Remove Sponsor
            </button>

            <button
               onClick={(event) => [logOut(), navigate("/")]}>
               Log Out
            </button>

            <button
               onClick={(event) => [PopulateData(), navigate("/")]}>
               POPULATE
            </button>

        </div>

    )
}

export default (HomePage);