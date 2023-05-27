import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { Link } from "expo-router";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  TextInput,
  Button,
} from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import { useUserStore } from "../store";
import { shallow } from "zustand/shallow";
import { register } from "../api/userApi";


const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [inputDate, setInputDate] = React.useState(undefined);

  const [user, setUser] = useUserStore(
    (state) => [state.user, state.setUser],
    shallow
  );
  // console.log("2002-02-02");
  const handleSignUp = () => {
    register(name, email, password, inputDate, setUser);
  }

  console.log(user?.token);
  if (user?.token) {
    navigation.navigate("Map");
  }

  console.log(name, email, password, confirmPassword, inputDate);

  return (
    <SafeAreaView className="mb-[25px] flex-1 px-[20px] pt-[25px]">
      <View>
        <Text className="mb-[36px] mt-[40px] text-[36px] font-[700]">
          Sign Up
        </Text>
        <TextInput
          onChangeText={(text) => setName(text)}
          className="rounded-[10px] py-[6px]"
          theme={{ roundness: 10 }}
          outlineColor="#bfc2c7"
          activeOutlineColor="#969393"
          placeholderTextColor="#969393"
          mode="outlined"
          placeholder="Enter Your Full Name"
        />
        <TextInput
          onChangeText={(text) => setEmail(text)}
          className="mt-[18px] rounded-[10px] py-[6px]"
          theme={{ roundness: 10 }}
          outlineColor="#bfc2c7"
          activeOutlineColor="#969393"
          placeholderTextColor="#969393"
          mode="outlined"
          placeholder="Enter Your Email"
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          className="mt-[18px] rounded-[10px] py-[6px]"
          theme={{ roundness: 10 }}
          outlineColor="#bfc2c7"
          activeOutlineColor="#969393"
          placeholderTextColor="#969393"
          mode="outlined"
          placeholder="Enter Your Password"
        />
        <TextInput
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
          className="mt-[18px] rounded-[10px] py-[6px]"
          theme={{ roundness: 10 }}
          outlineColor="#bfc2c7"
          activeOutlineColor="#969393"
          placeholderTextColor="#969393"
          mode="outlined"
          placeholder="Enter Your Confirm Password"
        />
        <DatePickerInput
          theme={{
            colors: {
              primary: "black",
              underlineColor: "transparent",
            },
          }}
          locale="en"
          label="Birthdate"
          className="mt-[24px] bg-white text-black"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          inputMode="start"
        />

        <TouchableOpacity>
          <Button
            // icon="camera"
            mode="contained"
            compact={true}
            className="mt-[36px] rounded-[10px] bg-[#A0D8B3] py-[10px]"
            onPress={handleSignUp}
          >
            <Text className="my-0 text-[20px] font-[700]">&nbsp; Sign Up</Text>
          </Button>
        </TouchableOpacity>
        <View className="mt-[48px] flex flex-row items-center justify-center text-center text-[16px] leading-[20px]">
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text className="font-[700]">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
