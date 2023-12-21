import {Product} from '@shopify/hydrogen/storefront-api-types';
import {type LoaderFunctionArgs, json} from '@shopify/remix-oxygen';

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
  const ids = searchParams.get('ids')?.split(',');
  if (!ids) {
    return [];
  }

  const query = ids.map((id) => `(id:${id})`).join(' OR ');

  const data = await storefront.query(PRODUCTS_QUERY, {variables: {query}});

  const orderedProducts = ids
    .map(
      (id) =>
        data?.products?.edges?.find(
          (p: {node: Product}) => p.node.id === `gid://shopify/Product/${id}`,
        )?.node,
    )
    // remove missing products
    .filter((p) => p);

  return orderedProducts;
}

export const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ApiProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCTS_QUERY = `#graphql
query ApiProducts($query: String!) {
  products(first: 20, query: $query) {
    edges {
      node {
        title
        id
        handle
        featuredImage {
          altText
          height
          id
          url
          width
        }
        variants(first: 1) {
          nodes {
            ...ApiProductVariant
          }
        }
      }
    }
  }
}
${PRODUCT_VARIANT_FRAGMENT}
` as const;

export const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment ApiProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    variants(first: 1) {
      nodes {
        ...ApiProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;
