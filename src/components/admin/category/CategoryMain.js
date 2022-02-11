import React from "react"

import { Switch, Route, useRouteMatch } from "react-router-dom"
import CategoryList from "./CategoryList"
import GoodsList from "../goods/GoodsList"

export default function CategoryMain() {
  let { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        <CategoryList />
      </Route>
      <Route path={`${path}/:id/goods`}>
        <GoodsList />
      </Route>
    </Switch>
  )
}
