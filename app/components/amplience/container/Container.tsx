import React from 'react';
import {type CmsContent} from '~/amplience/getImageURL';
import AmplienceWrapper from '../wrapper/AmplienceWrapper';

interface Props {
  contentTypes: CmsContent[];
}

/**
 * Container component
 * @param contentTypes list of content items 
 * @returns All content items in the container using AmplienceWrapper
 */
const Container: React.FC<Props> = ({contentTypes = []}) => {
  return (
    <div className='amp-container'>
      {contentTypes.map((item, index) => {
        return (
          <div key={index}>
            <AmplienceWrapper content={item} />
          </div>
        );
      })}
    </div>
  );
};

export default Container;
