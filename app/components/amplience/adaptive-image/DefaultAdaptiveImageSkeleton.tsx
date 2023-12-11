import React from 'react';

const styles = () => {
  return {
    root: {
      position: 'relative',
      paddingBottom: '50%',

      '@media (max-width: 768px)': {
        paddingBottom: '100%',
      },
      '@media (min-width: 768px)': {
        paddingBottom: '66%',
      },
      '@media (min-width: 1024px)': {
        paddingBottom: '50%',
      },
    },
  };
};

interface Props {
  className?: string;
  classes?: any;
  style?: React.CSSProperties;
}

const DefaultAdaptiveImageSkeleton: React.FC<Props> = (props) => {
  const {classes, className, ...other} = props;

  return <p>Loading...</p>;
};

export default DefaultAdaptiveImageSkeleton;
