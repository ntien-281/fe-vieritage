import { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { Stack } from "expo-router";

const Search = () => {
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <>
      {openSearch && (
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              placeholder="Tìm kiếm"
              style={styles.searchInput}
              autoFocus={true}
            />
          </View>
        </View>
      )}
      <IconButton
        icon={`${openSearch ? "close" : "magnify"}`}
        onPress={() => setOpenSearch(!openSearch)}
      ></IconButton>
    </>
  );
};

const SearchBar = () => {
  return (
    <View>
      <TextInput />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    padding: 10,
    width: 190,
  },
  searchWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#d9dbda",
    borderRadius: 5,
  },
  searchInput: {
    width: "100%",
    height: "100%",
    marginLeft: 10,
  },
});
