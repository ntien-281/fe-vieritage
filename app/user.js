import { Text, View, Button } from "react-native";
import { useCountStore } from "../store/index";
import { shallow } from "zustand/shallow";

const User = () => {
  const count = useCountStore((state) => state.count);
  const increment = useCountStore((state) => state.increment);
  const decrement = useCountStore((state) => state.decrement);

  return (
    <View>
      <Text className="text-red-600">User screen</Text>
      <View className="px-6 py-6 bg-blue-500">
        <Text>Long</Text>
        <Text>Count: {count}</Text>
        <Button title="Increment" onPress={increment} />
        <Button title="Decrement" onPress={decrement} />
      </View>
    </View>
  );
};

export default User;
