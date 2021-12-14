import React, { useEffect } from 'react'
import { useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// view sponsors use case
function ViewSponsors() {
    const [sponsorsList, setSponsorsList] = useState([]);
    const[emptyTable, setEmptyTable]  = useState(false);
    let navigate = useNavigate();
    let { position, department, rollno } = useParams();
    // use effect used to avoid printing in an infinite loop because of useState
    useEffect(() => {
        // axios req to get info from backend
        Axios.get("https://group11-db-project.herokuapp.com/viewSponsors").then((response) => {
            setSponsorsList(response.data);
            if(response.data.length === 0)
            {
                setEmptyTable(true);
            }
        });
      }, [] );
      // if table empty, print message
      if(emptyTable === true)
      {
          return(
              <div className="emptyBackButton">
                <h2> No Sponsors Present </h2>
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
            {sponsorsList.map((val, key) => {
                return(
                    <div className="View">
                        <h3>Contract ID: {val.contract_id}</h3>
                        <h3>Sponsor Name: {val.sponsor_name}</h3>
                        <h3>Amount Sponsored: {val.amount_sponsored}</h3>
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

export default ViewSponsors
