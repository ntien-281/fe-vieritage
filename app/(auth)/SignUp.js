import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Link } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { TextInput, Button, Checkbox } from "react-native-paper";

const SignUp = () => {
  return (
    <SafeAreaView className="flex-1 px-[20px] pt-[25px] mb-[25px]">
      <View>
        <Text className="mt-[40px] text-[36px] font-[700] mb-[36px]">
          Sign Up
        </Text>
        <TextInput
          // value={formData.email}
          // onChangeText = {email => setEmail(email)}

          // onChangeText={(text) => handleChangeEmail(text)}
          className="rounded-[10px] py-[6px]"
          theme={{ roundness: 10 }}
          outlineColor="#bfc2c7"
          activeOutlineColor="#969393"
          placeholderTextColor="#969393"
          mode="outlined"
          placeholder="Enter Your Full Name"
          // left={
          //   <TextInput.Icon icon={require("../assets/icons/person_2.png")} />
          // }
        />
        <TextInput
          // value={formData.email}
          // onChangeText = {email => setEmail(email)}

          // onChangeText={(text) => handleChangeEmail(text)}
          className="mt-[18px] rounded-[10px] py-[6px]"
          theme={{ roundness: 10 }}
          outlineColor="#bfc2c7"
          activeOutlineColor="#969393"
          placeholderTextColor="#969393"
          mode="outlined"
          placeholder="Enter Your Email"
          // left={
          //   <TextInput.Icon icon={require("../assets/icons/person_2.png")} />
          // }
        />
        <TextInput
          // value={formData.password}
          // onChangeText={(text) => handleChangePassword(text)}
          // label="password"
          secureTextEntry={true}
          className="mt-[18px] rounded-[10px] py-[6px]"
          theme={{ roundness: 10 }}
          outlineColor="#bfc2c7"
          activeOutlineColor="#969393"
          placeholderTextColor="#969393"
          mode="outlined"
          placeholder="Enter Your Password"
          // left={<TextInput.Icon icon={require("../assets/icons/lock.png")} />}
          // right={
          //   <TextInput.Icon icon={require("../assets/icons/visibility.png")} />
          // }
        />
        <TextInput
          // value={formData.password}
          // onChangeText={(text) => handleChangePassword(text)}
          // label="password"
          secureTextEntry={true}
          className="mt-[18px] rounded-[10px] py-[6px]"
          theme={{ roundness: 10 }}
          outlineColor="#bfc2c7"
          activeOutlineColor="#969393"
          placeholderTextColor="#969393"
          mode="outlined"
          placeholder="Enter Your Confirm Password"
          // left={<TextInput.Icon icon={require("../assets/icons/lock.png")} />}
          // right={
          //   <TextInput.Icon icon={require("../assets/icons/visibility.png")} />
          // }
        />

        <TouchableOpacity>
          <Button
            // icon="camera"
            mode="contained"
            compact={true}
            className="rounded-[10px] py-[10px] bg-[#acbcff] mt-[36px]"
            // onPress={handleSignIn}
            // onPress={() => signIn()}
          >
            <Text className="text-[20px] font-[700] my-0">&nbsp; Sign Up</Text>
          </Button>
        </TouchableOpacity>
        <Text className="text-center flex flex-row justify-center items-center mt-[48px] text-[16px] leading-[20px]">
          Already have an account?
          <Text> </Text>
          <Link href="/sign-in">
            <Text className="font-[700]">Sign In</Text>
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
