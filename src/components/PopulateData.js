import React from 'react';
import Axios from "axios"
import { useState } from "react"

import { useNavigate, useParams } from "react-router-dom";

function PopulateData() { 
    // declaring variables
    const wordLength = 8;
    const alphaNumericChar ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const noZero = '123456789';
    const alphabets = 'abcdefghijklmnopqrstuvwxyz';
    const numOfEntries = 10;

    const listOfDepartments = ["Design", "Events", "Finance", "HR", "IT", "Logistics", "Management", "Marketing", "Operations", "Outreach", "Social Media"];

    const listOfEC = [22100001, 22100002, 22100003, 22100004];

    function generateAlphabetString() {
        let result = '';
        const stringLen = alphabets.length;
        for ( let i = 0; i < wordLength; i++ ) {
            if(i === 0)
            {
                result += ALPHABETS.charAt(Math.floor(Math.random() * stringLen));
            }
            else
            {
                result += alphabets.charAt(Math.floor(Math.random() * stringLen));
            }
            
        }
        return result;
    }

    function generateAlphanumericString() {
    let result = '';
    const stringLen = alphaNumericChar.length;
    for ( let i = 0; i < wordLength; i++ ) {
        result += alphaNumericChar.charAt(Math.floor(Math.random() * stringLen));
    }
    return result;
    }

    function generateNumber() {
        let result = '';
        const stringLen = numbers.length;
        for ( let i = 0; i < wordLength; i++ ) {
            if(i === 0)
            {
                result += noZero.charAt(Math.floor(Math.random() * stringLen));
            }
            else{
                result += numbers.charAt(Math.floor(Math.random() * stringLen));
            }
           
        }
        return result;
    }

    function pickDepartment()
    {
        let result = '';
        let index = -1;
        index = Math.floor(Math.random() * (listOfDepartments.length ));
        return listOfDepartments[index];
    }

    function pickECMember()
    {
        //let result = '';
        let index = -1;
        index = Math.floor(Math.random() * (listOfEC.length ));
        return listOfEC[index];
    }
    // department table: add ourseleves, add director ourselves, add EC by ourselves -> done, add some funds, tasks and sponsors ourselves
    // tables: 
    // 1. members

    function generateMembersAndUsers()
    {
        for(let i = 0; i < numOfEntries; i++)
        {
            let rollNo = generateNumber();
            let email = rollNo + "@lums.edu.pk";
            let firstName = generateAlphabetString();
            let lastName = generateAlphabetString();
            let deptName = pickDepartment();
            let pos = "Member";
            let password = generateAlphanumericString();
            Axios.post("https://group11-db-project.herokuapp.com/insertMember", {
            rollNo: rollNo,
            firstName: firstName,
            lastName: lastName,
            deptName: deptName,
            pos: pos,
            }).then((response) => {

                // if(response.data === "Duplicate Error") // if dup entry, give error
                // {
                //     alert("Member already exists.")
                // }

           
            });
            Axios.post("https://group11-db-project.herokuapp.com/register",{
                rollNo: rollNo,
                email: email,
                password: password,
                }).then((response) => {
                    // if user does not exist in members table, sign up fails
                    // if(response.data === "Does not exist")
                    // {
                    //     alert("Failed! Sign up not authorized.");
                    //     // takes user back to welcome page
                    // }
                    // else if(response.data === "Duplicate Error")
                    // {
                    //     alert("This Roll No. already has an account.");
                    // }

                });
        }

        console.log("MEMBERS AND USERS ADDED!");
        
    }

    function generateSponsors()
    {
        for(let i = 0; i < numOfEntries; i++)
        {

            let sponsorName = generateAlphabetString();
            let amountSponsored = Math.floor(Math.random() * (100) + 1);
            let lastModifiedBy = pickECMember();
            Axios.post("https://group11-db-project.herokuapp.com/insertSponsor", {
            sponsorName: sponsorName,
            amountSponsored: amountSponsored,
            }).then(() => {
            
               // alert("New Sponsor added!");
            });

            // after sponsor is added, automatically add correspnding entry in funds table
            let transactionNature = "Credit" ;
            Axios.post("https://group11-db-project.herokuapp.com/insertFunds", {
            lastModifiedBy: lastModifiedBy,
            amount: amountSponsored,
            transactionNature:transactionNature,

            }).then(() => {

            });  
        }

        console.log("SPONSORS AND FUNDS ADDED")
        
    }

    
    function generateTasks()
    {
        for(let i = 0; i < numOfEntries; i++)
        {

            let taskName = generateAlphabetString();
            let fundsAllocated = Math.floor(Math.random() * (100));
            let lastModifiedBy = pickECMember();
            let assignedDept = pickDepartment();
            let status = "Pending";
            Axios.post("https://group11-db-project.herokuapp.com/insertTask", {
            taskName: taskName,
            fundsAllocated: fundsAllocated,
            assignedDept: assignedDept,
            status: status
            }).then(() => {
                //alert("New Task added!");
            });

            // when tasks tuple is added, funds is automatically updated to withdraw amount from society funds
            let transactionNature = "Debit" ;
            Axios.post("https://group11-db-project.herokuapp.com/insertFunds", {
            lastModifiedBy: lastModifiedBy,
            amount: fundsAllocated,
            transactionNature:transactionNature,
            }).then(() => {
                //alert("New Funds entry added!");
            });  
        }

        console.log("TASKS AND FUNDS ADDED")
        
    }

    generateMembersAndUsers();
    generateSponsors();
    generateTasks();

    // input fields and buttons

}

export default (PopulateData);
