import { Text, View, ScrollView } from 'react-native';
import { ActivityIndicator, PaperProvider, Searchbar } from 'react-native-paper';
import { Feed, Search } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';


const Short = () => {


  return (
    <PaperProvider>
        <Stack.Screen options={{ headerShown: false, headerShadowVisible: false }} />
        <Search />
        <Feed />
    </PaperProvider>
  )
}

export default Short;