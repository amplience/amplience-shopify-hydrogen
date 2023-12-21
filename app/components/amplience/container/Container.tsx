import React from 'react';
import {type CmsContent} from '~/utils/amplience/getImageURL';
import AmplienceContent from '../wrapper/AmplienceContent';

interface Props {
  contentTypes: CmsContent[];
}

/**
 * Container component
 * @param contentTypes list of content items
 * @returns All content items in the container using AmplienceContent
 */
const Container: React.FC<Props> = ({contentTypes = []}) => {
  return (
    <div className="amp-container">
      {contentTypes.map((item, index) => {
        return (
          <div key={index}>
            <AmplienceContent content={item} />
          </div>
        );
      })}
    </div>
  );
};

export default Container;
