import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomSafeAreaView from '../common/CustomSafeAreaView'
import { Button } from 'react-native-paper'

const QuestionList = () => {
  const list = [1, 2, 3, 4, 5, 1, 1, 1, 11, 1, 6]

  return (
    <CustomSafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} className='px-4'>
        <Text className='h-16 w-full text-center text-2xl font-bold'>Danh sách câu hỏi</Text>

        {list.map((item, index) => (
          <View key={index}>
            <TouchableOpacity key={index} className='rounded-xl bg-[#A0D8B3]/20 p-4 '>
              <Text className='text-lg font-semibold'>Câu 1</Text>
              <Text className='text-lg'>Hướng dẫn may Việt phục</Text>

              <Text className='text-base font-medium'>A. Việt phục</Text>
              <Text className='text-base font-medium text-green-500'>B. Việt phục</Text>
              <Text className='text-base font-medium'>C. Việt phục</Text>
              <Text className='text-base font-medium'>D. Việt phục</Text>
            </TouchableOpacity>
            {index < list.length && <View className='h-4' />}
          </View>
        ))}

        <Button buttonColor='#A0D8B3' mode='contained' className='mb-6'>
          <Text className='text-base text-black'>Thêm câu hỏi</Text>
        </Button>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default QuestionList
