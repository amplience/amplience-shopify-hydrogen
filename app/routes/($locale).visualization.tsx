import {type MetaFunction, useLoaderData} from '@remix-run/react';
import {type LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import {useEffect, useState} from 'react';
import {
  type ContentItem,
  fetchContent,
} from '~/clients/amplience/fetch-content';
import AmplienceWrapper from '~/components/amplience/wrapper/AmplienceWrapper';
import {useRealtimeVisualization} from '~/context/RealtimeVisualizationContext';
import {useAmplienceSearchParams} from '~/hooks/useAmplienceSearchParams';

export const meta: MetaFunction = () => {
  return [{title: `Hydrogen | 'Amplience Content Visualization'}`}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {
    amplience: {locale},
  } = context;

  return defer({locale});
}

export default function Visualization() {
  const {locale} = useLoaderData<typeof loader>();
  const {hub, vse, content} = useAmplienceSearchParams();
  const [fetchedContent, setFetchedContent] = useState<ContentItem>();

  useRealtimeVisualization((realtimeContent) => {
    setFetchedContent(realtimeContent);
  });

  useEffect(() => {
    const fetch = async () => {
      const context = {hubName: hub || '', stagingHost: vse || ''};
      const params = {locale};
      const data = await fetchContent([{id: content || ''}], context, params);
      setFetchedContent(data[0]);
    };
    fetch();
  }, [locale, content, hub, vse]);

  return (
    <>
      {fetchedContent && (
        <div>
          <AmplienceWrapper content={fetchedContent} />
        </div>
      )}
    </>
  );
}
