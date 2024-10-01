declare module 'editorjs-table' {
  export interface TableToolConfig {
    [key: string]: any;
  }

  export class Table {
    constructor(config: TableToolConfig);
    render(): HTMLElement;
  }

  export default Table;
}
