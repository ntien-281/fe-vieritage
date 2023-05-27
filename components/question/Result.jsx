import { View, Text } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { Button } from 'react-native-paper'
const Result = ({ type = 'correct' }) => {
  return (
    <View className='absolute max-w-[360] rounded-2xl bg-white px-4 py-8 shadow-2xl'>
      <Text className='text-center text-2xl font-semibold text-black'>
        {type === 'correct' ? 'Chính xác' : 'Sai rồi'}
      </Text>
      <Text className='mt-4 text-center text-base text-black'>
        {type === 'correct' ? 'Chúc mừng bạn. Bạn quá là tuyệt vời!' : 'Rất tiếc. Cố gắng lần sau bạn nhé.'}
      </Text>
    </View>
  )
}

export default Result
