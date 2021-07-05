/**
 * 列表时间筛选 - 计算时间间距
 */

// 根据start和end输入的时间计算时间戳
const getLater = (start: number, end: number) => {
  const startTs = new Date(start).getTime(); // 开始时间为当天开始时间
  const endTs = new Date(end).getTime() + 1000 * 60 * 60 * 24; // 结束的时间为结束日期的结束时间
  return {before: endTs, after: startTs};
};

// 获得今天开始结束的时间戳
const getToday = () => {
  const date = new Date();
  const start = date.setHours(0, 0, 0, 0);
  const end = start + 24 * 60 * 60 * 1000;
  return {before: end, after: start};
};

// 获得明天开始结束的时间戳
const getTomorrow = () => {
  const {before: todayEnd, after: todayStart} = getToday();

  const end = todayEnd + 24 * 60 * 60 * 1000;
  const start = todayStart + 24 * 60 * 60 * 1000;
  return {before: end, after: start};
};

// 获取这周开始结束的时间戳
const getThisWeek = () => {
  const date = new Date();
  const today = date.getDay();

  let stepSunDay = -today + 1;

  // 如果今天是周日
  if (today === 0) {
    stepSunDay = -7;
  }

  // 周一距离今天的天数（负数表示）
  const stepMonday = 7 - today;

  const time = date.getTime();

  const monday = new Date(time + stepSunDay * 24 * 3600 * 1000).getTime();
  const sunday = new Date(time + stepMonday * 24 * 3600 * 1000).getTime();
  return {before: sunday, after: monday};
};

// 获取这个月开始结束的时间戳
const getThisMonth = () => {
  const start = new Date();
  start.setDate(1);

  // 获取当前月的最后一天
  const date = new Date();
  let currentMonth = date.getMonth();
  const nextMonth = ++currentMonth;
  const nextMonthFirstDay = new Date(
    date.getFullYear(),
    nextMonth,
    1
  ).getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const end = new Date(nextMonthFirstDay - oneDay).getTime();
  return {before: end, after: start.getTime()};
};

export {getLater, getToday, getTomorrow, getThisWeek, getThisMonth};
