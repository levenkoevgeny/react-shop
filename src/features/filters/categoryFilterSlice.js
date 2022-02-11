import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  categoryName: "",
}

const categoryFilterSlice = createSlice({
  name: "categoryFilter",
  initialState,
  reducers: {
    categoryNameChanged(state, action) {
      state.categoryName = action.payload
    },
  },
})

export const { categoryNameChanged } = categoryFilterSlice.actions
export default categoryFilterSlice.reducer
