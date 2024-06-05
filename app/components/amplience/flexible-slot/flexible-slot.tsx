import type {DefaultContentBody} from 'dc-delivery-sdk-js';

import AmplienceContent from '../wrapper/AmplienceContent';

interface FlexibleSlotProps {
  contentTypes: DefaultContentBody[];
}

const FlexibleSlot = ({contentTypes = []}: FlexibleSlotProps) => {
  return (
    <>
      {contentTypes.map((content, index) => {
        return <AmplienceContent content={content} key={index} />;
      })}
    </>
  );
};

export default FlexibleSlot;
