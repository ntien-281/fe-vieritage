import { StyleSheet, Dimensions } from "react-native";


import { BOTTOM_APPBAR_HEIGHT } from "../../navbar/NavBar.style";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  short: {
    flex: 1, 
    backgroundColor: "black",
    height: Dimensions.get('window').height - BOTTOM_APPBAR_HEIGHT - 4
  }
})

export default styles;