import type {DefaultContentBody} from 'dc-delivery-sdk-js';
import AmplienceContent from '../wrapper/AmplienceContent';

export type BlogCardProps = {
  snippet: DefaultContentBody;
};

const BlogCard = ({snippet}: BlogCardProps) => {
  return (
    <>
      <AmplienceContent content={snippet}></AmplienceContent>
    </>
  );
};

export default BlogCard;
