import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { fetchCategories } from "./features/categoriesSlice"
import { fetchFeatures } from "./features/featuresSlice"
import { fetchValues } from "./features/valuesSlice"
import { fetchGoods } from "./features/goodsSlice"

import store from "./app/store"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

store.dispatch(fetchCategories())
store.dispatch(fetchFeatures())
store.dispatch(fetchValues())
store.dispatch(fetchGoods())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

reportWebVitals()
