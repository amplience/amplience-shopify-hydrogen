import type {ContentItem} from '~/clients/amplience/create-dc-content-client.types';

type AmplienceWrapperProps = {
  content: ContentItem;
};

const Text = ({content}: {content: ContentItem}) => {
  return <>Text: {content._meta.name}</>;
};

const COMPONENT_MAPPING: {
  [key: string]: ({content}: {content: ContentItem}) => JSX.Element;
} = {
  'https://demostore.amplience.com/content/text': Text,
};

const MappingNotFound = ({content}: {content: ContentItem}) => {
  return (
    <pre>
      <code style={{display: 'block'}}>{JSON.stringify(content, null, 2)}</code>
    </pre>
  );
};

const AmplienceWrapper = ({content}: AmplienceWrapperProps) => {
  const contentSchema = content?._meta?.schema;
  const Component = COMPONENT_MAPPING[contentSchema] ?? MappingNotFound;
  return <>{Component && <Component content={content}></Component>}</>;
};

export default AmplienceWrapper;
