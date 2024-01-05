import {NavLink} from '@remix-run/react';
import {type AmplienceContentItem} from '~/clients/amplience/fetch-types';

type Viewport = 'desktop' | 'mobile';

export type AmplienceNavigationProps = {
  menu: AmplienceMenuItem[];
  viewport?: Viewport;
};

export type AmplienceMenuItem = {
  id: string;
  type: string;
  title: string;
  href: string;
  children?: AmplienceMenuItem[];
  category?: string;
};

const AmplienceNavigation = ({
  menu,
  viewport = 'desktop',
}: AmplienceNavigationProps) => {
  const items = (
    <>
      <NavLink end prefetch="intent" to="/" style={activeLinkStyle}>
        Home
      </NavLink>
      {menu?.map(({id, title, href}: AmplienceMenuItem) => (
        <NavLink key={id} className="pointer" to={href} style={activeLinkStyle}>
          {title}
        </NavLink>
      ))}
    </>
  );
  return (
    <>
      {viewport === 'mobile' && (
        <nav className="flex flex-col gap-4 ml-12">{items}</nav>
      )}
      {viewport !== 'mobile' && (
        <nav className="md:flex gap-4 ml-12 hidden">{items}</nav>
      )}
    </>
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
