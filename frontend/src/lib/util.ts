export function join(...xs: string[]) {
  return xs.join(' ');
}

export function minuteOfDate(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

export function timeStr(date: Date) {
  const padZero = (num: number) => num.toString().padStart(2, '0');
  return `${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
}

export function durationStr(start: Date, end: Date) {
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

export function timeStrToDate(time: string, day: number) {
  const date = dateOfDay(day);
  date.setHours(Number(time.slice(0, 2)), Number(time.slice(-2)), 0, 0);
  return date;
}
