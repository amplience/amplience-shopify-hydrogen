export type ContentItemRequest = {id?: string; key?: string};
export type AmplienceContentItem = Record<string, any>;

export type AmplienceNavigationNode = {
  content: AmplienceContentItem;
  children: AmplienceContentItem[];
};

export type ContentContext = {hubName: string; stagingHost?: string};
export type ContentParams = {depth?: string; format?: string; locale?: string};
