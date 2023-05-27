import axios from "axios";

const AUTH_DEV_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDZmNGZjMTJmOTYxYzMyYjRmNWZjYjgiLCJuYW1lIjoiVGllbiIsImlhdCI6MTY4NTAxNjUxNCwiZXhwIjoxNjg3NjA4NTE0fQ.ggYm_9mqCe9JdC0YSQ6zKmohwt6DkC4BL4GN864DNMk";

const BASE_URL = "http://10.0.21.253:5000/api/v1/shorts"

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

const upvote = async (short_id) => {
  try {
    res = await short.request({
      method: 'POST',
      url: `/upvote/${short_id}`,
    })
  } catch (error) {
    console.log(error);
  } finally {
    return res.data.data;
  }
}

const disupvote = async (short_id) => {
  try {
    res = await short.request({
      method: 'POST',
      url: `/disupvote/${short_id}`,
    })
  } catch (error) {
    console.log(error);
  } finally {
    return res.data.data;
  }
}

const downvote = async (short_id) => {
  try {
    res = await short.request({
      method: 'POST',
      url: `/downvote/${short_id}`,
    })
  } catch (error) {
    console.log(error);
  } finally {
    return res.data.data;
  }
}

const disdownvote = async (short_id) => {
  try {
    res = await short.request({
      method: 'POST',
      url: `/disdownvote/${short_id}`,
    })
  } catch (error) {
    console.log(error);
  } finally {
    return res.data.data;
  }
}

const getShort = async (short_id) => {
  try {
    res = await short.request({
      method: 'GET',
      url: `/${short_id}`,
    })
  } catch (error) {
    console.log(error);
  } finally {
    return res.data.data;
  }
}

const uploadShort = async (formData) => {
  try {
    const res = await short.request({
      method: 'POST',
      url: '/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    })
  } catch (error) {
    console.log(error);
  } finally {
    return res;
  }
}

export { getAllShortsOfUser, upvote, disupvote, downvote, disdownvote, getShort, uploadShort }