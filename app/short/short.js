import { PaperProvider, IconButton } from 'react-native-paper';
import { Feed, Search } from '../../components';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';


const Short = () => {
  const router = useRouter();

  return (
    <PaperProvider>
      <Stack.Screen options={{ headerShown: false, headerShadowVisible: false }} />
      <Search />
      <Feed />
      <TouchableOpacity className="absolute right-2 top-12 mt-9" onPress={() => { router.push('short/upload') }}>
        <IconButton 
          icon="plus-circle"
          size={40}
          iconColor='white'
          animated
        />
      </TouchableOpacity>
    </PaperProvider>
  )
}

export default Short;