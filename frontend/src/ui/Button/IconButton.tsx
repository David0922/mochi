import { Component, JSX } from 'solid-js';
import State from '../../lib/state';
import { join } from '../../lib/util';

const IconButton: Component<{
  symbol: string;
  onclick?: JSX.EventHandler<HTMLButtonElement, MouseEvent>;
}> = props => {
  const {
    color: { button },
  } = State.getInstance().getTheme();

  return (
    <button
      onclick={props.onclick}
      class={join(
        'p-3',
        'rounded-full',
        button.primary,
        'material-symbols-outlined'
      )}>
      {props.symbol}
    </button>
  );
};

export default IconButton;
