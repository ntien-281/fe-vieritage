import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useRef } from "react";

import styles from "./feed.styles";
import ShortSingle from "../video/ShortSingle";

const Feed = () => {

  const mediaRefs = useRef([]);
  const data = ["hjelo", "kjhawd", "qo3d", "wwqd"];

  const onViewableItemChange = useRef(({changed}) => {
    changed.forEach((element, index) => {
      const cell = mediaRefs[index];
      if (cell) {
        if (element.isViewable) {
          cell.play();
        }
        else {
          cell.stop(); 
        }
      }
    })
  })


  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      data={data}
      renderItem={({ item, index }) => {
        return (
          <View style={styles.short}>
            <ShortSingle ref={PostSingleRef => (mediaRefs.current[item] = PostSingleRef)} />
          </View>
        )
      }}
      keyExtractor={ item => item }
      decelerationRate={'normal'}
    />
  );
};

export default Feed;
