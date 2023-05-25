import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Video } from "expo-av";
import { Avatar, IconButton, Text } from 'react-native-paper';
import { Animated, Pressable, View } from "react-native";

import styles from "./shortsingle.styles";

const ShortSingle = forwardRef(({ short }, ref) => {
  const shortRef = useRef(null);
  useImperativeHandle(ref, () => ({
    play,
    unload,
    stop
  }), [])

  const pauseOpacity = useRef(new Animated.Value(0)).current;
  const playOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    return () => unload();
  }, [])

  const fadeInOut = (someOpacity) => {
    Animated.sequence([
      Animated.timing(someOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(someOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }

  const play = async () => {
    if (shortRef.current == null) return;
    const status = await shortRef.current.getStatusAsync();
    if (status?.isPlaying) {
      return;
    }
    try {
      await shortRef.current.playAsync();
    } catch (e) {
      console.log(e);
    }
  };

  const stop = async () => {
    if (shortRef.current == null) return;
    const status = await shortRef.current.getStatusAsync();
    if (!status?.isPlaying) {
      return;
    }
    try {
      await shortRef.current.stopAsync();
    } catch (e) {
      console.log(e);
    }
  };

  const unload = async () => {
    if (shortRef.current == null) return;
    try {
      console.log("Unloaded");
      await shortRef.current.unloadAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTouch = async () => {
    if (shortRef.current == null) return;
    const status = await shortRef.current.getStatusAsync();
    if (status?.isPlaying) {
      try {
        fadeInOut(pauseOpacity);
        await shortRef.current.pauseAsync();
      } catch (e) {
        console.log(e);
      }
    }
    else {
      try {
        fadeInOut(playOpacity);
        await shortRef.current.playAsync();
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <>
      <Pressable className="bg-transparent absolute bottom-0 left-0 top-0 right-0 z-10 flex items-center justify-center"
        onPressOut={handleTouch}
      >
        <View className="absolute">
          <IconButton
            icon="play-circle"
            size={70}
            style={{
              opacity: playOpacity
            }}
            />
        </View>
        <View className="absolute">
          <IconButton
            icon="pause-circle"
            size={70}
            style={{
              opacity: pauseOpacity
            }}
            />
        </View>
      </Pressable>


      <Video
        ref={shortRef}
        style={styles.container}
        resizeMode="cover"
        shouldPlay={true}
        isLooping
        source={{
          uri: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4",
        }}
      />

      <View className="absolute bottom-5 w-2/3 left-3 z-20">
        <View className="w-1/3">
          <Avatar.Image source={{ uri: "https://www.pngitem.com/pimgs/m/421-4213053_default-avatar-icon-hd-png-download.png"}} size=
          {60} />
          <Text variant="titleMedium" className="text-white">user_name</Text>
        </View>
        <View>
          <Text variant="bodyMedium" className="text-white" numberOfLines={2}>Shorts description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac tellus iaculis, tincidunt lectus sit amet, vehicula eros. Integer luctus nisi ac ante tincidunt, nec maximus lectus elementum. Donec in tristique felis. Fusce interdum non sapien eu fermentum. Fusce ex metus, lobortis ac aliquam sed, molestie et justo. Nullam fringilla erat non massa viverra iaculis. Sed sit amet nisi vehicula, mollis nisl non, ullamcorper felis. Curabitur convallis laoreet egestas. Sed tempus imperdiet lectus, et ullamcorper turpis vestibulum id. Vivamus lacinia iaculis arcu in viverra.</Text>
        </View>
      </View>

      <View className="absolute flex flex-col justify-around bottom-0 right-0 z-20">
        <IconButton
          size={36}
          iconColor="white"
          icon="heart-outline"
          onPress={() => {}}
        />
        <IconButton
          size={36}
          iconColor="white"
          icon="comment-outline"
          onPress={() => {}}
        />
        <IconButton
          size={36}
          iconColor="white"
          icon="dots-horizontal"
          onPress={() => {}}
        />
        <IconButton
          size={36}
          iconColor="white"
          icon="share-outline"
          onPress={() => {}}
        />
      </View>
    </>
  );
});

export default ShortSingle;