import { Component, createResource } from 'solid-js';
import State from './../../lib/state';
import { dateOfDay, join } from './../../lib/util';
import { EventWrapper } from './Event';
import { Event, fetchEvents } from './week-util';

const Week: Component = () => {
  const { color } = State.getInstance().getTheme();

  const [eventGroups] = createResource<Event[][]>(fetchEvents);

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const times = Array.from({ length: 24 }, (_, hour) => {
    // return i ? `0${i}:00`.slice(-5) : '';

    if (!hour) return '';
    else if (hour < 12) return `${hour} am`;
    else if (hour === 12) return '12 pm';
    else return `${hour - 12} pm`;
  });

  const leftWidth = 'w-16';
  const leftProtrusionWidth = 'w-2';
  const cellHeight = 'h-12'; // 1 minute = 12/4/60 = 0.05 rem

  return (
    <div>
      <div class={`flex sticky top-0 ${color.bg.primary} z-10`}>
        <div class={`flex items-stretch justify-end ${leftWidth}`}>
          <div class={`border-b ${color.border} ${leftProtrusionWidth}`} />
        </div>
        {days.map((day, i) => (
          <div class='flex-1 text-center'>
            <div>{day}</div>
            <div class={`border-b border-l ${color.border}`}>
              {dateOfDay(i).getDate()}
            </div>
          </div>
        ))}
      </div>
      <div class='flex'>
        <div class='flex flex-col'>
          {times.map((time, i) => (
            <div
              class={join(
                'flex',
                'items-stretch',
                'justify-end',
                'gap-x-1.5',
                leftWidth,
                cellHeight
              )}>
              <div class='flex items-center justify-center -mt-12'>{time}</div>
              <div
                class={join(leftProtrusionWidth, i && 'border-t', color.border)}
              />
            </div>
          ))}
        </div>
        <div class='relative flex flex-1'>
          {days.map((_, i) => (
            <div class='relative flex-1'>
              {times.map((_, j) => (
                <div
                  class={join(
                    j && 'border-t',
                    'border-l',
                    color.border,
                    cellHeight
                  )}
                />
              ))}
              {eventGroups.state === 'ready' && (
                <EventWrapper day={i} events={eventGroups()[i]} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Week;
