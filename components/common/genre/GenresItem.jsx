import { View, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { IconButton, Text } from "react-native-paper";
import { useUploadShort } from "../../../store";

const GenreItem = ({ item }) => {
  const itemRef = useRef(null);
  const [selected, setSelected] = useState(false);

  const addGenre = useUploadShort((state) => state.addGenre);
  const removeGenre = useUploadShort((state) => state.removeGenre);

  const handlePress = () => {
    if (!selected) {
      addGenre(item._id);
      setSelected(true);
    } else {
      removeGenre(item._id);
      setSelected(false);
    }
  };

  return (
    <View
      className={`mb-3 ${
        selected ? "rounded-full border-2 border-blue-500 bg-blue-400" : ""
      }`}
      ref={itemRef}
    >
      <TouchableOpacity
        className="flex-row items-center pl-7"
        onPressOut={handlePress}
      >
        <IconButton icon="check" size={40} iconColor="black" />
        <Text variant="titleMedium" className="text-black">
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenreItem;
