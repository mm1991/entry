import {action, observable, makeObservable} from 'mobx';
import {userDataType, channelType, eventsType} from '../types/types';
import {defualtAvatar} from '../globalConfig';

class Store {
  constructor() {
    makeObservable(this);
  }
  @observable events: Array<eventsType> = [];
  @observable userData: userDataType = {
    token: '',
    user: {
      avatar: defualtAvatar,
      username: '',
    },
  };
  @observable channelData: Array<Object> = [];
  @observable selectChannel: channelType = {
    id: -1,
    name: '',
  };
  @observable selectTime = -1;
  @observable startTime: number = new Date().getTime();
  @observable endTime: number = new Date().getTime();
  @observable lang = 'zh';

  // 使用@action 更改被观察者
  @action.bound setEvents(data: Array<eventsType>) {
    this.events = data;
  }
  @action.bound setUserData(data: userDataType) {
    this.userData = data;
  }
  @action.bound setChannelData(data: Array<Object>) {
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
