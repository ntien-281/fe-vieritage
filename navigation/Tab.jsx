import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Map from "../screens/map";
import ShortNav from "./shortNav";
import PostNav from "./PostNav";
const mTab = createBottomTabNavigator();

export default function Tab() {
  const insets = useSafeAreaInsets();

  return (
    <mTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 64 + insets.bottom,
        },
        tabBarItemStyle: {
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <mTab.Screen
        name="ShortNav"
        component={ShortNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="heart"
              size={24}
              color={focused ? "#000000" : "#9e9e9e"}
            />
          ),
        }}
      />
      <mTab.Screen
        name="Post"
        component={PostNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="post"
              size={24}
              color={focused ? "#000000" : "#9e9e9e"}
            />
          ),
        }}
      />
      <mTab.Screen name="Map" component={Map} />
      <mTab.Screen name="User" component={Map} />
    </mTab.Navigator>
  );
}
