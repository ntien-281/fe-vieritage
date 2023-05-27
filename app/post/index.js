import { Text, SafeAreaView, ScrollView, View, Image } from "react-native";
import { Stack, useRouter } from "expo-router";
import {
  NotifiBtn,
  CreatePost,
  Search,
  Story,
  PostList,
} from "../../components";
import {
  Modal,
  Portal,
  Button,
  PaperProvider,
  IconButton,
} from "react-native-paper";
const Post = () => {
  const route = useRouter();

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerLeft: () => (
            <IconButton
              icon="plus-circle-outline"
              size={25}
              onPress={() => route.push("/post/upload")}
            />
          ),
          headerRight: () => (
            <>
              <Search />
              <NotifiBtn />
            </>
          ),
          headerTitle: "",
        }}
      />

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
