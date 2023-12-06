import type {ContentItem} from '~/clients/amplience/create-dc-content-client.types';
import Text from '../text/Text';

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
  [key: string]: ({content}: {content: ContentItem}) => JSX.Element;
} = {
  'https://demostore.amplience.com/content/text': Text,
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
  return <>{Component && <Component content={content}></Component>}</>;
};

export default AmplienceWrapper;
