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

interface DetaiFooterlProps {
  detail: detail;
  submitComments: Function;
  chooseLikeGoing: Function;
}

export default function DetailFooter(props: DetaiFooterlProps) {
  const {detail} = props;
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
  const submitComments = () => {
    props.submitComments(value);
    setSubmitComment(false);
  };
  return (
    <View>
      {submitComment && (
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              closeComment();
            }}
          >
            <Cross style={styles.crossImage} />
          </TouchableOpacity>

          <TextInput
            style={styles.inputStyle}
            placeholder={'Leave your comment here'}
            placeholderTextColor={'#D3C1E5'}
            onChangeText={value => setValue(value)}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
              submitComments();
            }}
          >
            <Send style={styles.sendImage} />
          </TouchableOpacity>
        </View>
      )}
      {!submitComment && (
        <View style={styles.footer}>
          <View style={styles.ImageWrapper}>
            <TouchableOpacity
              onPress={() => {
                openComment();
              }}
            >
              <CommentSingle style={styles.footerImage} />
            </TouchableOpacity>
            {!detail.me_likes && (
              <TouchableOpacity
                onPress={() => {
                  props.chooseLikeGoing(0, 'likes', detail.id, true);
                }}
              >
                <LikeDetail style={styles.footerImage} />
              </TouchableOpacity>
            )}
            {detail.me_likes && (
              <TouchableOpacity
                onPress={() => {
                  props.chooseLikeGoing(0, 'likes', detail.id, false);
                }}
              >
                <LikeGreen style={styles.footerImage} />
              </TouchableOpacity>
            )}
          </View>

          {!detail.me_going && (
            <TouchableOpacity
              style={styles.joinFooter}
              onPress={() => {
                props.chooseLikeGoing(0, 'participants', detail.id, true);
              }}
            >
              <CheckOutlineLogo style={styles.joinImage} />
              <Text style={styles.joinText}>Join</Text>
            </TouchableOpacity>
          )}
          {detail.me_going && (
            <TouchableOpacity
              style={styles.joinFooter}
              onPress={() => {
                props.chooseLikeGoing(0, 'participants', detail.id, false);
              }}
            >
              <CheckBig style={styles.joinImage} />
              <Text style={styles.joinText}>I am going</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}
/*eslint i18next/no-literal-string: ["error", { "ignoreCallee": ["StyleSheet.create"] }]*/
const styles = StyleSheet.create({
  footer: {
    height: 56,
    backgroundColor: '#8560A9',
    flexDirection: 'row',
  },
  joinImage: {
    width: 24,
    height: 24,
    marginTop: 16,
  },
  joinFooter: {
    width: '45%',
    backgroundColor: '#D5EF7F',
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
    backgroundColor: '#fff',
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
    backgroundColor: '#D5EF7F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendImage: {
    width: 28,
    height: 24,
  },
});
