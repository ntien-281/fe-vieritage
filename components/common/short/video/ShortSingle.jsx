import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Video } from "expo-av";
import { Avatar, IconButton, Text } from 'react-native-paper';
import { Animated, Pressable, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import styles from "./shortsingle.styles";

import { upVote } from "../../../../api/short";
import { useCurrentTab } from "../../../../store";

const ShortSingle = forwardRef(({ short }, ref) => {
  const shortRef = useRef(null);
  const [lastView, setLastView] = useState(false)
  useImperativeHandle(ref, () => ({
    play,
    unload,
    stop
  }), [])

  const pauseOpacity = useRef(new Animated.Value(0)).current;
  const playOpacity = useRef(new Animated.Value(0)).current;

  const currentTab = useCurrentTab((state) => state.currentTab);

  useEffect(() => {
    return () => unload();
  }, [])

  useEffect(() => {
    tabChangeShortHandle();
  }, [currentTab])
  
  const tabChangeShortHandle = async () => {
    const status = await shortRef.current.getStatusAsync();
    if (currentTab !== 'short') {
      if (status?.isPlaying) {
        setLastView(true);
        await shortRef.current.pauseAsync();
      }
    }
    else {
      if (lastView) {
        await shortRef.current.playAsync();
        setLastView(false);
      }
    }
  }

  const fadeInOut = (someOpacity) => {
    Animated.sequence([
      Animated.timing(someOpacity, {
        toValue: 1,
        duration: 100,
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

  const handleTap = async () => {
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


  const SingleTap = Gesture.Tap().maxDuration(200).onTouchesUp(handleTap);
  const DoubleTap = Gesture.Tap().maxDuration(200).onTouchesUp(() => {});

  console.log(lastView);
  return (
    <>
      <GestureDetector className=""
        gesture={Gesture.Exclusive(DoubleTap, SingleTap)}
      >
        <View className="bg-transparent absolute bottom-0 left-0 top-0 right-0 z-10 flex items-center justify-center">
          <View className="absolute">
            <IconButton
              icon="play-circle"
              size={70}
              style={{
                opacity: playOpacity,
              }}
              iconColor="white"
              />
          </View>
          <View className="absolute">
            <IconButton
              icon="pause-circle"
              size={70}
              style={{
                opacity: pauseOpacity
              }}
              iconColor="white"
              />
          </View>
        </View>
      </GestureDetector>


      <Video
        ref={shortRef}
        style={styles.container}
        resizeMode="cover"
        isLooping
        source={{
          uri: `https://${short.url}`,
        }}
      />

      <View className="absolute bottom-5 w-2/3 left-3 z-20">
        <View className="w-1/3">
          <Avatar.Image source={{ uri: short.createdUser.avatar }} size=
          {60} />
          <Text variant="titleMedium" className="text-white">{short.createdUser.name}</Text>
        </View>
        <View>
          <Text variant="bodyMedium" className="text-white" numberOfLines={2}>Shorts description. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac tellus iaculis, tincidunt lectus sit amet, vehicula eros. Integer luctus nisi ac ante tincidunt, nec maximus lectus elementum. Donec in tristique felis. Fusce interdum non sapien eu fermentum. Fusce ex metus, lobortis ac aliquam sed, molestie et justo. Nullam fringilla erat non massa viverra iaculis. Sed sit amet nisi vehicula, mollis nisl non, ullamcorper felis. Curabitur convallis laoreet egestas. Sed tempus imperdiet lectus, et ullamcorper turpis vestibulum id. Vivamus lacinia iaculis arcu in viverra.</Text>
        </View>
      </View>

      <View className="absolute flex flex-col justify-around bottom-0 right-0 z-20">
        <IconButton
          size={36}
          iconColor="white"
          icon={short.userUpvoted ? "arrow-up-bold" : "arrow-up-bold-outline"}
          onPress={() => { upVote(short._id) }}
        />
        <IconButton
          size={36}
          iconColor="white"
          icon={short.userDownvoted ? "arrow-down-bold" : "arrow-down-bold-outline"}
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