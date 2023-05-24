import { useRouter } from 'expo-router';
import { Appbar, FAB, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import styles from './NavBar.style';
import { BOTTOM_APPBAR_HEIGHT } from './NavBar.style';

const NavBar = () => {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();

  const router = useRouter();

  return (
    <Appbar
      style={[
        styles.bottom,
        {
          height: BOTTOM_APPBAR_HEIGHT + bottom,
          backgroundColor: theme.colors.elevation.level2,
        },
      ]}
      safeAreaInsets={{ bottom }}
    >
      <Appbar.Action icon="play-box-outline" onPress={() => { router.push('./short') }} />
      <Appbar.Action icon="post-outline" onPress={() => { router.push('./post') }} />
      <Appbar.Action icon="map" onPress={() => { router.push('./map') }} />
      <Appbar.Action icon="account" onPress={() => { router.push('./user') }} />
    </Appbar>
  )
}

export default NavBar;