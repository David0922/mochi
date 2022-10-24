import { Component, createEffect, createResource } from 'solid-js';
import State from './state';
import { durationStr, join, strTimeToMinute } from './util';

export interface Event {
  day?: number;
  startTime: string;
  endTime: string;
  title?: string;
  // overlaps?: number;
  // offset?: number;
}

const EventComp: Component<{ event: Event }> = props => {
  const {
    color: {
      event: { primary },
    },
  } = State.getInstance().getTheme();

  let ref: HTMLDivElement | undefined;

  createEffect(() => {
    if (!ref) return;

    const startMinute = strTimeToMinute(props.event.startTime);
    const duration = strTimeToMinute(props.event.endTime) - startMinute;

    ref.style.top = `${startMinute * 0.05}rem`;
    ref.style.height = `${Math.max(duration, 30) * 0.05}rem`;
  });

  return (
    <div
      ref={ref}
      class={join(
        'absolute',
        'left-0',
        'w-full',
        'px-2',
        'py-1',
        'border',
        primary.border,
        primary.bg
      )}>
      <div class='break-words h-full overflow-y-clip text-xs'>
        <span>{durationStr(props.event.startTime, props.event.endTime)}</span>
        <br />
        <span>{props.event.title || ''}</span>
      </div>
    </div>
  );
};

const EventWrapper: Component<{ day: number }> = props => {
  const {
    color: {
      event: { secondary },
    },
  } = State.getInstance().getTheme();

  const [events] = createResource<Event[]>(async () =>
    (await fetch('/weekly-plan.json')).json()
  );

  let clockRef: HTMLDivElement | undefined;

  createEffect(() => {
    if (!clockRef) return;

    const updateClock = () => {
      const now = new Date();
      const minute = now.getHours() * 60 + now.getMinutes();

      clockRef.style.display = now.getDay() === props.day ? 'block' : 'none';
      clockRef.style.top = `${minute * 0.05}rem`;
    };

    setInterval(updateClock, 2 * 60 * 1000); // update every 2 minutes

    updateClock();
  });

  return (
    <div class='absolute top-0 left-0 w-11/12 h-full'>
      {events.state === 'ready' &&
        events()
          .filter(event => event.day === undefined || event.day === props.day)
          .sort((a, b) => a.startTime.localeCompare(b.startTime))
          .map(event => <EventComp event={event} />)}
      <div
        ref={clockRef}
        class={`absolute left-0 w-full border-t ${secondary.border}`}
      />
    </div>
  );
};

const Week: Component = () => {
  const { color } = State.getInstance().getTheme();

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const now = new Date();
  const sundayDate = now.getDate() - now.getDay();
  const times = Array.from({ length: 24 }, (_, i) =>
    i ? `0${i}:00`.slice(-5) : ''
  );

  const leftWidth = 'w-16';
  const leftProtrusionWidth = 'w-2';
  const cellHeight = 'h-12'; // 1 minute = 12/4/60 = 0.05 rem

  return (
    <div class={color.text.primary}>
      <div class={`flex sticky top-0 ${color.bg.primary} z-10`}>
        <div class={`flex items-stretch justify-end ${leftWidth}`}>
          <div class={`border-b ${color.border} ${leftProtrusionWidth}`} />
        </div>
        {days.map((day, i) => (
          <div class='flex-1 text-center'>
            <div>{day}</div>
            <div class={`border-b border-l ${color.border}`}>
              {sundayDate + i}
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
                'justify-between',
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
              <EventWrapper day={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Week;
