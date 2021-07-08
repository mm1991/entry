/**
 * 接口管理
 */

import {request} from './request';
import {defualtAvatar} from '../globalConfig';

interface loginParamsType {
  username: string;
  password: string;
}
// 用户登陆
export const loginApi = async (params: loginParamsType) => {
  return request('/auth/token', 'POST', params, false);
};

// 用户注册
export const joinApi = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return request(
    '/join',
    'POST',
    {
      username,
      password,
      email: `${username}@shopee.com`,
      avatar: defualtAvatar,
    },
    false
  );
};

// 获取活动列表
export const getEventsApi = async (params = {}) => {
  return request('/events', 'GET', params);
};

// 获取活动详情
export const getEventDetailApi = async (eventId: number) => {
  return request(`/events/${eventId}`, 'GET');
};

// 获取 channels 列表
export const getChannelsApi = async () => {
  return request('/channels', 'GET');
};

// 获取 comments 列表
export const getCommentsApi = async (eventId: number) => {
  return request(`/events/${eventId}/comments`, 'GET');
};

// 获取 participants 列表
export const getParticipantsApi = async (eventId: number) => {
  return request(`/events/${eventId}/participants`, 'GET');
};

// 获取 likes 列表
export const getLikesApi = async (eventId: number) => {
  return request(`/events/${eventId}/likes`, 'GET');
};

// 发送评论
export const submitCommentsApi = async (eventId: number, comment: string) => {
  return request(`/events/${eventId}/comments`, 'POST', {comment});
};

// likes 和 going 的操作
export const chooseLikeGoingApi = async (
  eventId: number,
  type: string,
  status: boolean
) => {
  return request(`/events/${eventId}/${type}`, status ? 'POST' : 'DELETE');
};

// 账号信息
export const getUserApi = async () => {
  return request('/user', 'GET');
};

interface getUserEventApiType {
  type: string;
  offset?: number;
}
export const getUserEventApi = async (params: getUserEventApiType) => {
  return request('/user/events', 'GET', params);
};
