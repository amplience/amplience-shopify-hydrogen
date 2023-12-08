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

  return defer({appLocale: locale});
}

export default function Visualization() {
  const {appLocale} = useLoaderData<typeof loader>();
  const {hub, vse, content, locale} = useAmplienceSearchParams();
  const [fetchedContent, setFetchedContent] = useState<ContentItem>();

  useRealtimeVisualization((realtimeContent) => {
    setFetchedContent(realtimeContent);
  });

  useEffect(() => {
    const fetch = async () => {
      const context = {hubName: hub || '', stagingHost: vse || ''};
      const params = {locale: locale ?? appLocale};
      const data = await fetchContent([{id: content || ''}], context, params);
      setFetchedContent(data[0]);
    };
    fetch();
  }, [appLocale, content, hub, locale, vse]);

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
