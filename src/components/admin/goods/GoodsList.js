import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectFilteredGoods } from "../../../features/goodsSlice"
import { selectAllCategories } from "../../../features/categoriesSlice"
import {
  goodsCategoriesChanged,
  goodsNameChanged,
} from "../../../features/filters/goodsFilterSlice"
import { useHistory } from "react-router-dom"

const GoodsItem = ({ goodsItem }) => {
  return (
    <div>
      <p>{goodsItem.item_title}</p>
    </div>
  )
}

const CategorySelect = ({ categories, onChange, value }) => {
  const Option = ({ category }) => {
    return <option value={category.id}>{category.category_name}</option>
  }
  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      <option value="">-----</option>
      {categories.map((category) => (
        <Option key={category.id} category={category} />
      ))}
    </select>
  )
}

export default function GoodsList() {
  let { id } = useParams()
  const [categorySelectInput, setCategorySelectInput] = useState("")
  const [goodsNameInput, setGoodsNameInput] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(goodsCategoriesChanged(id))
    }
  }, [id, dispatch])

  const categories = useSelector(selectAllCategories)
  const goods = useSelector(selectFilteredGoods)
  const history = useHistory()

  const categorySelectHandler = (selectedId) => {
    setCategorySelectInput(selectedId)
    dispatch(goodsCategoriesChanged(selectedId))
  }

  const goodsNameHandler = (name) => {
    setGoodsNameInput(name)
    dispatch(goodsNameChanged(name))
  }

  return (
    <div className="my-3">
      <h5>Goods list</h5>

      <div className="row my-3">
        <h6>Goods filter</h6>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Category</label>
            <CategorySelect
              categories={categories}
              onChange={categorySelectHandler}
              value={categorySelectInput}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Goods name</label>
            <input
              type="text"
              className="form-control"
              value={goodsNameInput}
              onChange={(e) => goodsNameHandler(e.target.value)}
            />
          </div>
        </div>
      </div>
      {goods.length > 0 ? (
        <>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-outline-secondary my-3"
              onClick={() => history.push("/admin/goods/add")}
            >
              Add new goods
            </button>
          </div>
          {goods.map((item) => (
            <GoodsItem key={item.id} goodsItem={item} />
          ))}
        </>
      ) : (
        <p>List is empty!</p>
      )}
    </div>
  )
}
