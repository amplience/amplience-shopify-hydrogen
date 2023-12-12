import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction, Link, Await} from '@remix-run/react';
import AmplienceWrapper from '~/components/amplience/wrapper/AmplienceWrapper';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {Suspense, useEffect, useState} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import {
  type ContentItem,
  fetchContent,
} from '~/clients/amplience/fetch-content';
import {useAmplienceSearchParams} from '~/hooks/useAmplienceSearchParams';

export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {
    storefront,
    amplience: {hubName, locale},
  } = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);
  const initialText = (
    await fetchContent([{key: 'text'}], {hubName}, {locale})
  )[0];
  const initialImage = (
    await fetchContent([{key: 'image/example1'}], {hubName}, {locale})
  )[0];
  const initialVideo = (
    await fetchContent([{key: 'docs/story/video/video1'}], {hubName}, {locale})
  )[0];
  const initialSplitBlock = (
    await fetchContent([{key: 'split-block/example4'}], {hubName}, {locale})
  )[0];
  const initialCard = (
    await fetchContent([{key: 'card/example1'}], {hubName}, {locale})
  )[0];
  const initialCardList = (
    await fetchContent([{key: 'card-list/example1'}], {hubName}, {locale})
  )[0];
  const initialContainer = (
    await fetchContent([{key: 'container/example1'}], {hubName}, {locale})
  )[0];
  const initialSimpleBanner = (
    await fetchContent([{key: 'testing123'}], {hubName}, {locale})
  )[0];
  return defer({
    hubName,
    locale,
    featuredCollection,
    recommendedProducts,
    initialText,
    initialVideo,
    initialImage,
    initialSplitBlock,
    initialCard,
    initialCardList,
    initialContainer,
    initialSimpleBanner,
  });
}

export default function Homepage() {
  const {
    featuredCollection,
    recommendedProducts,
    hubName,
    locale,
    initialText,
    initialVideo,
    initialImage,
    initialSplitBlock,
    initialCard,
    initialCardList,
    initialContainer,
    initialSimpleBanner,
  } = useLoaderData<typeof loader>();
  const [simpleBanner, setSimpleBanner] =
    useState<ContentItem>(initialSimpleBanner);
  const {hub, vse} = useAmplienceSearchParams();

  useEffect(() => {
    const fetch = async () => {
      const context = {
        hubName: hub ?? hubName,
        ...(vse ? {stagingHost: vse} : {}),
      };
      const params = {locale};
      const data = await fetchContent([{key: 'testing123'}], context, params);
      setSimpleBanner(data[0]);
    };
    fetch();
  }, [hub, hubName, locale, vse]);

  return (
    <div className="home">
      <FeaturedCollection collection={featuredCollection} />
      <RecommendedProducts products={recommendedProducts} />
      <h2 style={{paddingTop: '20px'}}>Image Component</h2>
      <AmplienceWrapper content={initialImage}></AmplienceWrapper>
      <h2 style={{paddingTop: '20px'}}>Text Component</h2>
      <AmplienceWrapper content={initialText}></AmplienceWrapper>
      <h2 style={{paddingTop: '20px'}}>Video Component</h2>
      <AmplienceWrapper content={initialVideo}></AmplienceWrapper>
      <h2 style={{paddingTop: '20px'}}>Split Block Component</h2>
      <AmplienceWrapper content={initialSplitBlock}></AmplienceWrapper>
      <h2 style={{paddingTop: '20px'}}>Card Component</h2>
      <AmplienceWrapper content={initialCard}></AmplienceWrapper>
      <h2 style={{paddingTop: '20px'}}>Card List Component</h2>
      <AmplienceWrapper content={initialCardList}></AmplienceWrapper>
      <h2 style={{paddingTop: '20px'}}>Container Component</h2>
      <AmplienceWrapper content={initialContainer}></AmplienceWrapper>
      <h2 style={{paddingTop: '20px'}}>Simple Banner Component</h2>
      <AmplienceWrapper content={simpleBanner}></AmplienceWrapper>
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery>;
}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="recommended-products-grid">
              {products.nodes.map((product) => (
                <Link
                  key={product.id}
                  className="recommended-product"
                  to={`/products/${product.handle}`}
                >
                  <Image
                    data={product.images.nodes[0]}
                    aspectRatio="1/1"
                    sizes="(min-width: 45em) 20vw, 50vw"
                  />
                  <h4>{product.title}</h4>
                  <small>
                    <Money data={product.priceRange.minVariantPrice} />
                  </small>
                </Link>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
