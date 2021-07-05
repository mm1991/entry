import {
  getLater,
  getToday,
  getTomorrow,
  getThisWeek,
  getThisMonth,
} from './utils/calTimeRange';

export const selectTime = [
  {
    id: 0,
    name: 'ANYTIME',
  },
  {
    id: 1,
    name: 'TODAY',
  },
  {
    id: 2,
    name: 'TOMORROW',
  },
  {
    id: 3,
    name: 'THIS WEEK',
  },
  {
    id: 4,
    name: 'THIS MONTH',
  },
  {
    id: 5,
    name: 'LATER',
  },
];

export const selectTimeAction = [
  {
    fn: () => {
      return {before: 0, after: 0};
    },
  },
  {
    fn: getToday,
  },
  {
    fn: getTomorrow,
  },
  {
    fn: getThisWeek,
  },
  {
    fn: getThisMonth,
  },
  {
    fn: getLater,
  },
];

export const defualtAvatar =
  'https://coding.net/static/fruit_avatar/Fruit-15.png';
