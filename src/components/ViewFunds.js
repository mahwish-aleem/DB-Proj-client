import React, { useEffect } from 'react'
import { useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// view funds use case, same implementation as view members etc.
function ViewFunds() {
    const [fundsList, setFundsList] = useState([]);

    const[emptyTable, setEmptyTable]  = useState(false);
    let navigate = useNavigate();
    let { position, department, rollno } = useParams();
    // use effect used to avoid printing in an infinite loop because of useState
    useEffect( () => {
        Axios.get("https://group11-db-project.herokuapp.com/viewFunds").then((response) => {
            setFundsList(response.data);
            if(response.data.length === 0)
            {
                setEmptyTable(true);
            }
        });
      }, [] );

      if(emptyTable === true)
      {
          return(
              <div className="emptyBackButton">
                <h2> No Funds Present </h2>
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
            {fundsList.map((val, key) => {
                return(
                    <div className="viewTasks">
                        <h3>Transaction ID: {val.transaction_id}</h3>
                        <h3>Last Modified By: {val.last_modified_by}</h3>
                        <h3>Amount: Rs. {val.amount}</h3>
                        <h3>Current Funds: Rs. {val.curr_funds}</h3>
                        <h3>Transaction Nature: {val.transaction_nature}</h3>
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

export default ViewFunds;
