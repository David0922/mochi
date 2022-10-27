import hljs from 'highlight.js';
import 'highlight.js/styles/stackoverflow-dark.css';
import { Remarkable } from 'remarkable';
import { Component, createEffect, createResource } from 'solid-js';
import './rendered.css';

function renderMd(raw: string) {
  // https://github.com/jonschlinkert/remarkable#syntax-highlighting
  const remarkable = new Remarkable({
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {}
      }

      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {}

      return ''; // use external default escaping
    },
  });

  return remarkable.render(raw);
}

const Notes: Component = () => {
  const [notes] = createResource(async () => (await fetch('/notes.md')).text());

  let mdRef: HTMLDivElement | undefined;

  createEffect(() => {
    if (!mdRef || notes.state !== 'ready') return;

    mdRef.innerHTML = renderMd(notes());

    mdRef
      .querySelectorAll('pre code')
      .forEach((block: HTMLElement) => hljs.highlightBlock(block));
  });

  return (
    <div class='max-h-full overflow-auto hide-scrollbar'>
      <div
        ref={mdRef}
        class='max-w-screen-lg mx-auto my-8 flex flex-col space-y-8 text-xl tracking-wider leading-8 font-light'
      />
    </div>
  );
};

export default Notes;
