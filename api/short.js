import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const AUTH_DEV_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDZmNGZjMTJmOTYxYzMyYjRmNWZjYjgiLCJuYW1lIjoiVGllbiIsImlhdCI6MTY4NTAxNjUxNCwiZXhwIjoxNjg3NjA4NTE0fQ.ggYm_9mqCe9JdC0YSQ6zKmohwt6DkC4BL4GN864DNMk'

const BASE_URL = 'https://veritage-culture.onrender.com/api/v1/shorts'

const short = axios.create({
  baseURL: BASE_URL,
})
short.defaults.headers.common['Accept'] = 'application/json'

const getAllShortsOfUser = async (user_id, user_token) => {
  let res
  try {
    res = await short.request({
      method: 'GET',
      params: {
        userId: user_id,
      },
      headers: {
        Authorization: 'Bearer ' + user_token,
      },
    })
    let temp = res.data.data
    return temp
  } catch (error) {
    console.log(error)
  }
}

const getVerifiedShorts = async (user_token) => {
  let res
  try {
    console.log('er')
    res = await short.request({
      url: '/recommend',
      method: 'GET',
      params: {
        type: 'verified',
      },
      headers: {
        Authorization: 'Bearer ' + user_token,
      },
    })
    console.log('Tr')

    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

const getUnverifiedShorts = async (user_token) => {
  let res
  try {
    console.log('er')
    res = await short.request({
      url: '/recommend',
      method: 'GET',
      params: {
        type: 'unverified',
      },
      headers: {
        Authorization: 'Bearer ' + user_token,
      },
    })
    console.log('HELLO')
    let temp = res.data.data
    temp = temp.map((item) => ({
      ...item,
      scrutinizing: true,
    }))
    console.log(temp)
    return temp
  } catch (error) {
    console.log('UNVERIFIED ERROR')
    console.log(error)
  }
}

const upvote = async (short_id, user_token) => {
  let res
  console.log('Bearer ' + user_token)
  try {
    res = await short.request({
      method: 'POST',
      url: `/upvote/${short_id}`,
      headers: {
        Authorization: 'Bearer ' + user_token,
      },
    })
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

const disupvote = async (short_id, user_token) => {
  let res
  try {
    res = await short.request({
      method: 'POST',
      url: `/disupvote/${short_id}`,
      headers: {
        Authorization: 'Bearer ' + user_token,
      },
    })
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

const downvote = async (short_id, user_token) => {
  let res
  try {
    res = await short.request({
      method: 'POST',
      url: `/downvote/${short_id}`,
      headers: {
        Authorization: 'Bearer ' + user_token,
      },
    })
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

const disdownvote = async (short_id, user_token) => {
  let res
  try {
    res = await short.request({
      method: 'POST',
      url: `/disdownvote/${short_id}`,
      headers: {
        Authorization: 'Bearer ' + user_token,
      },
    })
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

const getShort = async (short_id, user_token) => {
  let res
  try {
    res = await short.request({
      method: 'GET',
      url: `/${short_id}`,
      headers: {
        Authorization: 'Bearer ' + user_token,
      },
    })
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}

const uploadShort = async (formData, user_token) => {
  console.log(formData)
  try {
    const res = await short.request({
      method: 'POST',
      url: '/upload',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + user_token,
      },
      body: formData,
    })
    return res
  } catch (error) {
    console.log(error)
  }
}

export {
  getAllShortsOfUser,
  upvote,
  disupvote,
  downvote,
  disdownvote,
  getShort,
  uploadShort,
  getVerifiedShorts,
  getUnverifiedShorts,
}
