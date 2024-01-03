import {NavLink} from '@remix-run/react';
import {
  type AmplienceContentItem,
  type AmplienceNavigationNode,
} from '~/clients/amplience/fetch-types';

export type AmplienceNavigationProps = {
  rootNode: AmplienceNavigationNode;
};

const AmplienceNavigation = ({rootNode}: AmplienceNavigationProps) => {
  const activeChildren = rootNode?.children?.filter(
    (child: AmplienceContentItem) => child.content.active === true,
  );
  return (
    <nav className="header-menu-desktop">
      {activeChildren?.map((child: AmplienceContentItem) => (
        <NavLink
          key={child?.content?._meta?.deliveryId}
          className="header-menu-item"
          to="/"
        >
          {child?.content?._meta?.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default AmplienceNavigation;
