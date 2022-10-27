import { Component, JSX } from 'solid-js';
import State from '../../lib/state';

const TextButton: Component<{
  text: string;
  href?: string;
  onclick?: JSX.EventHandler<HTMLButtonElement, MouseEvent>;
}> = props => {
  const {
    color: { button },
  } = State.getInstance().getTheme();

  return (
    <a href={props.href}>
      <button onclick={props.onclick} class={`px-5 py-3 ${button.primary}`}>
        {props.text}
      </button>
    </a>
  );
};

export default TextButton;
