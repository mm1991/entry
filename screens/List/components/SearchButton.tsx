/**
 * 导航栏-搜索按钮
 */

import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import SearchLogo from '../../../assets/images/search.svg';

interface SearchButtonProps {
  searchActive: boolean;
  submitSearch: Function;
  searchText: string;
}

export default function SearchButton(props: SearchButtonProps) {
  const submitSearch = () => {
    if (props.searchActive) {
      props.submitSearch();
    }
  };

  return (
    <TouchableOpacity
      onPress={() => submitSearch()}
      style={[
        styles.buttonWrapper,
        {
          top: Dimensions.get('window').height - 145,
        },
        props.searchActive && {
          backgroundColor: '#D5EF7F',
        },
      ]}
    >
      <View style={styles.button}>
        <View style={styles.searchWrapper}>
          <SearchLogo style={styles.searchIconStyle} />
          <Text
            style={[
              styles.searchStyle,
              props.searchActive && {
                color: '#453257',
              },
            ]}
          >
            SEARCH
          </Text>
        </View>
        {props.searchActive && (
          <Text style={styles.subtip}>{props.searchText}</Text>
        )}
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
    color: '#8560A9',
    paddingTop: 3,
  },
});
