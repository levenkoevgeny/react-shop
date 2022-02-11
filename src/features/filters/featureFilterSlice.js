import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  featureName: "",
}

const featureFilterSlice = createSlice({
  name: "featureFilter",
  initialState,
  reducers: {
    featureNameChanged(state, action) {
      state.featureName = action.payload
    },
  },
})

export const { featureNameChanged } = featureFilterSlice.actions
export default featureFilterSlice.reducer
