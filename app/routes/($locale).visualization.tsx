import {type MetaFunction, useLoaderData} from '@remix-run/react';
import {type LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import {type DefaultContentBody} from 'dc-delivery-sdk-js';
import {useCallback, useState} from 'react';
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
    amplience: {contentId},
    amplienceClient,
  } = context;

  const data = (await amplienceClient.getContentItemById(contentId)).toJSON();

  return defer({initialContent: data[0]});
}

export default function Visualization() {
  const {initialContent} = useLoaderData<typeof loader>();
  const [content, setContent] = useState<DefaultContentBody>(initialContent);

  const updateRealtimeContent = useCallback(
    (realtimeContent: DefaultContentBody) => {
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
