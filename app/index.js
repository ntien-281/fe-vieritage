import { PaperProvider } from 'react-native-paper';
import { Text } from 'react-native'

const Home = () => {
  return (
    <PaperProvider>
      <Text>app/index</Text>
    </PaperProvider>
  );
}

export default Home;