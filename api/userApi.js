import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { shallow } from "zustand/shallow";
import { useUserStore } from "../store";
import axios from "axios";

export const login = async (email, password, setUser) => {
  console.log("debug", email, password);
  try {
    const response = await api.post(`/auth/login`, {
      email,
      password,
    });
    console.log("debug", response.data);
    await AsyncStorage.setItem("user", JSON.stringify(response.data));
    await AsyncStorage.setItem("token", JSON.stringify(response.data?.token));
    const user = response.data;
    if(user){
      setUser(user)
    }
    
    // // Đăng nhập thành công, chuyển đến màn hình chính
    // // navigateToMainScreen();
  } catch (error) {
    // Xử lý lỗi đăng nhập
    console.error({ ...error });
  }
};

// Đăng xuất
export const logout = async () => {
  try {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error(error);
  }
};

export const checkAuthLogged = async (isLoading, setIsLoading) => {
  try {
    setIsLoading(true);
    const user = await AsyncStorage.getItem("user");
    const token = await AsyncStorage.getItem("token");
    if (user && token) {
      // Nếu có, cập nhật trạng thái người dùng trong store Zustand
      const [setUser] = useUserStore((state) => [state.setUser], shallow);
      setUser(user);
    } else {
      console.log("no user");
    }
    setIsLoading(false);
  } catch (error) {
    console.error(error);
  }
};
