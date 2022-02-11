import React from "react"

import { Switch, Route, useRouteMatch } from "react-router-dom"
import FeatureList from "./FeatureList"
import FeaturesDetail from "./FefatureDetail"

export default function FeaturesMain() {
  let { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        <FeatureList />
      </Route>
      <Route path={`${path}/:id/detail`}>
        <FeaturesDetail />
      </Route>
    </Switch>
  )
}
