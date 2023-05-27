import { PaperProvider } from "react-native-paper";
import { Text } from "react-native";
import { NavBar } from "../components";
import { Provider } from "../context/auth";
import { Stack } from "expo-router";


const Home = () => {
  return (
    <PaperProvider>
      <Text>app/index</Text>
    </PaperProvider>
  );
};

export default Home;
