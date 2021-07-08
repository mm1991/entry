import {
  getLater,
  getToday,
  getTomorrow,
  getThisWeek,
  getThisMonth,
} from './utils/calTimeRange';

// 时间区间选择列表
export const selectTime = [
  {
    id: 0,
    name: 'ANYTIME',
    fn: () => {
      return {before: 0, after: 0};
    },
  },
  {
    id: 1,
    name: 'TODAY',
    fn: getToday,
  },
  {
    id: 2,
    name: 'TOMORROW',
    fn: getTomorrow,
  },
  {
    id: 3,
    name: 'THIS WEEK',
    fn: getThisWeek,
  },
  {
    id: 4,
    name: 'THIS MONTH',
    fn: getThisMonth,
  },
  {
    id: 5,
    name: 'LATER',
    fn: getLater,
  },
];

// 默认头像
export const defualtAvatar =
  'https://coding.net/static/fruit_avatar/Fruit-15.png';

// 接口path
export const BASEURL = 'http://mm.shopee.com:3000/api/v1';
