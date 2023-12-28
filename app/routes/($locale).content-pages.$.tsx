import {defer, json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {fetchContent} from '~/clients/amplience/fetch-content';
import AmplienceContent from '~/components/amplience/wrapper/AmplienceContent';

export async function loader({params, context}: LoaderFunctionArgs) {
  const handle = params['*'];
  if (!handle) {
    throw new Error('Missing page handle');
  }

  const {
    storefront,
    amplience: {locale, hubName, stagingHost},
  } = context;

  // Fetching Amplience content
  const fetchContext = {
    hubName,
    ...(stagingHost ? {stagingHost} : {}),
  };
  const fetchParams = {locale};
  const amplienceContent = (
    await fetchContent([{key: handle}], fetchContext, fetchParams)
  )[0];

  if (!amplienceContent) {
    throw new Response(`${handle} not Found`, {status: 404});
  }

  return defer({amplienceContent, handle});
}

export default function Page() {
  const {amplienceContent, handle} = useLoaderData<typeof loader>();

  return (
    <div className="page">
      {amplienceContent && Object.keys(amplienceContent).length > 0 && (
        <AmplienceContent content={amplienceContent} />
      )}
    </div>
  );
}
