import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { useEffect, useState } from "react";
import {
  Appbar,
  IconButton,
  Text,
  TextInput,
  Button,
} from "react-native-paper";
import { useUploadShort, useUserStore } from "../../store";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { GenreSelect } from "../../components";
import axios from "axios";

const UploadPost = () => {
  const clearGenres = useUploadShort((state) => state.clearGenres);
  const [galleryItems, setGalleryItems] = useState([]);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);

  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const selectedGenres = useUploadShort((state) => state.selectedGenres);

  const user = useUserStore((state) => state.user);
  const userToken = user.token;

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
          mediaType: ["image"],
        });
        // setGalleryItems(userGalleryMedia.assets);
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

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [16, 9],
      quality: 1,
      base64: false,
    });

    if (!result.canceled) {
      console.log(result);
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
          setGalleryItems([
            ...galleryItems,
            { type: result.assets[0].type, url: response.data },
          ]);
        })
        .catch((error) => {
          console.error("Image upload failed");
          console.error(error);
        });
    }
  };

  const handleUploadPost = () => {
    axios.post(
      "https://veritage-culture.onrender.com/api/v1/posts/upload",
      {
        content,
        description,
        genres: selectedGenres,
        medias: galleryItems,
      },
      {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }
    ).then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error({ ...error });
    });
  };

  console.log(galleryItems);

  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.Content title="Upload post" />

        <View className="flex-row items-center p-1">
          <Text>Upload</Text>
          <IconButton icon="upload" onPress={handleUploadPost} />
        </View>
      </Appbar.Header>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <TextInput
            label="Content"
            mode="outlined"
            value={content}
            onChangeText={(text) => setContent(text)}
          />
          <TextInput
            label="Description"
            mode="outlined"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <View className="flex-1 items-center">
            <Button
              icon="image"
              mode="contained"
              className="mt-2 w-2/3"
              onPress={selectImage}
            >
              Chọn hình ảnh
            </Button>
          </View>
          <View></View>
          <GenreSelect />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadPost;
