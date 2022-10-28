export function join(...xs: string[]) {
  return xs.join(' ');
}

export function minuteOfDate(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

function padZero(num: number) {
  return num.toString().padStart(2, '0');
}

export function timeStr(date: Date) {
  return `${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
}

export function timeDiffMs(a: Date, b: Date) {
  return b.getTime() - a.getTime();
}

export function timeDiffStr(a: Date, b: Date) {
  let s = Math.floor(timeDiffMs(a, b) / 1000);
  let m = Math.floor(s / 60);
  let h = Math.floor(m / 60);

  s %= 60;
  m %= 60;

  const t = [];

  h && t.push(padZero(h));
  (h || m) && t.push(padZero(m));
  t.push(padZero(s));

  return t.join(':');
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
