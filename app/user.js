import { Text, View, Button } from "react-native";
import { useCountStore } from "../store/index";
import { shallow } from "zustand/shallow";
import { useAuth } from "../context/auth";


const User = () => {
  const { signOut } = useAuth();
  const count = useCountStore((state) => state.count);
  const increment = useCountStore((state) => state.increment);
  const decrement = useCountStore((state) => state.decrement);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    className="bg-blue-500">
      {/* <Text className="text-red-600">User screen</Text>
      <View className="px-6 py-6 bg-blue-500">
        <Text>Long</Text>
        <Text>Count: {count}</Text>
        <Button title="Increment" onPress={increment} />
        <Button title="Decrement" onPress={decrement} />
      </View> */}
        <Text
           onPress={() => signOut()}
          className="text-red-700 text-[18px]"
        >
          Sign Out
        </Text>
      </View>
  );
};

export default User;
