import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction, Link, Await} from '@remix-run/react';

import AmplienceWrapper from '~/components/amplience/wrapper/AmplienceWrapper';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';

export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {
    storefront,
    ampContentClient: {fetchContent},
    locale,
  } = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);
  const textContent = (await fetchContent([{key: 'text'}], {locale}))[0];
  const imageContent = (
    await fetchContent([{key: 'image/example1'}], {locale})
  )[0];
  const videoContent = (
    await fetchContent([{key: 'docs/story/video/video1'}], {locale})
  )[0];
  const splitBlockContent = (
    await fetchContent([{key: 'split-block/example4'}], {locale})
  )[0];
  const cardContent = (
    await fetchContent([{key: 'card/example1'}], {locale})
  )[0];
  const cardListContent = (
    await fetchContent([{key: 'card-list/example1'}], {locale})
  )[0];
  const containerContent = (
    await fetchContent([{key: 'container/example1'}], {locale})
  )[0];
  const simpleBannerContent = (
    await fetchContent([{key: 'testing123'}], {locale})
  )[0];
  return defer({
    featuredCollection,
    recommendedProducts,
    textContent,
    videoContent,
    imageContent,
    splitBlockContent,
    cardContent,
    cardListContent,
    containerContent,
    simpleBannerContent,
  });
}

export default function Homepage() {
  const {
    featuredCollection,
    recommendedProducts,
    textContent,
    videoContent,
    imageContent,
    splitBlockContent,
    cardContent,
    cardListContent,
    containerContent,
    simpleBannerContent,
  } = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <FeaturedCollection collection={featuredCollection} />
      <RecommendedProducts products={recommendedProducts} />
      <h2 style={{paddingTop: '20px'}}>Image Component</h2>
      <AmplienceWrapper content={imageContent}></AmplienceWrapper>
      <h2 style={{paddingTop: '20px'}}>Text Component</h2>
      <AmplienceWrapper content={textContent}></AmplienceWrapper>
      <h2 style={{paddingTop: '20px'}}>Video Component</h2>
      <AmplienceWrapper content={videoContent}></AmplienceWrapper>
      <h2 style={{paddingTop: '20px'}}>Split Block Component</h2>
      <AmplienceWrapper content={splitBlockContent}></AmplienceWrapper>
      <h2 style={{paddingTop: '20px'}}>Card Component</h2>
      <AmplienceWrapper content={cardContent}></AmplienceWrapper>
      <h2 style={{paddingTop: '20px'}}>Card List Component</h2>
      <AmplienceWrapper content={cardListContent}></AmplienceWrapper>
      <h2 style={{paddingTop: '20px'}}>Container Component</h2>
      <AmplienceWrapper content={containerContent}></AmplienceWrapper>
      <h2 style={{paddingTop: '20px'}}>Simple Banner Component</h2>
      <AmplienceWrapper content={simpleBannerContent}></AmplienceWrapper>
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
