import { View, FlatList, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";

import { getAllGenres } from "../../../api/genre";
import {
  ActivityIndicator,
  Divider,
  IconButton,
  Text,
} from "react-native-paper";
import GenreItem from "./GenreItem";
import { useUploadShort, useUserStore } from "../../../store";

const GenreSelect = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(false);
  const user = useUserStore((state) => state.user);
  const user_token = user?.token;

  const selectedGenres = useUploadShort((state) => state.selectedGenres);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const data = await getAllGenres(user_token);
      if (data) {
        console.log(data);
        setIsLoading(false);
        setGenres(data);
      } else {
        setIsLoading(true);
        setError(true);
      }
    };
    fetch();
  }, []);

  console.log(selectedGenres);

  return (
    <View className="mt-1">
      {isLoading ? (
        <ActivityIndicator
          animating
          color="black"
          size={80}
          className="absolute m-auto"
        />
      ) : error ? (
        <Text className="text-2xl text-black">Có lỗi xảy ra.</Text>
      ) : (
        <View className="w-screen">
          <View className="mb-3 flex-row items-center">
            <IconButton icon="arrow-down-bold" disabled iconColor="black" />
            <Text variant="titleLarge">Chọn phân loại:</Text>
          </View>
          <Divider />
          <SafeAreaView className="mb-48 px-3 py-6">
            <FlatList
              data={genres}
              renderItem={(item) => (
                <>
                  <GenreItem item={item.item || item} />
                  <Divider />
                </>
              )}
              keyExtractor={(item) => item._id}
              windowSize={6}
              initialNumToRender={6}
              maxToRenderPerBatch={6}
              contentContainerStyle={{
                paddingBottom: 240,
              }}
            />
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export default GenreSelect;
