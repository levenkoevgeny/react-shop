import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit"

const featuresAdapter = createEntityAdapter()
const initialState = featuresAdapter.getInitialState({
  loading: "idle",
  error: false,
})

export const fetchFeatures = createAsyncThunk(
  "features/fetchFeatures",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/features/`
    )
    const features = await response.json()
    return features
  }
)

export const saveNewFeature = createAsyncThunk(
  "features/saveNewFeature",
  async (featureName) => {
    const featureData = {
      feature_name: featureName,
      feature_values: [],
      category_set: [],
    }

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/features/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(featureData),
      }
    )
    const feature = await response.json()
    return feature
  }
)

export const saveNewFeatureWithValues = createAsyncThunk(
  "features/saveNewFeatureWithValues",
  async (featureObj) => {
    const featureData = {
      ...featureObj,
      category_set: [],
    }

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/features/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(featureData),
      }
    )
    const feature = await response.json()
    return feature
  }
)

export const deleteFeature = createAsyncThunk(
  "features/deleteFeature",
  async (featureId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/features/${featureId}/`,
      {
        method: "DELETE",
      }
    )
    if (response.status >= 200 && response.status < 300) {
      return featureId
    } else {
      throw Error("Delete error")
    }
  }
)

const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeatures.pending, (state, action) => {
        state.loading = "pending"
      })
      .addCase(fetchFeatures.fulfilled, (state, action) => {
        featuresAdapter.setAll(state, action.payload)
        state.loading = "fulfilled"
      })
      .addCase(fetchFeatures.rejected, (state, action) => {
        state.error = true
        state.loading = "rejected"
      })
      .addCase(saveNewFeature.fulfilled, featuresAdapter.addOne)
      .addCase(saveNewFeatureWithValues.fulfilled, featuresAdapter.addOne)
      .addCase(deleteFeature.fulfilled, featuresAdapter.removeOne)
  },
})

export const { selectAll: selectAllFeatures, selectById: selectFeatureById } =
  featuresAdapter.getSelectors((state) => state.features)

export const selectFilteredFeatures = createSelector(
  selectAllFeatures,
  (state) => state.featuresFilter,
  (features, filters) => {
    const { featureName } = filters
    return features.filter((feature) =>
      feature.feature_name.toLowerCase().includes(featureName.toLowerCase())
    )
  }
)

export default featuresSlice.reducer
