/**
 * 详情头部用户信息展示
 */

import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {calDurationText} from '../../../utils/formatTime';
import {detail} from '../../../types/types';
import {
  TEXT_NORMAL,
  tagWrapper,
  tagText,
  titleText,
  TEXT_GREY,
} from '../../../styles';

export default function DetailTop({
  show,
  detail,
}: {
  show: boolean;
  detail: detail;
}) {
  return (
    <View
      style={[
        styles.contantContainer,
        !show && {
          display: 'none',
        },
      ]}
    >
      <View style={styles.ItemTopTagWrapper}>
        <View style={styles.tagWrapper}>
          <Text style={styles.tagText}>
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
  tagWrapper,
  tagText,
  contantContainer: {
    padding: 16,
  },
  ItemTopTagWrapper: {
    flexDirection: 'row',
  },
  ItemTitleText: {
    ...titleText,
    paddingTop: 12,
    paddingBottom: 24,
  },
  writer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  writerTime: {
    color: TEXT_GREY,
    fontSize: 12,
    paddingTop: 4,
  },
  writerUsername: {
    color: TEXT_NORMAL,
    fontSize: 14,
  },
  ItemTopAvatar: {
    width: 36,
    height: 36,
    borderRadius: 36,
    marginRight: 12,
  },
});
