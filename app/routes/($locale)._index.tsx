import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  type MetaFunction,
  Link,
  Await,
  useLocation,
} from '@remix-run/react';

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

  return defer({featuredCollection, recommendedProducts, hubName, locale});
}

export default function Homepage() {
  const {featuredCollection, recommendedProducts, hubName, locale} =
    useLoaderData<typeof loader>();
  const [textContent, setTextContent] = useState<ContentItem>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vseHubName = searchParams.get('hub');
  const stagingHost = searchParams.get('vse');
  const vseLocale = searchParams.get('locale');

  useEffect(() => {
    const fetch = async () => {
      const context = {
        hubName: vseHubName ?? hubName,
        ...(stagingHost ? {stagingHost} : {}),
      };
      const params = {locale: vseLocale ?? locale};
      const data = await fetchContent([{key: 'text'}], context, params);
      setTextContent(data[0]);
    };
    fetch();
  }, [vseHubName, hubName, stagingHost, vseLocale, locale]);

  return (
    <div className="home">
      <FeaturedCollection collection={featuredCollection} />
      <RecommendedProducts products={recommendedProducts} />
      {textContent && (
        <AmplienceWrapper content={textContent}></AmplienceWrapper>
      )}
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
