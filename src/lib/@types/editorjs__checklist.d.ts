declare module '@editorjs/checklist' {
  export interface ChecklistToolConfig {
    [key: string]: any;
  }

  interface BlockTool {
    save: (blockData: any) => Promise<any>;
    render: () => HTMLElement;
  }

  export default class Checklist implements BlockTool {
    constructor(config: ChecklistToolConfig);
    save(blockData: any): Promise<any>;
    render(): HTMLElement;
  }
}
