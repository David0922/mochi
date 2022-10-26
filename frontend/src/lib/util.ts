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
