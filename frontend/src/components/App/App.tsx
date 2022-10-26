import { Component } from 'solid-js';
import State from './../../lib/state';
import Week from './../Week';

const App: Component = () => {
  State.getInstance();

  return (
    <div class='flex h-screen'>
      <div class='w-96'>{/* side bar */}</div>
      <div class='flex-1'>
        <Week />
      </div>
    </div>
  );
};

export default App;
