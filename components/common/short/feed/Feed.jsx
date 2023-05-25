import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useRef } from "react";

import styles from "./feed.styles";
import ShortSingle from "../video/ShortSingle";

const Feed = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  const mediaRefs = useRef([]);
  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach((element) => {
      const cell = mediaRefs.current[element.key];
      if (cell) {
        // console.log(element);
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
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        windowSize={4}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100
        }}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.short}>
              <ShortSingle
                ref={(ShortSingleRef) => (mediaRefs.current[item] = ShortSingleRef)}
                short={item}
              />
            </View>
          );
        }}
        keyExtractor={item => item}
        decelerationRate={"normal"}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </View>
  );
};

export default Feed;
