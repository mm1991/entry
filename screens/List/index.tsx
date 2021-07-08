/**
 * 列表页
 */

import React, {useState, useEffect, useRef} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {FlatList, View, StyleSheet, Animated} from 'react-native';
import {Observer, useLocalObservable} from 'mobx-react';
import Header from '../../components/Header';
import ListItem from '../../components/ListItem';
import LeftNav from './components/LeftNav';
import {stores} from '../../store';
import {selectTime} from '../../globalConfig';
import {transTimeToString} from '../../utils/formatTime';
import EmptyPage from '../../components/EmptyPage';
import SearchResult from './components/SearchResult';
import {RootStackParamList, channelType, eventsType} from '../../types/types';
import {
  getEventsApi,
  getChannelsApi,
  chooseLikeGoingApi,
} from '../../utils/api';
import {BACK_WHITE} from '../../styles';

interface eventParams {
  after?: number;
  before?: number;
  channels?: number;
}

function List({navigation}: StackScreenProps<RootStackParamList, 'List'>) {
  const store = useLocalObservable(() => stores);
  // 左滑距离（导航栏宽度）
  const leftDistance = useRef(new Animated.Value(0)).current;
  // 筛选参数
  const [eventParams, setEventParams] = useState({});
  // 是否选中筛选项
  const [searching, setSearching] = useState(false);
  // 筛选后总数
  const [searchCount, setSearchCount] = useState(0);
  // 选中筛选后底部显示文案
  const [searchText, setSearchText] = useState('');

  // 左滑显示导航
  const slideLeft = () => {
    Animated.timing(leftDistance, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  // 右滑关闭导航
  const slideRight = () => {
    Animated.timing(leftDistance, {
      toValue: 240,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  // 获取列表数据
  const getEventsList = async (params: eventParams = {}) => {
    const res = await getEventsApi(params);
    if (res) {
      setSearchCount(res.total);
      store.setEvents(res.events);
    }
  };

  // 获取channel列表
  const getChannels = async () => {
    const res = await getChannelsApi();
    if (res) {
      res.channels.unshift({id: 0, name: 'All'});
      store.setChannelData(res.channels);
    }
  };

  // 获取参数改变后刷新列表
  useEffect(() => {
    getEventsList(eventParams);
    setSearching(store.selectChannel.id > -1 || store.selectTime > -1);
  }, [eventParams]);

  // 初始化时获取channel列表
  useEffect(() => {
    getChannels();
  }, []);

  // 下拉获取新数据
  const refreshList = async () => {
    const eventList = store.events;
    const eventLen = eventList.length;
    const res = await getEventsApi(
      Object.assign(eventParams, {
        offset: eventLen,
      })
    );
    store.setEvents(eventList.concat(res.events));
  };

  // 获取时间段参数
  const getTimeRange = () => {
    let timeRange;
    if (store.selectTime === 5) {
      timeRange = selectTime[store.selectTime].fn(
        store.startTime,
        store.endTime
      );
    } else {
      timeRange = selectTime[store.selectTime].fn();
    }
    return timeRange;
  };

  // 获取选中时间后的转换文案
  const getTimeRangeText = () => {
    let timeRange = '';
    if (store.selectTime > 0) {
      timeRange = transTimeToString(getTimeRange());
    }
    return timeRange;
  };

  // 选择channel
  const setSelectChannel = (value: channelType) => {
    store.setSelectChannel(value);
    const searchText = `${value.name} activites ${getTimeRangeText()}`;
    setSearchText(searchText);
  };

  // 选择时间段
  const setSelectTime = (value: number) => {
    store.setSelectTime(value);
    const searchText = `${
      store.selectChannel.name
    } activites ${getTimeRangeText()}`;
    setSearchText(searchText);
  };
  // 点击搜索按钮
  const submitSearch = () => {
    let params = {};
    // 选中channel
    if (store.selectChannel.id > 0) {
      params = Object.assign({channels: store.selectChannel.id}, params);
    }
    // 选中时间,计算时间范围
    if (store.selectTime > 0) {
      params = Object.assign(getTimeRange(), params);
    }
    setEventParams(params);
    // 关闭导航
    slideLeft();
  };

  // 清除筛选记录
  const clearSearch = () => {
    store.setSelectChannel({
      id: -1,
      name: '',
    });
    store.setSelectTime(-1);
    setEventParams({});
  };

  // 点击going&likes
  const chooseLikeGoing = async (
    index: number,
    type: string,
    eventId: number,
    status: boolean
  ) => {
    const eventList = [...store.events];
    const typename = type === 'likes' ? 'me_likes' : 'me_going';
    await chooseLikeGoingApi(eventId, type, status);
    eventList[index][typename] = status;
    store.setEvents(eventList);
  };

  // 列表项
  const renderItem = ({item, index}: {item: eventsType; index: number}) => {
    return (
      <ListItem
        {...item}
        index={index}
        key={index}
        chooseLikeGoing={chooseLikeGoing}
        navigation={navigation}
      />
    );
  };

  return (
    <Observer>
      {() => (
        <View style={styles.container}>
          <LeftNav
            channelData={store.channelData}
            selecedChannel={store.selectChannel.id}
            selecedTime={store.selectTime}
            onSelectChannel={setSelectChannel}
            onSelectTime={setSelectTime}
            submitSearch={() => submitSearch()}
            searchText={searchText}
            searchActive={
              store.selectTime !== -1 || store.selectChannel.id !== -1
            }
          />

          <Animated.View
            onStartShouldSetResponder={() => {
              slideLeft();
              return false;
            }}
            style={[
              styles.rightContainer,
              {
                transform: [
                  {
                    translateX: leftDistance,
                  },
                ],
              },
            ]}
          >
            <Header
              switchNav={slideRight}
              navigation={navigation}
              Home={false}
            />
            {searching && (
              <SearchResult
                clearSearch={clearSearch}
                searchCount={searchCount}
                searchText={searchText}
              />
            )}
            <FlatList
              data={store.events}
              renderItem={renderItem}
              keyExtractor={(item, index) => item.id.toString()}
              onEndReachedThreshold={0.2}
              onEndReached={() => {
                refreshList();
              }}
              ListEmptyComponent={EmptyPage}
              windowSize={8}
              initialNumToRender={5}
            />
          </Animated.View>
        </View>
      )}
    </Observer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACK_WHITE,
  },
  rightContainer: {
    zIndex: 2,
    flex: 1,
    backgroundColor: BACK_WHITE,
  },
});

export default List;
