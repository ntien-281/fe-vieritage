import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Link } from "expo-router";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { login } from "../../api/userApi";
import { shallow } from "zustand/shallow";
import { useUserStore } from "../../store/index";

const SignIn = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser], shallow);

  // console.log('UserSignIn',user);
  if(user?.user?.name) {
    signIn()
  }

  return (
    <SafeAreaView className="flex-1 px-[20px] pt-[25px] mb-[25px]">
      <View>
        <Text className="mt-[54px] text-[36px] font-[700] mb-[36px]">
          Sign In
        </Text>
        <TextInput
          // value={formData.email}
          // onChangeText = {email => setEmail(email)}

          // onChangeText={(text) => handleChangeEmail(text)}
          onChangeText={(text) => setEmail(text)}
          className="mt-[8px] rounded-[10px] py-[6px]"
          theme={{ roundness: 10 }}
          outlineColor="#bfc2c7"
          activeOutlineColor="#969393"
          placeholderTextColor="#969393"
          mode="outlined"
          placeholder="Enter Your Email"
        />
        <TextInput
          // value={formData.password}
          // onChangeText={(text) => handleChangePassword(text)}
          // label="password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          className="mt-[24px] rounded-[10px] py-[6px]"
          theme={{ roundness: 10 }}
          outlineColor="#bfc2c7"
          activeOutlineColor="#969393"
          placeholderTextColor="#969393"
          mode="outlined"
          placeholder="Enter Your Password"
        />
        <View className="flex justify-end items-center flex-row mt-[16px]">
          <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate("ForgotPassword");
          // }}
          >
            <Text className="text-[#969393] text-[16px] underline">
              Forget Password?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Button
            // icon="camera"
            mode="contained"
            compact={true}
            className="rounded-[10px] py-[10px] bg-[#acbcff] mt-[36px]"
            // onPress={handleSignIn}
            onPress={() => {
              login(email, password, setUser);
            }}
          >
            <Text className="text-[20px] font-[700] my-0">&nbsp; Sign In</Text>
          </Button>
        </TouchableOpacity>
        <Text className="text-center flex flex-row justify-center items-center mt-[160px] text-[16px] leading-[20px]">
          Don't have an account?
          <Text> </Text>
          <Link href="/SignUp">
            <Text className="font-[700]">Sign Up</Text>
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
