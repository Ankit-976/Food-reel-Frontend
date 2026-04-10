import React, { useState } from 'react'
import '../../styles/auth.css'
import './CreateFood.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateFood = () => {

  const API = import.meta.env.VITE_API_URL;
  const [fileName, setFileName] = useState('')
  const navigate = useNavigate()

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setFileName(file ? file.name : '')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData();

    formData.append('name', event.target.reelName.value);
    formData.append('description', event.target.description.value);
    formData.append('video', event.target.reelFile.files[0]);

    await axios.post(`${API}/api/food`, formData, {withCredentials: true})

    navigate('/home')
  }

  return (
    <div className="create-food-container">
      <div className="create-food-card auth-card">
        <div className="create-food-header">
          <div className="auth-badge">FOOD REEL</div>
          <h1 className="create-food-title">Create New Reel</h1>
          <p className="create-food-subtitle">Upload your reel video and add a title with a short description.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group file-upload-group">
            <label className="form-label" htmlFor="reel-file">
              Upload Reel <span>*</span>
            </label>
            <label className="file-upload-label" htmlFor="reel-file">
              Choose file or drag it here
              <input
                id="reel-file"
                name="reelFile"
                type="file"
                accept="video/*"
                className="file-upload-input"
                onChange={handleFileChange}
              />
            </label>
            {fileName && <span className="file-name">Selected file: {fileName}</span>}
            <span className="file-upload-note">Accepted format: MP4, MOV, AVI</span>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reel-name">
              Reel Name <span>*</span>
            </label>
            <input
              id="reel-name"
              type="text"
              name="reelName"
              className="form-input"
              placeholder="Enter reel title"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reel-description">
              Description
            </label>
            <textarea
              id="reel-description"
              name="description"
              className="form-input"
              placeholder="Write a short description for your reel"
            />
          </div>

          <button type="submit" className="form-button">
            Create Reel
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateFood
