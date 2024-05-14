import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import AmplienceContent from '~/components/amplience/wrapper/AmplienceContent';
import {getImageURL} from '~/components/amplience/image/Image.utils';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    {title: `Hydrogen | ${data?.blog?.snippet?.title ?? ''} blog`},
    {
      name: 'description',
      content: `${data?.blog?.snippet?.description}` ?? '',
    },
    {
      property: 'og:title',
      content: `${data?.blog?.snippet?.title}` ?? '',
    },
    {
      property: 'og:description',
      content: `${data?.blog?.snippet?.description}` ?? '',
    },
    {
      property: 'og:image',
      content: `${getImageURL(data?.blog?.snippet?.image)}` ?? '',
    },
    {
      property: 'twitter:card',
      content: `summary_large_image`,
    },
    {
      property: 'twitter:site',
      content: `@amplience`,
    },
    {
      property: 'twitter:creator',
      content: `@amplience`,
    },
    {
      property: 'twitter:title',
      content: `${data?.blog?.snippet?.title}` ?? '',
    },
    {
      property: 'twitter:description',
      content: `${data?.blog?.snippet?.description}` ?? '',
    },
    {
      property: 'twitter:image',
      content: `${getImageURL(data?.blog?.snippet?.image)}` ?? '',
    },
  ];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const handle = params['*'];
  const {amplienceClient} = context;

  if (!handle) {
    throw new Response('Not found', {status: 404});
  }

  const blog = (await amplienceClient.getContentItemByKey(handle)).toJSON();

  if (!blog?.content) {
    throw new Response(null, {status: 404});
  }

  return json({blog});
}

export default function Blog() {
  const {blog} = useLoaderData<typeof loader>();

  return (
    <div className="max-w-5xl m-auto">
      <AmplienceContent content={blog}></AmplienceContent>
    </div>
  );
}
