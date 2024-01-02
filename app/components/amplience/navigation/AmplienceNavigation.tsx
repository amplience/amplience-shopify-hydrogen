import {NavLink} from '@remix-run/react';

const AmplienceNavigation = ({hierarchy}: any) => {
  return (
    <nav className="header-menu-desktop">
      {hierarchy?.map((child: any) => (
        <>
          <NavLink className="header-menu-item" to="/">
            {child?.content?._meta?.name}
          </NavLink>
        </>
      ))}
    </nav>
  );
};

export default AmplienceNavigation;
