/**
 * 详情footer
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CheckOutlineLogo from '../../../assets/images/check-outline.svg';
import CommentSingle from '../../../assets/images/comment-single.svg';
import LikeDetail from '../../../assets/images/like-detail.svg';
import LikeGreen from '../../../assets/images/like-green.svg';
import CheckBig from '../../../assets/images/check-big.svg';
import Cross from '../../../assets/images/cross.svg';
import Send from '../../../assets/images/send.svg';
import {detail} from '../../../types/types';
import {
  GREEN,
  BACKGROUND_PURPLE,
  BACK_WHITE,
  BORDER_PURPLE,
} from '../../../styles';

export default function DetailFooter({
  detail,
  submitComments,
  chooseLikeGoing,
}: {
  detail: detail;
  submitComments: Function;
  chooseLikeGoing: Function;
}) {
  const [submitComment, setSubmitComment] = useState(false);
  const [value, setValue] = useState<string>('');

  // 展示评论输入框
  const openComment = () => {
    setSubmitComment(true);
  };

  // 关闭评论输入框
  const closeComment = () => {
    setSubmitComment(false);
  };

  // 提交评论
  const submitCommentsActive = () => {
    submitComments(value);
    setSubmitComment(false);
  };
  return (
    <View>
      {submitComment ? (
        <View style={styles.footer}>
          {/* 关闭评论 */}
          <TouchableOpacity
            onPress={() => {
              closeComment();
            }}
          >
            <Cross style={styles.crossImage} />
          </TouchableOpacity>
          {/* 评论输入框 */}
          <TextInput
            style={styles.inputStyle}
            placeholder={'Leave your comment here'}
            placeholderTextColor={BORDER_PURPLE}
            onChangeText={value => setValue(value)}
          />
          {/* 提交评论 */}
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
              submitCommentsActive();
            }}
          >
            <Send style={styles.sendImage} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.footer}>
          <View style={styles.ImageWrapper}>
            {/* 评论按钮 */}
            <TouchableOpacity
              onPress={() => {
                openComment();
              }}
            >
              <CommentSingle style={styles.footerImage} />
            </TouchableOpacity>
            {/* likes按钮 */}
            <TouchableOpacity
              onPress={() => {
                chooseLikeGoing(0, 'likes', detail.id, !detail.me_likes);
              }}
            >
              {!detail.me_likes ? (
                <LikeDetail style={styles.footerImage} />
              ) : (
                <LikeGreen style={styles.footerImage} />
              )}
            </TouchableOpacity>
          </View>
          {/* going按钮 */}
          <TouchableOpacity
            style={styles.joinFooter}
            onPress={() => {
              chooseLikeGoing(0, 'participants', detail.id, !detail.me_going);
            }}
          >
            {!detail.me_going ? (
              <View style={styles.joinFooterView}>
                <CheckOutlineLogo style={styles.joinImage} />
                <Text style={styles.joinText}>Join</Text>
              </View>
            ) : (
              <View style={styles.joinFooterView}>
                <CheckBig style={styles.joinImage} />
                <Text style={styles.joinText}>I am going</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 56,
    backgroundColor: BACKGROUND_PURPLE,
    flexDirection: 'row',
  },
  joinImage: {
    width: 24,
    height: 24,
    marginTop: 16,
  },
  joinFooterView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  joinFooter: {
    width: '45%',
    backgroundColor: GREEN,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  joinText: {
    color: '#788C36',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 56,
    paddingLeft: 12,
  },
  ImageWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  footerImage: {
    width: 24,
    height: 24,
  },
  crossImage: {
    width: 18,
    height: 18,
    marginTop: 19,
    marginLeft: 15,
  },
  inputStyle: {
    backgroundColor: BACK_WHITE,
    height: 32,
    borderRadius: 20,
    flex: 1,
    marginTop: 12,
    marginLeft: 10,
    marginRight: 14,
    paddingLeft: 15,
  },
  sendButton: {
    width: 64,
    backgroundColor: GREEN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendImage: {
    width: 28,
    height: 24,
  },
});
