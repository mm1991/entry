/**
 * 导航栏
 */

import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import ChannelList from './ChannelList';
import TimeList from './TimeList';
import SearchButton from './SearchButton';
import {channelType} from '../../../types/types';
import {PURPLE, BACKGROUND_PURPLE, TEXT_NORMAL_LIGHT} from '../../../styles';

const titleView = (text: string) => {
  return (
    <View style={styles.title}>
      <View style={styles.selectTypeWrapper}>
        <Text style={styles.selectType}>{text}</Text>
      </View>
    </View>
  );
};

export default function LeftNav({
  selecedTime,
  onSelectTime,
  channelData,
  selecedChannel,
  onSelectChannel,
  submitSearch,
  searchActive,
  searchText,
}: {
  selecedTime: number;
  onSelectTime: Function;
  channelData: Array<channelType>;
  selecedChannel: number;
  onSelectChannel: Function;
  submitSearch: Function;
  searchActive: boolean;
  searchText: string;
}) {
  return (
    <View style={[styles.navContainer]}>
      {titleView('DATE')}
      <TimeList seleced={selecedTime} onSelectTime={onSelectTime} />
      {titleView('CHANNEL')}

      <ChannelList
        channelData={channelData}
        seleced={selecedChannel}
        onSelectChannel={onSelectChannel}
      />
      <SearchButton
        submitSearch={submitSearch}
        searchActive={searchActive}
        searchText={searchText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 240,
    backgroundColor: PURPLE,
    paddingTop: 10,
    paddingLeft: 14,
    zIndex: 1,
    height: Dimensions.get('window').height,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectTypeWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: BACKGROUND_PURPLE,
    marginBottom: 13,
  },
  selectType: {
    color: TEXT_NORMAL_LIGHT,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
