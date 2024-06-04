import type {DefaultContentBody} from 'dc-delivery-sdk-js';
import AmplienceContent from '../wrapper/AmplienceContent';
import {Link} from '@remix-run/react';

export type BlogCardProps = {
  content?: DefaultContentBody;
};

const BlogCard = ({content}: BlogCardProps) => {
  return (
    <>
      <Link to={`/blog/${content?._meta.deliveryKey}`}>
        <AmplienceContent content={content?.snippet.image} />
        {content?.snippet.title ? (
          <h1 className="mb-4 mt-4 text-xl font-black lg:text-2xl">
            {content.snippet.title}
          </h1>
        ) : null}
        <div>
          {content?.snippet.author ? (
            <h4 className="mb-2 text-gray-500">{content.snippet.author}</h4>
          ) : null}
          {content?.snippet.blogdate ? (
            <h4 className="mb-2 text-gray-500">{content.snippet.blogdate}</h4>
          ) : null}
        </div>
        {content?.snippet.description ? (
          <p className="mb-4">{content.snippet.description}</p>
        ) : null}
      </Link>
    </>
  );
};

export default BlogCard;
