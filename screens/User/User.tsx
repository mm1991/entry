/**
 * 我的页面
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import Header from '../../components/Header';
import UserInfo from './components/UserInfo';
import UserTab from './components/UserTab';
import ListItem from '../../components/ListItem';
import {get} from '../../utils/request';
import EmptyPage from '../../components/EmptyPage';
import {userInfoType} from '../../types/types';
import {defualtAvatar} from '../../globalConfig';

export default function User({navigation}: {navigation: any}) {
  const [userData, setUserData] = useState<userInfoType>({
    avatar: defualtAvatar,
    email: '',
    username: '',
    likes_count: 0,
    past_count: 0,
    goings_count: 0,
  });
  const [events, setEvents] = useState([]);
  const [eventType, setEventType] = useState('liked');
  const [hasMore, setHasMore] = useState(true);

  // 获取个人信息
  const getUser = async () => {
    const res = await get('/user');
    setUserData(res);
  };

  // 获取我的liked || going || comments数据
  const getUserEvent = async (type: string) => {
    const res = await get('/user/events', {
      type,
    });
    setEvents(res.events);
    setHasMore(res.hasMore);
  };

  // 加载更多 - 获取我的liked || going || comments数据
  const getMoreList = async (type: string) => {
    if (hasMore) {
      const res = await get('/user/events', {
        type,
        offset: events.length,
      });
      setEvents(events.concat(res.events));
      setHasMore(res.hasMore);
    }
  };

  // 初始化时获取个人信息与liked信息
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getUserEvent(eventType);
  }, [eventType]);

  const renderItem = ({item, index}) => {
    return (
      <ListItem item={item} index={index} key={index} navigation={navigation} />
    );
  };
  return (
    <View style={styles.container}>
      <Header navigation={navigation} Home={true} />
      <UserInfo userData={userData} />
      <UserTab
        userData={userData}
        setEventType={setEventType}
        eventType={eventType}
      />
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          getMoreList(eventType);
        }}
        ListEmptyComponent={EmptyPage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBg: {
    flex: 1,
    backgroundColor: '#8560A9',
    opacity: 0.7,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  loginText1: {
    position: 'absolute',
    top: 70,
    color: '#D5EF7F',
    fontSize: 16,
    fontWeight: 'bold',
    left: '50%',
    width: 274,
    marginLeft: -137,
  },
  loginText2: {
    position: 'absolute',
    top: 105,
    color: '#D5EF7F',
    fontSize: 24,
    fontWeight: 'bold',
    left: '50%',
    width: 130,
    marginLeft: -65,
  },
  image: {
    flex: 1,
  },
  formWrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  loginImage: {
    width: 35,
    height: 40,
    marginLeft: 13,
    marginTop: 10,
  },
  imageWrapper: {
    position: 'absolute',
    top: 173,
    left: '50%',
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: '#D5EF7F',
    borderRadius: 64,
    marginLeft: -32,
  },
});
