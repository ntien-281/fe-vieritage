import { StyleSheet } from "react-native";

const BOTTOM_APPBAR_HEIGHT = 80;

const styles = StyleSheet.create({
  bottom: {
    justifyContent: "space-around",
    backgroundColor: 'aquamarine',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default styles;
export { BOTTOM_APPBAR_HEIGHT }