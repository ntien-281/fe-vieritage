import { PaperProvider, IconButton } from 'react-native-paper'
import { Feed, Search } from '../components'
import { TouchableOpacity } from 'react-native'
import QuestionPopup from '../components/question/QuestionPopup'
import Question from '../components/question/Question'
import { useEffect, useState } from 'react'
import useFetchQuestion from '../hooks/useFetchQuestion'

const Short = ({ navigation }) => {
  const { data, fetchData } = useFetchQuestion()

  const [showQuestion, setShowQuestion] = useState(false)
  const toggleQuestion = async () => {
    setShowQuestion((prev) => !prev)
  }
  const toggleShowQs = async () => {
    await fetchData()
    setShowQuestion((prev) => !prev)
  }
  const [show, setShow] = useState(true)
  const toggle = () => setShow((prev) => !prev)

  return (
    <PaperProvider>
      <Search />
      <Feed />
      <TouchableOpacity
        className='absolute right-1 top-12 mt-3'
        onPress={() => {
          navigation.navigate('Upload')
        }}
      >
        <IconButton icon='plus-circle' size={50} iconColor='white' animated />
      </TouchableOpacity>
      {show && <QuestionPopup toggle={toggle} toggleQuestion={toggleShowQs} />}
      <Question data={data} show={showQuestion} toggle={toggleQuestion} />
    </PaperProvider>
  )
}

export default Short
