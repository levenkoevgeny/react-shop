import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  categories: [],
  goodsName: "",
}

const goodsFilterSlice = createSlice({
  name: "goodsFilter",
  initialState,
  reducers: {
    goodsNameChanged(state, action) {
      state.goodsName = action.payload
    },
    goodsCategoriesChanged(state, action) {
      state.categories = [parseInt(action.payload)]
    },
  },
})

export const { goodsNameChanged, goodsCategoriesChanged } =
  goodsFilterSlice.actions
export default goodsFilterSlice.reducer
