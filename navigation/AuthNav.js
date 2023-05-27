import { StackNavigationProp, createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'

const Stack = createStackNavigator()

function AuthNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='SignUp' component={SignUp} />
    </Stack.Navigator>
  )
}

export default AuthNav
