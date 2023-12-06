import React, { useMemo } from 'react';
import { CmsContent } from '~/amplience/getImageURL';
import AmplienceWrapper from '../wrapper/AmplienceWrapper';

interface SplitBlockProps {
    className?: string;
    style?: React.CSSProperties;
    
    split: string;
    bgcol: string;
    content: CmsContent[]
}

const SplitBlock: React.FC<SplitBlockProps> = (props) => {
    const {
        split = '50/50',
        bgcol,
        content = [],
        ...other
    } = props;

    const splits = useMemo(() => {
        return split.split('/').map(x => Number(x) / 100);
    }, [split]);

    return (
        <div style={{
            backgroundColor: bgcol,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row' as 'row',
            flexBasis: 1,
        }}>
            {
                content.map((content, index) => {
                    return <div key={index} style={{flex: splits[index], maxWidth: `${splits[index]*100}%`}}>
                        <AmplienceWrapper content={content} />
                    </div>
                })
            }
        </div>
    );
};

export default SplitBlock;