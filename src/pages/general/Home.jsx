import React, { useState, useEffect, useRef, use } from "react";
import "../../styles/Home.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const API = import.meta.env.VITE_API_URL;
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState([]);
  const [likedVideos, setLikedVideos] = useState([]);
  const [savedVideos, setSavedVideos] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const [likes, setLikes] = useState({});
  const [saved, setSaved] = useState({});
  const [activeView, setActiveView] = useState("home");
  const videoRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${API}/api/food`, { withCredentials: true })
      .then((response) => {
        setVideos(response.data.foodItems);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);
  

  async function handleLikedFood() {
    await axios
      .get(`${API}/api/food/getLikedFood`, {
        withCredentials: true,
      })
      .then((response) => {
        if ("a") {
        }
        setLikedVideos(response.data.likedFood);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }
  // console.log(videos);
  // console.log(likedVideos);

  async function handleSavedFood() {
    await axios
      .get(`${API}/api/food/getSavedFood`, {
        withCredentials: true,
      })
      .then((response) => {
        setSavedVideos(response.data.savedFood);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }
  // console.log(videos);
  // console.log(savedVideos);

  // Filter videos based on active view
  const filteredVideos = activeView === "home" ? videos : activeView === "likes" ? likedVideos : savedVideos;

  useEffect(() => {
    // Auto-play first video on mount
    if (videoRefs.current[0]) {
      videoRefs.current[0].currentTime = 0;
      videoRefs.current[0].play();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = containerRef.current.scrollTop;
      const videoHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / videoHeight);

      if (
        newIndex !== currentVideoIndex &&
        newIndex >= 0 &&
        newIndex < filteredVideos.length
      ) {
        setCurrentVideoIndex(newIndex);

        // Pause previous video
        if (videoRefs.current[currentVideoIndex]) {
          videoRefs.current[currentVideoIndex].pause();
        }

        // Reset and play new video from start
        if (videoRefs.current[newIndex]) {
          videoRefs.current[newIndex].currentTime = 0;
          videoRefs.current[newIndex].play();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [currentVideoIndex, filteredVideos.length]);

  const handleVideoClick = (index) => {
    if (videoRefs.current[index]) {
      if (videoRefs.current[index].paused) {
        videoRefs.current[index].play();
      } else {
        videoRefs.current[index].pause();
      }
    }
  };

  const toggleSound = () => {
    setIsMuted(!isMuted);
    // Update all video elements
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = !isMuted;
      }
    });
  };

  async function handleLike(video) {
    setLikes((prev) => ({
      ...prev,
      [video._id]: !prev[video._id],
    }));
    const response = await axios.post(
      `${API}/api/food/like`,
      { foodId: video._id, video: video.video },
      { withCredentials: true },
    );

    if (response.data.like) {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === video._id ? { ...v, likeCount: v.likesCount + 1 } : v,
        ),
      );
    }
  }

  async function handleSave(video) {
    setSaved((prev) => ({
      ...prev,
      [video._id]: !prev[video._id],
    }));

    await axios.post(
      `${API}/api/food/save`,
      { foodId: video._id, video: video.video },
      { withCredentials: true },
    );
  }

  return (
    <div className="reel-dashboard-layout">
      {/* Sidebar Dashboard */}
      <aside className="reel-dashboard-sidebar">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Food Reel</h1>
        </div>
        <nav className="dashboard-nav">
          <button
            className={`nav-btn ${activeView === "home" ? "active" : ""}`}
            onClick={() => {
              setActiveView("home");
              setCurrentVideoIndex(0);
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9L12 3L21 9V21H3V9Z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <rect
                x="9"
                y="12"
                width="6"
                height="9"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <span>Home</span>
          </button>
          <button
            className={`nav-btn ${activeView === "likes" ? "active" : ""}`}
            onClick={() => {
              setActiveView("likes");
              setCurrentVideoIndex(0);
              handleLikedFood();
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <span>Liked</span>
          </button>
          <button
            className={`nav-btn ${activeView === "saved" ? "active" : ""}`}
            onClick={() => {
              setActiveView("saved");
              setCurrentVideoIndex(0);
              handleSavedFood();
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <polyline
                points="17 21 17 13 7 13 7 21"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <span>Saved</span>
          </button>
        </nav>
        <div className="dashboard-stats">
          <div className="stat-item">
            <span className="stat-label">Total Reels</span>
            <span className="stat-value">{videos.length}</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="reel-content-area">
        {filteredVideos.length === 0 ? (
          <div className="empty-state">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M12 7V12L16 16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            <h2>
              No{" "}
              {activeView === "home"
                ? "reels"
                : activeView === "likes"
                  ? "liked reels"
                  : "saved reels"}{" "}
              yet
            </h2>
            <p>Start exploring to find amazing food reels!</p>
          </div>
        ) : (
          <div className="home-container" ref={containerRef}>
            {filteredVideos.map((video, index) => (
              <div key={video._id} className="video-container">
                <div className="video-wrapper">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="video-player"
                    src={video.video}
                    loop
                    muted={isMuted}
                    playsInline
                    onClick={() => handleVideoClick(index)}
                  />

                  <div className="video-overlay"></div>

                  <div className="action-buttons-group">
                    <div className="action-item">
                      <button
                        className={`action-btn like-btn ${likes[video._id] ? "active" : ""}`}
                        aria-label="Like"
                        onClick={() => handleLike(video)}
                        title="Like"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                            stroke="white"
                            strokeWidth="2"
                          />
                          {/* fill={videos[video._id] ? '#ff635' : 'none'} */}
                        </svg>
                      </button>
                      <span className="action-count">
                        { video.likeCount || "Likes" }
                      </span>
                    </div>
                    <button
                      className={`action-btn save-btn ${saved[video._id] ? "active" : ""}`}
                      aria-label="Save"
                      onClick={() => handleSave(video)}
                      title="Save"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
                          stroke="white"
                          strokeWidth="2"
                        />
                        {/* fill={saved[video._id] ? "#4da6ff" : "none"} */}
                        <polyline
                          points="17 21 17 13 7 13 7 21"
                          stroke="white"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                    </button>
                  </div>

                  <button
                    className="sound-toggle-btn"
                    onClick={toggleSound}
                    aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                  >
                    {isMuted ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3 9V15H7L12 20V4L7 9H3Z" fill="white" />
                        <path
                          d="M16.5 12C16.5 10.23 15.48 8.71 14 8.08V10.91C14.58 11.27 15 11.87 15 12.5C15 13.13 14.58 13.73 14 14.09V16.92C15.48 16.29 16.5 14.77 16.5 13Z"
                          fill="white"
                        />
                        <path
                          d="M14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z"
                          fill="white"
                        />
                        <line
                          x1="2"
                          y1="2"
                          x2="22"
                          y2="22"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3 9V15H7L12 20V4L7 9H3Z" fill="white" />
                        <path
                          d="M16.5 12C16.5 10.23 15.48 8.71 14 8.08V10.91C14.58 11.27 15 11.87 15 12.5C15 13.13 14.58 13.73 14 14.09V16.92C15.48 16.29 16.5 14.77 16.5 13Z"
                          fill="white"
                        />
                        <path
                          d="M14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z"
                          fill="white"
                        />
                      </svg>
                    )}
                  </button>

                  <div className="video-content">
                    <div className="video-description">
                      <p className="description-text">{video.description}</p>
                    </div>

                    <Link
                      className="visit-store-btn"
                      to={"/food-partner/" + video.foodPartner}
                    >
                      Visit Store
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
