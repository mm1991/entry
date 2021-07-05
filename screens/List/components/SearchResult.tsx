/**
 * 列表顶部搜索结果
 */

import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

interface SearchResultProps {
  searchCount: number;
  searchText: string;
  clearSearch: Function;
}

export default function SearchResult(props: SearchResultProps) {
  return (
    <View style={styles.resultContainer}>
      <View style={styles.topWrapper}>
        <Text style={styles.resultText}>{props.searchCount} Result</Text>
        <TouchableOpacity onPress={() => props.clearSearch()}>
          <View style={styles.btnWrapper}>
            <Text style={styles.btnText}>CLEAR SEARCH</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.bottomText}>Searched for {props.searchText}</Text>
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
    color: '#8560A9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#D5EF7F',
    borderRadius: 22,
  },
  btnText: {
    fontSize: 10,
    color: '#67616D',
    lineHeight: 22,
    fontWeight: 'bold',
  },
  bottomText: {
    color: '#67616D',
    fontSize: 12,
  },
});
