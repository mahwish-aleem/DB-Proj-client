import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

// First page of web app where user either selects sign up or log in option.
function Welcome(){
    let navigate = useNavigate();

    return (
        <div>
          <button 
            onClick={() => {
              navigate("/signup");
            }}
          >
            {" "}
            Sign Up
          </button>
          <button 
            onClick={() => {
              navigate("/signin");
            }}
          >
            {" "}
            Sign In
          </button>
          
        </div>
    );
}

export default Welcome;
