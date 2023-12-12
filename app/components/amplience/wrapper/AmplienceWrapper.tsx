import type {ContentItem} from '~/clients/amplience/fetch-content';
import Text from '../text/Text';
import Image from '../image/Image';
import Video from '../video/Video';
import SplitBlock from '../split-block/SplitBlock';
import Card from '../card/Card';
import CardList from '../card-list/CardList';
import Container from '../container/Container';
import SimpleBanner from '../simple-banner/SimpleBanner';

type AmplienceWrapperProps = {
  content: ContentItem;
};

/**
 * Component Mapping matching schemas and React components
 */
const COMPONENT_MAPPING: {
  [key: string]: React.FC<any>;
} = {
  'https://demostore.amplience.com/content/text': Text,
  'https://demostore.amplience.com/content/image': Image,
  'https://demostore.amplience.com/content/video': Video,
  'https://demostore.amplience.com/content/simple-banner': SimpleBanner,
  'https://demostore.amplience.com/content/card': Card,
  'https://demostore.amplience.com/content/card-list': CardList,
  'https://demostore.amplience.com/content/split-block': SplitBlock,
  'https://demostore.amplience.com/content/container': Container,
};

/**
 * Component used when no matching schema has been found
 * @param content object containing content data
 * @returns code block flushing the full content data
 */
const MappingNotFound = (content: ContentItem) => {
  return (
    <pre>
      <code
        className="amp-json-code"
        style={{display: 'block', wordWrap: 'break-word'}}
      >
        {JSON.stringify(content, null, 2)}
      </code>
    </pre>
  );
};

/**
 * Wrapper component selecting the right component based on schema
 * @param content object containing content data
 * @returns matching component or MappingNotFound component
 */
const AmplienceWrapper = ({content}: AmplienceWrapperProps) => {
  const contentSchema = content?._meta?.schema;
  const Component = COMPONENT_MAPPING[contentSchema] ?? MappingNotFound;
  return <>{Component && <Component {...content}></Component>}</>;
};

export default AmplienceWrapper;
