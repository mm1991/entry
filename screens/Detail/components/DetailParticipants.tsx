/**
 * 详情liked going展示头像部分
 */

import * as React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';

import CheckOutlineLogo from '../../../assets/images/check-outline.svg';
import LikeOutlineLogo from '../../../assets/images/like-outline.svg';
import {detail, participantsType, likesType} from '../../../types/types';

interface DetailParticipantsProps {
  detail: detail;
  participants: Array<participantsType>;
  likes: Array<likesType>;
}

export default function DetailParticipants(props: DetailParticipantsProps) {
  const {detail, participants, likes} = props;
  const participantsList =
    participants &&
    participants.map((item, index) => {
      return (
        <Image
          style={styles.goingImage}
          source={{
            uri: item.avatar,
          }}
          key={index}
        ></Image>
      );
    });
  const likesList =
    likes &&
    likes.map((item, index) => {
      return (
        <Image
          style={styles.goingImage}
          source={{
            uri: item.avatar,
          }}
          key={index}
        ></Image>
      );
    });
  return (
    <View style={styles.participants}>
      <View style={styles.goingWrapper}>
        <View style={styles.timeWraper}>
          <CheckOutlineLogo style={styles.bottomImage} />
          <Text style={styles.ItemGoingText}>{detail.goings_count} Going</Text>
        </View>
        {participants && participants.length > 0 && (
          <View style={styles.ImageWraper}>{participantsList}</View>
        )}
      </View>
      <View style={styles.likesWrapper}>
        <View style={styles.timeWraper}>
          <LikeOutlineLogo style={styles.bottomImage} />
          <Text style={styles.ItemGoingText}>{detail.likes_count} Likes</Text>
        </View>
        {likes && likes.length > 0 && (
          <View style={styles.ImageWraper}>{likesList}</View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  participants: {
    marginTop: 12,
    marginBottom: 4,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
  },
  timeWraper: {
    display: 'flex',
    flexDirection: 'row',
    width: 70,
    height: 35,
  },
  bottomImage: {
    width: 12,
    height: 10,
    marginTop: 3,
    marginRight: 5,
  },
  ItemGoingText: {
    fontSize: 12,
    color: '#AC8EC9',
  },
  goingWrapper: {
    flexDirection: 'row',
  },
  likesWrapper: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    paddingTop: 12,
  },
  goingImage: {
    width: 24,
    height: 24,
    borderRadius: 24,
    marginBottom: 12,
    marginLeft: 7,
  },
  ImageWraper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    paddingLeft: 10,
  },
});
