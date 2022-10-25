import { dark, Theme } from './theme';

export default class State {
  private static instance: State;

  private theme: Theme;

  private constructor() {
    this.theme = { color: dark };

    document.body.classList.add(this.theme.color.bg.primary);
  }

  public static getInstance() {
    if (!State.instance) State.instance = new State();

    return State.instance;
  }

  public getTheme() {
    return this.theme;
  }
}
