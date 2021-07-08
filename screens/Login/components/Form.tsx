/**
 * 登录表单部分
 */

import React, {useState} from 'react';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import MyInput from '../../../components/MyInput';
import {Observer} from 'mobx-react';
import {i18nT} from '../../../i18n';
import {GREEN} from '../../../styles';

export default function Form({handleSubmit}: {handleSubmit: Function}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
          <TouchableHighlight
            onPress={() => {
              handleSubmit({username, password});
            }}
          >
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
    backgroundColor: GREEN,
    height: 64,
  },
  button: {
    fontSize: 16,
    lineHeight: 64,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
