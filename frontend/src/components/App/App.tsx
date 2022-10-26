import { Component } from 'solid-js';
import { AppBar, Icon } from '../../ui';
import Week from './../Week';

const App: Component = () => {
  return (
    <div class='h-screen flex flex-col'>
      <AppBar>
        <div class='flex h-16 items-center p-2'>
          <Icon symbol='Menu' />
        </div>
      </AppBar>
      <div class='flex flex-1 overflow-hidden'>
        <div class='w-80 overflow-auto hide-scrollbar'>{/* side bar */}</div>
        <div class='flex-1 overflow-auto hide-scrollbar'>
          <Week />
        </div>
      </div>
    </div>
  );
};

export default App;
