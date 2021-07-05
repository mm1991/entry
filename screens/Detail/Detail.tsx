/**
 * 详情部分
 */

import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {get, post, del} from '../../utils/request';
import Header from '../../components/Header';
import DetailTop from './components/DetailTop';
import DetailTab from './components/DetailTab';
import DetailActivity from './components/DetailActivity';
import DetailParticipants from './components/DetailParticipants';
import DetailComments from './components/DetailComments';
import DetailFooter from './components/DetailFooter';
import {Observer, useLocalObservable} from 'mobx-react';
import Toast from '../../components/Toast';
import {detail} from '../../types/types';
import {stores} from '../../store';
import {defualtAvatar} from '../../globalConfig';

export default function Detail({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const childRef = useRef();
  const store = useLocalObservable(() => stores);
  const [detail, setDetail] = useState<detail>({
    id: 0,
    me_likes: false,
    me_going: false,
    images: [],
    description: '',
    createdAt: '',
    location: '',
    updatedAt: '',
    location_detail: '',
    creator: {
      avatar: defualtAvatar,
      username: '',
    },
    channel: {
      id: -1,
      name: '',
    },
    name: '',
    goings_count: 0,
    likes_count: 0,
  });
  const [participants, setParticipants] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [eventType, setEventType] = useState('details');
  const [topHide, setTopHide] = useState(false);
  const [participantsLayoutY, setParticipantsLayoutY] = useState(0);
  const [topHeight, setTopHeight] = useState(0);
  const [commentsLayoutY, setCommentsLayoutY] = useState(0);
  const scrollViewRef = useRef(null);

  // 获取活动详情
  const getDetail = async () => {
    const res = await get(`/events/${route.params.id}`);
    setDetail(res.event);
  };

  // 获取going详情
  const getParticipants = async () => {
    const res = await get(`/events/${route.params.id}/participants`);
    setParticipants(res.users);
  };

  // 获取likes详情
  const getLikes = async () => {
    const res = await get(`/events/${route.params.id}/likes`);
    setLikes(res.users);
  };

  // 获取评论详情
  const getComments = async () => {
    const res = await get(`/events/${route.params.id}/comments`);
    setComments(res.comments);
  };

  // 初始化获取信息
  useEffect(() => {
    getDetail();
    getParticipants();
    getLikes();
    getComments();
  }, []);

  // 发表评论
  const submitComments = async (comment: string) => {
    const res = await post(`/events/${route.params.id}/comments`, {
      comment,
    });

    setComments(comments.concat(res));
    childRef.current.showToast('message');
    setTopHide(true);
    // 滚动到详情部分
    scrollViewRef.current.scrollToEnd({duration: 200});
  };

  // 选择like&going
  const chooseLikeGoing = async (
    index: number,
    type: string,
    event_id: number,
    addlikes: boolean
  ) => {
    const eventList = [...store.events];
    const detailData = {...detail};
    const typename = type === 'likes' ? 'me_likes' : 'me_going';
    if (addlikes) {
      await post(`/events/${event_id}/${type}`);
    } else {
      await del(`/events/${event_id}/${type}`);
    }
    detailData[typename] = addlikes;
    eventList[route.params.index][typename] = addlikes;
    setDetail(detailData);
    store.setEvents(eventList);
  };

  // 根据滑动高度计算活跃tab
  const scrollCal = e => {
    const offsetY = e.nativeEvent.contentOffset.y;
    setTopHide(offsetY > topHeight);
    if (offsetY < participantsLayoutY - 50) {
      setEventType('details');
    } else if (
      offsetY > participantsLayoutY - 50 &&
      offsetY < commentsLayoutY - 50
    ) {
      setEventType('participants');
    } else {
      setEventType('comments');
    }
  };

  // 点击tab滑动到对应位置
  const scrollToEventType = (type: string) => {
    if (scrollViewRef) {
      if (type === 'details') {
        scrollViewRef.current.scrollTo({y: 0, duration: 200});
      } else if (type === 'participants') {
        setTimeout(() => {
          scrollViewRef.current.scrollTo({
            y: participantsLayoutY - 50,
            duration: 200,
          });
        }, 0);
      } else {
        scrollViewRef.current.scrollTo({
          y: commentsLayoutY,
          duration: 200,
        });
      }
    }
    setEventType(type);
  };

  return (
    <Observer>
      {() => (
        <View style={styles.container}>
          <Header Home={true} navigation={navigation} />
          <DetailTab
            eventType={eventType}
            setEventType={scrollToEventType}
            show={topHide}
          />
          <Toast ref={childRef} />
          <ScrollView
            onScroll={scrollCal}
            scrollEventThrottle={16}
            ref={scrollViewRef}
          >
            <View
              onLayout={e => {
                setTopHeight(e.nativeEvent.layout.height);
              }}
            >
              <DetailTop detail={detail} show={'true'} />
            </View>
            <DetailTab
              eventType={eventType}
              setEventType={scrollToEventType}
              show={!topHide}
            />
            <DetailActivity detail={detail} />
            <View
              onLayout={e => {
                setParticipantsLayoutY(e.nativeEvent.layout.y);
              }}
            >
              <DetailParticipants
                detail={detail}
                participants={participants}
                likes={likes}
              />
            </View>
            <View
              onLayout={e => {
                setCommentsLayoutY(e.nativeEvent.layout.y);
              }}
            >
              <DetailComments comments={comments} />
            </View>
          </ScrollView>
          <DetailFooter
            detail={detail}
            chooseLikeGoing={chooseLikeGoing}
            submitComments={submitComments}
          />
        </View>
      )}
    </Observer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
