/**
 * 评论详情部分
 */

import * as React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import Reply from '../../../assets/images/reply.svg';
import {calDurationText} from '../../../utils/public';
import {commentType} from '../../../types/types';

interface DetailProps {
  comments: Array<commentType>;
}

export default function Detail(props: DetailProps) {
  const {comments} = props;
  const commentsList =
    comments &&
    comments.length > 0 &&
    comments.map((item, index) => {
      return (
        <View style={styles.commentsWrapper} key={index}>
          <Image
            source={{
              uri: item.user.avatar,
            }}
            style={styles.commentsImage}
          />
          <View style={styles.commentsTextWrapper}>
            <View style={styles.authorWrapper}>
              <Text style={styles.author}>{item.user.username}</Text>
              <Text style={styles.authorTime}>
                {calDurationText(item.createdAt)}
              </Text>
            </View>
            <Text style={styles.commentsText}>{item.comment}</Text>
          </View>
          <Reply style={styles.reply} />
        </View>
      );
    });
  return (
    <View style={styles.comments}>
      {comments && comments.length > 0 && commentsList}
    </View>
  );
}

const styles = StyleSheet.create({
  comments: {
    paddingTop: 8,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  commentsWrapper: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    flex: 1,
  },
  commentsImage: {
    width: 32,
    height: 32,
    borderRadius: 32,
    marginRight: 12,
  },
  commentsTextWrapper: {
    flex: 1,
  },
  reply: {
    width: 20,
    height: 16,
  },
  authorWrapper: {
    flexDirection: 'row',
    paddingBottom: 4,
  },
  author: {
    color: '#8560A9',
    fontSize: 12,
  },
  authorTime: {
    color: '#bababa',
    fontSize: 10,
    paddingLeft: 12,
    paddingTop: 2,
  },
  commentsText: {
    color: '#666666',
    fontSize: 14,
  },
});
