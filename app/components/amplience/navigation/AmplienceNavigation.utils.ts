import {type AmplienceContentItem} from '~/clients/amplience/fetch-types';
import {type AmplienceMenuItem} from './AmplienceNavigation';

const schemaToTypeMapping: {[key: string]: string} = {
  'https://demostore.amplience.com/site/pages/landing': 'page',
  'https://demostore.amplience.com/site/pages/external': 'external',
  'https://demostore.amplience.com/site/pages/page-group': 'group',
  'https://demostore.amplience.com/site/pages/category': 'category',
};

const buildNodeHref = (node: AmplienceContentItem) => {
  const typeMap: {[key: string]: string} = {
    category: 'collections',
    page: 'content-pages',
  };
  const re = new RegExp(Object.keys(typeMap).join('|'), 'gi');
  const deliveryKey = node.content._meta?.deliveryKey;
  const path = deliveryKey?.replace(re, (matched: string) => typeMap[matched]);

  return path ? `/${path}` : undefined;
};

const transformNodeToMenuItem = (
  node: AmplienceContentItem,
): AmplienceMenuItem => {
  const type = schemaToTypeMapping[node.content?._meta?.schema];
  return {
    id: node.content?._meta?.deliveryId,
    type,
    title: node.content?.title,
    href: node.content?.href ? node?.content?.href : buildNodeHref(node),
    children: node.children?.map(transformNodeToMenuItem),
  };
};

const sortNodes = (nodes: AmplienceContentItem[]) => {
  nodes.sort(
    (a: AmplienceContentItem, b: AmplienceContentItem) =>
      a.content.menu.priority - b.content.menu.priority,
  );

  return nodes;
};

const filterInactiveNode = (node: AmplienceContentItem) =>
  node?.content?.active !== false;

export const transformNodesToMenuItems = (nodes: AmplienceContentItem[]) => {
  const activeNodes = nodes.filter(filterInactiveNode);
  const sortedNodes = sortNodes(activeNodes);

  return sortedNodes.map(transformNodeToMenuItem);
};
