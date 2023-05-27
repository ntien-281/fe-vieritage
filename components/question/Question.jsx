import { View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import Modal from 'react-native-modal'
import { Button } from 'react-native-paper'
import { useState } from 'react'
import Result from './Result'
import axios from 'axios'
import { BASE_URL } from '../../config'
import { useUserStore } from '../../store'
const Question = ({ show, toggle, data }) => {
  const [loading, setLoading] = useState(-1)
  const [showResult, setShowResult] = useState(false)
  const [type, setType] = useState('correct')
  const user = useUserStore((state) => state.user)

  if (!data) return <View />

  const toggleResult = () => {
    setShowResult((prev) => !prev)
  }

  console.log(data)

  const answer = async (value) => {
    if (loading !== -1) return
    try {
      setLoading(true)
      const res = await axios.put(
        BASE_URL + '/questions/' + data._id + '/answer/' + data?.answers?.at(value - 1)?._id,
        {},
        {
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      )
      if (data?.answers?.at(value - 1)?.isTrue) {
        setType('correct')
        toggleResult()
      } else {
        setType('false')
        toggleResult()
        console.log('Incorrect')
      }
    } catch (error) {
      console.log('Answer error')
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    } finally {
      setLoading(-1)
    }
  }

  const hide = () => {
    toggle()
    setShowResult(false)
  }

  return (
    <Modal isVisible={show} onBackdropPress={toggle} className='m-0'>
      <Pressable onPress={hide} className='h-full w-full items-center justify-center bg-transparent'>
        {showResult && <Result type={type} />}
        <View className='flex-1' />
        <Pressable className='w-full overflow-hidden rounded-t-3xl bg-white px-4 pb-10 pt-4'>
          <Text className='font-app-semibold mt-4 h-[58] w-full text-left text-3xl font-semibold text-black'>
            Câu hỏi
          </Text>
          <Text className='font-app-semibold mb-6 w-full text-left text-base text-black'> {data.name}</Text>
          <View className='flex-row justify-between'>
            <Button
              loading={loading === 1}
              onPress={() => answer(1)}
              buttonColor='#A0D8B3'
              mode='contained'
              className='flex-1'
            >
              <Text className='text-base text-black'>{data?.answers?.at(0)?.value}</Text>
            </Button>
            <View className='w-4' />
            <Button
              loading={loading === 2}
              onPress={() => answer(2)}
              buttonColor='#A0D8B3'
              mode='contained'
              className='flex-1'
            >
              <Text className='text-base text-black'>{data?.answers?.at(1)?.value}</Text>
            </Button>
          </View>
          <View className='mt-4 flex-row justify-between'>
            <Button
              loading={loading === 3}
              onPress={() => answer(3)}
              buttonColor='#A0D8B3'
              mode='contained'
              className='flex-1'
            >
              <Text className='text-base text-black'>{data?.answers?.at(2)?.value}</Text>
            </Button>
            <View className='w-4' />
            <Button
              loading={loading === 4}
              onPress={() => answer(4)}
              buttonColor='#A0D8B3'
              mode='contained'
              className='flex-1'
            >
              <Text className='text-base text-black'>{data?.answers?.at(3)?.value}</Text>
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default Question
