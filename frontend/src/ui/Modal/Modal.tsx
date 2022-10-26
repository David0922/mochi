import { ParentComponent, Setter, Show } from 'solid-js';
import State from '../../lib/state';
import { join } from '../../lib/util';

const Modal: ParentComponent<{
  open: boolean;
  setOpen: Setter<boolean>;
}> = props => {
  const { color } = State.getInstance().getTheme();

  return (
    <Show when={props.open}>
      <div
        class={join(
          'fixed',
          'w-screen',
          'h-screen',
          'left-0',
          'top-0',
          'z-50',
          'bg-black/75',
          'py-16'
        )}
        onclick={() => props.setOpen(false)}>
        <div
          class={`mx-auto w-1/2 max-h-full overflow-auto ${color.bg.primary}`}
          onclick={e => e.stopPropagation()}>
          {props.children}
        </div>
      </div>
    </Show>
  );
};

export default Modal;
