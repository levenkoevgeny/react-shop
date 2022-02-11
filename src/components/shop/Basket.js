import React, { useState, useEffect } from "react"

export default function Basket({ removeBasketCount }) {
  const [basketGoods, setBasketGoods] = useState([])

  useEffect(() => {
    let basketItems = []
    let goodsArray = []
    if (localStorage.getItem("basket") !== null) {
      basketItems = JSON.parse(localStorage.getItem("basket"))
      let urls = []
      basketItems.forEach((item) => {
        urls.push(`http://localhost:8000/api/goods-items-full/${item}/`)
      })

      let requests = urls.map((url) => fetch(url))

      Promise.all(requests)
        .then((responses) => responses)
        .then((responses) => Promise.all(responses.map((r) => r.json())))
        .then((goods) => {
          goods.forEach((item) => goodsArray.push(item))
        })
        .then(() => setBasketGoods(goodsArray))

      // setBasketGoods(basketItems)
    }
  }, [])

  const removeItemFromBasket = (id) => {
    let basketItems = JSON.parse(localStorage.getItem("basket"))
    localStorage.setItem(
      "basket",
      JSON.stringify(basketItems.filter((item) => item !== id))
    )
    setBasketGoods(basketGoods.filter((item) => item.id !== id))
    removeBasketCount()
  }

  const totalSum = () => {
    let sum = 0
    basketGoods.forEach((item) => (sum += item.price))
    return sum
  }

  return (
    <>
      <div className="my-3 row">
        <>
          {basketGoods.length > 0 ? (
            <>
              <h4>Корзина</h4>
              {basketGoods.map((item) => (
                <>
                  <div className="my-2 col-md-6">
                    <img
                      src={item.photo}
                      style={{ width: "50px" }}
                      className="me-3"
                      alt="goods"
                    />
                    {item.item_title}
                  </div>
                  <div className="my-2 col-md-3">
                    <button
                      onClick={() => removeItemFromBasket(item.id)}
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                    />
                  </div>
                  <div className="my-2 col-md-3"></div>
                </>
              ))}
            </>
          ) : (
            <p>Корзина пуста</p>
          )}
        </>
      </div>
      <div>{basketGoods.length > 0 ? <h5>Итого - {totalSum()}</h5> : ""}</div>
    </>
  )
}
