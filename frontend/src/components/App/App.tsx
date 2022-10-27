import { Navigate, Route, Routes } from '@solidjs/router';
import { Component, lazy } from 'solid-js';
import State from '../../lib/state';
import { AppBar, IconButton, TextButton } from '../../ui';

const Backlog = lazy(() => import('../Backlog'));
const Board = lazy(() => import('../Board'));
const Calendar = lazy(() => import('../Calendar'));
const Notes = lazy(() => import('../Notes'));

const App: Component = () => {
  const state = State.getInstance();

  return (
    <div class='h-screen flex flex-col'>
      <AppBar>
        <div class='flex space-x-2 items-center p-2'>
          <div class='logo font-bold px-5 text-xl'>mochi</div>
          <TextButton text='backlog' href='/backlog' />
          <TextButton text='board' href='/board' />
          <TextButton text='calendar' href='/calendar' />
          <TextButton text='notes' href='/notes' />
          <div class='flex-1' />
          <IconButton symbol='settings' />
          <IconButton symbol='logout' />
        </div>
      </AppBar>
      <div class='flex-1 overflow-hidden'>
        <Routes>
          <Route path='/' element={<Navigate href={state.getHome()} />} />
          <Route path='/backlog' component={Backlog} />
          <Route path='/board' component={Board} />
          <Route path='/calendar' component={Calendar} />
          <Route path='/notes' component={Notes} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
