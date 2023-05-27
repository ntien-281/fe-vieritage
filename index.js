import { View, Text } from 'react-native'
import React from 'react'
import { registerRootComponent } from 'expo'

import { NavigationContainer } from '@react-navigation/native'
// import Tab from '~/components/navigation/Tab'
import { useCallback, useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { shallow } from 'zustand/shallow'
import Tab from './navigation/Tab'
import CustomSafeAreaView from './components/common/CustomSafeAreaView'
import { useUserStore } from './store'
import AuthNav from './navigation/AuthNav'
import { LogBox } from 'react-native'

LogBox.ignoreAllLogs() //Ignore all log notifications

const App = () => {
  const [user] = useUserStore((state) => [state.user], shallow)
  return (
    <SafeAreaProvider>
      <CustomSafeAreaView>
        <NavigationContainer>{user?.token ? <Tab /> : <AuthNav />}</NavigationContainer>
      </CustomSafeAreaView>
    </SafeAreaProvider>
  )
}

registerRootComponent(App)
