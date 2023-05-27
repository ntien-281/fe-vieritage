import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { useEffect, useState } from "react";
import {
  Appbar,
  IconButton,
  Text,
  TextInput,
  Button,
} from "react-native-paper";
import { GenreSelect } from "../../components";
import { useUploadShort } from "../../store";
const UploadPost = () => {
  const clearGenres = useUploadShort((state) => state.clearGenres);

  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const selectedGenres = useUploadShort((state) => state.selectedGenres);
  const [images, setImages] = useState(1);

  useEffect(() => {
    return () => {
      clearGenres();
    };
  }, []);
  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.Content title="Upload post" />

        <View className="flex-row items-center p-1">
          <Text>Upload</Text>
          <IconButton icon="upload" onPress={() => {}} />
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
              onPress={() => {}}
            >
              Chọn hình ảnh
            </Button>
          </View>
          <View>
            {images && (
              <Image
                source={{
                  uri: "https://plus.unsplash.com/premium_photo-1668241683681-45500829fa42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                }}
                style={{ height: 200, width: 200 }}
              />
            )}
          </View>
          <GenreSelect />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadPost;
