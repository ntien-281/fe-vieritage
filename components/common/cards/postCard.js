import { Avatar, Button, Card, Text, Chip } from "react-native-paper";
import { View } from "react-native";

import { useState } from "react";
import { SliderBox } from "react-native-image-slider-box";

const PostCard = ({ post }) => {
  const [images, setImages] = useState([
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?tree",
  ]);

  //

  const { createdUser, updatedAt, queryGenres } = post;

  const datePost = new Date(updatedAt).toLocaleString("en-GB", {
    hour12: false,
  });

  return (
    <Card style={{ padding: 10, marginBottom: 15 }}>
      {/* <Card.Title title="avt" /> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Avatar.Image size={36} source={{ uri: `${createdUser?.avatar}` }} />
          <Text>{createdUser?.name}</Text>
        </View>
        <View>
          <Text variant="bodySmall">{updatedAt && datePost.slice(0, 17)}</Text>
        </View>
      </View>
      {/* content */}
      <Card.Content
        style={{
          flex: 1,
          alignItems: "flex-start",
          marginVertical: 10,
          gap: 5,
        }}
      >
        <Text variant="titleLarge">{post?.content}</Text>
        <Text variant="bodyMedium">{post?.description}</Text>
        <View className="flex-1 flex-row flex-wrap items-center justify-start">
          {/* arrray return genres */}
          {queryGenres?.map((genres) => (
            <Chip
              icon="tag-outline"
              key={`genres-${genres._id}`}
              style={{ marginRight: 5 }}
              textStyle={{ fontSize: 12 }}
              onPress={() => console.log("Pressed")}
            >
              {genres.name}
            </Chip>
          ))}
        </View>
      </Card.Content>

      {/* img */}
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
          marginVertical: 5,
        }}
      >
        <SliderBox
          images={images}
          onCurrentImagePressed={(i) => console.log(i)}
          sliderBoxHeight={200}
          resieMode="contain"
          dotColor="#ffdf"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={5}
        />
      </View>
      {/* <Card.Actions>  
      button
      */}
      <View className="flex-1 flex-row items-start justify-between">
        <View className="flex-row items-center">
          <Button icon="heart-outline" />
          <Button icon="comment-outline" />
          <Button icon="send" />
        </View>
        <View className="items-center justify-end">
          <Button icon="bookmark-outline" />
        </View>
      </View>
      {/* </Card.Actions> */}
    </Card>
  );
};

export default PostCard;
