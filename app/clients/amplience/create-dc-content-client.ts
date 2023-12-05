import type {
  ContentItemRequest,
  ContentItem,
} from './create-dc-content-client.types';

interface DcContentClientOptions {
  hubName: string;
}

const DEFAULT_PARAMS = {depth: 'all', format: 'inlined'};

export function createDcContentClient({hubName}: DcContentClientOptions) {
  const host = `https://${hubName}.cdn.content.amplience.net/content`;
  const fetchContent = async (
    items: ContentItemRequest[],
    params = {},
  ): Promise<ContentItem[]> => {
    const qs = new URLSearchParams({...DEFAULT_PARAMS, ...params}).toString();
    return Promise.all(
      items.map(async (item) => {
        const path = item && item.id ? `id/${item.id}` : `key/${item.key}`;
        const response = await fetch(`${host}/${path}?${qs}`);
        const json = await response.json<{content: ContentItem}>();
        return json.content;
      }),
    );
  };
  return {
    ampContentClient: {fetchContent},
  };
}
