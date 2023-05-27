import { TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Text, IconButton, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { GenreSelect } from "../components";
import { useUploadShort, useUserStore } from "../store";
import axios from "axios";

const UploadShort = () => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});
  const selectedGenres = useUploadShort((state) => state.selectedGenres);
  const clearGenres = useUploadShort((state) => state.clearGenres);
  const setDuration = useUploadShort((state) => state.setDuration);
  const shortDuration = useUploadShort((state) => state.shortDuration);
  const user = useUserStore((state) => state.user);
  const [description, setDescription] = useState("");
  const user_token = user?.token;

  useEffect(() => {
    return () => {
      clearGenres();
    };
  }, []);

  useEffect(() => {
    const getPermission = async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
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

  if (!hasGalleryPermission) {
    return (
      <View>
        <Text>Ứng dụng cần truy cập ảnh để thực hiện chức năng này.</Text>
      </View>
    );
  }

  const uploadImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
      base64: false,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedVideo(result.assets[0]);
      setDuration(result.assets[0]?.duration);
      const formData = new FormData();
      formData.append("file", {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      });
      axios
        .post("https://veritage-culture.onrender.com/api/v1/file", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("Image uploaded successfully");
          console.log(response.data);
          setSelectedVideo(response.data);
        })
        .catch((error) => {
          console.error("Image upload failed");
          console.error(error);
        });
    }
  };

  const handleUploadShort = () => {
    axios
      .post(
        "https://veritage-culture.onrender.com/api/v1/shorts/upload",
        {
          duration: shortDuration,
          genres: selectedGenres,
          url: selectedVideo,
          description: description,
        },
        {
          headers: {
            Authorization: "Bearer " + user_token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error({ ...error });
      });
  };

  return (
    <>
      <View className="flex-col items-center pt-3">
        <View className="w-full flex-row justify-between">
          <View className="w-2/3 gap-2 ml-2">
            <Button
              icon="image"
              mode="contained"
              onPress={uploadImage}
              className="mt-2"
            >
              Chọn video
            </Button>
            <View className="">
              <TextInput
                value={description}
                onChangeText={(text) => setDescription(text)}
                placeholder="Mô tả..."
              />
            </View>
          </View>
          <View className="rounded-full bg-green-400 mr-2">
            <TouchableOpacity onPress={handleUploadShort}>
              <IconButton icon="check-underline" size={40} />
            </TouchableOpacity>
          </View>
        </View>

        <GenreSelect />
      </View>
    </>
  );
};

export default UploadShort;
