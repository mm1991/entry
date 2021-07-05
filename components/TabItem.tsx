/**
 * tab子项
 */

import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import LikeOutline from '../assets/images/like-outline.svg';
import LikeGreen from '../assets/images/like-green.svg';
import CheckOutline from '../assets/images/check-outline.svg';
import Check from '../assets/images/check.svg';
import PastOutline from '../assets/images/past-outline.svg';
import Past from '../assets/images/past.svg';
import InfoOutline from '../assets/images/info-outline.svg';
import PeopleOutline from '../assets/images/people-outline.svg';
import CommentOutline from '../assets/images/comment-outline.svg';

import InfoActive from '../assets/images/info-active.svg';
import PeopleActive from '../assets/images/people-active.svg';
import CommentActive from '../assets/images/comment-active.svg';

const typeIconMap = {
  liked: LikeGreen,
  unliked: LikeOutline,
  going: Check,
  ungoing: CheckOutline,
  past: Past,
  unpast: PastOutline,
  details: InfoActive,
  undetails: InfoOutline,
  participants: PeopleActive,
  unparticipants: PeopleOutline,
  comments: CommentActive,
  uncomments: CommentOutline,
};

interface UserTabProps {
  text: string;
  currenType: string;
  eventType: string;
  setEventType: Function;
}
export default function TabItem(props: UserTabProps) {
  const SelectIcon = typeIconMap[props.currenType];
  const UnSelectIcon = typeIconMap['un' + props.currenType];
  return (
    <TouchableOpacity
      onPress={() => {
        props.setEventType(props.currenType);
      }}
    >
      <View style={[styles.tabDetail, styles.tabBorder]}>
        {props.eventType === props.currenType && (
          <SelectIcon style={styles.tabImg} />
        )}
        {props.eventType !== props.currenType && (
          <UnSelectIcon style={styles.tabImg} />
        )}
        <Text
          style={[
            styles.tabText,
            props.eventType === props.currenType && {color: '#AECB4F'},
          ]}
        >
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 13,
    paddingBottom: 13,
    borderTopColor: '#E8E8E8',
    borderTopWidth: 1,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
  },
  tabDetail: {
    flexDirection: 'row',
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
  },
  tabBorder: {
    borderRightColor: '#E8E8E8',
    borderRightWidth: 1,
  },
  tabText: {
    fontSize: 12,
    color: '#8C8C8C',
  },
  tabImg: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
});
