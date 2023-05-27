import { View, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { Button, IconButton, Text } from "react-native-paper";
// import * as ImagePicker from "expo-image-picker";
// import * as MediaLibrary from "expo-media-library";
import { GenreSelect } from "../../components";

const UploadPost = () => {
  const router = useRouter();
  // const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});

  // useEffect(() => {
  //   const getPermission = async () => {

  //     const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     setHasGalleryPermission(galleryStatus.status == "granted");

  //     if (galleryStatus.status == "granted") {
  //       const userGalleryMedia = await MediaLibrary.getAssetsAsync({
  //         sortBy: ["creationTime"],
  //         mediaType: ["video"],
  //       });
  //       setGalleryItems(userGalleryMedia.assets);
  //     }
  //   };
  //   getPermission();
  // }, []);

  const handleUpload = () => {};

  // const pickFromGallery = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Videos,
  //     allowsEditing: true,
  //     aspectRatio: [16, 9],
  //     quality: 1
  //   })
  //   if (!result.canceled) {
  //     setSelectedVideo(result.assets[0]);
  //   }
  // }

  // if (!hasGalleryPermission) {
  //   return (
  //     <View>
  //       <Text>Ứng dụng cần truy cập ảnh để thực hiện chức năng này.</Text>
  //     </View>
  //   );
  // }
  // console.log(galleryItems);
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Đăng tải post",
          headerRight: () => (
            <Button
              icon="check"
              mode="contained"
              onPress={() => {
                router.back();
              }}
            >
              Xong
            </Button>
          ),
          headerStyle: { backgroundColor: "white" },
        }}
      />

      <View className=" items-center flex-col">
        <View>
          <Button icon="image" mode="contained" className="w-2/3 mt-2">
            Chọn video
          </Button>
        </View>

        <GenreSelect text="post" />
      </View>
    </>
  );
};

export default UploadPost;
