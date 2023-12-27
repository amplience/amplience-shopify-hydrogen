import {type CSSProperties, useMemo} from 'react';
import AmplienceContent from '../wrapper/AmplienceContent';
import {type AmplienceContentItem} from '~/clients/amplience/fetch-content';

interface SplitBlockProps {
  className?: string;
  style?: CSSProperties;
  split: string;
  bgcol: string;
  content: AmplienceContentItem[];
}

const SplitBlock = (props: SplitBlockProps) => {
  const {split = '50/50', bgcol, content = []} = props;
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
