import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  valueName: "",
  valueFeature: null,
}

const valueFilterSlice = createSlice({
  name: "valueFilter",
  initialState,
  reducers: {
    valueNameChanged(state, action) {
      state.valueName = action.payload
    },
    valueFeatureChanged(state, action) {
      state.valueFeature = parseInt(action.payload)
    },
  },
})

export const { valueNameChanged, valueFeatureChanged } =
  valueFilterSlice.actions
export default valueFilterSlice.reducer
