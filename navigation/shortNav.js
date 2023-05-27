import { createStackNavigator } from '@react-navigation/stack'
import UploadShort from '../screens/upload'
import Short from '../screens/short'


const Stack = createStackNavigator()

function ShortNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Short' component={Short} />
      <Stack.Screen name='Upload' component={UploadShort} />
    </Stack.Navigator>
  )
}

export default ShortNav
