import {type AmplienceContentItem} from '~/clients/amplience/fetch-content';
import AmplienceContent from '../wrapper/AmplienceContent';

type ContainerProps = {
  contentTypes: AmplienceContentItem[];
};

const Container = ({contentTypes = []}: ContainerProps) => {
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
