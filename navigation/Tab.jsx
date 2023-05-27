import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Map from "../screens/map";
import ShortNav from "./shortNav";
import UserScreen from "../screens/UserScreen";
import {
  MaterialCommunityIcons,
  Feather,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
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
          tabBarLabel: "ShortNav",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="videocamera" size={24} color="black" />
          ),
        }}
      />
      <mTab.Screen
        name="Post"
        component={Map}
        options={{
          tabBarLabel: "Post",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="post" size={24} color="black" />
          ),
        }}
      />

      <mTab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: "Post",
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" size={24} color="black" />
          ),
        }}
      />
      <mTab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: "Post",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={24} color="black" />
          ),
        }}
      />
    </mTab.Navigator>
  );
}
