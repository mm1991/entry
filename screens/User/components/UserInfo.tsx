/**
 * 我的 - 顶部个人信息组件
 */

import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Email from '../../../assets/images/email.svg';
import {userInfoType} from '../../../types/types';
import {TEXT_PURPLE, TEXT_NORMAL} from '../../../styles';
import {resetGlobalState} from 'mobx/dist/internal';

export default function UserInfo({userData}: {userData: userInfoType}) {
  const {avatar, email, username} = userData;
  return (
    <View style={styles.UserWrapper}>
      <Image
        source={{
          uri: avatar,
        }}
        style={styles.userImage}
      ></Image>
      <Text style={styles.name}>{username}</Text>
      <View style={styles.emailWrapper}>
        <Email style={styles.emailImg} />
        <Text style={styles.emailText}>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  UserWrapper: {
    alignItems: 'center',
  },
  helpLinkText: {
    textAlign: 'center',
  },
  userImage: {
    width: 72,
    height: 72,
    marginTop: 36,
    marginBottom: 24,
    borderRadius: 72,
    borderWidth: 3,
    borderColor: 'rgba(208, 194, 229, 1)',
  },
  name: {
    color: TEXT_NORMAL,
    fontSize: 24,
    lineHeight: 31,
    paddingBottom: 8,
  },
  emailWrapper: {
    flexDirection: 'row',
  },
  emailImg: {
    width: 16,
    height: 13,
    marginTop: 3,
    marginRight: 6,
  },
  emailText: {
    color: TEXT_PURPLE,
    fontSize: 14,
    paddingBottom: 24,
  },
});
