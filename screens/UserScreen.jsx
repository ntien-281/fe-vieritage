import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { shallow } from "zustand/shallow";
import { logout, getCurrentUser } from "../api/userApi";
import { useUserStore } from "../store/index";
import { Avatar, Button } from "react-native-paper";
import {
  MaterialCommunityIcons,
  Feather,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";

const UserScreen = () => {
  const [user, setUser, userDetail, setUserDetail] = useUserStore(
    (state) => [
      state.user,
      state.setUser,
      state.userDetail,
      state.setUserDetail,
    ],
    shallow
  );
  const handleSignOut = () => {
    logout();
    setUser({ user: {} });
  };
  useEffect(() => {
    getCurrentUser(user?.token, setUserDetail);
  }, []);
  const [isPost, setIsPost] = useState(true);

  return (
    <View className="mt-[24px] px-4 py-8">
      <View>
        <Text className="text-[30px] font-[700]">my account</Text>
        <View>
          <View className="mt-[36px] flex-row items-center">
            <View className="mr-[20px]">
              <Avatar.Image
                size={50}
                source={require("../assets/images/avt.jpg")}
              />
            </View>
            <View className="flex">
              <Text className="text-[20px] font-[500]">{user?.user?.name}</Text>
              <Text className="text-[16px] text-[#969393]">
                {userDetail?.data?.email}
              </Text>
            </View>
          </View>
          <View className="mt-[24px] flex-row items-center">
            <TouchableOpacity onPress={handleSignOut}>
              <Button mode="contained" className="rounded-[10px] bg-[#A0D8B3]">
                <Text className="ml-[20px] text-[14px]">Sign Out</Text>
              </Button>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-between">
          <Pressable onPress={() => setIsPost(true)}>
            <View
              className="mt-[24px] flex-row items-center p-[8px]"
              style={isPost && styles.isActive}
            >
              <MaterialCommunityIcons name="post" size={24} color="black" />
              <Text className="ml-[20px] text-[20px]">My Posts</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setIsPost(false)}>
            <View
              className="mt-[24px] flex-row items-center p-[8px]"
              style={!isPost && styles.isActive}
            >
              <AntDesign name="videocamera" size={24} color="black" />
              <Text className="ml-[20px] text-[20px]">My Shorts</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View>
        {/* <Text onPress={handleSignOut} className="text-[18px] text-red-700">
          Sign Out
        </Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  isActive: {
    backgroundColor: "#A0D8B3",
    borderRadius: 8,
  },
});

export default UserScreen;
