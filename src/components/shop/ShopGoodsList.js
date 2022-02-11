import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const GoodsCard = ({ goods, addToBasketHandle, basketItems }) => {
  const [inBasket, setIsBasket] = useState(basketItems.includes(goods.id))

  return (
    <div className="my-2">
      <div className="row mb-2">
        <div className="col-md-12">
          <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">
              <h3 className="mb-0 ms-3 link-secondary">{goods.item_title}</h3>
              <div className="mb-1 text-muted ms-3">Nov 12</div>
              <h5 className="my-4 ms-3 card-text mb-auto">Характеристики:</h5>
              <div>
                <ul className="list-group list-group-flush mb-3">
                  {goods.features.map((feature) => (
                    <li className="list-group-item" key={feature.id}>
                      {feature.feature.feature_name} - {feature.feature_value}
                    </li>
                  ))}
                </ul>
                <b className="ms-3">Цена - {goods.price}</b>
              </div>

              <button
                type="button"
                className="btn btn-danger mt-3 ms-3"
                onClick={() => {
                  addToBasketHandle(goods.id)
                  setIsBasket(!inBasket)
                }}
                disabled={inBasket}
              >
                {inBasket ? <>В корзине</> : <>В корзину</>}
              </button>
            </div>
            <div className="col-auto d-none d-lg-block">
              <img
                src={goods.photo}
                className="card-img-top m-1"
                alt="..."
                style={{ width: "250px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ShopGoodsList({ addBasketCount }) {
  let { goodsCategory } = useParams()
  const [goods, setGoods] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterLoading, setIsFilterLoading] = useState(false)
  const [category, setCategory] = useState(goodsCategory || "")
  const [priceStart, setPriceStart] = useState(0)
  const [priceEnd, setPriceEnd] = useState(300000)
  const [goodsTitle, setGoodsTitle] = useState("")
  const [selectedFeatures, setSelectedFeatures] = useState({})
  const [isError404, setIsError404] = useState(false)

  const [categoryObj, setCategoryObj] = useState({ category_features: [] })

  let basketItems = []
  if (localStorage.getItem("basket") !== null) {
    basketItems = JSON.parse(localStorage.getItem("basket"))
  }

  const addToBasket = (id) => {
    let basketItems = JSON.parse(localStorage.getItem("basket"))
    if (basketItems) {
      basketItems.push(id)
    } else basketItems = [id]
    localStorage.setItem("basket", JSON.stringify(basketItems))
    addBasketCount()
  }

  useEffect(() => {
    setIsLoading(true)
    setIsFilterLoading(false)

    let featuresQuery = ""
    for (let key in selectedFeatures) {
      let features = ""
      let feature_array = selectedFeatures[key]
      if (feature_array.length > 0) {
        let values = ""
        feature_array.forEach((item) => {
          values = values + `${item},`
        })
        features = `&filter${key}=` + values
      }
      featuresQuery = featuresQuery + features
    }

    fetch(
      `http://localhost:8000/api/goods-items-full/?goods_type__category_alias=${category}&price__gte=${priceStart}&price__lte=${priceEnd}&item_title__icontains=${goodsTitle}${featuresQuery}`
    )
      .then((response) => response.json())
      .then((goods) => setGoods(goods))
      .catch((error) => alert(error.message))
      .finally(() => setIsLoading(false))

    fetch(
      `http://localhost:8000/api/categories-full/?category_alias=${goodsCategory}`
    )
      .then((response) => response.json())
      .then((categoryObjArr) => setCategoryObj(categoryObjArr[0]))
      .catch((error) => alert(error.message))
  }, [
    priceStart,
    priceEnd,
    goodsTitle,
    goodsCategory,
    selectedFeatures,
    category,
  ])

  const handleCheckbox = (value, feature, changeType) => {
    switch (changeType) {
      case "added": {
        let features_array = selectedFeatures[feature]
        if (!features_array) {
          setSelectedFeatures({
            ...selectedFeatures,
            [feature]: [parseInt(value)],
          })
        } else {
          setSelectedFeatures({
            ...selectedFeatures,
            [feature]: [...features_array, parseInt(value)],
          })
        }
        break
      }
      case "removed": {
        let features_array = selectedFeatures[feature]
        setSelectedFeatures({
          ...selectedFeatures,
          [feature]: features_array.filter((item) => item !== parseInt(value)),
        })
        break
      }

      default:
        return
    }
  }

  return (
    <div className="row">
      <p className="fst-italic fw-bold my-3">
        {goods.length > 0 ? <>Найдено товаров - {goods.length}</> : <></>}
      </p>
      <div className="col-md-9">
        {isLoading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            {goods.length > 0 ? (
              <>
                {goods.map((item) => (
                  <GoodsCard
                    key={item.id}
                    goods={item}
                    addToBasketHandle={addToBasket}
                    basketItems={basketItems}
                  />
                ))}
              </>
            ) : (
              <p>Список пуст!</p>
            )}
          </div>
        )}
      </div>
      <div className="col-md-3">
        {isFilterLoading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <div className="mb-3">
              <label className="form-label">
                <b>Название товара</b>
              </label>
              <input
                className="form-control"
                type="text"
                value={goodsTitle}
                onChange={(e) => setGoodsTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <b>Цена от</b>
              </label>
              <input
                className="form-control"
                type="number"
                value={priceStart}
                onChange={(e) => setPriceStart(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <b>Цена по</b>
              </label>
              <input
                className="form-control"
                type="number"
                value={priceEnd}
                onChange={(e) => setPriceEnd(e.target.value)}
              />
            </div>
            <div className="mb-3">
              {categoryObj.category_features.map((feature) => {
                return (
                  <div key={feature.id}>
                    <p className="mt-3 mb-1" key={feature.id}>
                      <b>{feature.feature_name}</b>
                    </p>
                    {feature.feature_values.map((value) => {
                      let values = selectedFeatures[value.feature]
                      let checked
                      if (values) {
                        checked = selectedFeatures[value.feature].includes(
                          value.id
                        )
                      } else checked = false

                      const handleChange = (id, feature) => {
                        const changeType = checked ? "removed" : "added"
                        handleCheckbox(id, feature, changeType)
                      }
                      return (
                        <div className="form-check" key={value.id}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={value.id}
                            checked={checked}
                            onChange={(e) =>
                              handleChange(e.target.value, value.feature)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            {value.feature_value}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
