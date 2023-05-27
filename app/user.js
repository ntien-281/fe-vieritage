import { Text, View, Button } from "react-native";
import { useCountStore } from "../store/index";
import { shallow } from "zustand/shallow";
import { useAuth } from "../context/auth";
import { logout } from "../api/userApi";
import { useUserStore } from "../store/index";

const User = () => {
  const { signOut } = useAuth();
  const [user, setUser] = useUserStore(
    (state) => [state.user, state.setUser],
    shallow
  );
  const handleSignOut = () => {
    logout();
    setUser({user: {}});
    signOut();
  };
  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      className="bg-blue-500"
    >
      <Text>{user.user.name}</Text>
      <Text onPress={handleSignOut} className="text-red-700 text-[18px]">
        Sign Out
      </Text>
    </View>
  );
};

export default User;
