import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction, Link, Await} from '@remix-run/react';
import AmplienceContent from '~/components/amplience/wrapper/AmplienceContent';
import {DefaultContentBody} from 'dc-delivery-sdk-js';

export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {amplience, amplienceClient} = context;

  const [flexibleSlot] = await Promise.all([
    (
      await amplienceClient.getContentItemByKey(amplience.homepageDeliveryKey)
    ).toJSON() as DefaultContentBody,
  ]);
  const allItemIds = flexibleSlot.slots.map((content: any) => content.id);
  const allItems = (await amplienceClient.getContentItemsById(allItemIds))
    .responses;
  const blogPostDeliveryKey = amplience.blogPostDeliveryKey;

  return defer({
    allItems,
    blogPostDeliveryKey,
  });
}

export default function Homepage() {
  const {allItems, blogPostDeliveryKey} = useLoaderData<typeof loader>();

  return (
    <div className="home">
      {allItems.map((item: any, index: number) => {
        return <AmplienceContent content={item.content} key={index} />;
      })}
      <div
        style={{
          marginTop: '30px',
        }}
      >
        <Link to={`/blog/${blogPostDeliveryKey}`}>
          Link to a sample blog post
        </Link>
      </div>
    </div>
  );
}
