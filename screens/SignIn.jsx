import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { login } from "../api/userApi";
import { shallow } from "zustand/shallow";
import { useUserStore } from "../store/index";
import { Pressable } from "react-native";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [user, setUser] = useUserStore(
    (state) => [state.user, state.setUser],
    shallow
  );
  console.log('user', user);
  
  if (user?.token) {
    navigation.navigate("ShortNav");
  }
  return (
    <SafeAreaView className="mb-[25px] flex-1 px-[20px] pt-[25px]">
      <View>
        <Text className="mb-[36px] mt-[54px] text-[36px] font-[700]">
          Đăng nhập
        </Text>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          className="mt-[8px] rounded-[10px] py-[6px]"
          theme={{ roundness: 10 }}
          outlineColor="#bfc2c7"
          activeOutlineColor="#969393"
          placeholderTextColor="#969393"
          mode="outlined"
          placeholder="Nhập email của bạn"
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          className="mt-[24px] rounded-[10px] py-[6px]"
          theme={{ roundness: 10 }}
          outlineColor="#bfc2c7"
          activeOutlineColor="#969393"
          placeholderTextColor="#969393"
          mode="outlined"
          placeholder="Nhập mật khẩu của bạn"
        />
        <View className="mt-[16px] flex flex-row items-center justify-end">
          <TouchableOpacity>
            <Text className="text-[16px] text-[#969393] underline">
              Quên mật khẩu
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Button
            mode="contained"
            compact={true}
            className="mt-[36px] rounded-[10px] bg-[#A0D8B3] py-[10px]"
            onPress={() => {
              login(email, password, setUser);
            }}
          >
            <Text className="my-0 text-[20px] font-[700]">&nbsp; Đăng nhập</Text>
          </Button>
        </TouchableOpacity>
        <View className="mt-[160px] flex flex-row items-center justify-center text-center">
          <Text className="text-[16px]">Chưa có tài khoản? </Text>
          <TouchableOpacity>
            <Text
              className="font-[700]"
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
            Đăng ký
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
