import React, { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function HeaderAdmin() {
  let { logout, lastName, firstName } = useContext(AuthContext)
  return (
    <div>
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 pt-1"></div>
          <div className="col-4 text-center">
            <h5>
              Вы вошли в систему как - {lastName} {firstName}
            </h5>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center"></div>
        </div>
      </header>

      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-start">
          <a className="p-2 link-secondary" href="/admin/categories">
            Categories
          </a>
          <a className="p-2 link-secondary" href="/admin/features">
            Features
          </a>
          <a className="p-2 link-secondary" href="/admin/goods">
            Goods
          </a>
          <button
            className="p-2 link-secondary btn btn-link"
            href="/admin/goods"
            onClick={() => logout()}
          >
            Logout
          </button>
          <a className="p-2 link-secondary" href="/">
            Shop
          </a>
        </nav>
      </div>
    </div>
  )
}
