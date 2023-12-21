import React, {useMemo} from 'react';
import {type CmsContent} from '~/utils/amplience/getImageURL';
import AmplienceContent from '../wrapper/AmplienceContent';

interface SplitBlockProps {
  className?: string;
  style?: React.CSSProperties;

  split: string;
  bgcol: string;
  content: CmsContent[];
}

/**
 * Split Block component
 * @param props component props
 * @returns Split Block of components using splits for column sizes
 */
const SplitBlock: React.FC<SplitBlockProps> = (props) => {
  const {split = '50/50', bgcol, content = [], ...other} = props;

  /**
   * Array of split
   * @returns Returns an array with the different split
   */
  const splits = useMemo(() => {
    return split.split('/').map((x) => Number(x) / 100);
  }, [split]);

  return (
    <div
      className="amp-split-block"
      style={{
        backgroundColor: bgcol,
      }}
    >
      {content.map((content, index) => {
        return (
          <div
            key={index}
            style={{flex: splits[index], maxWidth: `${splits[index] * 100}%`}}
          >
            <AmplienceContent content={content} />
          </div>
        );
      })}
    </div>
  );
};

export default SplitBlock;
