/**
 * 详情部分
 */
// fffff
import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
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
import {
  getEventDetailApi,
  getCommentsApi,
  submitCommentsApi,
  getParticipantsApi,
  getLikesApi,
  chooseLikeGoingApi,
} from '../../utils/api';
import {BACK_WHITE} from '../../styles';

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
  const commentsLayoutY = useRef(0);
  const topHeight = useRef(0);
  const participantsLayoutY = useRef(0);

  const scrollViewRef = useRef(null);
  // 获取活动详情
  const getDetail = async () => {
    const res = await getEventDetailApi(route.params.id);
    res && setDetail(res.event);
  };

  // 获取going详情
  const getParticipants = async () => {
    const res = await getParticipantsApi(route.params.id);
    res && setParticipants(res.users);
  };

  // 获取likes详情
  const getLikes = async () => {
    const res = await getLikesApi(route.params.id);
    res && setLikes(res.users);
  };

  // 获取评论详情
  const getComments = async () => {
    const res = await getCommentsApi(route.params.id);
    res && setComments(res.comments);
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
    const res = await submitCommentsApi(route.params.id, comment);
    if (res) {
      setComments(comments.concat(res));
      childRef.current.showToast('success');
      setTopHide(true);
      // 滚动到详情部分
      scrollViewRef.current.scrollToEnd({duration: 200});
    }
  };

  // 选择like&going
  const chooseLikeGoing = async (
    index: number,
    type: string,
    eventId: number,
    status: boolean
  ) => {
    const eventList = [...store.events];
    const detailData = {...detail};
    const typename = type === 'likes' ? 'me_likes' : 'me_going';
    await chooseLikeGoingApi(eventId, type, status);
    detailData[typename] = status;
    eventList[route.params.index][typename] = status;
    setDetail(detailData);
    store.setEvents(eventList);
  };

  // 根据滑动高度计算活跃tab
  const scrollCal = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    setTopHide(offsetY > topHeight.current);
    if (offsetY < participantsLayoutY.current - 50) {
      setEventType('details');
    } else if (
      offsetY > participantsLayoutY.current - 50 &&
      offsetY < commentsLayoutY.current - 50
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
            y: participantsLayoutY.current - 50,
            duration: 200,
          });
        }, 0);
      } else {
        scrollViewRef.current.scrollTo({
          y: commentsLayoutY.current,
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
                topHeight.current = e.nativeEvent.layout.height;
              }}
            >
              <DetailTop detail={detail} show={true} />
            </View>
            <DetailTab
              eventType={eventType}
              setEventType={scrollToEventType}
              show={!topHide}
            />
            <DetailActivity detail={detail} />
            <View
              onLayout={e => {
                participantsLayoutY.current = e.nativeEvent.layout.y;
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
                commentsLayoutY.current = e.nativeEvent.layout.y;
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
    backgroundColor: BACK_WHITE,
  },
});
