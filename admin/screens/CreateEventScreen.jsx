import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Button, Checkbox, RadioButton, TextInput } from "react-native-paper";
import { useUserStore } from "../../store";
import { useState } from "react";
import api from "../../api/api"
import { shallow } from "zustand/shallow";

const CreateEventScreen = () => {
  const [user] = useUserStore((state) => [state.user], shallow);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const handleSave = () => {
    console.log(title, desc, address, lat, long);
  };

  const postEvent = async () => {
    try {
      const response = await api.get(
        `events`,
        {
          title: title,
          description: desc,
          address: address,
          lat: lat,
          long: long,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      console.log(response.data);
    } catch (error) {
      // Xử lý lỗi tại đây
      console.error(error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text className="font-app-semibold mt-4 h-[58] w-full text-left text-3xl font-semibold text-black">
        Thêm sự kiện mới
      </Text>
      <Text className="mt-4 font-semibold">Tiêu đề</Text>
      <View className="flex-row items-center">
        <TextInput
          onChangeText={(text) => setTitle(text)}
          multiline
          mode="outlined"
          color
          className="mr-3 flex-1 bg-transparent"
        />
      </View>
      <Text className="text-base font-semibold">Địa điểm</Text>
      <TextInput
        onChangeText={(text) => setAddress(text)}
        multiline
        mode="outlined"
        color
        className="mr-3  bg-transparent"
      />

      <Text className="mt-4 font-semibold">Mô tả</Text>
      <View className="flex-row items-center">
        <TextInput
          onChangeText={(text) => setDesc(text)}
          multiline
          mode="outlined"
          color
          className="mr-3 flex-1 bg-transparent"
        />
      </View>

      <Text className="mt-4 font-semibold">Lat</Text>
      <View className="flex-row items-center">
        <TextInput
          onChangeText={(text) => setLat(+text)}
          multiline
          mode="outlined"
          color
          className="mr-3 flex-1 bg-transparent"
        />
      </View>

      <Text className="mt-4 font-semibold">Long</Text>
      <View className="flex-row items-center">
        <TextInput
          onChangeText={(text) => setLong(+text)}
          multiline
          mode="outlined"
          color
          className="mr-3 flex-1 bg-transparent"
        />
      </View>

      <Button
        buttonColor="#A0D8B3"
        mode="contained"
        className="mt-6"
        onPress={handleSave}
      >
        <Text className="text-base text-black">Lưu</Text>
      </Button>
    </ScrollView>
  );
};

export default CreateEventScreen;
