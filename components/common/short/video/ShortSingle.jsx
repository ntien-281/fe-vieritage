import React, { forwardRef, useRef } from "react";
import { Video } from "expo-av";

import styles from "./shortsingle.styles";

const ShortSingle = forwardRef((props, ref) => {

  const play = async () => {
    if (ref.current == null) return;
    const status = await ref.current.getStatusAsync();
    if (status?.isPlaying) {
      return;
    }
    try {
      await ref.current.playAsync();
    } catch (e) {
      console.log(e);
    }
  };

  const stop = async () => {
    if (ref.current == null) return;
    const status = await ref.current.getStatusAsync();
    if (!status?.isPlaying) {
      return;
    }
    try {
      await ref.current.stopAsync();
    } catch (e) {
      console.log(e);
    }
  };

  const unload = async () => {
    if (ref.current == null) return;
    try {
      await ref.current.unloadAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Video
      ref={ref}
      style={styles.container}
      resizeMode="cover"
      shouldPlay={true}
      source={{
        uri: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4",
      }}
    />
  );
});

export default ShortSingle;