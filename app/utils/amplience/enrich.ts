import {type CollectionFragment} from 'storefrontapi.generated';
import {type AmplienceContentItem} from '~/clients/amplience/fetch-types';

export const enrichCollectionNodes = (
  items: AmplienceContentItem[],
  collections: CollectionFragment[],
) => {
  return items.map((item) => {
    const collection = collections.find((c) =>
      c.id.includes(item.content?.name),
    );
    if (collection) {
      item.content.title = collection.title;
    }
    return item;
  });
};
