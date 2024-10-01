declare module 'editorjs-alert' {
  export interface AlertConfig {
    [key: string]: any;
  }

  export default class Alert {
    constructor(config: AlertConfig);
    render(): HTMLElement;
  }
}
