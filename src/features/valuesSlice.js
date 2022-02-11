import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit"

const valuesAdapter = createEntityAdapter()
const initialState = valuesAdapter.getInitialState({
  loading: "idle",
  error: false,
})

export const fetchValues = createAsyncThunk("values/fetchValues", async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/feature-values/`
  )
  const values = await response.json()
  return values
})

export const saveNewValue = createAsyncThunk(
  "values/saveNewValue",
  async (valueName) => {
    const valueData = {
      feature_value: valueName,
    }

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/feature-values/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(valueData),
      }
    )
    if (response.status >= 200 && response.status < 300) {
      const value = await response.json()
      return value
    } else {
      throw Error("Saving error")
    }
  }
)

export const saveNewValueWithFeature = createAsyncThunk(
  "values/saveNewValue",
  async (valueObj) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/feature-values/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(valueObj),
      }
    )

    if (response.status >= 200 && response.status < 300) {
      const value = await response.json()
      return value
    } else {
      throw Error("Saving error")
    }
  }
)

export const deleteValue = createAsyncThunk(
  "values/deleteValue",
  async (valueId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/feature-values/${valueId}/`,
      {
        method: "DELETE",
      }
    )
    if (response.status >= 200 && response.status < 300) {
      return valueId
    } else {
      throw Error("Deleting error")
    }
  }
)

const valuesSlice = createSlice({
  name: "values",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchValues.pending, (state, action) => {
        state.loading = "pending"
      })
      .addCase(fetchValues.fulfilled, (state, action) => {
        valuesAdapter.setAll(state, action.payload)
        state.loading = "fulfilled"
      })
      .addCase(fetchValues.rejected, (state, action) => {
        state.error = true
        state.loading = "rejected"
      })
      .addCase(saveNewValue.fulfilled, valuesAdapter.addOne)
      .addCase(deleteValue.fulfilled, valuesAdapter.removeOne)
  },
})

export const { selectAll: selectAllValues, selectById: selectValueById } =
  valuesAdapter.getSelectors((state) => state.values)

export const selectFilteredValues = createSelector(
  selectAllValues,
  (state) => state.valuesFilter,
  (values, filters) => {
    let filteredResult = values
    const { valueName, valueFeature } = filters

    if (valueFeature) {
      filteredResult = filteredResult.filter(
        (item) => item.feature === valueFeature
      )
    }

    filteredResult = filteredResult.filter((value) =>
      value.feature_value.toLowerCase().includes(valueName.toLowerCase())
    )
    return filteredResult
  }
)

export const selectValuesByFeatureId = createSelector(
  [selectAllValues, (state, featureId) => featureId],
  (values, featureId) => {
    return values.filter((value) => {
      return value.feature === parseInt(featureId)
    })
  }
)

export default valuesSlice.reducer
