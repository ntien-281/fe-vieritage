import { Text, SafeAreaView, ScrollView, View, Image } from "react-native";
import { Stack } from "expo-router";
import { NotifiBtn, CreatePost, Search, Story, PostList } from "../components";
const Post = () => {
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerLeft: () => <CreatePost />,
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
