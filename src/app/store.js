import { configureStore } from "@reduxjs/toolkit"

import categoriesReducer from "../features/categoriesSlice"
import categoryFilterReducer from "../features/filters/categoryFilterSlice"
import featuresReducer from "../features/featuresSlice"
import featureFilterReducer from "../features/filters/featureFilterSlice"
import valuesReducer from "../features/valuesSlice"
import valuesFilterReducer from "../features/filters/valueFilterSlice"
import goodsReducer from "../features/goodsSlice"
import goodsFilterReducer from "../features/filters/goodsFilterSlice"

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    categoriesFilter: categoryFilterReducer,
    features: featuresReducer,
    featuresFilter: featureFilterReducer,
    values: valuesReducer,
    valuesFilter: valuesFilterReducer,
    goods: goodsReducer,
    goodsFilter: goodsFilterReducer,
  },
})

export default store
