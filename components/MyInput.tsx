/**
 * 输入框
 */

import React, {useState} from 'react';
import {TextInput, View, Image, StyleSheet} from 'react-native';
import User from '../assets/images/user.svg';
import Password from '../assets/images/password.svg';

interface inputProps {
  name: string;
  setValue: Function;
  inputPlaceHolder: string;
}

export default function MyInput(props: inputProps) {
  const imageSource = props.name === 'username' ? User : Password;
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      style={[
        styles.inputWrapper,
        isFocused && {backgroundColor: 'rgba(255, 255, 255, 0.2)'},
      ]}
    >
      <View style={styles.labelWrapper}>
        <Image
          source={{
            uri: imageSource,
          }}
          style={styles.userImage}
        ></Image>
      </View>
      <TextInput
        placeholder={props.inputPlaceHolder}
        placeholderTextColor={'#AC8EC9'}
        selectionColor={'#000'}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        onChangeText={value => props.setValue(value)}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#D3C1E5',
    borderRadius: 20,
    width: 240,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 16,
    height: 40,
    lineHeight: 40,
    display: 'flex',
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
