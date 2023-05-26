import InstaStory from "react-native-insta-story";
import { TouchableOpacity, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
const data = [
  {
    user_id: 1,
    user_image: "https://picsum.photos/700",
    user_name: "Dy.Knhh",
    stories: [
      {
        story_id: 1,
        story_image:
          "https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg",
        swipeText: "Custom swipe text for this story",
        onPress: () => console.log("story 1 swiped"),
      },
      {
        story_id: 2,
        story_image:
          "https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg",
      },
    ],
  },
  {
    user_id: 2,
    user_image:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    user_name: "TestUser",
    stories: [
      {
        story_id: 1,
        story_image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU",
        swipeText: "Custom swipe text for this story",
        onPress: () => console.log("story 1 swiped"),
      },
      {
        story_id: 2,
        story_image:
          "https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg",
        swipeText: "Custom swipe text for this story",
        onPress: () => console.log("story 2 swiped"),
      },
    ],
  },
];
const Story = () => {
  return (
    <>
      <InstaStory
        data={data}
        duration={10}
        renderSwipeUpComponent={() => (
          <>
            <View
              style={{
                position: "absolute",
                bottom: 20,
                left: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginVertical: 10,
                width: "100%",
              }}
            >
              <TextInput
                placeholder="send message"
                placeholderTextColor="white"
                style={{
                  borderColor: "white",
                  borderRadius: 25,
                  width: "85%",
                  height: 50,
                  paddingLeft: 20,
                  borderWidth: 1,
                  fontSize: 20,
                  color: "white",
                }}
              />
              <TouchableOpacity>
                <Button
                  icon="send"
                  textColor="white"
                  style={{ fontSize: 30 }}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      />
    </>
  );
};

export default Story;
