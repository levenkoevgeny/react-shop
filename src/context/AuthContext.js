import { createContext } from "react"

function noop() {}

export const AuthContext = createContext({
  token: null,
  firstName: null,
  lastName: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
})
