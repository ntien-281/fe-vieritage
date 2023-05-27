import { View, FlatList, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";

import { getAllGenres } from "../../../api/genre";
import { ActivityIndicator, Divider, IconButton, Text } from "react-native-paper";
import GenreItem from "./GenreItem";
import { useUploadShort } from "../../../store";


const GenreSelect = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(false);

  
  const selectedGenres = useUploadShort((state) => state.selectedGenres);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const data = await getAllGenres();
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
    <View className="mt-4">
      {isLoading ? (
        <ActivityIndicator 
          animating
          color="black"
          size={80}
          className="m-auto absolute"
        />
      ) : error ? (
        <Text className="text-black text-2xl">Có lỗi xảy ra.</Text>
      ) : (
        <View className="w-screen">
          <View className="mb-3 flex-row items-center">
            <IconButton icon="arrow-down-bold" disabled iconColor="black" />
            <Text variant="titleLarge">Chọn phân loại cho short:</Text>
          </View>
          <Divider />
          <SafeAreaView className="px-3 py-6 mb-48">
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
                paddingBottom: 240
              }}
            />
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export default GenreSelect;
