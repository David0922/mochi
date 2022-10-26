import { Component } from 'solid-js';
import { AppBar, Icon } from '../../ui';
import State from './../../lib/state';
import Week from './../Week';

const App: Component = () => {
  State.getInstance();

  return (
    <div class='h-screen flex flex-col'>
      <AppBar>
        <Icon symbol='Menu' />
      </AppBar>
      <div class='flex flex-1 overflow-hidden'>
        <div class='w-80 overflow-auto'>{/* side bar */}</div>
        <div class='flex-1 overflow-auto'>
          <Week />
        </div>
      </div>
    </div>
  );
};

export default App;
