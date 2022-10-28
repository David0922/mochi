import {
  Component,
  createEffect,
  createSignal,
  onCleanup,
  Show,
} from 'solid-js';
import { Event } from '../../lib/schema';
import State from '../../lib/state';
import {
  durationStr,
  join,
  minuteOfDate,
  timeDiffMs,
  timeDiffStr,
  timeStr,
} from '../../lib/util';
import { Modal } from '../../ui';

const EventComp: Component<{ event: Event }> = props => {
  const {
    color: {
      event: { primary },
    },
  } = State.getInstance().getTheme();

  let ref: HTMLDivElement | undefined;

  const [multiLine, setMultiLine] = createSignal(true);

  const [showDetail, setShowDetail] = createSignal(false);

  const maxOverlaps = 5;

  createEffect(() => {
    if (!ref) return;

    const startMinute = minuteOfDate(props.event.startDate);
    const duration = minuteOfDate(props.event.endDate) - startMinute;

    const maxOffset = Math.min(props.event.maxOffset, maxOverlaps);
    const offset = Math.min(props.event.offset, maxOverlaps);
    const step = 10; // percent

    setMultiLine(duration >= 60 || !props.event.title);

    ref.style.top = `${startMinute * 0.05}rem`;
    ref.style.height = `${duration * 0.05}rem`;

    ref.style.left = `${offset * step}%`;
    ref.style.width = `${100 - maxOffset * step}%`;
  });

  return (
    <>
      <div
        ref={ref}
        class={join(
          'absolute',
          'left-0',
          'px-2',
          'py-1',
          'border',
          primary.border,
          primary.bg
        )}
        onclick={() => setShowDetail(true)}>
        <div class='break-words h-full overflow-y-clip text-xs'>
          <Show
            when={multiLine()}
            fallback={`${timeStr(props.event.startDate)}, ${
              props.event.title
            }`}>
            <span>
              {durationStr(props.event.startDate, props.event.endDate)}
            </span>
            <br />
            <span>{props.event.title || ''}</span>
          </Show>
        </div>
      </div>
      <Modal open={showDetail()} setOpen={setShowDetail}>
        <EventDetail event={props.event} />
      </Modal>
    </>
  );
};

const CountDown: Component<{ event: Event }> = props => {
  const {
    color: { text },
  } = State.getInstance().getTheme();

  const [ended, setEnded] = createSignal(false);
  const [info, setInfo] = createSignal('');
  const [timeStr, setTimeStr] = createSignal('');
  const [percent, setPercent] = createSignal(0);

  const updateTimer = () => {
    const now = new Date();

    if (now < props.event.startDate) {
      setInfo('starts in');
      setTimeStr(timeDiffStr(now, props.event.startDate));
    } else if (now < props.event.endDate) {
      setInfo('ends in');
      setTimeStr(timeDiffStr(now, props.event.endDate));
      setPercent(() => {
        const timePast = timeDiffMs(props.event.startDate, new Date());
        const duration = timeDiffMs(props.event.startDate, props.event.endDate);
        return Math.floor(100 - (timePast / duration) * 100);
      });
    } else {
      setEnded(true);
    }
  };

  const timer = setInterval(updateTimer, 1000);

  createEffect(() => ended() && clearInterval(timer));

  onCleanup(() => clearInterval(timer));

  updateTimer();

  return (
    <Show when={!ended()}>
      <div class='flex items-end space-x-4'>
        <div class={`flex-1 text-right ${text.faded}`}>{info()}</div>
        <div class='text-4xl text-center'>{timeStr()}</div>
        <div class={`flex-1 ${text.faded}`}>{percent() && `${percent()}%`}</div>
      </div>
    </Show>
  );
};

const EventDetail: Component<{ event: Event }> = props => {
  return (
    <div class='flex flex-col space-y-4 px-8 py-4'>
      <CountDown event={props.event} />
      <pre>{JSON.stringify(props.event, null, 2)}</pre>
    </div>
  );
};

export const EventWrapper: Component<{
  day: number;
  events: Event[];
}> = props => {
  const {
    color: {
      event: { secondary },
    },
  } = State.getInstance().getTheme();

  let clockRef: HTMLDivElement | undefined;

  createEffect(() => {
    if (!clockRef) return;

    const updateClock = () => {
      const now = new Date();
      const minute = now.getHours() * 60 + now.getMinutes();

      clockRef.style.display = now.getDay() === props.day ? 'block' : 'none';
      clockRef.style.top = `${minute * 0.05}rem`;
    };

    // update every 2 minutes
    const clock = setInterval(updateClock, 2 * 60 * 1000);

    onCleanup(() => clearInterval(clock));

    updateClock();
  });

  return (
    <div class='absolute top-0 left-0 w-11/12 h-full'>
      {props.events.map(event => (
        <EventComp event={event} />
      ))}
      <div ref={clockRef} class='absolute left-0 w-full'>
        <div class={`border-t ${secondary.border}`} />
        <div
          class={`absolute w-2 h-2 -left-1 -top-1 rounded-full ${secondary.bg}`}
        />
      </div>
    </div>
  );
};
