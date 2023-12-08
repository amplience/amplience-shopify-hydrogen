import {type MetaFunction, useLocation, useLoaderData} from '@remix-run/react';
import {type LoaderFunctionArgs, defer} from '@shopify/remix-oxygen';
import {useEffect, useState} from 'react';
import {
  type ContentItem,
  fetchContent,
} from '~/clients/amplience/fetch-content';
import AmplienceWrapper from '~/components/amplience/wrapper/AmplienceWrapper';
import {useRealtimeVisualization} from '~/context/RealtimeVisualizationContext';

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
  const [content, setContent] = useState<ContentItem>();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const hubName = searchParams.get('hub') || '';
  const stagingHost = searchParams.get('vse') || '';
  const contentId = searchParams.get('content') || '';
  const vseLocale = searchParams.get('appLocale') || '';

  useRealtimeVisualization((content) => {
    setContent(content);
  });

  useEffect(() => {
    const fetch = async () => {
      const params = vseLocale ? {locale: vseLocale} : {locale};
      const data = await fetchContent(
        [{id: contentId}],
        {
          hubName,
          stagingHost,
        },
        params,
      );
      setContent(data[0]);
    };
    fetch();
  }, [hubName, stagingHost, contentId, vseLocale, locale]);

  return (
    <>
      {content && (
        <div>
          <AmplienceWrapper content={content} />
        </div>
      )}
    </>
  );
}
