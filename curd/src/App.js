
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [year, setYear] = useState("");

  const [emplist, setEmplist] = useState([]);

  const [searchTrem, setTerm] = useState("");

  const notify = (msg) => {
    toast(msg,
      { position: toast.POSITION.BOTTOM_LEFT })
  }
  const addEmp = () => {
    const newemp = {
      name,
      age,
      country,
      position,
      year
    }

    axios.post("https://mysql-practice-employees.herokuapp.com/create", newemp).then((res) => {

      notify("Added Successfully");
      getEmps();
      setName("");
      setYear("");
      setAge("");
      setCountry("");
      setPosition("");
    }).catch((err) => {
      console.log(err);
    });
  }

  const getEmps = () => {
    axios.get("https://mysql-practice-employees.herokuapp.com/getemps").then((res) => {
      setEmplist(res.data);

    }).catch((err) => {
      console.log(err);
    })
  }
  const editEmp = (emp) => {
    const newemp = {};
    if (name === "") {
      newemp.name = emp.name;
    }
    else {
      newemp.name = name;
    }
    if (age === "") {
      newemp.age = emp.age;
    }
    else {
      newemp.age = age;
    }
    if (country === "") {
      newemp.country = emp.country;
    }
    else {
      newemp.country = country;
    }
    if (position === "") {
      newemp.position = emp.position;
    }
    else {
      newemp.position = position;
    }
    if (year === "") {
      newemp.year = emp.year;
    }
    else {
      newemp.year = year;
    }
    axios.put(`https://mysql-practice-employees.herokuapp.com/editemp/${emp.eid}`, newemp).then((res) => {
      notify("Updated Successfully");
    }).catch((err) => {
      console.log(err);
    });
  }
  const deleteEmp = (eid) => {
    axios.delete(`https://mysql-practice-employees.herokuapp.com/deleteemp/${eid}`).then((res) => {
      notify("Deleted Successfully");
      getEmps();
    }).catch((err) => {
      console.log(err);
    })
  }


  return (
    <div className="App">
      <h1 style={{ color: "teal", margin: "1rem 0" }}>Employee Management</h1>
      <div>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" placeholder="Name" onChange={e => setName(e.target.value)} />
          </div>
          <div class="col">
            <input type="text" class="form-control" placeholder="Age" onChange={e => setAge(e.target.value)} />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" placeholder="country" onChange={e => setCountry(e.target.value)} />
          </div>
          <div class="col">
            <input type="text" class="form-control" placeholder="Position" onChange={e => setPosition(e.target.value)} />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <input type="text" class="form-control" placeholder="Year" onChange={e => setYear(e.target.value)} />
          </div>
          <div class="col">
            <input class="btn btn-lg  btn-success" type="submit" value="Submit" onClick={() => addEmp()} />
          </div>
        </div>
      </div>
      <br />
      <hr style={{ border: "5px solid black" }} />
      <div class="input-group">
        <div class="form-outline" style={{ display: "flex", justifyContent: "center" }}>
          <h4 class="form-label" for="form1">Search</h4>
          <input type="search" id="form1" class="form-control" onChange={e => setTerm(e.target.value)}
            placeholder="Search employee"
            style={{ margin: "0 1.5rem" }} />
        </div>
      </div>
      <hr style={{ border: "1px solid black" }} />
      <div className="employees">

        <input class="btn btn-lg  btn-warning" type="submit" value="Show Employees" onClick={() => getEmps()} />
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col" >Name</th>
              <th scope="col">Age</th>
              <th scope="col">Country</th>
              <th scope="col">Position</th>
              <th scope="col">Year</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>

            </tr>
          </thead>
          <tbody>
            {emplist.filter((emp) => {
              if (searchTrem === "") {
                return emp;
              }
              else if (emp.name.toLowerCase().includes(searchTrem.toLowerCase())
                || emp.age.toString().toLowerCase().includes(searchTrem.toLowerCase())
                || emp.country.toLowerCase().includes(searchTrem.toLowerCase())
                || emp.position.toLowerCase().includes(searchTrem.toLowerCase())
                || emp.year.toString().toLowerCase().includes(searchTrem.toLowerCase())) {
                return emp;
              }
            }).map(emp => {
              return (
                <tr>
                  <th scope="row">{emp.eid}</th>
                  <td contentEditable='true' onInput={e => setName(e.target.textContent)}>{emp.name}</td>
                  <td contentEditable='true' onInput={e => setAge(e.target.textContent)}>{emp.age}</td>
                  <td contentEditable='true' onInput={e => setCountry(e.target.textContent)}>{emp.country}</td>
                  <td contentEditable='true' onInput={e => setPosition(e.target.textContent)}>{emp.position}</td>
                  <td contentEditable='true' onInput={e => setYear(e.target.textContent)}>{emp.year}</td>
                  <td><input class="btn btn-secondary" type="submit" value="Edit" onClick={() => editEmp(emp)} /></td>
                  <td ><input class="btn btn-light" type="submit" value="Delete" onClick={() => deleteEmp(emp.eid)} /></td>
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
