import React from 'react'
import { CmsContent } from '~/amplience/getImageURL';
import AmplienceWrapper from '../wrapper/AmplienceWrapper';

interface Props {
    contentTypes: CmsContent[];
}

const Container: React.FC<Props> = ({contentTypes = []}) => {
    return <div>
        {
            contentTypes.map((item, index) => {
                return <div key={index}>
                    <AmplienceWrapper content={item} />
                </div>;
            })
        }
    </div>;
}

export default Container;