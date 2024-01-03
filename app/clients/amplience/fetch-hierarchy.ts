import {
  type AmplienceContentItem,
  type ContentContext,
  type ContentParams,
} from './fetch-types';

const DEFAULT_PARAMS = {depth: 'all', format: 'inlined', locale: 'en-US'};

export const fetchHierarchy = async (
  id: string,
  context: ContentContext,
  params?: ContentParams,
) => {
  const request = {
    filterBy: [
      {
        path: '/_meta/hierarchy/parentId',
        value: id,
      },
    ],
    sortBy: {
      key: 'default',
      order: 'asc',
    },
  };
  const {hubName, stagingHost} = context;
  const host = stagingHost ?? `${hubName}.cdn.content.amplience.net`;
  const url = `https://${host}/content/filter`;
  const body = JSON.stringify({
    ...request,
    parameters: {...DEFAULT_PARAMS, ...params},
  });
  const response = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body,
  });
  const json = await response.json<{responses: AmplienceContentItem[]}>();

  const responses = json?.responses || [];

  for (const i in responses) {
    const hydratedChildren = await fetchHierarchy(
      responses[i]?.content?._meta?.deliveryId,
      context,
      params,
    );
    responses[i].children = hydratedChildren;
  }
  return responses;
};
