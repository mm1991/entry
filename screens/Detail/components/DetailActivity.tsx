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
import {formatDate, formatTime} from '../../../utils/public';
import {detail} from '../../../types/types';

interface DetailActivityProps {
  detail: detail;
}

export default function DetailActivity(props: DetailActivityProps) {
  const {detail} = props;
  const [textOver, setTextOver] = useState(false);
  const [init, setInit] = useState(true);
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
  return (
    <View>
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
      <View style={styles.whenWrapper}>
        <View style={styles.subTitle}>
          <View style={styles.subTitleIcon}></View>
          <Text style={styles.subTitleText}>When</Text>
        </View>
        <View style={styles.whenDetailWrapper}>
          <View style={[styles.dateContent, styles.dateBorder]}>
            <View style={styles.dateWrapper}>
              <DateFrom style={styles.dateImage} />
              <Text style={styles.dateText}>
                {detail.createdAt && formatDate(detail.createdAt)}
              </Text>
            </View>
            <View style={styles.timeWrapper}>
              <Text style={styles.timeText}>
                {detail.createdAt && formatTime(detail.createdAt).time}
              </Text>
              <Text style={styles.amText}>
                {detail.createdAt && formatTime(detail.createdAt).ampm}
              </Text>
            </View>
          </View>
          <View style={styles.dateContent}>
            <View style={styles.dateWrapper}>
              <DateTo style={styles.dateImage} />
              <Text style={styles.dateText}>
                {detail.updatedAt && formatDate(detail.updatedAt)}
              </Text>
            </View>
            <View style={styles.timeWrapper}>
              <Text style={styles.timeText}>
                {detail.updatedAt && formatTime(detail.updatedAt).time}
              </Text>
              <Text style={styles.amText}>
                {detail.createdAt && formatTime(detail.updatedAt).ampm}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.whereWrapper}>
        <View style={styles.subTitle}>
          <View style={styles.subTitleIcon}></View>
          <Text style={styles.subTitleText}>Where</Text>
        </View>
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
    borderBottomColor: '#E8E8E8',
  },
  articleText: {
    color: '#67616D',
  },
  articleShadow: {
    backgroundColor: '#fff',
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
    backgroundColor: '#D5EF7F',
    borderRadius: 12,
  },
  viewAllText: {
    color: '#67616D',
    fontWeight: 'bold',
    fontSize: 10,
    paddingLeft: 13,
    paddingRight: 13,
    lineHeight: 23,
  },
  whenWrapper: {
    marginLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  whereWrapper: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  subTitle: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 10,
  },
  subTitleIcon: {
    width: 4,
    height: 18,
    backgroundColor: '#8560A9',
    borderRadius: 3,
  },
  subTitleText: {
    color: '#8560A9',
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
    color: '#67616D',
    fontSize: 16,
    paddingLeft: 4,
  },
  timeText: {
    color: '#AECB4F',
    fontSize: 32,
  },
  amText: {
    color: '#AECB4F',
    fontSize: 10,
    paddingBottom: 5,
    paddingLeft: 5,
  },
  dateBorder: {
    borderRightWidth: 1,
    borderRightColor: '#E8E8E8',
  },
  addText1: {
    color: '#67616D',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  addText: {
    color: '#67616D',
    fontSize: 14,
  },
  mapImage: {
    height: 88,
    borderRadius: 5,
    marginTop: 8,
    marginRight: 16,
  },
});
