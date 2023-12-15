import {type ContentSlot} from '~/clients/amplience/fetch-content';
import AmplienceContent from './AmplienceContent';

type AmplienceSlotProps = {
  slot: ContentSlot;
};

const AmplienceSlot = ({slot}: AmplienceSlotProps) => {
  return slot?.contentTypes.map((content) => (
    <AmplienceContent key={content?._meta.deliveryId} content={content} />
  ));
};

export default AmplienceSlot;
