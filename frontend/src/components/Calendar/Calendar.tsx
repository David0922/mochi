import { Component } from 'solid-js';
import Week from './Week';

const Calendar: Component = () => {
  return (
    <div class='flex max-h-full'>
      <div class='w-80 overflow-auto hide-scrollbar'>{/* side bar */}</div>
      <div class='flex-1 overflow-auto hide-scrollbar'>
        <Week />
      </div>
    </div>
  );
};

export default Calendar;
