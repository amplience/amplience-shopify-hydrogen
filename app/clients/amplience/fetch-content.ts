import {
  type AmplienceContentItem,
  type ContentContext,
  type ContentItemRequest,
  type ContentParams,
} from './fetch-types';

const DEFAULT_PARAMS = {depth: 'all', format: 'inlined', locale: 'en-US'};

export const fetchContent = async (
  items: ContentItemRequest[],
  context: ContentContext,
  params: ContentParams = {},
): Promise<AmplienceContentItem[]> => {
  const {hubName, stagingHost} = context;
  const host = stagingHost ?? `${hubName}.cdn.content.amplience.net`;
  const url = `https://${host}/content`;
  const qs = new URLSearchParams({...DEFAULT_PARAMS, ...params}).toString();
  return Promise.all(
    items.map(async (item) => {
      const path = item?.id ? `id/${item.id}` : `key/${item.key}`;
      const response = await fetch(`${url}/${path}?${qs}`);
      const json = await response.json<{content: AmplienceContentItem}>();
      return json.content;
    }),
  );
};
