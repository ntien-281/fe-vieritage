// Layout for screens in this directory, also support nextjs-like routing

import { Stack } from 'expo-router';
import {NavBar} from '../components'; 


const Layout = () => {
  return (
    <>
      <Stack />
      <NavBar />
    </>
  )
}

export default Layout