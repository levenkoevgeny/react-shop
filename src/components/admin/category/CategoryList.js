import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import Modal from "react-bootstrap/Modal"

import {
  selectFilteredCategories,
  saveNewCategory,
  deleteCategory,
} from "../../../features/categoriesSlice"
import {
  selectAllFeatures,
  saveNewFeature,
} from "../../../features/featuresSlice"
import { categoryNameChanged } from "../../../features/filters/categoryFilterSlice"

import CreatableSelect from "react-select/creatable"
import { useRouteMatch } from "react-router-dom"

const AddNewCategoryModal = ({ show, handleClose, features }) => {
  const [categoryName, setCategoryName] = useState("")
  const [featuresInput, setFeaturesInput] = useState([])
  const [addRequestStatus, setAddRequestStatus] = useState("idle")

  const dispatch = useDispatch()

  const getOptions = (features) => {
    const options = []
    features.forEach((feature) => {
      const newOption = { value: feature.id, label: feature.feature_name }
      options.push(newOption)
    })
    return options
  }

  const canSave = Boolean(categoryName) && addRequestStatus === "idle"

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (canSave) {
      try {
        setAddRequestStatus("pending")
        const featuresArray = []
        featuresInput.forEach((item) => {
          featuresArray.push(item.value)
        })
        const categoryObj = {
          category_name: categoryName,
          category_features: featuresArray,
        }
        await dispatch(saveNewCategory(categoryObj)).unwrap()
      } catch (e) {
        alert("Response error")
      } finally {
        setCategoryName("")
        setFeaturesInput([])
        setAddRequestStatus("idle")
      }
    }
  }

  let options = getOptions(features)

  const createOption = async (label) => {
    const newOption = await dispatch(saveNewFeature(label))
    const { id, feature_name } = newOption.payload
    const result = { value: id, label: feature_name }
    return result
  }

  const handleCreateOption = async (inputValue) => {
    const newOption = await createOption(inputValue)
    setFeaturesInput([...featuresInput, newOption])
    options = [...options, newOption]
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>New category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Category name</label>
              <input
                type="text"
                className="form-control"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <CreatableSelect
                value={featuresInput}
                options={options}
                isMulti
                onChange={setFeaturesInput}
                onCreateOption={handleCreateOption}
                placeholder="Характеристики"
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary me-1"
              onClick={() => {
                setFeaturesInput([])
                setCategoryName("")
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

export default function CategoryList() {
  let { url } = useRouteMatch()
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)
  const categories = useSelector(selectFilteredCategories)
  const features = useSelector(selectAllFeatures)

  const dispatch = useDispatch()

  const deleteHandler = async (id) => {
    try {
      await dispatch(deleteCategory(id)).unwrap()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <AddNewCategoryModal
        show={showModal}
        handleClose={handleClose}
        features={features}
      />
      <div className="my-4">
        <h5 className="mb-5">Category list</h5>
        <h6>Category filter</h6>
        <input
          type="text"
          className="form-control"
          onChange={(e) => dispatch(categoryNameChanged(e.target.value))}
        />
        <div id="emailHelp" className="form-text">
          Enter category name
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleShow}
        >
          Add new category
        </button>
      </div>
      <div className="mt-3">
        {categories.length > 0 ? (
          <>
            {categories.map((category) => (
              <div
                className="d-flex justify-content-between"
                key={category.id}
                style={{ width: "500px" }}
              >
                <div>
                  <a href={`${url}/${category.id}/goods`}>
                    {category.category_name}
                  </a>
                  &nbsp;
                  <span className="badge bg-secondary">
                    {category.goods.length}
                  </span>
                </div>

                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => deleteHandler(category.id)}
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
