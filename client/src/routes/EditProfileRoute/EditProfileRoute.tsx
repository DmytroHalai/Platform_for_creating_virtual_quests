'use client'

import React, { useState } from 'react';
import { FaEdit, FaEye, FaEyeSlash } from 'react-icons/fa';
import ProfileSidebar from '../../components/Sidebar/ProfileSidebar/ProfileSidebar';
import './EditProfileRoute.css';
import { useNavigate } from 'react-router-dom';

// Mock data - replace with API call
const userData = {
  username: 'Username',
  email: 'oleksiybubka@gamil.com',
  avatar: 'https://picsum.photos/seed/1/200',
  dateOfBirth: '15.12.2034',
  description: 'Negr Negr Negr Negr Negr Negr Negr Negr Negr Negr Negr Negr Negr. Sometimes Negr, Negr, Neeeeeeeeeeeeeeeeeeeeeeeeeeegr. Negr Negr Negroid. Set Value = Negr.'
}; ///

const EditProfileRoute: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: userData.username,
    email: userData.email,
    password: '',
    dateOfBirth: userData.dateOfBirth,
    description: userData.description
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      /// Handle image upload
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /// Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="edit-profile">
      <div className="container edit-profile__container">
        <ProfileSidebar activeItem="edit" />

        <div className="edit-profile__content">
          <form onSubmit={handleSubmit} className="edit-profile__form">
            <div className="edit-profile__avatar-container">
              <img
                src={userData.avatar || "/placeholder.svg"}
                alt="Profile"
                className="edit-profile__avatar"
              />
              <label htmlFor="avatar-upload" className="edit-profile__avatar-edit">
                <FaEdit />
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="edit-profile__avatar-input"
                />
              </label>
            </div>

            <div className="edit-profile__fields">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter new password to change"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date Of Birth</label>
                <input
                  type="text"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-textarea"
                  rows={4}
                />
              </div>

              <button type="submit" className="save-button" onClick={() => navigate('/profile')}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileRoute;
