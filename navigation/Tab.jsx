import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Map from "../screens/map";
import ShortNav from "./shortNav";
<<<<<<< HEAD
import PostNav from "./PostNav";
=======
import UserScreen from "../screens/UserScreen";
import {
  MaterialCommunityIcons,
  Feather,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
>>>>>>> main
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
<<<<<<< HEAD
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="heart"
              size={24}
              color={focused ? "#000000" : "#9e9e9e"}
            />
=======
          tabBarLabel: "ShortNav",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="video" size={24} color="black" />
>>>>>>> main
          ),
        }}
      />
      <mTab.Screen
        name="Post"
<<<<<<< HEAD
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
=======
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
>>>>>>> main
    </mTab.Navigator>
  );
}
