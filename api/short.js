import axios from "axios";

const AUTH_DEV_TOKEN = "";

const BASE_URL = "http://192.168.1.176:5000/api/v1/shorts"

const short = axios.create({
  baseURL: BASE_URL,
})
short.defaults.headers.common['Authorization'] = `Bearer ${AUTH_DEV_TOKEN}`;
short.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
short.defaults.headers.common['Accept'] = 'application/json';

const getAllShortsOfUser = async (user_id) => {
  let res;
  try {
    res = await short.request({
      method: 'GET',
      params: { 
        userId: user_id 
      } 
    });
  } catch (error) {
    console.log(error);
  } finally {
    return res.data.data;
  }
}

const upVote = async (short_id) => {
  try {
    res = await short.request({
      method: 'POST',
      url: `/upvote/${short_id}`,
    })
  } catch (error) {
    console.log(error);
  } finally {
    // Return short JSON with upvoteers updated
    return res.data;
  }
}

export { getAllShortsOfUser, upVote }