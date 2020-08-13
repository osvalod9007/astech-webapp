import axios from "axios";

const httpService = axios.create({
  baseURL: process.env.REACT_APP_URL_API,
});

export const setAccessToken = (token) =>
  (httpService.defaults.headers = { Authorization: `Bearer ${token}` });

export default httpService;
