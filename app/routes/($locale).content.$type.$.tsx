import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {fetchContent} from '~/clients/amplience/fetch-content';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Hydrogen | 'Amplience Content'}`}];
};

export async function loader({params, context}: LoaderFunctionArgs) {
  const {type} = params;
  const handle = params['*'];
  const {
    amplience: {hubName, locale},
  } = context;

  const requestItem = type === 'key' ? {key: handle} : {id: handle};
  const content = await fetchContent([requestItem], {hubName}, {locale});
  return defer({content});
}

export default function Content() {
  const {content} = useLoaderData<typeof loader>();
  return (
    <div className="content">
      <pre>
        <code style={{display: 'block'}}>
          {JSON.stringify(content, null, 2)}
        </code>
      </pre>
    </div>
  );
}
