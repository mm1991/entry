/**
 * 我的 - 顶部个人信息组件
 */

import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import Email from '../../../assets/images/email.svg';
import {userInfoType} from '../../../types/types';

interface userInfoProps {
  userData: userInfoType;
}

export default function UserInfo(props: userInfoProps) {
  const {avatar, email, username} = props.userData;
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
    borderColor: '#8560A9',
  },
  name: {
    color: '#67616D',
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
    color: '#8560A9',
    fontSize: 14,
    paddingBottom: 24,
  },
});
