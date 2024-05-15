import AmplienceContent from '../wrapper/AmplienceContent';
import type {DefaultContentBody} from 'dc-delivery-sdk-js';

type ContainerProps = {
  contentTypes: DefaultContentBody[];
};

const Container = ({contentTypes = []}: ContainerProps) => {
  return (
    <div>
      {contentTypes.map((item) => {
        return (
          <div key={item?._meta?.deliveryId}>
            <AmplienceContent content={item} />
          </div>
        );
      })}
    </div>
  );
};

export default Container;
