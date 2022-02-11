import React, { useState } from "react"
import { useDispatch, useSelector, useStore } from "react-redux"
import { selectAllCategories } from "../../../features/categoriesSlice"
import { selectFeatureById } from "../../../features/featuresSlice"
import { selectValuesByFeatureId } from "../../../features/valuesSlice"
import { saveNewGoods } from "../../../features/goodsSlice"
import { useHistory } from "react-router-dom"

const Feature = ({ featureId, handleValues }) => {
  const feature = useSelector((state) => selectFeatureById(state, featureId))
  const values = useSelector((state) =>
    selectValuesByFeatureId(state, featureId)
  )

  if (feature) {
    return (
      <div className="mb-3">
        {feature.feature_name}
        <select
          className="form-select"
          name={feature.id}
          onChange={(e) => handleValues(e.target.name, e.target.value)}
          required
        >
          <option value="">Select value</option>
          {values.map((value) => (
            <option key={value.id} value={value.id}>
              {value.feature_value}
            </option>
          ))}
        </select>
      </div>
    )
  }
  return null
}

export default function GoodsInputForm() {
  const [goodsDataObj, setGoodsDataObj] = useState({ price: 0 })

  const [valuesState, setValuesState] = useState({})

  const [features, setFeatures] = useState([])

  const store = useStore()
  const dispatch = useDispatch()
  let history = useHistory()
  const categories = useSelector(selectAllCategories)

  const handleChangeCategory = (id) => {
    const category = store.getState().categories.entities[id]
    setFeatures(category.category_features)
  }

  const handleValues = (name, value) => {
    setValuesState({ ...valuesState, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    for (let key in goodsDataObj) {
      formData.append(key, goodsDataObj[key])
    }

    let photoInput = document.querySelector('input[type="file"]')
    formData.append("photo", photoInput.files[0])

    let valuesArray = []
    for (let key in valuesState) {
      if (valuesState[key] !== "") {
        valuesArray.push(valuesState[key])
      }
    }

    valuesArray.forEach((item) => formData.append("features", item))

    try {
      await dispatch(saveNewGoods(formData)).unwrap()
    } catch (error) {
      alert(error.message)
    } finally {
      history.push("/admin/goods")
    }
  }

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="goods_type"
            required
            value={goodsDataObj.goods_type}
            onChange={(e) => {
              handleChangeCategory(e.target.value)
              setGoodsDataObj({
                ...goodsDataObj,
                [e.target.name]: e.target.value,
              })
            }}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Goods title</label>
          <input
            type="text"
            className="form-control"
            name="item_title"
            value={goodsDataObj.title}
            onChange={(e) => {
              setGoodsDataObj({
                ...goodsDataObj,
                [e.target.name]: e.target.value,
              })
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            rows={7}
            className="form-control"
            name="description"
            value={goodsDataObj.description}
            onChange={(e) => {
              setGoodsDataObj({
                ...goodsDataObj,
                [e.target.name]: e.target.value,
              })
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={goodsDataObj.price}
            name="price"
            onChange={(e) => {
              setGoodsDataObj({
                ...goodsDataObj,
                [e.target.name]: e.target.value,
              })
            }}
          />
        </div>
        <div className="mb-3">
          <h6>Features</h6>
          {features.map((feature) => (
            <Feature
              key={feature}
              featureId={feature}
              handleValues={handleValues}
            />
          ))}
        </div>

        <div className="mb-3">
          <input type="file" required />
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  )
}
