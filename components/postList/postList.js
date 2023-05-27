import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Divider } from "react-native-paper";
import PostCard from "../common/cards/postCard";
import axios from "axios";
import { BOTTOM_APPBAR_HEIGHT } from "../common/navbar/NavBar.style";
import { useUserStore } from "../../store";
const PostList = () => {
  // save data
  const user = useUserStore((state) => state.user);
  // console.log(user);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  // get data
  const getPostsOfuser = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://veritage-culture.onrender.com/api/v1/posts/recommend?type=unverified",
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(res.data);
      setPosts(res.data.data);
      setIsLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPostsOfuser();
  }, []);

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
              //   handleNavigate={() => router.push(`/post/${post._id}`)
              // }
            />
          ))
        )}
      </View>
    </View>
  );
};

export default PostList;
