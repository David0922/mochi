import { Component } from 'solid-js';

const Icon: Component<{ symbol: string }> = props => {
  return <div class='material-symbols-outlined'>{props.symbol}</div>;
};

export default Icon;
