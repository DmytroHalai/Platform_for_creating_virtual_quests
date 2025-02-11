"use client"

import type React from "react"
import { FaStar, FaTag, FaGift, FaEnvelope, FaPen, FaCheck } from "react-icons/fa"
import ProfileSidebar from "../../components/Sidebar/ProfileSideBar/ProfileSidebar.tsx"
import "./ProfileRoute.css"

// Mock data - replace with API call
const userData = {
  username: "Username",
  id: "#111",
  avatar: "https://picsum.photos/seed/1/200",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  rating: 3.4,
  maxRating: 5,
  completedQuests: 233,
  createdQuests: 344,
  gender: "Male",
  birthday: "15.12.2034",
  email: "oleksiybubka@gamil.com",
  createdAt: "06.02.2025",
} ///

const ProfileRoute: React.FC = () => {
  const handleLogout = () => {
    /// Handle logout logic
  }

  return (
    <div className="profile">
      <div className="container profile__container">
        <ProfileSidebar activeItem="profile" onLogout={handleLogout} />

        <div className="profile__content">
          <div className="profile__header">
            <div className="profile__avatar-container">
              <img src={userData.avatar || "/placeholder.svg"} alt={userData.username} className="profile__avatar" />
            </div>

            <div className="profile__info">
              <div className="profile__title-container">
                <h1 className="profile__username">
                  {userData.username}
                  <span className="profile__id">{userData.id}</span>
                </h1>
                <div className="profile__rating">
                  <FaStar />
                  <span>
                    {userData.rating}/{userData.maxRating}
                  </span>
                </div>
              </div>

              <p className="profile__description">{userData.description}</p>

              <div className="profile__stats">
                <div className="profile__stat">
                  <FaCheck className="profile__stat-icon" />
                  <div className="profile__stat-content">
                    <span className="profile__stat-value">{userData.completedQuests}</span>
                    <span className="profile__stat-label">Completed Quests</span>
                  </div>
                </div>

                <div className="profile__stat">
                  <FaPen className="profile__stat-icon" />
                  <div className="profile__stat-content">
                    <span className="profile__stat-value">{userData.createdQuests}</span>
                    <span className="profile__stat-label">Created Quests</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile__details">
            <div className="profile__detail">
              <FaTag className="profile__detail-icon" />
              <span>{userData.gender}</span>
            </div>

            <div className="profile__detail">
              <FaGift className="profile__detail-icon" />
              <span>{userData.birthday}</span>
            </div>

            <div className="profile__detail">
              <FaEnvelope className="profile__detail-icon" />
              <span>{userData.email}</span>
            </div>
          </div>

          <div className="profile__created-at">Created At: {userData.createdAt}</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileRoute

