import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { Button } from 'react-native-paper'
import { useState } from 'react'
import Result from './Result'

const Question = ({ show, toggle }) => {
  const [loading, setLoading] = useState(-1)
  const [showResult, setShowResult] = useState(false)

  const toggleResult = () => {
    setShowResult((prev) => !prev)
  }

  const answer = (value) => () => {
    if (loading !== -1) return
    setLoading(value)
    setTimeout(() => {
      setLoading(-1)
      toggleResult()
      setTimeout(() => {
        toggle()
        toggleResult()
      }, 2000)
    }, 2000)
  }

  return (
    <Modal isVisible={show} onBackdropPress={toggle} className='m-0'>
      <Pressable onPress={toggle} className='h-full w-full items-center justify-center bg-transparent'>
        {showResult && <Result type='false' />}
        <View className='flex-1' />
        <Pressable className='w-full overflow-hidden rounded-t-3xl bg-white px-4 pb-10 pt-4'>
          <Text className='font-app-semibold mt-4 h-[58] w-full text-left text-3xl font-semibold text-black'>
            Câu hỏi
          </Text>
          <Text className='font-app-semibold mb-6 w-full text-left text-base text-black'>
            Làm thế nào để may Việt phục ở Việt Nam?
          </Text>
          <View className='flex-row justify-between'>
            <Button
              loading={loading === 1}
              onPress={answer(1)}
              buttonColor='#A0D8B3'
              mode='contained'
              className='flex-1'
            >
              <Text className='text-base text-black'>A. Sử dụng kéo</Text>
            </Button>
            <View className='w-4' />
            <Button
              loading={loading === 2}
              onPress={answer(2)}
              buttonColor='#A0D8B3'
              mode='contained'
              className='flex-1'
            >
              <Text className='text-base text-black'>B. Sử dụng dao</Text>
            </Button>
          </View>
          <View className='mt-4 flex-row justify-between'>
            <Button
              loading={loading === 3}
              onPress={answer(3)}
              buttonColor='#A0D8B3'
              mode='contained'
              className='flex-1'
            >
              <Text className='text-base text-black'>C. Sử dụng búa</Text>
            </Button>
            <View className='w-4' />
            <Button
              loading={loading === 4}
              onPress={answer(4)}
              buttonColor='#A0D8B3'
              mode='contained'
              className='flex-1'
            >
              <Text className='text-base text-black'>D. Sử dụng bao</Text>
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default Question
