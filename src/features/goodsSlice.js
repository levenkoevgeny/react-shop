import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit"

const goodsAdapter = createEntityAdapter()
const initialState = goodsAdapter.getInitialState({
  loading: "idle",
  error: false,
})

export const fetchGoods = createAsyncThunk("goods/fetchGoods", async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/goods-items/`
  )
  const goods = await response.json()
  return goods
})

export const saveNewGoods = createAsyncThunk(
  "goods/saveNewGoods",
  async (goodsFormData) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/goods-items/`,
      {
        method: "POST",
        body: goodsFormData,
      }
    )
    // console.log("response", response.body)
    if (response.status >= 200 && response.status < 300) {
      const goods = await response.json()
      return goods
    } else {
      throw Error("Response error")
    }
  }
)

export const deleteGoods = createAsyncThunk(
  "goods/deleteGoods",
  async (goodsId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/goods-items/${goodsId}/`,
      {
        method: "DELETE",
      }
    )
    if (response.status >= 200 && response.status < 300) {
      return goodsId
    } else {
      throw Error("Delete error")
    }
  }
)

const goodsSlice = createSlice({
  name: "goods",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state, action) => {
        state.loading = "pending"
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        goodsAdapter.setAll(state, action.payload)
        state.loading = "fulfilled"
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.error = true
        state.loading = "idle"
      })
      .addCase(saveNewGoods.fulfilled, goodsAdapter.addOne)
      .addCase(deleteGoods.fulfilled, goodsAdapter.removeOne)
  },
})

export const { selectAll: selectAllGoods, selectById: selectGoodsById } =
  goodsAdapter.getSelectors((state) => state.goods)

export const selectGoodsByCategoryId = createSelector(
  [selectAllGoods, (state, categoryId) => categoryId],
  (goods, categoryId) => {
    return goods.filter((item) => {
      return item.goods_type === parseInt(categoryId)
    })
  }
)

export const selectFilteredGoods = createSelector(
  selectAllGoods,
  (state) => state.goodsFilter,
  (goods, filters) => {
    let filteredResult = goods
    const { categories, goodsName } = filters

    if (categories.length > 0 && !isNaN(categories[0])) {
      filteredResult = filteredResult.filter((item) =>
        categories.includes(item.goods_type)
      )
    }
    filteredResult = filteredResult.filter((item) =>
      item.item_title.toLowerCase().includes(goodsName.toLowerCase())
    )
    return filteredResult
  }
)

export default goodsSlice.reducer
