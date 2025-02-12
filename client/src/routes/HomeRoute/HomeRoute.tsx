import { JSX, useEffect, useReducer, useRef, useState } from 'react';
import { FiEdit, FiStar, FiClock, FiUser } from 'react-icons/fi';
import { SiSidequest } from 'react-icons/si';

import NavigateBtn from '../../components/ui/NavigateBtn/NavigateBtn';
import InfoBlock from '../../components/InfoBlock/InfoBlock';
import { IFeature } from '../../components/InfoBlock/InfoBlock';
import logo from '../../assets/images/logo-slogan.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  fetchQuests,
  fetchQuestsCount,
} from '../../store/features/quests/thunks';
import { fetchUsersCount } from '../../store/features/users/thunk';
import questCategorys from '../../constants/categorys';
import QuestCard from '../../components/QuestsCards/QuestCard/QuestCard';
import { COMP_HOMEPAGE_PAGINATION_SIZE } from '../../constants/constants';
import IQuest from '../../types/quest';

import "./HomeRoute.css";
import { services } from "./services";

const features1: IFeature[] = [
  {
    icon: FiEdit,
    title: "Create",
    desc: "Design your own interactive quests with ease and creativity.",
  },
  {
    icon: FiClock,
    title: "Play",
    desc: "Join exciting quests in real-time and challenge yourself.",
  },
  {
    icon: FiStar,
    title: "Rate",
    desc: "Explore quests created by others, rate them, and share feedback.",
  },
];

const features2: IFeature[] = [
  // redux
  {
    icon: FiUser,
    title: "1,245 quests",
    desc: "Join a community of creative authors who inspire others with their ideas..",
  },
  {
    icon: FiClock,
    title: "4.6/5",
    desc: "We strive for improvement to provide the best experience for everyone.",
  },
  {
    icon: SiSidequest,
    title: "845 Creators",
    desc: "From simple puzzles to multi-level adventures, our community offers something interesting for everyone.",
  },
];

function HomeRoute(): JSX.Element {
  const auth: boolean = false;

  useEffect(() => {
    (async () => {
      const usersCount = await services.getUsersCount();
      const questsCount = await services.getQuestsCount();
      const quests = await services.getAllQuests();
      console.log(usersCount);
      console.log(questsCount);
      console.log(quests);
    })();
  }, []);

  return (
    <>
      <section className="discover">
        <div className="discover__container container">
          <div className="discover__content">
            <h1 className="discover__content-title h1">
              Discover the World of Quests!
            </h1>
            <p className="discover__content-desc text">
              Create, play, rate – be part of exciting quests!
            </p>
            <NavigateBtn
              path={!auth ? `/login` : `/quests`}
              title={!auth ? `Join Now` : `Go to Quests`}
              className="discover__content-link"
            />
          </div>
          <img
            src={logo}
            alt="aman logo with slogan"
            className="discover__image"
          />
        </div>
      </section>
      <section className="features-1">
        <div className="container features-1__container">
          {features1.map((feature: IFeature, index: number) => {
            if (index + 1 !== features1.length)
              return (
                <>
                  <InfoBlock
                    key={index}
                    className="features-1__item"
                    feature={feature}
                  />
                  <div className="features-delimiter"></div>
                </>
              );
            else
              return (
                <InfoBlock
                  key={index}
                  className="features-1__item"
                  feature={feature}
                />
              );
          })}
        </div>
      </section>
      <section className="explore">
        <div
          className="container explore__container"
          style={{ height: "600px" }}
        ></div>
      </section>
      <section className="features-2">
        <div className="container features-2__container">
          {features2.map((feature: IFeature, index: number) => {
            if (index + 1 !== features1.length)
              return (
                <>
                  <InfoBlock
                    key={index}
                    className="features-2__item"
                    feature={feature}
                  />
                  <div className="features-delimiter"></div>
                </>
              );
            else
              return (
                <InfoBlock
                  key={index}
                  className="features-2__item"
                  feature={feature}
                />
              );
          })}
        </div>
      </section>
    </>
  );
}

export default HomeRoute;
