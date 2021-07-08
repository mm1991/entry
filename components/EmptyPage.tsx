/**
 * 空列表页
 */

import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import NoActivity from '../assets/images/no-activity.svg';
import {TEXT_GREY, BACK_WHITE} from '../styles';

const EmptyPage = React.memo(() => {
  return (
    <View style={styles.emptyContainer}>
      <NoActivity style={styles.emptyImg} />
      <Text style={styles.emptyTip}>No activity found</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: BACK_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  emptyImg: {
    width: 60,
    height: 60,
  },
  emptyTip: {
    color: TEXT_GREY,
    fontSize: 14,
    paddingTop: 14,
  },
});

export default EmptyPage;
