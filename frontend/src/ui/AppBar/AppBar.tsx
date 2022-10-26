import { ParentComponent } from 'solid-js';

const AppBar: ParentComponent = props => {
  return <div class='sticky top-0'>{props.children}</div>;
};

export default AppBar;
