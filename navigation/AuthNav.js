import { createStackNavigator } from '@react-navigation/stack'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import { useUserStore } from '../store';
import { shallow } from 'zustand/shallow'
import CreateEventScreen from '../admin/screens/CreateEventScreen';

const Stack = createStackNavigator()

function AuthNav() {
  const [user, userDetail, setUserDetail] = useUserStore((state) => [state.user, state.userDetail, setUserDetail], shallow)
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='Event' component={CreateEventScreen} />
    </Stack.Navigator>
  )
}

export default AuthNav
