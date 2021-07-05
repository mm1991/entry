/**
 * 登录页
 */

import * as React from 'react';
import {StyleSheet, ImageBackground, Text, View} from 'react-native';
import LogoCat from '../../assets/images/logo-cat.svg';
import Form from './components/Form';
import loginBack from '../../assets/images/Street-Dance-01.jpg';
// 多语言函数
import {i18nT} from '../../i18n';
import SwitchLang from '../../components/SwitchLang';
import {Observer} from 'mobx-react';

export default function Login({navigation}: {navigation: any}) {
  return (
    <Observer>
      {() => (
        <View style={styles.container}>
          <SwitchLang />
          <ImageBackground source={loginBack} style={styles.image}>
            <View style={styles.imageBg}></View>
            <Text style={styles.loginText1}>{i18nT('slogan')}</Text>
            <Text style={styles.loginText2}>{i18nT('name')}</Text>
            <View style={styles.imageWrapper}>
              <LogoCat style={styles.loginImage} />
            </View>
          </ImageBackground>
          <View style={styles.formWrapper}>
            <Form navigation={navigation}></Form>
          </View>
        </View>
      )}
    </Observer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#8560A9',
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  loginText1: {
    marginTop: 70,
    color: '#D5EF7F',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginText2: {
    marginTop: 35,
    color: '#D5EF7F',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    flex: 1,
  },
  formWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  loginImage: {
    width: 35,
    height: 40,
    marginLeft: 13,
    marginTop: 10,
  },
  imageWrapper: {
    position: 'absolute',
    top: 173,
    left: '50%',
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: '#D5EF7F',
    borderRadius: 64,
    marginLeft: -32,
  },
});
