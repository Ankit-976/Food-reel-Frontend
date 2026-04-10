import React from 'react'
import './Profile.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = () => {
  const API = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [profile, setProfile] = useState(null)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios.get(`${API}/api/food-partner/${id}`, { withCredentials: true })
      .then(response => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems)
      })
      .catch(error => {
        console.log('error');
        
        console.error('Error fetching profile:', error);
      });
  }, [id]);

  return (
    <main className="profile-page">
      <section className="profile-overview">
        <div className="profile-top">
            <img className="avatar-box" src="https://images.unsplash.com/photo-1775312766885-378b00762a72?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          <div className="info-boxes">
            <div className="info-box">
              <span className="info-label">{profile?.name}</span>
            </div>
            <div className="info-box">
              <span className="info-label">Address</span>
              <span className="info-value">{profile?.address}</span>
            </div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <span className="stat-label">Total meals</span>
            <span className="stat-value">{profile?.totalMeals || 0}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Customer served</span>
            <span className="stat-value">{profile?.customerServed || '15K'}</span>
          </div>
        </div>

        <hr className="separator" />

        <div className="video-grid">
          {videos.map((item, index) => (
            <div key={index} className="video-card">
              <video
               style={{ objectFit:'cover', width:'100%', height:'100%'}}
               src={item.video} muted></video>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Profile
