import {NavLink} from '@remix-run/react';
import {type AmplienceContentItem} from '~/clients/amplience/fetch-types';

export type AmplienceNavigationProps = {
  menu: AmplienceMenuItem[];
};

export type AmplienceMenuItem = {
  id: string;
  type: string;
  title: string;
  href: string;
  children?: AmplienceMenuItem[];
  category?: string;
};

const AmplienceNavigation = ({menu}: AmplienceNavigationProps) => {
  return (
    <nav className="header-menu-desktop">
      <NavLink end prefetch="intent" to="/" style={activeLinkStyle}>
        Home
      </NavLink>
      {menu?.map(({id, title, href}: AmplienceMenuItem) => (
        <NavLink
          key={id}
          className="header-menu-item"
          to={href}
          style={activeLinkStyle}
        >
          {title}
        </NavLink>
      ))}
    </nav>
  );
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

export default AmplienceNavigation;
