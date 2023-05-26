import api from "./api";
import useUserStore from "../store/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const login = async (email, password) => {
  console.log('debug',email, password);
  try {
    const response = await axios.post(`/auth/login`, {
      email,
      password,
    });
    console.log(response.data);
    let userInfo = response.data;
    let userToken = response.data?.token;
    console.log(userToken);
    await AsyncStorage.setItem("user", JSON.stringify(response.data));
    await AsyncStorage.setItem("token", JSON.stringify(response.data?.token));
    useUserStore.setState({ user: response.data?.user });

    // Đăng nhập thành công, chuyển đến màn hình chính
    // navigateToMainScreen();
  } catch (error) {
    // Xử lý lỗi đăng nhập
    console.error(error);
  }
  
};

const checkAuthLogged = async (isLoading, setIsLoading) => {
  try {
    setIsLoading(true);
    const user = await AsyncStorage.getItem("user");
    const token = await AsyncStorage.getItem("token");
    if (user && token) {
      // Nếu có, cập nhật trạng thái người dùng trong store Zustand
      useAuthStore.setState({ user: JSON.parse(user) });
      useAuthStore.setState({ token: JSON.parse(token) });
    } else {
      // Nếu không, chuyển đến màn hình đăng nhập
    //   navigateToLoginScreen();
    console.log('no user');
    }
    setIsLoading(false);
  } catch (error) {
    console.error(error);
  }
    
};

// Đăng xuất
const logout = async (isLoading, setIsLoading) => {
  try {
    setIsLoading(true)
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    useAuthStore.setState({ user: null });
    useAuthStore.setState({ token: null });
    // navigateToLoginScreen();
    setIsLoading(false)
  } catch (error) {
    console.error(error);
  }
};
