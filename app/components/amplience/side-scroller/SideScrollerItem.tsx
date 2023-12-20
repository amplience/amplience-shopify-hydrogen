import {type ReactNode} from 'react';

export type SideScrollerItemProps = {
  children: ReactNode;
};

const SideScrollerItem = ({children}: SideScrollerItemProps) => {
  return (
    <div className="flex-[0_0_auto] w-2/3 md:w-1/3 snap-start">{children}</div>
  );
};

export default SideScrollerItem;
