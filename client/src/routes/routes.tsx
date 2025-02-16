
import { createBrowserRouter } from 'react-router';

import Layout from './Layout.tsx';
import ErrorRoute from './ErrorRoute/ErrorRoute.tsx';
import HomeRoute from './HomeRoute/HomeRoute.tsx';
import LoginRoute from './LoginRoute/LoginRoute.tsx';
import RegisterRoute from './RegisterRoute/RegisterRoute.tsx';
import ProfileRoute from './ProfileRoute/ProfileRoute.tsx';
import ProfileLayout from './ProfileLayout/ProfileLayout.tsx';
import UserQuestsRoute from './UserQuestsRoute/UserQuestsRoute.tsx';
import CompletedQuestsRoute from './CompletedQuestsRoute/CompletedQuestsRoute.tsx';
import EditProfileRoute from './EditProfileRoute/EditProfileRoute.tsx';
import QuestsRoute from './QuestsRoute/QuestsRoute.tsx';
import QuestItemRoute from './QuestItemRoute/QuestItemRoute.tsx';
import CreateQuestRoute from './CreateQuestRoute/CreateQuestRoute.tsx';
import ProgressRoute from './ProgressRoute/ProgressRoute.tsx';
import UserQuestItemRoute from './UserQuestItemRoute/UserQuestItemRoute.tsx';
import TaskItemRoute from './TaskItemRoute.tsx';
import RatingRoute from './RatingRoute/RatingRoute.tsx';
import AuthorRoute from './AuthorRoute.tsx';
import QuestRatingRoute from './QuestRatingRoute/QuestRatingRoute.tsx';

let router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorRoute />,
    children: [
      {
        index: true,
        element: <HomeRoute />,
      },
      {
        path: 'login',
        element: <LoginRoute />,
      },
      {
        path: 'register',
        element: <RegisterRoute />,
      },
      {
        path: 'profile/',
        element: <ProfileLayout />,
        children: [
          {
            index: true,
            element: <ProfileRoute />,
          },
          {
            path: 'edit',
            element: <EditProfileRoute />,
          },
          {
            path: 'myQuests',
            element: <UserQuestsRoute />,
          },
          
          {
            path: 'completedQuests',
            element: <CompletedQuestsRoute />,
          },
        ],
      },
      {
        path: 'quests',
        element: <QuestsRoute />,
      },
      {
        path: 'quests/:questId',
        element: <QuestItemRoute />,
      },
      {
        path: 'quests/:questId/rate',
        element: <QuestRatingRoute />,
      },
      {
        path: 'quests/createQuest',
        element: <CreateQuestRoute />,
      },
      {
        path: 'progress',
        element: <ProgressRoute />,
      },
      {
        path: 'progress/:userQuestId',
        element: <UserQuestItemRoute />,
      },
      {
        path: 'progress/:userQuestId/:taskId',
        element: <TaskItemRoute />,
      },
      {
        path: 'rating',
        element: <RatingRoute />,
      },
      {
        path: 'rating/:authorId',
        element: <AuthorRoute />,
      },
    ],
  },
]);

export default router;
