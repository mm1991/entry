/**
 * 列表顶部搜索结果
 */

import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {GREEN, TEXT_PURPLE, TEXT_NORMAL} from '../../../styles';

export default function SearchResult({
  searchCount,
  searchText,
  clearSearch,
}: {
  searchCount: number;
  searchText: string;
  clearSearch: Function;
}) {
  return (
    <View style={styles.resultContainer}>
      <View style={styles.topWrapper}>
        <Text style={styles.resultText}>{searchCount} Result</Text>
        <TouchableOpacity onPress={() => clearSearch()}>
          <View style={styles.btnWrapper}>
            <Text style={styles.btnText}>CLEAR SEARCH</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.bottomText}>Searched for {searchText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    backgroundColor: '#FAF9FC',
    zIndex: 2,
    paddingLeft: 27,
    paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 11,
  },
  topWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 6,
  },
  resultText: {
    color: TEXT_PURPLE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: GREEN,
    borderRadius: 22,
  },
  btnText: {
    fontSize: 10,
    color: TEXT_NORMAL,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  bottomText: {
    color: TEXT_NORMAL,
    fontSize: 12,
  },
});
