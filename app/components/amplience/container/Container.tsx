import React from 'react';
import {type CmsContent} from '~/amplience/getImageURL';
import AmplienceWrapper from '../wrapper/AmplienceWrapper';

/**
 * TODO
 */
interface Props {
  contentTypes: CmsContent[];
}

/**
 * TODO
 * @param param0 
 * @returns 
 */
const Container: React.FC<Props> = ({contentTypes = []}) => {
  return (
    <div>
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
