/**
 * 空列表页
 */

import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import NoActivity from '../assets/images/no-activity.svg';

export default function EmptyPage() {
  return (
    <View style={styles.emptyContainer}>
      <NoActivity style={styles.emptyImg} />
      <Text style={styles.emptyTip}>No activity found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  emptyImg: {
    width: 60,
    height: 60,
  },
  emptyTip: {
    color: '#BABABA',
    fontSize: 14,
    paddingTop: 14,
  },
});
