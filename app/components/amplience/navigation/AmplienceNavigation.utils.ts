import {type AmplienceContentItem} from '~/clients/amplience/fetch-types';
import {type AmplienceMenuItem} from './AmplienceNavigation';

const schemaTypeMapping: {[key: string]: string} = {
  'https://demostore.amplience.com/site/pages/landing': 'page',
  'https://demostore.amplience.com/site/pages/external': 'external',
  'https://demostore.amplience.com/site/pages/page-group': 'group',
  'https://demostore.amplience.com/site/pages/category': 'category',
};

const buildNodeHref = (node: AmplienceContentItem) => {
  const typeMap: {[key: string]: string} = {
    category: 'collections',
    page: 'content-page',
  };
  const re = new RegExp(Object.keys(typeMap).join('|'), 'gi');
  const deliveryKey = node.content._meta?.deliveryKey;
  const path = deliveryKey?.replace(re, (matched: string) => typeMap[matched]);

  return path ? `/${path}` : undefined;
};

const buildAmplienceMenuItem = (
  node: AmplienceContentItem,
): AmplienceMenuItem => {
  const type = schemaTypeMapping[node.content?._meta?.schema];
  return {
    id: node.content?._meta?.deliveryId,
    type,
    title: node.content?.title || 'Collection', // TODO: Collection titles need to be enriched from shopify collection api
    href: node.content?.href ? node?.content?.href : buildNodeHref(node),
    children: node.children?.map(buildAmplienceMenuItem),
  };
};

const filterInactiveNode = (node: AmplienceContentItem) =>
  node?.content?.active !== false;

export const buildAmplienceMenu = (nodes: AmplienceContentItem[]) => {
  nodes.sort(
    (a: AmplienceContentItem, b: AmplienceContentItem) =>
      b.content.menu.priority - b.content.menu.priority,
  );

  return nodes.filter(filterInactiveNode).map(buildAmplienceMenuItem);
};
