/**
 * 导航Channel列表
 */

import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {channelType} from '../../../types/types';
import {PURPLE, BORDER_PURPLE, ACTIVE_GREEN} from '../../../styles';

export default function ChannelList({
  channelData,
  seleced,
  onSelectChannel,
}: {
  channelData: Array<channelType>;
  seleced: number;
  onSelectChannel: Function;
}) {
  const channels = channelData || [];
  const channelNodes = channels.map(channel => {
    return (
      <View
        style={[
          styles.labelContainer,
          seleced === channel.id && styles.labelContainerActive,
        ]}
        key={channel.id}
      >
        <Text
          style={[
            styles.selectChannel,
            seleced === channel.id && styles.channelTextActive,
          ]}
          onPress={() => {
            onSelectChannel({
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
    borderColor: BORDER_PURPLE,
    borderWidth: 1,
    marginRight: 12,
    marginBottom: 9,
  },
  labelContainerActive: {
    backgroundColor: ACTIVE_GREEN,
    borderColor: ACTIVE_GREEN,
  },
  selectChannel: {
    color: '#fff',
    lineHeight: 22,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
  },
  channelTextActive: {
    color: PURPLE,
    fontWeight: 'bold',
  },
});
