export type ContentItemRequest = {id?: string; key?: string};
export type AmplienceContentItem = {
  _meta: {
    name: string;
    schema: string;
    deliveryId: string;
    deliveryKey?: string;
    hierarchy?: {parentId: string; root: boolean};
  };
  [key: string]: any;
};

export type AmplienceNavigationNode = {
  content: AmplienceContentItem;
  children: AmplienceContentItem[];
};

export type ContentContext = {hubName: string; stagingHost?: string};
export type ContentParams = {depth?: string; format?: string; locale?: string};
