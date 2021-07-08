import {action, observable, makeObservable} from 'mobx';
import {userDataType, channelType, eventsType} from '../types/types';
import {defualtAvatar} from '../globalConfig';

class Store {
  constructor() {
    makeObservable(this);
  }
  // 活动列表
  @observable events: Array<eventsType> = [];
  // 用户信息
  @observable userData: userDataType = {
    token: '',
    user: {
      avatar: defualtAvatar,
      username: '',
    },
  };
  // channel列表
  @observable channelData: Array<channelType> = [];

  // 筛选选中信息
  // 当前选中的channel
  @observable selectChannel: channelType = {
    id: -1,
    name: '',
  };
  // 当前选中的时间区域
  @observable selectTime = -1;
  // LATER 开始时间
  @observable startTime: number = new Date().getTime();
  // LATER 结束时间
  @observable endTime: number = new Date().getTime();
  // 语言
  @observable lang = 'zh';

  @action.bound setEvents(data: Array<eventsType>) {
    this.events = data;
  }
  @action.bound setUserData(data: userDataType) {
    this.userData = data;
  }
  @action.bound setChannelData(data: Array<channelType>) {
    this.channelData = data;
  }
  @action.bound setSelectChannel(data: channelType) {
    this.selectChannel = data;
  }
  @action.bound setSelectTime(data: number) {
    this.selectTime = data;
  }
  @action.bound setStartTime(data: number) {
    this.startTime = data;
  }
  @action.bound setEndTime(data: number) {
    this.endTime = data;
  }
  @action.bound setLang(data: string) {
    this.lang = data;
  }
}
export const stores = new Store();
