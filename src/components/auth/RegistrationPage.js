import React, { useState } from "react"

export default function RegistrationPage() {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    email: "",
    last_name: "",
    first_name: "",
  })

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(registerData)
  }

  return (
    <div style={{ width: "600px" }} className="my-3">
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label className="form-label">Login</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={registerData.username}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last name</label>
          <input
            type="text"
            className="form-control"
            name="last_name"
            value={registerData.last_name}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-3">
          <label className="form-label">First name</label>
          <input
            type="text"
            className="form-control"
            name="first_name"
            value={registerData.first_name}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Email
          </label>
          <input
            type="password"
            className="form-control"
            name="email"
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={registerData.password}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Repeat password
          </label>
          <input type="password" className="form-control" name="password" />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  )
}
