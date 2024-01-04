import {type CollectionFragment} from 'storefrontapi.generated';
import {type AmplienceMenuItem} from '~/components/amplience/navigation/AmplienceNavigation';

export const transformCollectionsToMenuItems = (
  collections: CollectionFragment[],
): AmplienceMenuItem[] => {
  return collections.map(({id, title, handle}) => ({
    id,
    type: 'collections',
    title,
    href: `/collections/${handle}`,
  }));
};
