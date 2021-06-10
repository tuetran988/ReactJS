import axiosClient from "./axiosClient";

const userApi = {
  // variable data is a data user send from register form
  register(data) {
    const url = "/auth/local/register";
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = "/auth/local";
    return axiosClient.post(url, data);
  },
};

export default userApi;
