import { useRouter } from 'expo-router';
import { Appbar, FAB, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCurrentTab } from '../../../store';

import styles from './NavBar.style';
import { BOTTOM_APPBAR_HEIGHT } from './NavBar.style';

const NavBar = () => {
  const tabs = ['short', 'post', 'map', 'user'];
  const setTab = useCurrentTab((state) => state.setTab);

  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();

  const router = useRouter();

  const handlePush = (tab) => {
    router.push(`${tab}`);
    setTab(tab);
  }

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
      <Appbar.Action icon="play-box-outline" onPress={() => { handlePush(tabs[0]) }} />
      <Appbar.Action icon="post-outline" onPress={() => { handlePush(tabs[1]) }} />
      <Appbar.Action icon="map" onPress={() => { handlePush(tabs[2]) }} />
      <Appbar.Action icon="account" onPress={() => { handlePush(tabs[3]) }} />
    </Appbar>
  )
}

export default NavBar;