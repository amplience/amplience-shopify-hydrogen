import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import BlogCard from '~/components/amplience/blog/BlogCard';
import {
  FilterByRequest,
  IOrder,
} from 'dc-delivery-sdk-js/build/main/lib/content/model/FilterBy';
import {ChangeEvent, useEffect, useState} from 'react';
import {ContentClient} from 'dc-delivery-sdk-js';
import {createAmplienceClient} from '~/clients/amplience';

export type SortByValue = 'default' | 'title' | 'author';

export const meta: MetaFunction = () => {
  return [{title: `Hydrogen | Blogs`}];
};

async function fetchBlogs(
  options: {key?: SortByValue; order?: IOrder},
  amplienceClient: ContentClient,
) {
  const {key = 'default', order = 'DESC'} = options;
  const fetchPage = async (nextCursor?: string): Promise<any> => {
    const filterRequest: FilterByRequest = {
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
      sortBy: {
        key,
        order,
      },
      page: {
        size: 12,
        cursor: nextCursor,
      },
    };
    const results = await amplienceClient.filterContentItems(filterRequest);
    const responses = results?.responses || [];

    if (results?.page.nextCursor) {
      return [...responses, ...(await fetchPage(results?.page.nextCursor))];
    }
    return responses;
  };

  return fetchPage();
}

export async function loader({context}: LoaderFunctionArgs) {
  const {amplience, amplienceClient} = context;
  const blogs = await fetchBlogs(
    {key: 'default', order: 'DESC'},
    amplienceClient,
  );
  return json({blogs, amplience});
}

export default function Blogs() {
  const {blogs, amplience} = useLoaderData<typeof loader>();

  const [blogList, setBlogList] = useState(blogs as any);
  const [sortOrder, setSortOrder] = useState<IOrder>('DESC');
  const [sortValue, setSortValue] = useState<SortByValue>('default');

  const handleSortValueChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSortValue(e.target.value as SortByValue);
  };

  const handleSortOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSortOrder(e.target.value as IOrder);
  };

  useEffect(() => {
    async function fetchData() {
      const amplienceClient = createAmplienceClient({
        hubName: amplience.hubName,
        locale: amplience.locale,
        ...(amplience.stagingHost
          ? {stagingEnvironment: amplience.stagingHost}
          : {}),
      });
      const blogs = await fetchBlogs(
        {
          order: sortOrder,
          key: sortValue,
        },
        amplienceClient,
      );
      setBlogList(blogs);
    }
    fetchData();
  }, [sortOrder, sortValue]);

  return (
    <>
      <h2 className="mb-4 text-xl font-bold md:text-2xl">
        Amplience Blog Posts
      </h2>
      Sort By:{' '}
      <select
        className="mr-4"
        name="sortValue"
        onChange={handleSortValueChange}
      >
        <option value="default">Date</option>
        <option value="author">Author</option>
        <option value="title">Title</option>
      </select>
      Order By:{' '}
      <select name="sortOrder" onChange={handleSortOrderChange}>
        <option value="DESC">Desc</option>
        <option value="ASC">Asc</option>
      </select>
      <div className="mt-4 collections-grid">
        {blogList
          ? blogList.map((blog: any, index: number) => {
              return (
                <div className="collection-item" key={index}>
                  <BlogCard {...blog} />
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
