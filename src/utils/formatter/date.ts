const timestampRange = {
  tenDays: 864000000,
  oneDay: 86400000,
  oneHour: 3600000,
  oneMinute: 60000
}

const deltaTime = (now: Date, past: Date): number => {
  return now.getTime() - past.getTime();
}

const pad = (str: any): string => {
  return str.toString().padStart(2, '0');
}

const custom = (delta: number): string => {
  const {
    oneDay,
    oneHour,
    oneMinute
  } = timestampRange;
  
  if (delta > oneDay) {
    const days = Math.floor(delta / oneDay);
    return `${days} 天前`;
  } else if (delta > oneHour) {
    const hours = Math.floor(delta / oneHour);
    return `${hours} 小时前`;
  } else {
    const minutes = Math.floor(delta / oneMinute);
    return `${minutes} 分钟前`
  }
}

const normal = (date: Date | string): string => {
  if(typeof date === 'string') date = new Date(parseInt(date, 10));
  const [year, month, day] = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ]
  const time = date.toTimeString().slice(0,8);
  return `${year}-${pad(month)}-${pad(day)} ${time}`;
}

const auto = (timestamp: string) => {
  const targetDate = new Date(parseInt(timestamp, 10));
  const currentDate = new Date();
  const delta = deltaTime(currentDate, targetDate);
  if (delta > timestampRange.tenDays) {
    return normal(targetDate);
  } else {
    return custom(delta);
  }
}

export default {
  auto,
  normal
};
