import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { Button, Checkbox, RadioButton, TextInput } from 'react-native-paper'
import { useState } from 'react'
import Result from './Result'

const AddQuestion = ({ show, toggle }) => {
  const [loading, setLoading] = useState(-1)
  const [showResult, setShowResult] = useState(false)

  return (
    <Modal isVisible={show} onBackdropPress={toggle} className='m-0'>
      <Pressable onPress={toggle} className='h-full w-full items-center justify-center bg-transparent'>
        {showResult && <Result type='false' />}
        <View className='flex-1' />
        <Pressable className='w-full overflow-hidden rounded-t-3xl bg-white px-4 pb-10 pt-4'>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text className='font-app-semibold mt-4 h-[58] w-full text-left text-3xl font-semibold text-black'>
              Thêm câu hỏi mới
            </Text>
            <Text className='text-base font-semibold'>Nội dung</Text>
            <TextInput multiline mode='outlined' color className='mr-3  bg-transparent' />

            <Text className='mt-4 font-semibold'>Câu trả lời 1</Text>
            <View className='flex-row items-center'>
              <TextInput multiline mode='outlined' color className='mr-3 flex-1 bg-transparent' />
              <RadioButton />
            </View>

            <Text className='mt-4 font-semibold'>Câu trả lời 2</Text>
            <View className='flex-row items-center'>
              <TextInput multiline mode='outlined' color className='mr-3 flex-1 bg-transparent' />
              <RadioButton />
            </View>

            <Text className='mt-4 font-semibold'>Câu trả lời 3</Text>
            <View className='flex-row items-center'>
              <TextInput multiline mode='outlined' color className='mr-3 flex-1 bg-transparent' />
              <RadioButton />
            </View>

            <Text className='mt-4 font-semibold'>Câu trả lời 4</Text>
            <View className='flex-row items-center'>
              <TextInput multiline mode='outlined' color className='mr-3 flex-1 bg-transparent' />
              <RadioButton />
            </View>

            <Button buttonColor='#A0D8B3' mode='contained' className='mt-6'>
              <Text className='text-base text-black'>Lưu</Text>
            </Button>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default AddQuestion
