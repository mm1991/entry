/**
 * 详情头部用户信息展示
 */

import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {calDurationText} from '../../../utils/public';
import {detail} from '../../../types/types';

interface DetailTopProps {
  show: boolean;
  detail: detail;
}

export default function DetailTop(props: DetailTopProps) {
  const {detail} = props;
  return (
    <View
      style={[
        styles.contantContainer,
        !props.show && {
          display: 'none',
        },
      ]}
    >
      <View style={styles.ItemTopTagWrapper}>
        <View style={styles.ItemTopTag}>
          <Text style={styles.ItemTopTagText}>
            {detail.channel && detail.channel.name}
          </Text>
        </View>
      </View>

      <Text style={styles.ItemTitleText}>{detail && detail.name}</Text>

      <View style={styles.writer}>
        <Image
          style={styles.ItemTopAvatar}
          source={{
            uri: detail.creator && detail.creator.avatar,
          }}
        ></Image>
        <View>
          <Text style={styles.writerUsername}>
            {detail.creator && detail.creator.username}
          </Text>
          <Text style={styles.writerTime}>
            Published {calDurationText(detail.createdAt)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contantContainer: {
    padding: 16,
  },
  ItemTopTagWrapper: {
    flexDirection: 'row',
  },
  ItemTopTag: {
    borderWidth: 1,
    borderColor: '#D3C1E5',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    height: 20,
  },
  ItemTopTagText: {
    lineHeight: 18,
    color: '#8560A9',
    fontSize: 12,
  },
  ItemTitleText: {
    color: '#453257',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 12,
    paddingBottom: 24,
  },
  writer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  writerTime: {
    color: '#BABABA',
    fontSize: 12,
    paddingTop: 4,
  },
  writerUsername: {
    color: '#67616D',
    fontSize: 14,
  },
  ItemTopAvatar: {
    width: 36,
    height: 36,
    borderRadius: 36,
    marginRight: 12,
  },
});
