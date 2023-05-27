import axios from "axios";

const BASE_URL = "https://veritage-culture.onrender.com/api/v1/posts";

const posts = axios.create({
  baseURL: BASE_URL,
});
posts.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
posts.defaults.headers.common["Accept"] = "application/json";

export const uploadPost = async (user_token) => {
  let res;
  try {
    res = await posts.request({
      method: "POST",
      url: "/upload",
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
      params: {},
    });
  } catch (error) {
    console.log(error);
  } finally {
    return res.data.data;
  }
};
