import React, { useState } from "react"
import { Switch, Route, useRouteMatch } from "react-router-dom"
import ShopGoodsList from "./ShopGoodsList"
import Basket from "./Basket"
import Header from "../common/Header"

const ShopHome = () => {
  return (
    <div className="container">
      <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
        <div className="col-md-6 px-0">
          <h1 className="display-4 fst-italic">
            Заголовок последней новости магазина
          </h1>
          <p className="lead my-3">
            Multiple lines of text that form the lede, informing new readers
            quickly and efficiently about what’s most interesting in this post’s
            contents.
          </p>
          <p className="lead mb-0">
            <a href="/" className="text-white fw-bold">
              Перейти в новость...
            </a>
          </p>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary">
                Ноутбуки
              </strong>
              <h3 className="mb-0">Lenovo IdeaPad 3 15ITL6 (82H800PHRE)</h3>
              <div className="mb-1 text-muted">Nov 12</div>
              <p className="card-text mb-auto">
                С ноутбуком IdeaPad 3i Gen 6 (15) учиться или работать из дома
                будет еще приятнее...
              </p>
              <a href="/shop/notebooks" className="stretched-link">
                Перейти в раздел
              </a>
            </div>
            <div className="col-auto d-none d-lg-block">
              <svg
                className="bd-placeholder-img"
                width="200"
                height="250"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" />
              </svg>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <strong className="d-inline-block mb-2 text-primary">
                Телефоны
              </strong>
              <h3 className="mb-0">Apple iPhone 12 Mini 64GB / MGDX3</h3>
              <div className="mb-1 text-muted">Nov 11</div>
              <p className="mb-auto">
                Это iPhone 12 mini. A14 Bionic, самый быстрый процессор iPhone.
                Новая система двух камер...
              </p>
              <a href="/shop/phones" className="stretched-link">
                Перейти в раздел
              </a>
            </div>
            <div className="col-auto d-none d-lg-block">
              <svg
                className="bd-placeholder-img"
                width="200"
                height="250"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: Thumbnail"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#55595c" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ShopMain() {
  let { path } = useRouteMatch()
  const [basketCount, setBasketCount] = useState(
    localStorage.getItem("basket") !== null
      ? JSON.parse(localStorage.getItem("basket")).length
      : 0
  )

  const addBasketCount = () => {
    setBasketCount((basketCount) => ++basketCount)
  }

  const removeBasketCount = () => {
    setBasketCount((basketCount) => --basketCount)
  }
  return (
    <>
      <Header basketCount={basketCount} />
      <Switch>
        <Route exact path={path}>
          <ShopHome />
        </Route>
        <Route exact path={`${path}/basket`}>
          <Basket removeBasketCount={removeBasketCount} />
        </Route>
        <Route path={`${path}/:goodsCategory`}>
          <ShopGoodsList addBasketCount={addBasketCount} />
        </Route>
      </Switch>
    </>
  )
}
