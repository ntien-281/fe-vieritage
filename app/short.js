import { Text, View, ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Feed } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';


const Short = () => {
  return (
    <View>
      <Feed />
    </View>
  )
}

export default Short;