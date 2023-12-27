import {type MetaFunction, useLoaderData} from '@remix-run/react';
import {type LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import {useState} from 'react';
import {
  type AmplienceContentItem,
  fetchContent,
} from '~/clients/amplience/fetch-content';
import AmplienceContent from '~/components/amplience/wrapper/AmplienceContent';
import {useRealtimeVisualization} from '~/context/RealtimeVisualizationContext';

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

  return defer({content: data[0]});
}

export default function Visualization() {
  const {content} = useLoaderData<typeof loader>();
  const [fetchedContent, setFetchedContent] =
    useState<AmplienceContentItem>(content);

  useRealtimeVisualization((realtimeContent) => {
    setFetchedContent(realtimeContent);
  });

  return (
    <>
      {fetchedContent && (
        <div>
          <AmplienceContent content={fetchedContent} />
        </div>
      )}
    </>
  );
}
