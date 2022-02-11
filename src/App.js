import React, { useState, useContext, useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import AdminMain from "./components/admin/AdminMain"
// auth
import LoginPage from "./components/auth/LoginPage"
import RegistrationPage from "./components/auth/RegistrationPage"
import { useProvideAuth } from "../src/components/auth/auth.hook"
// Shop
import ShopMain from "./components/shop/ShopMain"
// error
import Error404 from "./components/common/Error404"
// context
import { AuthContext } from "../src/context/AuthContext"

function App() {
  const { login, logout, token, lastName, firstName } = useProvideAuth()
  const [loading, setLoading] = useState(true)
  const isAuthenticated = !!token

  useEffect(() => {
    const storageName = "userData"
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token) {
      login(data)
    }
    setLoading(false)
  }, [login])

  return (
    <div className="App">
      <div className="container">
        {!loading ? (
          <AuthContext.Provider
            value={{
              login,
              logout,
              token,
              lastName,
              firstName,
              isAuthenticated,
            }}
          >
            <Router>
              <Switch>
                <PrivateRoute path="/admin">
                  <AdminMain />
                </PrivateRoute>
                <Route path="/shop">
                  <ShopMain />
                </Route>
                <Route exact path="/auth/login">
                  <LoginPage />
                </Route>
                <Route exact path="/auth/register">
                  <RegistrationPage />
                </Route>
                <Route exact path="/">
                  <Redirect
                    to={{
                      pathname: "/shop",
                    }}
                  />
                </Route>
                <Route path="*">
                  <Error404 />
                </Route>
              </Switch>
            </Router>
          </AuthContext.Provider>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  )
}

function PrivateRoute({ children, ...rest }) {
  let { isAuthenticated } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default App
