import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Map from "../screens/map";
import Short from "../screens/short";
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
      <mTab.Screen name="Short" component={Short} />
      <mTab.Screen name="Post" component={Map} />
      <mTab.Screen name="Map" component={Map} />
      <mTab.Screen name="User" component={Map} />
    </mTab.Navigator>
  );
}
