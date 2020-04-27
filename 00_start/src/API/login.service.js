const url = "http://localhost:8887/login";
import axios from "axios";
export const login = ({ username, password }) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }

      return resp.text();
    })
    .then((response) => {
      if (response instanceof String) {
        throw response;
      }

      return response;
    });
export const loginAxios = ({ username, password }) =>
  axios.post(url, { username, password });
