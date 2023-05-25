import { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Divider } from "react-native-paper";
import PostCard from "../common/cards/PostCard";
import { useRouter } from "expo-router";
const PostList = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  return (
    <View>
      <View>
        <Divider />
      </View>

      <View>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data?.map((post) => (
            <PostCard
              post={post}
              key={`post-${post}`}
              handleNavigate={() => router.push(`/post/${post.post_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default PostList;
