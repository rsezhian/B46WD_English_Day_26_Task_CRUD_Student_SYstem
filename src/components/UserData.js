import React from "react";
import { useRef, useState } from "react";

function UserData(props) {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [gender, setGender] = useState("");
  let [age, setAge] = useState("");
  let [id, setId] = useState("");

  let handledelete = async (id) => {
    let response = await fetch(
      `https://backend-student-api.onrender.com/deletestudent/${id}`,
      {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
        },
      }
    );
    await response.json();
    props.setStudents(
      props.students.filter((student) => {
        return student._id !== id;
      })
    );
  };

  const ref = useRef(null);
  const refclose = useRef(null);
  let handleedit = (id, name, email, gender, age) => {
    ref.current.click();
    setName(name);
    setEmail(email);
    setGender(gender);
    setAge(age);
    setId(id);
  };

  let handleupdate = async () => {
    refclose.current.click();
    let response = await fetch(
      `https://backend-student-api.onrender.com/updatestudent/${id}`,
      {
        method: "PUT",
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
    await response.json();
    props.setStudents(
      props.students.map((s) => {
        if (s._id === id) {
          s.name = name;
          s.email = email;
          s.gender = gender;
          s.age = age;
        }
        return s;
      })
    );
  };

  //
  // below building the TABLE Structure
  return (
    <div className="overflow-x-scroll">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col1">Name</th>
            <th scope="col2">EMail</th>
            <th scope="col3">Gender</th>
            <th scope="col4">Age</th>
            <th scope="col5">Edit</th>
            <th scope="col6">Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.students.map((student) => {
            return (
              <tr>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.gender}</td>
                <td>{student.age}</td>
                <td
                  onClick={() =>
                    handleedit(
                      student._id,
                      student.name,
                      student.email,
                      student.gender,
                      student.age
                    )
                  }
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Edit
                </td>
                <td
                  onClick={() => handledelete(student._id)}
                  style={{ cursor: "pointer", color: "red" }}
                >
                  Delete
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        hidden={true}
        ref={ref}
      ></button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Modal Title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                ref={refclose}
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
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
                  EMail
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  id="gender"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  id="age"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={handleupdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserData;
