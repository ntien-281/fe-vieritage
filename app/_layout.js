// Layout for screens in this directory, also support nextjs-like routing

import { Stack } from "expo-router";
import { NavBar } from "../components";
import { Provider } from "../context/auth";
import { useRouter } from "expo-router";
import { usePathname } from "expo-router";

const Layout = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    // Setup the auth context and render our layout inside of it.
    <Provider>
      <Stack />
      {pathname === "/sign-in" ||
      pathname === "/SignUp" ||
      pathname === "ForgetPassword" ? (
        ""
      ) : (
        <NavBar />
      )}
    </Provider>
  );
};

export default Layout;
