import { TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Question from './Question'
const QuestionPopup = ({ toggle, toggleQuestion }) => {
  return (
    <TouchableOpacity
      onPress={toggleQuestion}
      className='absolute left-4 top-20 items-start justify-center rounded-full bg-[#FFD60A] p-2 shadow-2xl'
    >
      <AntDesign name='question' size={24} color='black' />
    </TouchableOpacity>
  )
}

export default QuestionPopup
