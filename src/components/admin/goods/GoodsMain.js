import React from "react"

import { Switch, Route, useRouteMatch } from "react-router-dom"
import GoodsList from "./GoodsList"
import GoodsInputForm from "./GoodsInputForm"

export default function GoodsMain() {
  let { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        <GoodsList />
      </Route>
      <Route path={`${path}/add`}>
        <GoodsInputForm />
      </Route>
    </Switch>
  )
}
