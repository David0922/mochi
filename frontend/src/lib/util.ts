export function join(...xs: string[]) {
  return xs.join(' ');
}

export function strTimeToMinute(time: string) {
  const num = Number(time);
  return Math.floor(num / 100) * 60 + (num % 100);
}

export function timeStr(time: string) {
  return `${time.slice(0, 2)}:${time.slice(-2)}`;
}

export function durationStr(start: string, end: string) {
  return `${timeStr(start)} - ${timeStr(end)}`;
}

export function sundayDate(weekOffset = 0) {
  const date = new Date();
  date.setDate(date.getDate() - date.getDay() + weekOffset);
  return date;
}

export function dateOfDay(day: number, weekOffset = 0) {
  const date = sundayDate(weekOffset);
  date.setDate(date.getDate() + day);
  return date;
}
