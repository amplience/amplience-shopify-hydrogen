import {Link} from '@remix-run/react';
import Image from '../image/Image';

export type BlogSnippetProps = {
  image: any;
  title: string;
  blogdate: string;
  category: string[];
  author: string;
  description: string;
};

const BlogSnippet = ({
  image,
  title,
  category = [],
  blogdate,
  author,
  description,
}: BlogSnippetProps) => {
  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(blogdate));

  return (
    <>
      <Image
        query="w=1500&sm=aspect&aspect=16:9"
        image={image.image}
        _meta={image._meta}
      />
      <div>
        {category?.length ? <small>{category.join(', ')}</small> : null}
        {title ? (
          <>
            <h2 className="mb-4 mt-4 text-2xl font-black lg:text-3xl">
              <Link to="/blog-filter">Blogs</Link>
            </h2>
            <h1 className="mb-4 mt-4 text-3xl font-black lg:text-5xl">
              {title}
            </h1>
          </>
        ) : null}
        <div>
          {author ? <h4 className="mb-2 text-gray-500">{author}</h4> : null}
          {blogdate ? <h4 className="mb-2 text-gray-500">{blogdate}</h4> : null}
        </div>

        {description ? (
          <h2 className="mb-4 text-xl font-bold lg:text-2xl">{description}</h2>
        ) : null}
      </div>
    </>
  );
};

export default BlogSnippet;
