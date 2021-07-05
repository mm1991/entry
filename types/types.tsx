/**
 * ts类型定义
 */

export type RootStackParamList = {
  List: undefined;
  Login: undefined;
  Detail: undefined;
  NotFound: undefined;
  User: undefined;
};

export interface userDataType {
  token: string;
  user: userType;
}

interface userType {
  avatar: string;
  username: string;
}

export interface userInfoType {
  avatar: string;
  email: string;
  username: string;
  likes_count: number;
  past_count: number;
  goings_count: number;
}

interface creator {
  avatar: string;
  username: string;
}

export interface detail {
  id: number;
  me_likes: boolean;
  me_going: boolean;
  images: Array<string>;
  description: string;
  createdAt: string;
  location: string;
  updatedAt: string;
  location_detail: string;
  creator: creator;
  channel: channelType;
  name: string;
  goings_count: number;
  likes_count: number;
}

export interface channelType {
  id: number;
  name: string;
}

export interface eventsType {
  me_likes: boolean;
  me_going: boolean;
}

export interface commentType {
  user: userType;
  comment: string;
  createdAt: string;
}

export interface participantsType {
  avatar: string;
}

export interface likesType {
  avatar: string;
}
