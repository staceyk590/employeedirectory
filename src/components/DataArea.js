import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
import "../styles/DataArea.css";
import UserContext from "../utils/UserContext"

export default function DataArea() {

  const [state, setState] = useState({
    users: [{}],
    order: "descend",
    filteredUsers: [{}],
    headings: [
      { name: "Image", width: "10%" },
      { name: "Name", width: "10%" },
      { name: "Phone", width: "20%" },
      { name: "Email", width: "20%" },
      { name: "DOB", width: "10%" }
    ],
  })

  useEffect(() => {
    API.getUsers().then(results => {
      setState({
        users: results.data.results,
        order: state.order,
        filteredUsers: results.data.results,
        headings: state.headings
      })
    })
  }, [])



  const handleSort = heading => {

    if (state.order === "descend") {
      setState({
        order: "ascend",
        users: state.users,
        filteredUsers: state.filteredUsers,
        headings: state.headings
      })
    } else {
      setState({
        order: "descend",
        users: state.users,
        filteredUsers: state.filteredUsers,
        headings: state.headings
      })
    }

    const compareFnc = (a, b) => {
      console.log("compareFnc")
      if (state.order === "ascend") {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return a[heading].first.localeCompare(b[heading].first);
        } else {
          return a[heading] - b[heading]; 
        }
      } else {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return b[heading].first.localeCompare(a[heading].first);
        } else {
          return b[heading] - a[heading];
        }
      }

    }
    const sortedUsers = state.filteredUsers.sort(compareFnc);
    setState({
      filteredUsers: sortedUsers,
      order: state.order,
      users: state.users,
      headings: state.headings
    });
  }

  const handleSearchChange = event => {
    console.log(event.target.value);
    const filter = event.target.value;
    const filteredList = state.users.filter(item => {
      // merge data together, then see if user input is anywhere inside
      let values = Object.values(item)
        .join("")
        .toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    
    setState({
      filteredUsers: filteredList,// Set the filtered Users
      // Ensure that the state remains the same for other variables:
      headings: state.headings,
      users: state.users,
      order: state.order
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    let dobStart = document.getElementById("dobStart").value.split('-').join("");
    let dobEnd = document.getElementById("dobEnd").value.split('-').join("");;
    
    if(dobStart && dobEnd) { // Make sure the user has given input for date of birth range
      const filteredList = state.users.filter(item => {
        let dob = item.dob.date.split("T")
        dob = dob[0].split("-").join("")
        
        return dob > dobStart && dob < dobEnd;
      })

      setState({
        filteredUsers: filteredList,// Set the filtered Users
        // Ensure that the state remains the same for other variables:
        headings: state.headings,
        users: state.users,
        order: state.order
      });
    }
  }




  return (
    <UserContext.Provider value={state}>
      <Nav handleSearchChange={handleSearchChange} handleSubmit={handleSubmit}/>
      <div className="data-area">
        <DataTable
          handleSort={handleSort}
        />
      </div>
    </UserContext.Provider>
  )
}