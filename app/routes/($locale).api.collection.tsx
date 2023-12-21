import {Product} from '@shopify/hydrogen/storefront-api-types';
import {type LoaderFunctionArgs, json} from '@shopify/remix-oxygen';
import {PRODUCT_ITEM_FRAGMENT} from './($locale).api.products';

/**
 * Fetches the products from a given list of product IDs
 */
export async function loader({request, params, context}: LoaderFunctionArgs) {
  const products = await fetchProducts({
    params,
    request,
    context,
  });

  return json(products);
}

async function fetchProducts({
  params,
  request,
  context,
}: Pick<LoaderFunctionArgs, 'params' | 'context' | 'request'>) {
  const {storefront} = context;
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const id = searchParams.get('id');
  const first = Number(searchParams.get('limit')) || 10;
  if (!id) {
    return [];
  }

  const data = await storefront.query(COLLECTION_QUERY, {
    variables: {
      id: `gid://shopify/Collection/${id}`,
      first,
    },
  });

  return data?.collection;
}

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query ApiCollection(
    $id: ID!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(id: $id) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ApiProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;
