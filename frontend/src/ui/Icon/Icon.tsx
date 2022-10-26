import { Component } from 'solid-js';

const Icon: Component<{ symbol: string }> = props => {
  return <span class='material-symbols-outlined'>{props.symbol}</span>;
};

export default Icon;
