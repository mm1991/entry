/**
 * 登录页
 */

import * as React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StyleSheet, ImageBackground, Text, View} from 'react-native';
import LogoCat from '../../assets/images/logo-cat.svg';
import Form from './components/Form';
// 多语言函数
import {i18nT} from '../../i18n';
import SwitchLang from '../../components/SwitchLang';
import {Observer, useLocalObservable} from 'mobx-react';
import {RootStackParamList} from '../../types/types';
import ImageBack from '../../assets/images/Street-Dance-01.jpg';
import {loginApi, joinApi} from '../../utils/api';
import {setStorage} from '../../utils/storage';
import {stores} from '../../store';
import {GREEN, BACKGROUND_PURPLE} from '../../styles';

export default function Login({
  navigation,
}: StackScreenProps<RootStackParamList, 'Login'>) {
  const store = useLocalObservable(() => stores);
  // 提交登录
  const handleSubmit = async data => {
    const res = await loginApi(data);
    // const res = await joinApi(data);
    if (res) {
      // 将token存入store和本地存储中
      setStorage('userdata', res);
      store.setUserData(res);
      navigation.push('List');
    }
  };
  return (
    <Observer>
      {() => (
        <View style={styles.container}>
          <SwitchLang />
          <ImageBackground source={ImageBack} style={styles.image}>
            <View style={styles.imageBg}></View>
            <Text style={styles.loginText1}>{i18nT('slogan')}</Text>
            <Text style={styles.loginText2}>{i18nT('name')}</Text>
            <View style={styles.imageWrapper}>
              <LogoCat style={styles.loginImage} />
            </View>
          </ImageBackground>
          <View style={styles.formWrapper}>
            <Form handleSubmit={handleSubmit}></Form>
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
    backgroundColor: BACKGROUND_PURPLE,
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
    color: GREEN,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginText2: {
    marginTop: 35,
    color: GREEN,
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
    borderColor: GREEN,
    borderRadius: 64,
    marginLeft: -32,
  },
});
