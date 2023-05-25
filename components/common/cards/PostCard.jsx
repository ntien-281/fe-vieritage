import { Avatar, Button, Card, Text } from "react-native-paper";
import { View } from "react-native";
import { useState } from "react";
import { SliderBox } from "react-native-image-slider-box";

const PostCard = ({ post }) => {
  const [images, setImages] = useState([
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?tree",
  ]);
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
          <Avatar.Image
            size={36}
            source={{ uri: "https://picsum.photos/700" }}
          />
          <Text>username</Text>
        </View>
        <View>
          <Text variant="bodySmall">2h ago</Text>
        </View>
      </View>
      <Card.Content
        style={{ flex: 1, alignItems: "flex-start", marginVertical: 10 }}
      >
        <Text variant="titleLarge">Review title</Text>
        <Text variant="bodyMedium" displayLa>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum,
          quis reiciendis vero deserunt minima, non obcaecati mollitia
          consequuntur sed eius tenetur atque.
        </Text>
      </Card.Content>
      {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
      <View
        style={{
          alignContent: "center",
          flex: 1,
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <SliderBox
          images={images}
          sliderBoxHeight={200}
          resieMode="contain"
          dotColor="#ffdf"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={10}
        />
      </View>
      <Card.Actions>
        <Button>Share</Button>
        <Button>Like</Button>
      </Card.Actions>
    </Card>
  );
};

export default PostCard;
