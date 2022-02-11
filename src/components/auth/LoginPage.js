import React, { useState, useContext } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function LoginPage() {
  let history = useHistory()
  let location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } }
  let { login } = useContext(AuthContext)

  const [authData, setAuthData] = useState({
    username: "",
    password: "",
  })

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:8000/api-token-auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ ...authData }),
      })
      if (response.status === 200) {
        let data_json = await response.json()
        login(data_json)
        history.replace(from)
      } else {
        setAuthData({
          username: "",
          password: "",
        })
        throw Error("Ошибка авторизации")
      }
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div style={{ width: "600px" }} className="my-3">
      <form onSubmit={submitHandler} method="POST">
        <div className="mb-3">
          <label className="form-label">Login</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={authData.username}
            onChange={(e) =>
              setAuthData({ ...authData, [e.target.name]: e.target.value })
            }
            required
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
            value={authData.password}
            onChange={(e) =>
              setAuthData({ ...authData, [e.target.name]: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Log in
        </button>
      </form>
    </div>
  )
}
