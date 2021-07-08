/**
 * 导航栏-搜索按钮
 */

import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import SearchLogo from '../../../assets/images/search.svg';
import {GREEN, PURPLE, TEXT_PURPLE} from '../../../styles';

export default function SearchButton({
  searchActive,
  submitSearch,
  searchText,
}: {
  searchActive: boolean;
  submitSearch: Function;
  searchText: string;
}) {
  const submitSearchActive = () => {
    if (searchActive) {
      submitSearch();
    }
  };

  return (
    <TouchableOpacity
      onPress={() => submitSearchActive()}
      style={[styles.buttonWrapper, searchActive && styles.searchActive]}
    >
      <View style={styles.button}>
        <View style={styles.searchWrapper}>
          <SearchLogo style={styles.searchIconStyle} />
          <Text
            style={[
              styles.searchStyle,
              searchActive && styles.searchTextActive,
            ]}
          >
            SEARCH
          </Text>
        </View>
        {searchActive && <Text style={styles.subtip}>{searchText}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: '#BABABA',
    height: 64,
    width: 240,
    position: 'absolute',
    justifyContent: 'center',
    top: Dimensions.get('window').height - 145,
  },
  button: {
    alignItems: 'center',
  },
  searchStyle: {
    color: '#666666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchIconStyle: {
    width: 16,
    height: 16,
  },
  searchWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtip: {
    fontSize: 10,
    color: TEXT_PURPLE,
    paddingTop: 3,
  },
  searchActive: {
    backgroundColor: GREEN,
  },
  searchTextActive: {
    color: PURPLE,
  },
});
