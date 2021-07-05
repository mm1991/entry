/**
 * 我的 - tab部分
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import TabItem from '../../../components/TabItem';
import {userInfoType} from '../../../types/types';

interface UserTabProps {
  userData: userInfoType;
  setEventType: Function;
  eventType: string;
}
export default function UserTab(props: UserTabProps) {
  const {likes_count, past_count, goings_count} = props.userData;
  return (
    <View style={styles.tab}>
      <TabItem
        text={`${likes_count} Likes`}
        currenType={'liked'}
        eventType={props.eventType}
        setEventType={props.setEventType}
      />
      <TabItem
        text={`${goings_count} Going`}
        currenType={'going'}
        eventType={props.eventType}
        setEventType={props.setEventType}
      />
      <TabItem
        text={`${past_count} Past`}
        currenType={'past'}
        eventType={props.eventType}
        setEventType={props.setEventType}
      />
    </View>
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
