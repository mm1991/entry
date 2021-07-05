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
import {formatDate, limitChar} from '../utils/public';

export default function ListItem(props) {
  const {item, index, navigation} = props;
  const ImageUrl = item.images && item.images.length > 0 ? item.images[0] : '';

  return (
    <View style={styles.ItemContainer}>
      <View style={styles.ItemTop}>
        <View style={styles.ItemTopUser}>
          <Image
            style={styles.ItemTopAvatar}
            source={{
              uri: item.creator.avatar,
            }}
          ></Image>
          <View style={styles.ItemTopUserName}>
            <Text style={styles.ItemTopUserText}>{item.creator.username}</Text>
          </View>
        </View>
        <View style={styles.ItemTopTag}>
          <Text style={styles.ItemTopTagText}>{item.channel.name}</Text>
        </View>
      </View>
      <View style={styles.ItemTitleContainer}>
        <View style={styles.ItemTitleTextView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Detail', {id: item.id, index: index});
            }}
          >
            <Text style={styles.ItemTitleText}>{item.name}</Text>
          </TouchableOpacity>
          <View style={styles.timeWraper}>
            <TimeLogo style={styles.timeImage} />
            <Text style={styles.ItemTimeText}>
              {formatDate(item.begin_time)} - {formatDate(item.update_time)}
            </Text>
          </View>
          <Text style={styles.ItemAbstractText}>
            {limitChar(item.description, 200)}
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
      <View style={styles.ItemChoose}>
        <TouchableOpacity
          onPress={() =>
            props.chooseLikeGoing &&
            props.chooseLikeGoing(
              index,
              'participants',
              item.id,
              !item.me_going
            )
          }
        >
          {item.me_going && (
            <View style={styles.timeWraper}>
              <CheckLogo style={styles.bottomImage} />
              <Text style={styles.ItemChooseGoingText}>I am going!</Text>
            </View>
          )}
          {!item.me_going && (
            <View style={styles.timeWraper}>
              <CheckOutlineLogo style={styles.bottomImage} />
              <Text style={styles.ItemGoingText}>
                {item.goings_count} Going
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            props.chooseLikeGoing &&
            props.chooseLikeGoing(index, 'likes', item.id, !item.me_likes)
          }
        >
          {item.me_likes && (
            <View style={[styles.ItemChooseLikes, styles.timeWraper]}>
              <LikeLogo style={styles.bottomImage} />
              <Text style={styles.ItemChooseGoingText}>I Like it</Text>
            </View>
          )}
          {!item.me_likes && (
            <View style={[styles.ItemChooseLikes, styles.timeWraper]}>
              <LikeOutlineLogo style={styles.bottomImage} />
              <Text style={styles.ItemGoingText}>{item.likes_count} Likes</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ItemContainer: {
    paddingTop: 16,
    paddingLeft: 16,
    color: '#67616D',
    backgroundColor: '#fafafa',
  },
  ItemTop: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 16,
  },
  timeWraper: {
    display: 'flex',
    flexDirection: 'row',
  },
  ItemTopUser: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    fontWeight: '600',
  },
  ItemTopUserName: {
    paddingLeft: 8,
  },
  ItemTopUserText: {
    fontSize: 12,
    lineHeight: 20,
    color: '#67616D',
    fontWeight: 'bold',
  },
  ItemTopAvatar: {
    width: 20,
    height: 20,
    borderRadius: 20,
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
  ItemTitleText: {
    color: '#453257',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ItemTimeText: {
    color: '#8560A9',
    fontSize: 12,
    paddingTop: 8,
  },
  ItemAbstractText: {
    color: '#67616D',
    paddingTop: 12,
    fontSize: 14,
  },
  ItemChoose: {
    color: '#AC8EC9',
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderColor: '#e8e8e8',
  },
  ItemGoingText: {
    fontSize: 12,
    color: '#AC8EC9',
  },
  ItemChooseGoingText: {
    fontSize: 12,
    color: '#453257',
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
