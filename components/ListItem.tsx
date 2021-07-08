/**
 * 首页列表项
 */

import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import TimeLogo from '../assets/images/time.svg';
import CheckOutlineLogo from '../assets/images/check-outline.svg';
import CheckLogo from '../assets/images/check.svg';
import LikeOutlineLogo from '../assets/images/like-outline.svg';
import LikeLogo from '../assets/images/like.svg';
import {formatDate, limitChar} from '../utils/formatTime';
import {creator, channelType} from '../types/types';
import {
  PURPLE,
  BORDER_COLOR,
  TEXT_PURPLE,
  TEXT_NORMAL,
  TEXT_NORMAL_LIGHT,
  tagWrapper,
  tagText,
  titleText,
} from '../styles';

const ListItem = React.memo(
  ({
    images,
    creator,
    channel,
    id,
    name,
    begin_time,
    update_time,
    description,
    me_going,
    goings_count,
    likes_count,
    me_likes,
    index,
    navigation,
    chooseLikeGoing,
  }: {
    me_likes: boolean;
    me_going: boolean;
    images: Array<string>;
    creator: creator;
    channel: channelType;
    id: number;
    name: string;
    begin_time: string;
    update_time: string;
    description: string;
    goings_count: number;
    likes_count: number;
    index: number;
    navigation: any;
    chooseLikeGoing?: Function;
  }) => {
    const ImageUrl = images && images.length > 0 ? images[0] : '';

    return (
      <View style={styles.ItemContainer}>
        {/* 顶部-头像、用户名、标签 */}
        <View style={styles.ItemTop}>
          <View style={styles.ItemTopUser}>
            <Image
              style={styles.ItemTopAvatar}
              source={{
                uri: creator.avatar,
              }}
            ></Image>
            <View style={styles.ItemTopUserName}>
              <Text style={styles.ItemTopUserText}>{creator.username}</Text>
            </View>
          </View>
          <View style={styles.tagWrapper}>
            <Text style={styles.tagText}>{channel.name}</Text>
          </View>
        </View>
        {/* 文章标题、发布时间、内容、图片 */}
        <View style={styles.ItemTitleContainer}>
          <View style={styles.ItemTitleTextView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Detail', {id: id, index: index});
              }}
            >
              <Text style={styles.titleText}>{name}</Text>
            </TouchableOpacity>
            <View style={styles.timeWraper}>
              <TimeLogo style={styles.timeImage} />
              <Text style={styles.ItemTimeText}>
                {formatDate(begin_time)} - {formatDate(update_time)}
              </Text>
            </View>
            <Text style={styles.ItemAbstractText}>
              {limitChar(description, 200)}
            </Text>
          </View>
          {!!ImageUrl && (
            <Image
              source={{
                uri: ImageUrl,
              }}
              style={{width: 64, height: 64}}
            ></Image>
          )}
        </View>
        {/* 底部选择like、going */}
        <View style={styles.ItemChoose}>
          <TouchableOpacity
            onPress={() =>
              chooseLikeGoing &&
              chooseLikeGoing(index, 'participants', id, !me_going)
            }
          >
            {me_going ? (
              <View style={styles.timeWraper}>
                <CheckLogo style={styles.bottomImage} />
                <Text style={styles.ItemChooseGoingText}>I am going!</Text>
              </View>
            ) : (
              <View style={styles.timeWraper}>
                <CheckOutlineLogo style={styles.bottomImage} />
                <Text style={styles.ItemGoingText}>{goings_count} Going</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              chooseLikeGoing && chooseLikeGoing(index, 'likes', id, !me_likes)
            }
          >
            {me_likes ? (
              <View style={[styles.ItemChooseLikes, styles.timeWraper]}>
                <LikeLogo style={styles.bottomImage} />
                <Text style={styles.ItemChooseGoingText}>I Like it</Text>
              </View>
            ) : (
              <View style={[styles.ItemChooseLikes, styles.timeWraper]}>
                <LikeOutlineLogo style={styles.bottomImage} />
                <Text style={styles.ItemGoingText}>{likes_count} Likes</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  tagWrapper,
  tagText,
  titleText,
  ItemContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    backgroundColor: '#fafafa',
  },
  ItemTop: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  timeWraper: {
    flexDirection: 'row',
  },
  ItemTopUser: {
    flex: 1,
    flexDirection: 'row',
    fontWeight: '600',
  },
  ItemTopUserName: {
    paddingLeft: 8,
  },
  ItemTopUserText: {
    fontSize: 12,
    lineHeight: 20,
    color: TEXT_NORMAL,
    fontWeight: 'bold',
  },
  ItemTopAvatar: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  ItemTitleContainer: {
    paddingTop: 8,
    paddingBottom: 12,
    display: 'flex',
    paddingRight: 16,
    flexDirection: 'row',
  },
  ItemTitleTextView: {
    flex: 1,
  },
  ItemTimeText: {
    color: TEXT_PURPLE,
    fontSize: 12,
    paddingTop: 8,
  },
  ItemAbstractText: {
    color: TEXT_NORMAL,
    paddingTop: 12,
    fontSize: 14,
  },
  ItemChoose: {
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderColor: BORDER_COLOR,
  },
  ItemGoingText: {
    fontSize: 12,
    color: TEXT_NORMAL_LIGHT,
  },
  ItemChooseGoingText: {
    fontSize: 12,
    color: PURPLE,
  },
  ItemChooseLikes: {
    paddingLeft: 20,
  },
  timeImage: {
    width: 12,
    height: 12,
    marginTop: 10,
    marginRight: 6,
  },
  bottomImage: {
    width: 12,
    height: 10,
    marginTop: 3,
    marginRight: 5,
  },
});

export default ListItem;
