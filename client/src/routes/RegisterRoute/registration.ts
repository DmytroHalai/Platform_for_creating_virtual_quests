import api from "../API/api";

const API_REGISTRATION = "/users/registration";

const services = {
  post: (item: any) =>
    api
      .post(API_REGISTRATION, item)
      .then(({ data }) => data)
      .catch((error) => console.error(error)),
};

export { services };
