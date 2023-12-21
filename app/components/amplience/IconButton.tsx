import {type ReactNode} from 'react';

export type IconButtonProps = {
  ariaLabel: string;
  onClick: () => void;
  children: ReactNode;
};

const IconButton = ({ariaLabel, children, onClick}: IconButtonProps) => {
  return (
    <>
      <button
        aria-label={ariaLabel}
        className="h-10 w-10 p-2 m-2 bg-white/40 hover:bg-white/80 rounded-full"
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default IconButton;
