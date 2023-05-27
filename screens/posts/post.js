import { SafeAreaView, ScrollView, View } from "react-native";
// import { Stack } from "expo-router";
import { Story, PostList } from "../../components";
import { Appbar } from "react-native-paper";
const Post = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.Content title="Post" />
        <Appbar.Action
          icon="plus-circle-outline"
          onPress={() => {
            navigation.navigate("Upload");
          }}
        />
        <Appbar.Action icon="heart-outline" />
      </Appbar.Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Story />
          <PostList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Post;
