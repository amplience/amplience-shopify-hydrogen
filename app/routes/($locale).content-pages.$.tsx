import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import AmplienceContent from '~/components/amplience/wrapper/AmplienceContent';

export async function loader({params, context}: LoaderFunctionArgs) {
  const handle = params['*'];
  if (!handle) {
    throw new Error('Missing page handle');
  }

  const {amplienceClient} = context;

  let amplienceContent;

  try {
    amplienceContent = (
      await amplienceClient.getContentItemByKey(handle)
    ).toJSON();
  } catch (e) {
    throw new Response(`${handle} not Found`, {status: 404});
  }

  return defer({amplienceContent});
}

export default function Page() {
  const {amplienceContent} = useLoaderData<typeof loader>();

  return (
    <>
      <div className="page">
        <AmplienceContent content={amplienceContent} />
      </div>
    </>
  );
}
