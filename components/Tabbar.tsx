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
import {BORDER_COLOR, GREEN_TEXT, BACK_WHITE} from '../styles';

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

const Tabbar = React.memo(
  ({
    tabArr,
    eventType,
    setEventType,
    show = true,
  }: {
    tabArr: Array<Object>;
    show?: boolean;
    eventType: string;
    setEventType: Function;
  }) => {
    return (
      <View
        style={[
          styles.tab,
          !show && {
            display: 'none',
          },
        ]}
      >
        {tabArr.map(({text, type}, index: number) => {
          const SelectIcon = typeIconMap[type];
          const UnSelectIcon = typeIconMap['un' + type];
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setEventType(type);
              }}
            >
              <View style={[styles.tabDetail, styles.tabBorder]}>
                {eventType === type && <SelectIcon style={styles.tabImg} />}
                {eventType !== type && <UnSelectIcon style={styles.tabImg} />}
                <Text
                  style={[
                    styles.tabText,
                    eventType === type && {color: GREEN_TEXT},
                  ]}
                >
                  {text}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 13,
    paddingBottom: 13,
    borderTopColor: BORDER_COLOR,
    borderTopWidth: 1,
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: 1,
    zIndex: 4,
    backgroundColor: BACK_WHITE,
  },
  tabDetail: {
    flexDirection: 'row',
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
  },
  tabBorder: {
    borderRightColor: BORDER_COLOR,
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

export default Tabbar;
