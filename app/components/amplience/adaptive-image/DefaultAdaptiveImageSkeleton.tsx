import React from 'react';
// import Skeleton from 'react-loading-skeleton';
// import clsx from 'clsx';

const styles = () => {
    return {
        root: {
            position: 'relative' as 'relative',
            paddingBottom: '50%',
    
            ['@media (max-width: 768px)']: {
                paddingBottom: '100%',
            },
            ['@media (min-width: 768px)']: {
                paddingBottom: '66%'
            },
            ['@media (min-width: 1024px)']: {
                paddingBottom: '50%'
            }
        }
    }
};

interface Props {
    className?: string;
    classes?: any;
    style?: React.CSSProperties
}

const DefaultAdaptiveImageSkeleton: React.FC<Props> = (props) => {
    const {
        classes,
        className,
        ...other
    } = props;

    return (
        <p>Loading...</p>
        // <Skeleton className={clsx(classes.root, className)} {...other} />
    );
};

export default DefaultAdaptiveImageSkeleton;