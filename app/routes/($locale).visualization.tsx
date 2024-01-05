import {type MetaFunction, useLoaderData} from '@remix-run/react';
import {type LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import {useCallback, useState} from 'react';
import {fetchContent} from '~/clients/amplience/fetch-content';
import AmplienceContent from '~/components/amplience/wrapper/AmplienceContent';
import {
  useInitialRealtimeContent,
  useRealtimeVisualization,
} from '~/context/RealtimeVisualizationContext';

export const meta: MetaFunction = () => {
  return [{title: `Hydrogen | 'Amplience Content Visualization'}`}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {
    amplience: {locale, hubName, stagingHost, contentId},
  } = context;

  const fetchContext = {
    hubName,
    ...(stagingHost ? {stagingHost} : {}),
  };
  const params = {locale};
  const data = await fetchContent(
    [{id: contentId || ''}],
    fetchContext,
    params,
  );

  return defer({initialContent: data[0]});
}

export default function Visualization() {
  const {initialContent} = useLoaderData<typeof loader>();
  const [content, setContent] =
    useState<Record<string, unknown>>(initialContent);

  const updateRealtimeContent = useCallback(
    (realtimeContent: Record<string, unknown>) => {
      setContent(realtimeContent);
    },
    [],
  );

  useInitialRealtimeContent(updateRealtimeContent);

  useRealtimeVisualization(updateRealtimeContent);

  return (
    <>
      {content && (
        <div>
          <AmplienceContent content={content} />
        </div>
      )}
    </>
  );
}
