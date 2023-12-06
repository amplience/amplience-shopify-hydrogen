import type {ContentItem} from '~/clients/amplience/create-dc-content-client.types';
import Text from '../text/Text';
import Image from '../image/Image';
import Video from '../video/Video';
import SplitBlock from '../split-block/SplitBlock';
/**
 * Amplience Wrapper props
 */
type AmplienceWrapperProps = {
  content: ContentItem;
};

/**
 * Component Mapping matching schemas and React components
 */
const COMPONENT_MAPPING: {
  [key: string]: React.FC<any>
} = {
  'https://demostore.amplience.com/content/text': Text,
  'https://demostore.amplience.com/content/image': Image,
  'https://demostore.amplience.com/content/video': Video,
  'https://demostore.amplience.com/content/split-block': SplitBlock,
};

/**
 * Component used when no matching schema has been found
 * @param param0 object containing content data
 * @returns code block flushing the full content data
 */
const MappingNotFound = ({content}: {content: ContentItem}) => {
  return (
    <pre>
      <code style={{display: 'block'}}>{JSON.stringify(content, null, 2)}</code>
    </pre>
  );
};

/**
 * Wrapper component selecting the right component based on schema
 * @param param0 object containing content data
 * @returns matching component or MappingNotFound component
 */
const AmplienceWrapper = ({content}: AmplienceWrapperProps) => {
  const contentSchema = content?._meta?.schema;
  const Component = COMPONENT_MAPPING[contentSchema] ?? MappingNotFound;
  return <>{Component && <Component {...content}></Component>}</>;
};

export default AmplienceWrapper;
