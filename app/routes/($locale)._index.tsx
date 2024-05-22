import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction, Link, Await} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import AmplienceContent from '~/components/amplience/wrapper/AmplienceContent';
import {DefaultContentBody} from 'dc-delivery-sdk-js';

export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront, amplience, amplienceClient} = context;

  const [flexibleSlot] = await Promise.all([
    (
      await amplienceClient.getContentItemByKey(amplience.flexibleSlotKey)
    ).toJSON() as DefaultContentBody,
  ]);
  const allItemIds = flexibleSlot.slots.map((content: any) => content.id);
  const allItems = (await amplienceClient.getContentItemsById(allItemIds))
    .responses;

  return defer({
    allItems,
  });
}

export default function Homepage() {
  const {allItems} = useLoaderData<typeof loader>();

  return (
    <div className="home">
      {allItems.map((item: any, index: number) => {
        return <AmplienceContent content={item.content} key={index} />;
      })}
    </div>
  );
}
