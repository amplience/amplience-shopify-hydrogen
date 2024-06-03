import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Link, useLoaderData, type MetaFunction} from '@remix-run/react';
import BlogCard from '~/components/amplience/blog/BlogCard';

export const meta: MetaFunction = () => {
  return [{title: `Hydrogen | Blogs`}];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {amplienceClient} = context;

  const blogs = await amplienceClient.filterContentItems({
    filterBy: [
      {
        path: '/_meta/schema',
        value: 'https://demostore.amplience.com/content/blog',
      },
      {
        path: '/active',
        value: true,
      },
    ],
  });

  return json({blogs});
}

export default function Blogs() {
  const {blogs} = useLoaderData<typeof loader>();
  return (
    <>
      <h2 className="mb-4 text-xl font-bold md:text-2xl">
        Amplience Blog Posts
      </h2>
      <div className="collections-grid">
        {blogs.responses
          ? blogs.responses.map((blog, index) => {
              return (
                <div className="collection-item" key={index}>
                  <Link to={`/blog/${blog.content._meta.deliveryKey}`}>
                    <BlogCard {...blog.content} />
                  </Link>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
