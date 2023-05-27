import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { GenreSelect } from "../components";
import { useUploadShort } from "../store";


const UploadShort = () => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const selectedGenres = useUploadShort((state) => state.selectedGenres);
  const clearGenres = useUploadShort((state) => state.clearGenres);
  const setDuration = useUploadShort((state) => state.setDuration);
  const shortDuration = useUploadShort((state) => state.shortDuration);

  useEffect(() => {
    return () => {
      clearGenres();
    }
  }, [])

  useEffect(() => {
    const getPermission = async () => {

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status == "granted");

      if (galleryStatus.status == "granted") {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["video"],
        });
        setGalleryItems(userGalleryMedia.assets);
      }
    };
    getPermission();
  }, []);


  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspectRatio: [16, 9],
      quality: 1
    })
    if (!result.canceled) {
      setSelectedVideo(result.assets[0]);
      setDuration(result.assets[0]?.duration);
    }
  }

  if (!hasGalleryPermission) {
    return (
      <View>
        <Text>
          Ứng dụng cần truy cập ảnh để thực hiện chức năng này.
        </Text>
      </View>
    );
  }
  console.log(selectedVideo);
  return (
    <>

      <View className="items-center flex-col">
        <View>
          <Button icon="image" mode="contained" onPress={pickFromGallery} className="w-2/3 mt-2">
            Chọn video
          </Button>
        </View>
        
        <GenreSelect />
      </View>
    </>
  );
};

export default UploadShort;
