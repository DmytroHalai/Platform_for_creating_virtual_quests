import type React from 'react';
import {
  FaStar,
  FaTag,
  FaGift,
  FaEnvelope,
  FaPen,
  FaCheck,
} from 'react-icons/fa';
import ProfileSidebar from '../../components/Sidebar/ProfileSideBar/ProfileSidebar.tsx';
import './ProfileRoute.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './../../store/store.ts';
import { useEffect, useMemo, useState } from 'react';
import { fetchProfile } from '../../store/features/auth/thunks.ts';
import { MAX_RATING } from '../../constants/constants.ts';

// Mock data - replace with API call
const userData = {
  username: 'Username',
  id: '#111',
  avatar: 'https://picsum.photos/seed/1/200',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  rating: 3.4,
  maxRating: 5,
  completedQuests: 233,
  createdQuests: 344,
  gender: 'Male',
  birthday: '15.12.2034',
  email: 'oleksiybubka@gamil.com',
  createdAt: '06.02.2025',
}; ///

const ProfileRoute: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const date = useMemo(()=>{
    return new Date(auth.user?.created_at).toLocaleDateString()
  }, [auth.user])

  const resultRating = useMemo(() => {
    let result = 0;
    let ratedQuestsCount = 0;
    auth.user?.quests.forEach((quest) => {
      if (quest.ratings.length) {
        ratedQuestsCount++;
        result += (
          Math.round(
            (quest.ratings.reduce(
              (sum: number, { rating }: { rating: number }) => sum + rating,
              0
            ) /
              quest.ratings.length) *
              10
          ) / 10
        );
      } else {
        return;
      }
    });
    return Math.round(result/ratedQuestsCount*10)/10;
  }, [auth.user]);

  return auth.user ? (
    <div className="profile">
      <div className="container profile__container">
        <ProfileSidebar activeItem="profile" />

        <div className="profile__content">
          <div className="profile__header">
            <div className="profile__avatar-container">
              <img
                src={auth.user.avatar || '/placeholder.svg'}
                alt={auth.user.username}
                className="profile__avatar"
              />
            </div>

            <div className="profile__info">
              <div className="profile__title-container">
                <h1 className="profile__username">
                  {auth.user.username}
                  <span className="profile__id">{auth.user.user_id}</span>
                </h1>
                <div className="profile__rating">
                  <FaStar />
                  <span>
                    {resultRating}/{MAX_RATING}
                  </span>
                </div>
              </div>

              <p className="profile__description">{auth.user.description}</p>

              <div className="profile__stats">
                <div className="profile__stat">
                  <FaCheck className="profile__stat-icon" />
                  <div className="profile__stat-content">
                    <span className="profile__stat-value">
                      {auth.user.completedQuests}
                    </span>
                    <span className="profile__stat-label">
                      Completed Quests
                    </span>
                  </div>
                </div>

                <div className="profile__stat">
                  <FaPen className="profile__stat-icon" />
                  <div className="profile__stat-content">
                    <span className="profile__stat-value">
                      {auth.user.quests.length}
                    </span>
                    <span className="profile__stat-label">Created Quests</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile__details">
            <div className="profile__detail">
              <FaTag className="profile__detail-icon" />
              <span>{auth.user.gender}</span>
            </div>

            <div className="profile__detail">
              <FaGift className="profile__detail-icon" />
              <span>{auth.user.dateOfBirth}</span>
            </div>

            <div className="profile__detail">
              <FaEnvelope className="profile__detail-icon" />
              <span>{auth.user.email}</span>
            </div>
          </div>

          <div className="profile__created-at">
            Created At: {date}
          </div>
        </div>
      </div>
    </div>
  ): <h1>User Not Found</h1>
};

export default ProfileRoute;
