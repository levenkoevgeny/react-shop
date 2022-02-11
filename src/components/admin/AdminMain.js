import React from "react"
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom"

import CategoryMain from "./category/CategoryMain"
import FeaturesMain from "./feature/FeaturesMain"
import GoodsMain from "./goods/GoodsMain"
import HeaderAdmin from "../common/HeaderAdmin"

export default function AdminMain() {
  let { path } = useRouteMatch()

  return (
    <>
      <HeaderAdmin />
      <Switch>
        <Route exact path={path}>
          <Redirect
            to={{
              pathname: `${path}/categories`,
            }}
          />
        </Route>
        <Route path={`${path}/categories`}>
          <CategoryMain />
        </Route>
        <Route path={`${path}/features`}>
          <FeaturesMain />
        </Route>
        <Route path={`${path}/goods`}>
          <GoodsMain />
        </Route>
      </Switch>
    </>
  )
}
