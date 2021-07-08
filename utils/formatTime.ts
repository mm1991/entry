/**
 * 计算时间显示格式
 */

// 日期一位时首位补齐0
function padZero(val: number) {
  return val.toString().padStart(2, '0');
}

// 转为东7区时间
function getLocalTime(time: number | string) {
  const d = new Date(time);
  //得到1970年一月一日到现在的秒数
  const len = d.getTime();
  //本地时间与GMT时间的时间偏移差
  const offset = d.getTimezoneOffset() * 60000;
  //得到现在的格林尼治时间
  const utcTime = len + offset;
  return new Date(utcTime + 3600000 * 7);
}

// 时间戳转显示日期 eg: 04 Jul 2021
export const formatDate = (date: string) => {
  const time = getLocalTime(date);
  const MonthArr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${padZero(time.getDate())} ${
    MonthArr[time.getMonth()]
  } ${time.getFullYear()}`;
};

// 时间戳转显示日期 eg: 05/07/2012
export const formatDatePicker = (date: number) => {
  const time = getLocalTime(date);
  return `${padZero(time.getDate())}/${padZero(
    time.getMonth() + 1
  )}/${time.getFullYear()}`;
};

// 时间戳转时间 eg: {time: 8:20, ampm: am}
export const formatTime = (date: string) => {
  const time = getLocalTime(date);
  const hour = time.getHours();
  return {
    time: (hour > 12 ? hour - 12 : hour) + ':' + padZero(time.getMinutes()),
    ampm: hour > 12 ? 'PM' : 'AM',
  };
};

// 限制字符长度，超过长度截断加...
export const limitChar = (str: string, lenMax: number) => {
  const len = str.length;
  return len > lenMax ? str.substring(0, lenMax) + '...' : str;
};

// 计算时间距离  eg: 5 hours ago
export const calDurationText = (date: number | string) => {
  const duration = (new Date().getTime() - new Date(date).getTime()) / 1000;
  let text = '';
  if (duration < 0) {
    text = 'In a minutes';
  } else if (duration < 60) {
    text = `${Math.floor(duration)} seconds ago`;
  } else if (duration < 60 * 60) {
    text = `${Math.floor(duration / 60)} minutes ago`;
  } else if (duration < 60 * 60 * 24) {
    text = `${Math.floor(duration / (60 * 60))} hours ago`;
  } else {
    text = `${Math.floor(duration / (60 * 60 * 24))} days ago`;
  }
  return text;
};

interface rangeType {
  before: number;
  after: number;
}

// 时间戳转日期 输入:{before: , after: } 输出: from 5/6 to 10/7
export const transTimeToString = (range: rangeType) => {
  const start = getLocalTime(range.before);
  const end = getLocalTime(range.after);
  return `from ${padZero(end.getDate())}/${padZero(
    end.getMonth() + 1
  )} to ${padZero(start.getDate())}/${padZero(start.getMonth() + 1)}`;
};
