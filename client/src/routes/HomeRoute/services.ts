import api from "../API/api";

const API_USERS_COUNT = "/users/count";
const API_QUESTS_COUNT = "/quests/count";
const API_ALL_QUESTS = "/quests";

const services = {
  getUsersCount: () =>
    api
      .get(API_USERS_COUNT)
      .then(({ data }) => data)
      .catch((error) => console.error(error)),

  getQuestsCount: () =>
    api
      .get(API_QUESTS_COUNT)
      .then(({ data }) => data)
      .catch((error) => console.error(error)),

  getAllQuests: () =>
    api
      .get(API_ALL_QUESTS)
      .then(({ data }) => data)
      .catch((error) => console.error(error)),
};

export { services };
