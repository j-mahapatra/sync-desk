declare module '@editorjs/link' {
  export interface LinkConfig {
    endpoint?: string;
    [key: string]: any;
  }

  export default class Link {
    constructor(config: LinkConfig);
    render(): HTMLElement;
  }
}
