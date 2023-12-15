export type ContentItemRequest = {id?: string; key?: string};
export type ContentItem = {[key: string]: any};

export type ContentContext = {hubName: string; stagingHost?: string};
export type ContentParams = {depth?: string; format?: string; locale?: string};

const DEFAULT_PARAMS = {depth: 'all', format: 'inlined', locale: 'en-US'};

export const fetchContent = async <T>(
  items: ContentItemRequest[],
  context: ContentContext,
  params: ContentParams = {},
): Promise<ContentItem[]> => {
  const {hubName, stagingHost} = context;
  const host = stagingHost ?? `${hubName}.cdn.content.amplience.net`;
  const url = `https://${host}/content`;
  const qs = new URLSearchParams({...DEFAULT_PARAMS, ...params}).toString();
  return Promise.all(
    items.map(async (item) => {
      const path = item?.id ? `id/${item.id}` : `key/${item.key}`;
      const response = await fetch(`${url}/${path}?${qs}`);
      const json = await response.json<{content: ContentItem}>();
      return json.content;
    }),
  );
};
