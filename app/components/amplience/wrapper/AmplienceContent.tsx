import Text from '../text/Text';
import Image from '../image/Image';
import Video from '../video/Video';
import SplitBlock from '../split-block/SplitBlock';
import Card from '../card/Card';
import CardList from '../card-list/CardList';
import Container from '../container/Container';
import SimpleBanner from '../simple-banner/SimpleBanner';
import RichText from '../rich-text/RichText';
import CuratedProductGrid from '../curated-product-grid/CuratedProductGrid';
import DynamicProductGrid from '../dynamic-product-grid/DynamicProductGrid';
import {type DefaultContentBody} from 'dc-delivery-sdk-js';
import Blog from '../blog/Blog';
import BlogSnippet from '../blog-snippet/BlogSnippet';
import FlexibleSlot from '../flexible-slot/flexible-slot';

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
  'https://demostore.amplience.com/content/content-page': Container,
  'https://demostore.amplience.com/content/rich-text': RichText,
  'https://demostore.amplience.com/content/product': RichText,
  'https://demostore.amplience.com/content/curated-product-grid':
    CuratedProductGrid,
  'https://demostore.amplience.com/content/product-grid': DynamicProductGrid,
  'https://demostore.amplience.com/content/blog': Blog,
  'https://demostore.amplience.com/content/blog-snippet': BlogSnippet,
  'https://demostore.amplience.com/slots/flexible': FlexibleSlot,
};

const MappingNotFound = (content: DefaultContentBody) => {
  return (
    <div
      style={{
        height: '400px',
        backgroundColor: '#eee',
        border: '1px solid black',
        padding: '15px',
        margin: '10px',
      }}
    >
      <h3 className="text-xl font-black">{content._meta?.name}</h3>
      <h4 className="italic">{content._meta?.deliveryId}</h4>
      <p className="mb-4 mt-4">
        No render available for this component. Showing JSON content.
      </p>
      <pre
        style={{
          maxHeight: '250px',
          overflowY: 'scroll',
        }}
      >
        <code className="block break-words text-xs md:text-sm">
          {JSON.stringify(content, null, 2)}
        </code>
      </pre>
    </div>
  );
};

type AmplienceContentProps = {
  content: DefaultContentBody;
};
/**
 * Wrapper component maps Amplience components based on content schema
 */
const AmplienceContent = ({content}: AmplienceContentProps) => {
  const contentSchema = content?._meta?.schema;
  const Component = COMPONENT_MAPPING[contentSchema] ?? MappingNotFound;
  return <>{Component && <Component {...content}></Component>}</>;
};

export default AmplienceContent;
