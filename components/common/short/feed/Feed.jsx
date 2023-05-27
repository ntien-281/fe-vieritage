import { View, Text, FlatList } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";

import styles from "./feed.styles";
import ShortSingle from "../video/ShortSingle";

import { getAllShortsOfUser } from "../../../../api/short";

const USER_DEV_ID = "646ef3637251a0220e25132a";

const Feed = () => {

  const [shortOfUser, setShortOfUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await getAllShortsOfUser(USER_DEV_ID);
      if (res) {
        setShortOfUser(res);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        setError(true);
      }
    };
    fetch();
  }, []);

  const mediaRefs = useRef([]);
  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        if (element.isViewable) {
          cell.play();
        } else {
          cell.stop();
        }
      }
    });
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View className="flex justify-center items-center" style={styles.short}>
          <ActivityIndicator 
            animating
            color="white"
            size={80}
            className="m-auto absolute"
          />
        </View>
      ) : error ? (
        <View className="flex justify-center items-center" style={styles.short}>
          <Text className="text-white text-2xl">Có lỗi xảy ra.</Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          windowSize={6}
          removeClippedSubviews
          initialNumToRender={2}
          maxToRenderPerBatch={4}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 90,
          }}
          data={shortOfUser}
          renderItem={({ item }) => {
            return (
              <View style={styles.short}>
                <ShortSingle
                  ref={(ShortSingleRef) =>
                    (mediaRefs.current[item._id] = ShortSingleRef)
                  }
                  item={item}
                />
              </View>
            );
          }}
          keyExtractor={item => item._id}
          decelerationRate={"normal"}
          onViewableItemsChanged={onViewableItemsChanged.current}
        />
      )}
    </View>
  );
};

export default Feed;