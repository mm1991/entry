/**
 * 详情tab
 */

import React from 'react';
import TabItem from '../../../components/TabItem';
import {View, StyleSheet} from 'react-native';

interface DetailTabProps {
  show: boolean;
  eventType: string;
  setEventType: Function;
}

export default function DetailTab(props: DetailTabProps) {
  return (
    <View
      style={[
        styles.tab,
        !props.show && {
          display: 'none',
        },
      ]}
    >
      <TabItem
        text={'Details'}
        eventType={props.eventType}
        currenType={'details'}
        setEventType={props.setEventType}
      />
      <TabItem
        text={'Participants'}
        eventType={props.eventType}
        currenType={'participants'}
        setEventType={props.setEventType}
      />
      <TabItem
        text={'Comments'}
        eventType={props.eventType}
        currenType={'comments'}
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
    zIndex: 5,
    position: 'relative',
    backgroundColor: '#fff',
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
