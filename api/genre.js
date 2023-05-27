import axios from "axios";

const BASE_URL = "https://veritage-culture.onrender.com/api/v1/genres";

const genres = axios.create({
  baseURL: BASE_URL,
});
genres.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
genres.defaults.headers.common["Accept"] = "application/json";

export const getAllGenres = async (user_token) => {
  let res;
  try {
    res = await genres.request({
      method: "GET",
      headers: {
        Authorization: "Bearer " + user_token,
      },
    });
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
