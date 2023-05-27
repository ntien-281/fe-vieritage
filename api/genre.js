import axios from "axios";

const AUTH_DEV_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDZmNGZjMTJmOTYxYzMyYjRmNWZjYjgiLCJuYW1lIjoiVGllbiIsImlhdCI6MTY4NTAxNjUxNCwiZXhwIjoxNjg3NjA4NTE0fQ.ggYm_9mqCe9JdC0YSQ6zKmohwt6DkC4BL4GN864DNMk";

const BASE_URL = "http://10.0.21.253:5000/api/v1/genres"

const genres = axios.create({
  baseURL: BASE_URL,
})
genres.defaults.headers.common['Authorization'] = `Bearer ${AUTH_DEV_TOKEN}`;
genres.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
genres.defaults.headers.common['Accept'] = 'application/json';

export const getAllGenres = async () => {
  let res;
  try {
    res = await genres.request({
      method: 'GET',
    })
  } catch (error) {
    console.log(error);
  } finally {
    return res.data.data;
  }
}