import React, { useState } from "react";
import UserData from "./UserData";

function Formpage(props) {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [gender, setGender] = useState("");
  let [age, setAge] = useState("");

  let handleadd = (e) => {
    e.preventDefault();
    addstudent(name, email, gender, age);
    setName("");
    setEmail("");
    setGender("");
    setAge("");
  };

  let addstudent = async (name, email, gender, age) => {
    if (name === "" || email === "" || gender === "" || age === "") {
      alert("empty fields are not allowed, kindly check !!!");
    }

    let response = await fetch(
      "https://backend-student-api.onrender.com/addstudent",
      {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          gender: gender,
          age: age,
        }),
      }
    );
    let newstudent = await response.json();
    props.setStudents([...props.students, newstudent]);
  };

  return (
    <>
      <div className="container mt-3">
        <h2 className="container mt-3 text-center">Student Form</h2>
        <form onSubmit={handleadd}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              EMail:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender:
            </label>
            <input
              type="text"
              className="form-control"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              type="text"
              className="form-control"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            ADD
          </button>
        </form>
        <h2 className="text-center">Student Data</h2>
        <UserData students={props.students} setStudents={props.setStudents} />
      </div>
    </>
  );
}

export default Formpage;
