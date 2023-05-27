import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Video } from "expo-av";
import { Avatar, IconButton, Text } from "react-native-paper";
import { Animated, View, TouchableOpacity } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import styles from "./shortsingle.styles";

import {
  upvote,
  disupvote,
  disdownvote,
  downvote,
  getShort,
} from "../../../../api/short";
import { useCurrentTab, useUserStore } from "../../../../store";
import { formatCompactNumber } from "../../../../utils";

const ShortSingle = forwardRef(({ item }, ref) => {
  const [short, setShort] = useState(item);
  const [upState, setUpState] = useState(short.userUpvoted);
  const [downState, setDownState] = useState(short.userDownvoted);

  const user = useUserStore((state) => state.user);
  const user_token = user?.token;

  const shortRef = useRef(null);
  const [lastView, setLastView] = useState(false);
  useImperativeHandle(
    ref,
    () => ({
      play,
      unload,
      stop,
    }),
    []
  );

  const pauseOpacity = useRef(new Animated.Value(0)).current;
  const playOpacity = useRef(new Animated.Value(0)).current;

  const currentTab = useCurrentTab((state) => state.currentTab);

  useEffect(() => {
    tabChangeShortHandle();
  }, [currentTab]);

  const tabChangeShortHandle = async () => {
    const status = await shortRef.current.getStatusAsync();
    if (currentTab !== "short") {
      if (status?.isPlaying) {
        setLastView(true);
        await shortRef.current.pauseAsync();
      }
    } else {
      if (lastView) {
        await shortRef.current.playAsync();
        setLastView(false);
      }
    }
  };

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
  };

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
    } else {
      try {
        fadeInOut(playOpacity);
        await shortRef.current.playAsync();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleUpvote = async () => {
    let res;
    if (short.userUpvoted) {
      setUpState(false);
      res = await disupvote(short._id, user_token);
    } else {
      setUpState(true);
      res = await upvote(short._id, user_token);
    }
    if (res) {
      console.log(res);
      let newShort = await getShort(short._id, user_token);
      setShort(newShort);
      setUpState(newShort.userUpvoted);
      setDownState(newShort.userDownvoted);
    }
  };

  const handleDownvote = async () => {
    let res;
    if (short.userDownvoted) {
      setDownState(false);
      res = await disdownvote(short._id, user_token);
    } else {
      setDownState(true);
      res = await downvote(short._id, user_token);
    }
    if (res) {
      console.log(res);
      let newShort = await getShort(short._id, user_token);
      setShort(newShort);
      setDownState(newShort.userDownvoted);
      setUpState(newShort.userUpvoted);
    }
  };

  const SingleTap = Gesture.Tap().maxDuration(200).onTouchesUp(handleTap);
  const DoubleTap = Gesture.Tap()
    .maxDuration(200)
    .onTouchesUp(() => {});

  return (
    <>
      <GestureDetector
        className=""
        gesture={Gesture.Exclusive(DoubleTap, SingleTap)}
      >
        <View className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-transparent">
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
                opacity: pauseOpacity,
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

      <View className="absolute bottom-5 left-3 z-20 w-2/3">
        <View className="w-1/3">
          <Avatar.Image
            source={{
              uri:
                short.createdUser.avatar ||
                "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg",
            }}
            size={60}
          />
          <Text variant="titleMedium" className="text-white">
            {short.createdUser.name}
          </Text>
        </View>
        <View>
          <Text variant="bodyMedium" className="text-white" numberOfLines={2}>
            {short?.description || "Video không có chú thích"}
          </Text>
        </View>
      </View>

      <View className="absolute bottom-0 right-0 z-20 mb-3 flex flex-col justify-around">
        <TouchableOpacity style={styles.iconButton} onPress={handleUpvote}>
          <IconButton
            size={36}
            iconColor="white"
            icon={upState ? "arrow-up-bold" : "arrow-up-bold-outline"}
            animated
          />
          <Text variant="labelLarge" className="text-white">
            {formatCompactNumber(short.upvotes.length)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleDownvote}>
          <IconButton
            size={36}
            iconColor="white"
            icon={downState ? "arrow-down-bold" : "arrow-down-bold-outline"}
            animated
          />
          <Text variant="labelLarge" className="text-white">
            {formatCompactNumber(short.downvotes.length)}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
});

ShortSingle.displayName = "ShortSingle";

export default ShortSingle;
