import {type CSSProperties, useMemo} from 'react';
import AmplienceContent from '../wrapper/AmplienceContent';
import type {DefaultContentBody} from 'dc-delivery-sdk-js';

interface SplitBlockProps {
  className?: string;
  style?: CSSProperties;
  split: string;
  bgcol: string;
  content: DefaultContentBody[];
}

const SplitBlock = (props: SplitBlockProps) => {
  const {split = '50/50', bgcol, content = []} = props;
  const splits = useMemo(() => {
    return split.split('/').map((x) => Number(x) / 100);
  }, [split]);

  return (
    <div
      className="flex flex-row basis-[1px] items-center"
      style={{
        backgroundColor: bgcol,
      }}
    >
      {content.map((content, index) => {
        return (
          <div
            key={content?._meta?.deliveryId}
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
