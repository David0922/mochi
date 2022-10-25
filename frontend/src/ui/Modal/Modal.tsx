import { Accessor, ParentComponent, Setter, Show } from 'solid-js';
import { join } from '../../lib/util';

const Modal: ParentComponent<{
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
}> = props => {
  return (
    <Show when={props.open()}>
      <div
        class={join(
          'fixed',
          'w-screen',
          'h-screen',
          'left-0',
          'top-0',
          'z-50',
          'grid',
          'place-items-center',
          'bg-black/75'
        )}
        onclick={() => props.setOpen(false)}>
        <div
          class='w-1/2 max-h-screen overflow-auto'
          onclick={e => e.stopPropagation()}>
          {props.children}
        </div>
      </div>
    </Show>
  );
};

export default Modal;
