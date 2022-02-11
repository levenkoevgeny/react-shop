import { useState, useCallback, useEffect } from "react"

const storageName = "userData"

export const useProvideAuth = () => {
  const [token, setToken] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)

  const login = useCallback((data) => {
    let { token, first_name, last_name } = data
    setToken(token)
    setFirstName(first_name)
    setLastName(last_name)

    localStorage.setItem(
      storageName,
      JSON.stringify({
        token: token,
        first_name,
        last_name,
      })
    )
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setFirstName(null)
    setLastName(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token) {
      login(data)
    }
  }, [login])

  return { login, logout, token, lastName, firstName }
}
