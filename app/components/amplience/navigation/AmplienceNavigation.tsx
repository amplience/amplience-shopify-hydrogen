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
  children?: AmplienceContentItem[];
  category?: string;
};

const AmplienceNavigation = ({menu}: AmplienceNavigationProps) => {
  return (
    <nav className="header-menu-desktop">
      {menu?.map((item: AmplienceMenuItem) => (
        <NavLink key={item?.title} className="header-menu-item" to={item?.href}>
          {item?.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default AmplienceNavigation;
