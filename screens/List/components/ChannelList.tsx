/**
 * 导航Channel列表
 */

import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {channelType} from '../../../types/types';

interface ChannelListProps {
  channelData: Array<channelType>;
  seleced: number;
  onSelectChannel: Function;
}

export default function ChannelList(props: ChannelListProps) {
  const channels = props.channelData || [];
  const channelNodes = channels.map(channel => {
    return (
      <View
        style={[
          styles.labelContainer,
          props.seleced === channel.id && {
            backgroundColor: '#E5F7A9',
            borderColor: '#E5F7A9',
          },
        ]}
        key={channel.id}
      >
        <Text
          style={[
            styles.selectChannel,
            props.seleced === channel.id && {
              color: '#453257',
              fontWeight: 'bold',
            },
          ]}
          onPress={() => {
            props.onSelectChannel({
              id: channel.id,
              name: channel.name,
            });
          }}
        >
          {channel.name}
        </Text>
      </View>
    );
  });
  return <View style={styles.selectChannelWrapper}>{channelNodes}</View>;
}

const styles = StyleSheet.create({
  selectChannelWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  labelContainer: {
    borderRadius: 15,
    borderColor: '#D3C1E5',
    borderWidth: 1,
    marginRight: 12,
    marginBottom: 9,
  },
  selectChannel: {
    color: '#fff',
    lineHeight: 22,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
  },
});
