import React from 'react';
import {Image, View, TouchableHighlight, StyleSheet, Text} from 'react-native';
import LogoCat from '../assets/images/logo-cat.svg';
import Home from '../assets/images/home.svg';
import LogoSearch from '../assets/images/search.svg';
import {stores} from '../store';
import {Observer, useLocalObservable} from 'mobx-react';

interface headerProps {
  switchNav?: Function;
  navigation?: any;
  Home: boolean;
}

export default function Header(props: headerProps) {
  const store = useLocalObservable(() => stores);
  const userData = store.userData;
  const userImage = userData && userData.user && userData.user.avatar;
  return (
    <Observer>
      {() => (
        <View style={styles.HeaderContainer}>
          {!props.Home && (
            <TouchableHighlight
              onPress={() => props.switchNav && props.switchNav(240)}
            >
              <View style={styles.searchWrapper}>
                <LogoSearch style={styles.searchImage} />
              </View>
            </TouchableHighlight>
          )}
          {props.Home && (
            <TouchableHighlight onPress={() => props.navigation.goBack()}>
              <View style={styles.searchWrapper}>
                <Home style={styles.searchImage} />
              </View>
            </TouchableHighlight>
          )}
          <LogoCat style={styles.loginImage} />
          {!!userImage && (
            <TouchableHighlight
              style={styles.avadarImageWrapper}
              onPress={() => props.navigation.navigate('User')}
            >
              <Image
                source={{
                  uri: userImage,
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

const styles = StyleSheet.create({
  HeaderContainer: {
    height: 40,
    backgroundColor: '#8560A9',
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
