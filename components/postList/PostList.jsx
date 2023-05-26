import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Divider } from "react-native-paper";
import PostCard from "../common/cards/PostCard";
import { useRouter } from "expo-router";
import axios from "axios";
import { BOTTOM_APPBAR_HEIGHT } from "../common/navbar/NavBar.style";
const PostList = () => {
  const router = useRouter();

  // save data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  // get data
  const getPostsOfuser = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "http://172.17.14.84:5000/api/v1/posts?userId=646ef3637251a0220e25132a",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDZmNTA2MDcwOGRiNzNlY2M2Y2ZmZTkiLCJuYW1lIjoiS2hhbmgiLCJpYXQiOjE2ODUwMTY2NzIsImV4cCI6MTY4NzYwODY3Mn0.L2m1KT2rcQRIJvSwLUWX3YSSAgDlPIPU1oHua8LjbxY",
          },
        }
      );
      setPosts(res.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
      refetchPosts();
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPostsOfuser();
  }, []);
  // refetch
  const refetchPosts = () => {
    setIsLoading(true);
    getPostsOfuser();
  };

  //
  return (
    <View style={{ paddingBottom: BOTTOM_APPBAR_HEIGHT }}>
      <View>
        <Divider />
      </View>

      <View>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          posts?.map((post) => (
            <PostCard
              post={post}
              key={`post-${post._id}`}
              handleNavigate={() => router.push(`/post/${post._id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default PostList;
