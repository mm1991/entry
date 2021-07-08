/**
 * 输入框
 */

import React, {useState} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import User from '../assets/images/user.svg';
import Password from '../assets/images/password.svg';
import {TEXT_NORMAL_LIGHT, BORDER_PURPLE} from '../styles';

const MyInput = React.memo(
  ({
    name,
    setValue,
    inputPlaceHolder,
  }: {
    name: string;
    setValue: Function;
    inputPlaceHolder: string;
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
      <View
        style={[
          styles.inputWrapper,
          isFocused && {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
        ]}
      >
        <View style={styles.labelWrapper}>
          {name === 'username' && <User style={styles.userImage} />}
          {name === 'password' && <Password style={styles.userImage} />}
        </View>
        <TextInput
          placeholder={inputPlaceHolder}
          placeholderTextColor={TEXT_NORMAL_LIGHT}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          onChangeText={value => setValue(value)}
        ></TextInput>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputWrapper: {
    borderWidth: 1,
    borderColor: BORDER_PURPLE,
    borderRadius: 20,
    width: 240,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 16,
    height: 40,
    lineHeight: 40,
    flexDirection: 'row',
  },
  labelWrapper: {
    width: 34,
  },
  helpLinkText: {
    textAlign: 'center',
  },
  userImage: {
    width: 14,
    height: 14,
    marginTop: 13,
    marginLeft: 13,
  },
});

export default MyInput;
