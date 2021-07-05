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

interface LeftNavProps {
  selecedTime: number;
  onSelectTime: Function;
  channelData: Array<channelType>;
  selecedChannel: number;
  onSelectChannel: Function;
  submitSearch: Function;
  searchActive: boolean;
  searchText: string;
}

export default function LeftNav(props: LeftNavProps) {
  return (
    <View
      style={[
        styles.navContainer,
        {
          height: Dimensions.get('window').height,
        },
      ]}
    >
      <View style={styles.title}>
        <View style={styles.selectTypeWrapper}>
          <Text style={styles.selectType}>DATE</Text>
        </View>
      </View>
      <TimeList seleced={props.selecedTime} onSelectTime={props.onSelectTime} />
      <View style={styles.title}>
        <View style={styles.selectTypeWrapper}>
          <Text style={styles.selectType}>CHANNEL</Text>
        </View>
      </View>

      <ChannelList
        channelData={props.channelData}
        seleced={props.selecedChannel}
        onSelectChannel={props.onSelectChannel}
      />
      <SearchButton
        submitSearch={props.submitSearch}
        searchActive={props.searchActive}
        searchText={props.searchText}
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
    backgroundColor: '#453257',
    paddingTop: 10,
    paddingLeft: 14,
    zIndex: 1,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectTypeWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#8560A9',
    marginBottom: 13,
  },
  selectType: {
    color: '#AC8EC9',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
