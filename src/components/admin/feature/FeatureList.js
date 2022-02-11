import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Modal from "react-bootstrap/Modal"
import CreatableSelect from "react-select/creatable"

import {
  selectFilteredFeatures,
  saveNewFeatureWithValues,
  deleteFeature,
} from "../../../features/featuresSlice"
import { featureNameChanged } from "../../../features/filters/featureFilterSlice"
import { selectCategoryById } from "../../../features/categoriesSlice"
import { saveNewValue, selectAllValues } from "../../../features/valuesSlice"
import { useRouteMatch } from "react-router-dom"

const AddNewFeatureModal = ({ show, handleClose, featureValues }) => {
  const [featureName, setFeatureName] = useState("")
  const [valuesInput, setValuesInput] = useState([])
  const [addRequestStatus, setAddRequestStatus] = useState("idle")
  const dispatch = useDispatch()

  const getOptions = (values) => {
    const options = []
    values.forEach((featureValue) => {
      const newOption = {
        value: featureValue.id,
        label: featureValue.feature_value,
      }
      options.push(newOption)
    })
    return options
  }

  const canSave = Boolean(featureName) && addRequestStatus === "idle"

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      try {
        setAddRequestStatus("pending")
        const valuesArray = []
        valuesInput.forEach((item) => {
          valuesArray.push(item.value)
        })
        const featureObj = {
          feature_name: featureName,
          feature_values: valuesArray,
        }
        await dispatch(saveNewFeatureWithValues(featureObj)).unwrap()
      } catch (e) {
        alert("Response error")
      } finally {
        setFeatureName("")
        setValuesInput([])
        setAddRequestStatus("idle")
      }
    }
  }

  let options = getOptions(featureValues)

  const createOption = async (label) => {
    const newOption = await dispatch(saveNewValue(label))
    const { id, feature_value } = newOption.payload
    const result = { value: id, label: feature_value }
    return result
  }

  const handleCreateOption = async (inputValue) => {
    const newOption = await createOption(inputValue)
    setValuesInput([...valuesInput, newOption])
    options = [...options, newOption]
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New feature</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Feature name</label>
              <input
                type="text"
                className="form-control"
                value={featureName}
                onChange={(e) => setFeatureName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CreatableSelect
                value={valuesInput}
                options={options}
                isMulti
                onChange={setValuesInput}
                onCreateOption={handleCreateOption}
                placeholder="Значение характеристики"
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary me-1"
              onClick={() => {
                setValuesInput([])
                setFeatureName("")
                handleClose()
              }}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!canSave}
            >
              Add new category
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export const Category = ({ category_id }) => {
  const category = useSelector((state) =>
    selectCategoryById(state, category_id)
  )
  if (category) {
    return <span>{category.category_name},&nbsp;</span>
  }
  return null
}

const CategoryList = ({ category_list }) => {
  return category_list.map((category) => (
    <Category key={category} category_id={category} />
  ))
}

export default function FeatureList() {
  let { url } = useRouteMatch()
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  const features = useSelector(selectFilteredFeatures)
  const values = useSelector(selectAllValues)

  const dispatch = useDispatch()

  const deleteHandler = async (id) => {
    try {
      await dispatch(deleteFeature(id)).unwrap()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <AddNewFeatureModal
        show={showModal}
        handleClose={handleClose}
        featureValues={values}
      />
      <div className="my-4">
        <h5 className="mb-5">Feature list</h5>
        <h6>Feature filter</h6>
        <input
          type="text"
          className="form-control"
          onChange={(e) => dispatch(featureNameChanged(e.target.value))}
        />
        <div className="form-text">Enter feature name</div>
      </div>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleShow}
        >
          Add new feature
        </button>
      </div>
      <div className="mt-3">
        {features.length > 0 ? (
          <>
            {features.map((feature) => (
              <div
                className="d-flex justify-content-between"
                key={feature.id}
                style={{ width: "500px" }}
              >
                <div>
                  <a href={`${url}/${feature.id}/detail`}>
                    {feature.feature_name}
                  </a>
                  &nbsp; (
                  <CategoryList category_list={feature.category_set} />)
                </div>

                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => deleteHandler(feature.id)}
                />
              </div>
            ))}
          </>
        ) : (
          <p>List is empty</p>
        )}
      </div>
    </>
  )
}
