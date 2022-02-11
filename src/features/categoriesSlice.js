import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit"

const categoriesAdapter = createEntityAdapter()
const initialState = categoriesAdapter.getInitialState({
  loading: "idle",
  error: false,
})

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/categories/`
    )
    const categories = await response.json()
    return categories
  }
)

export const saveNewCategory = createAsyncThunk(
  "categories/saveNewCategory",
  async (categoryObj) => {
    categoryObj = { ...categoryObj, goods: [] }
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/categories/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(categoryObj),
      }
    )
    if (response.status >= 200 && response.status < 300) {
      const category = await response.json()
      return category
    } else {
      throw Error("Response error")
    }
  }
)

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/categories/${categoryId}/`,
      {
        method: "DELETE",
      }
    )
    if (response.status >= 200 && response.status < 300) {
      return categoryId
    } else {
      throw Error("Delete error")
    }
  }
)

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.loading = "pending"
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        categoriesAdapter.setAll(state, action.payload)
        state.loading = "fulfilled"
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = true
        state.loading = "idle"
      })
      .addCase(saveNewCategory.fulfilled, categoriesAdapter.addOne)
      .addCase(deleteCategory.fulfilled, categoriesAdapter.removeOne)
  },
})

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
} = categoriesAdapter.getSelectors((state) => state.categories)

export const selectFilteredCategories = createSelector(
  selectAllCategories,
  (state) => state.categoriesFilter,
  (categories, filters) => {
    const { categoryName } = filters
    return categories.filter((category) =>
      category.category_name.toLowerCase().includes(categoryName.toLowerCase())
    )
  }
)

export default categoriesSlice.reducer
