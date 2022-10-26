import {
  Component,
  createEffect,
  createSignal,
  onCleanup,
  Show,
} from 'solid-js';
import Modal from '../../ui/Modal';
import State from './../../lib/state';
import { durationStr, join, strTimeToMinute, timeStr } from './../../lib/util';
import { Event } from './week-util';

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

    const startMinute = strTimeToMinute(props.event.startTime);
    const duration = strTimeToMinute(props.event.endTime) - startMinute;

    const maxOffset = Math.min(props.event.maxOffset, maxOverlaps);
    const offset = Math.min(props.event.offset, maxOverlaps);
    const step = 10; // percent

    setMultiLine(duration >= 60 || !props.event.title);

    ref.style.top = `${startMinute * 0.05}rem`;
    ref.style.height = `${Math.max(duration, 30) * 0.05}rem`;

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
            fallback={`${timeStr(props.event.startTime)}, ${
              props.event.title
            }`}>
            <span>
              {durationStr(props.event.startTime, props.event.endTime)}
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

const EventDetail: Component<{ event: Event }> = props => {
  return <pre class='px-8 py-4'>{JSON.stringify(props.event, null, 2)}</pre>;
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

    // update every 5 minutes
    const clock = setInterval(updateClock, 5 * 60 * 1000);

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
