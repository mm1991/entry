/**
 * 登录表单部分
 */

import React, {useState} from 'react';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import MyInput from '../../../components/MyInput';

import {post} from '../../../utils/request';
import {setStorage} from '../../../utils/storage';
import {stores} from '../../../store';
import {Observer, useLocalObservable} from 'mobx-react';
import {i18nT} from '../../../i18n';

export default function Form({navigation}: {navigation: any}) {
  const store = useLocalObservable(() => stores);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 提交登录
  async function handleSubmit() {
    const data = {username, password};
    const res = await post('/auth/token', data);
    if (res.token) {
      // 将token存入store和本地存储中
      setStorage('userdata', res);
      store.setUserData(res);
      navigation.navigate('List');
    }
    // data.email = 'username@shopee.com';
    // data.avatar = 'https://coding.net/static/fruit_avatar/Fruit-15.png';
    // const res = await post('/join', data);
  }
  return (
    <Observer>
      {() => (
        <View>
          <View style={styles.inputWrapper}>
            <MyInput
              name={'username'}
              setValue={setUsername}
              inputPlaceHolder={i18nT('usernamePlaceholder')}
            ></MyInput>
            <MyInput
              name={'password'}
              setValue={setPassword}
              inputPlaceHolder={i18nT('passwordPlaceholder')}
            ></MyInput>
          </View>
          <TouchableHighlight onPress={handleSubmit}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.button}>{i18nT('signin')}</Text>
            </View>
          </TouchableHighlight>
        </View>
      )}
    </Observer>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    paddingBottom: 55,
  },
  buttonWrapper: {
    backgroundColor: '#D5EF7F',
    height: 64,
  },
  button: {
    fontSize: 16,
    lineHeight: 64,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
