import { dark, Theme } from './theme';

export default class State {
  private static instance: State;

  private home: string;
  private theme: Theme;

  private constructor() {
    this.home = '/calendar';

    this.theme = { color: dark };

    document.body.classList.add(
      this.theme.color.bg.primary,
      this.theme.color.text.primary
    );
  }

  public static getInstance() {
    if (!State.instance) State.instance = new State();

    return State.instance;
  }

  public getHome() {
    return this.home;
  }

  public getTheme() {
    return this.theme;
  }
}
