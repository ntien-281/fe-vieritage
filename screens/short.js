import { PaperProvider, IconButton } from 'react-native-paper';
import { Feed, Search } from '../components';
import { TouchableOpacity } from 'react-native';


const Short = () => {

  return (
    <PaperProvider>
      
      <Search />
      <Feed />
      <TouchableOpacity className="absolute right-1 top-12 mt-3" onPress={() => {  }}>
        <IconButton 
          icon="plus-circle"
          size={50}
          iconColor='white'
          animated
        />
      </TouchableOpacity>
    </PaperProvider>
  )
}

export default Short;