import type {DefaultContentBody} from 'dc-delivery-sdk-js';
import AmplienceContent from '../wrapper/AmplienceContent';

export type BlogProps = {
  snippet: DefaultContentBody;
  contentTypes?: DefaultContentBody[];
  content: DefaultContentBody;
};

const Blog = ({snippet, contentTypes, content}: BlogProps) => {
  return (
    <>
      <AmplienceContent content={snippet}></AmplienceContent>
      <AmplienceContent content={content}></AmplienceContent>
      {contentTypes &&
        contentTypes.map((item) => (
          <div key={item._meta.deliveryId}>
            <AmplienceContent content={item} />
          </div>
        ))}
    </>
  );
};

export default Blog;
