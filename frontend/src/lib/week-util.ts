import { Event } from './schema';
import { timeStrToDate } from './util';

function groupEventsByDay(events: Event[]) {
  const groups: Event[][] = Array.from({ length: 7 }, () => []);

  events.forEach(event => {
    if (event.day !== undefined) groups[event.day].push(event);
    else if (event.days !== undefined)
      event.days.forEach(day =>
        groups[day].push({ ...event, day, days: undefined })
      );
    else groups.forEach((group, day) => group.push({ ...event, day }));
  });

  groups.forEach(group => group.sort((a, b) => a.start.localeCompare(b.start)));

  return groups;
}

function fillOverlapsAndOffset(events: Event[]) {
  const n = events.length;

  const overlap = (i, j) => {
    const a0 = Number(events[i].start),
      a1 = Number(events[i].end),
      b0 = Number(events[j].start),
      b1 = Number(events[j].end);

    return !(a1 <= b0 || b1 <= a0);
  };

  for (let i = 0; i < n; ++i) {
    events[i].offset = events[i].offset || 0;
    events[i].maxOffset = events[i].maxOffset || 0;

    for (let j = i + 1; j < n && overlap(i, j); ++j) {
      events[j].offset = events[i].offset + 1;
      events[j].maxOffset = events[i].maxOffset + 1;
    }
  }

  for (let i = n - 1; i >= 0; --i)
    for (let j = i - 1; j >= 0; --j)
      if (overlap(i, j))
        events[j].maxOffset = Math.max(
          events[i].maxOffset,
          events[j].maxOffset
        );
}

function fillStartAndEndDate(event: Event) {
  event.startDate = timeStrToDate(event.start, event.day);
  event.endDate = timeStrToDate(event.end, event.day);
}

export async function fetchEvents(): Promise<Event[][]> {
  const url = '/weekly-plan.json';
  const response = await fetch(url);

  if (!response.ok) {
    console.error(`failed to fetch ${url}`);
    return [];
  }

  const events: Event[] = await response.json();
  const eventGroups = groupEventsByDay(events);

  eventGroups.forEach(events => {
    fillOverlapsAndOffset(events);
    events.forEach(fillStartAndEndDate);
  });

  return eventGroups;
}
