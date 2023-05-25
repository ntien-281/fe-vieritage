import { Text, View } from 'react-native';

const User = () => {
  return (
    <View>
      <Text className = "text-red-600">User screen</Text>
      <View className="px-6 py-6 bg-blue-500">
        <Text>Long</Text>
      </View>
    </View>
  )
}

export default User;