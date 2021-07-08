/**
 * 活动详情部分
 */

import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Gmap from '../../../assets/images/gmap.png';
import DateFrom from '../../../assets/images/date-from.svg';
import DateTo from '../../../assets/images/date-to.svg';
import {formatDate, formatTime} from '../../../utils/formatTime';
import {detail} from '../../../types/types';
import {
  GREEN,
  BORDER_COLOR,
  TEXT_PURPLE,
  BACKGROUND_PURPLE,
  TEXT_NORMAL,
  GREEN_TEXT,
  BACK_WHITE,
} from '../../../styles';

export default function DetailActivity({detail}: {detail: detail}) {
  const [textOver, setTextOver] = useState(false);
  const [init, setInit] = useState(true);
  // 图片列表
  const imageList =
    detail.images &&
    detail.images.map((url, index) => {
      return (
        <Image
          style={styles.scrollImage}
          source={{
            uri: url,
          }}
          key={index}
        ></Image>
      );
    });
  // 子标题
  const subTitle = (text: string) => {
    return (
      <View style={styles.subTitle}>
        <View style={styles.subTitleIcon}></View>
        <Text style={styles.subTitleText}>{text}</Text>
      </View>
    );
  };

  // 时间显示
  const timeContent = (time: string, from: boolean) => {
    return (
      <View style={[styles.dateContent, styles.dateBorder]}>
        <View style={styles.dateWrapper}>
          {from ? (
            <DateFrom style={styles.dateImage} />
          ) : (
            <DateTo style={styles.dateImage} />
          )}
          <Text style={styles.dateText}>{time && formatDate(time)}</Text>
        </View>
        <View style={styles.timeWrapper}>
          <Text style={styles.timeText}>{time && formatTime(time).time}</Text>
          <Text style={styles.amText}>{time && formatTime(time).ampm}</Text>
        </View>
      </View>
    );
  };
  return (
    <View>
      {/* 文章详情 */}
      <View>
        {detail.images && detail.images.length > 0 && (
          <ScrollView horizontal={true} style={styles.imageScroll}>
            {imageList}
          </ScrollView>
        )}
        <View style={styles.articleWrapper}>
          <Text
            style={styles.articleText}
            numberOfLines={textOver ? 5 : 10}
            onLayout={e => {
              if (e.nativeEvent.layout.height > 100 && init) {
                setTextOver(true);
                setInit(false);
              }
            }}
          >
            {detail.description}
          </Text>
          {textOver && (
            <View>
              <View style={styles.articleShadow}></View>
              <TouchableOpacity
                style={styles.viewAll}
                onPress={() => {
                  setTextOver(false);
                }}
              >
                <Text style={styles.viewAllText}>VIEW ALL</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {/* 显示地点 */}
      <View style={styles.whenWrapper}>
        {subTitle('When')}
        <View style={styles.whenDetailWrapper}>
          {timeContent(detail.createdAt, true)}
          {timeContent(detail.updatedAt, false)}
        </View>
      </View>
      {/* 显示地点 */}
      <View style={styles.whereWrapper}>
        {subTitle('Where')}
        <Text style={styles.addText1}>{detail.location}</Text>
        <Text style={styles.addText}>{detail.location_detail}</Text>
        <Image source={Gmap} style={styles.mapImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollImage: {
    width: 180,
    height: 100,
    paddingTop: 16,
    paddingBottom: 12,
    marginRight: 12,
  },
  imageScroll: {
    paddingLeft: 16,
    marginTop: 16,
  },
  articleWrapper: {
    marginLeft: 16,
    paddingRight: 16,
    paddingBottom: 23,
    marginTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  articleText: {
    color: TEXT_NORMAL,
  },
  articleShadow: {
    backgroundColor: BACK_WHITE,
    opacity: 0.7,
    position: 'absolute',
    bottom: 0,
    height: 35,
    width: '100%',
  },
  viewAll: {
    position: 'absolute',
    bottom: 0,
    right: 16,
    backgroundColor: GREEN,
    borderRadius: 12,
  },
  viewAllText: {
    color: TEXT_NORMAL,
    fontWeight: 'bold',
    fontSize: 10,
    paddingLeft: 13,
    paddingRight: 13,
    lineHeight: 23,
  },
  whenWrapper: {
    marginLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  whereWrapper: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  subTitle: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 10,
  },
  subTitleIcon: {
    width: 4,
    height: 18,
    backgroundColor: BACKGROUND_PURPLE,
    borderRadius: 3,
  },
  subTitleText: {
    color: TEXT_PURPLE,
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 4,
  },
  whenDetailWrapper: {
    flexDirection: 'row',
  },
  dateWrapper: {
    flexDirection: 'row',
  },
  dateImage: {
    height: 14,
    width: 16,
  },
  dateContent: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 16,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: 6,
  },
  dateText: {
    color: TEXT_NORMAL,
    fontSize: 16,
    paddingLeft: 4,
  },
  timeText: {
    color: GREEN_TEXT,
    fontSize: 32,
  },
  amText: {
    color: GREEN_TEXT,
    fontSize: 10,
    paddingBottom: 5,
    paddingLeft: 5,
  },
  dateBorder: {
    borderRightWidth: 1,
    borderRightColor: BORDER_COLOR,
  },
  addText1: {
    color: TEXT_NORMAL,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  addText: {
    color: TEXT_NORMAL,
    fontSize: 14,
  },
  mapImage: {
    height: 88,
    borderRadius: 5,
    marginTop: 8,
    marginRight: 16,
  },
});
