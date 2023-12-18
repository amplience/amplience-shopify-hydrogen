import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction, Link, Await} from '@remix-run/react';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {Suspense, useEffect, useState} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import {fetchContent} from '~/clients/amplience/fetch-content';
import {useAmplienceSearchParams} from '~/hooks/useAmplienceSearchParams';
import AmplienceContent from '~/components/amplience/wrapper/AmplienceContent';

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
  const simpleBannerPublished = (
    await fetchContent(
      [{key: 'docs/story/simple-banner/dog-xmas-banner'}],
      {hubName},
      {locale},
    )
  )[0];
  const cardListPublished = (
    await fetchContent(
      [{key: 'docs/story/cardlist/cardlist1'}],
      {hubName},
      {locale},
    )
  )[0];
  return defer({
    hubName,
    locale,
    featuredCollection,
    recommendedProducts,
    simpleBannerPublished,
    cardListPublished,
  });
}

export default function Homepage() {
  const {
    featuredCollection,
    recommendedProducts,
    hubName,
    locale,
    simpleBannerPublished,
    cardListPublished,
  } = useLoaderData<typeof loader>();
  const [simpleBanner, setSimpleBanner] = useState(simpleBannerPublished);
  const [cardList, setCardList] = useState(cardListPublished);
  const {hub, vse} = useAmplienceSearchParams();

  useEffect(() => {
    const fetch = async () => {
      const context = {
        hubName: hub ?? hubName,
        ...(vse ? {stagingHost: vse} : {}),
      };
      const params = {locale};
      const simpleBannerLatest = (
        await fetchContent(
          [{key: 'docs/story/simple-banner/dog-xmas-banner'}],
          context,
          params,
        )
      )[0];
      setSimpleBanner(simpleBannerLatest);
      const cardListLatest = (
        await fetchContent(
          [{key: 'docs/story/cardlist/cardlist1'}],
          context,
          params,
        )
      )[0];
      setCardList(cardListLatest);
    };
    fetch();
  }, [hub, hubName, locale, vse]);

  return (
    <div className="home">
      <FeaturedCollection collection={featuredCollection} />
      <RecommendedProducts products={recommendedProducts} />
      <AmplienceContent content={simpleBanner}></AmplienceContent>
      <AmplienceContent content={cardList}></AmplienceContent>
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
