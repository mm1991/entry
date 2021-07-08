import React from 'react';
import {Image, View, TouchableHighlight, StyleSheet, Alert} from 'react-native';
import LogoCat from '../assets/images/logo-cat.svg';
import HomeImg from '../assets/images/home.svg';
import LogoSearch from '../assets/images/search.svg';
import {stores} from '../store';
import {Observer, useLocalObservable} from 'mobx-react';
import {BACKGROUND_PURPLE} from '../styles';

const Header = React.memo(
  ({
    switchNav,
    navigation,
    Home,
  }: {
    switchNav?: Function;
    navigation?: any;
    Home: boolean;
  }) => {
    const store = useLocalObservable(() => stores);
    const userData = store.userData;
    const homePress = () => {
      if (!Home) {
        switchNav && switchNav(240);
      } else {
        navigation.goBack();
      }
    };
    return (
      <Observer>
        {() => (
          <View style={styles.HeaderContainer}>
            <TouchableHighlight
              onPress={() => {
                homePress();
              }}
            >
              <View style={styles.searchWrapper}>
                {!Home ? (
                  <LogoSearch style={styles.searchImage} />
                ) : (
                  <HomeImg style={styles.searchImage} />
                )}
              </View>
            </TouchableHighlight>
            <LogoCat style={styles.loginImage} />
            {!!userData.user.avatar && (
              <TouchableHighlight
                style={styles.avadarImageWrapper}
                onPress={() => navigation.navigate('User')}
              >
                <Image
                  source={{
                    uri: userData.user.avatar,
                  }}
                  style={styles.avadarImage}
                />
              </TouchableHighlight>
            )}
          </View>
        )}
      </Observer>
    );
  }
);

const styles = StyleSheet.create({
  HeaderContainer: {
    height: 40,
    backgroundColor: BACKGROUND_PURPLE,
    width: '100%',
    zIndex: 4,
  },
  loginImage: {
    width: 21,
    height: 24,
    left: '50%',
    top: 8,
    marginLeft: -10,
  },
  avadarImageWrapper: {
    position: 'absolute',
    right: 14,
    top: 9,
  },
  avadarImage: {
    width: 24,
    height: 24,
    borderRadius: 24,
  },
  searchImage: {
    width: 24,
    height: 24,
    position: 'relative',
    top: 8,
  },
  searchWrapper: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: 16,
    top: 0,
  },
});

export default Header;
