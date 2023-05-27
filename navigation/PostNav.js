import { createStackNavigator } from "@react-navigation/stack";
import Post from "../screens/posts/post";
import UploadPost from "../screens/posts/upload";
const Stack = createStackNavigator();

function PostNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PostNav" component={Post} />
      <Stack.Screen name="Upload" component={UploadPost} />
    </Stack.Navigator>
  );
}

export default PostNav;
