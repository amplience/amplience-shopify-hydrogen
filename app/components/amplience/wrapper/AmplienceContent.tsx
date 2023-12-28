import type {AmplienceContentItem} from '~/clients/amplience/fetch-content';
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

const COMPONENT_MAPPING: {
  [key: string]: React.FC<any>;
} = {
  'https://demostore.amplience.com/content/text': Text,
  'https://demostore.amplience.com/content/image': Image,
  'https://demostore.amplience.com/content/video': Video,
  'https://demostore.amplience.com/content/simple-banner': SimpleBanner,
  'https://demostore.amplience.com/content/simple-localized-banner':
    SimpleBanner,
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
};

const MappingNotFound = (content: AmplienceContentItem) => {
  return (
    <pre>
      <code className="text-xs md:text-sm block break-words">
        {JSON.stringify(content, null, 2)}
      </code>
    </pre>
  );
};

type AmplienceContentProps = {
  content: AmplienceContentItem;
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
