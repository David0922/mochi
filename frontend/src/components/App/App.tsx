import { Component } from 'solid-js';
import State from './../../lib/state';
import Week from './../Week';

const App: Component = () => {
  State.getInstance();

  return <Week />;
};

export default App;
