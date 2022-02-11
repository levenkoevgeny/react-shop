import React from "react"
import { useSelector } from "react-redux"
import { selectAllCategories } from "../../features/categoriesSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"

export default function Header({ basketCount }) {
  const element = <FontAwesomeIcon icon={faShoppingCart} />
  const categories = useSelector(selectAllCategories)

  return (
    <div>
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 pt-1">
            <a className="link-secondary" href="/">
              Подписаться
            </a>
          </div>
          <div className="col-4 text-center">
            <a
              className="blog-header-logo text-dark"
              href="/"
              style={{ fontSize: "2.0rem", textDecoration: "none" }}
            >
              <b>Internet Shop</b>
            </a>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center">
            <a className="link-secondary" href="/" aria-label="Search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mx-3"
                role="img"
                viewBox="0 0 24 24"
              >
                <title>Search</title>
                <circle cx="10.5" cy="10.5" r="7.5" />
                <path d="M21 21l-5.2-5.2" />
              </svg>
            </a>
            <a
              className="btn btn-sm btn-outline-secondary me-3"
              href="/"
              style={{ width: "70px" }}
            >
              Sign up
            </a>
            <a
              className="btn btn-sm btn-outline-secondary"
              href="/shop/basket"
              style={{ width: "70px" }}
            >
              {element}{" "}
              <span className="badge bg-secondary">{basketCount}</span>
            </a>
          </div>
        </div>
      </header>

      <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          {categories.map((category) => (
            <a
              key={category.id}
              className="p-2 link-secondary"
              href={`/shop/${category.category_alias}`}
            >
              {category.category_name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
