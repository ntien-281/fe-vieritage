import axios from 'axios'
import { useEffect, useState } from 'react'
import { useUserStore } from '../store'
import { BASE_URL } from '../config'

const useFetchQuestion = () => {
  const user = useUserStore((state) => state.user)
  const [data, setData] = useState()

  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL + '/questions/random', {
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
      })
      setData(res.data.data)
    } catch (error) {
      console.log('Error')
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    }
  }

  return { data, fetchData }
}

export default useFetchQuestion
