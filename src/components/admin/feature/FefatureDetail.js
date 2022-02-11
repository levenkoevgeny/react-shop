import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import {
  selectFilteredValues,
  saveNewValueWithFeature,
  deleteValue,
} from "../../../features/valuesSlice"
import { valueFeatureChanged } from "../../../features/filters/valueFilterSlice"
import { selectFeatureById } from "../../../features/featuresSlice"

const Value = ({ value }) => {
  return (
    <div>
      <p>{value.feature_value}</p>
    </div>
  )
}

export default function FeaturesDetail() {
  let { id } = useParams()
  const dispatch = useDispatch()

  const [valueInput, setValueInput] = useState("")

  useEffect(() => {
    dispatch(valueFeatureChanged(parseInt(id)))
  }, [id, dispatch])

  const feature = useSelector((state) => selectFeatureById(state, id))
  const valuesForFeature = useSelector(selectFilteredValues)

  const submitHandler = async (e) => {
    e.preventDefault()
    const valueObj = { feature_value: valueInput, feature: id }
    try {
      await dispatch(saveNewValueWithFeature(valueObj)).unwrap()
    } catch (error) {
      alert(error.message)
    } finally {
      setValueInput("")
    }
  }

  const deleteHandler = async (id) => {
    try {
      await dispatch(deleteValue(id))
    } catch (error) {
      alert(error.message)
    }
  }

  if (feature) {
    return (
      <div>
        <div className="my-3">
          <h5>{feature.feature_name}</h5>
        </div>

        <form onSubmit={submitHandler}>
          <div className="row">
            <div className="col-md-8">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Value name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={valueInput}
                  onChange={(e) => setValueInput(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  Add new value
                </button>
              </div>
            </div>
          </div>
        </form>

        {valuesForFeature.length > 0 ? (
          <>
            {valuesForFeature.map((value) => (
              <div key={value.id} className="d-flex flex-row">
                <Value key={value.id} value={value} />
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => deleteHandler(value.id)}
                />
              </div>
            ))}
          </>
        ) : (
          <div>Values list is empty</div>
        )}
      </div>
    )
  }

  return <div>Loading...</div>
}
