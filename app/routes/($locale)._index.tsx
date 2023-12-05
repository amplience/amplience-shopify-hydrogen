import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';

import AmplienceWrapper from '~/components/amplience/wrapper/AmplienceWrapper';

export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {
    ampContentClient: {fetchContent},
  } = context;

  const textContent = (await fetchContent([{key: 'text'}]))[0];
  return defer({textContent});
}

export default function Homepage() {
  const {textContent} = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <AmplienceWrapper content={textContent}></AmplienceWrapper>
    </div>
  );
}
