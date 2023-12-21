import {Link, useFetcher} from '@remix-run/react';
import {
  type Collection,
  type Product,
} from '@shopify/hydrogen/storefront-api-types';
import {useEffect, useState} from 'react';
import SideScroller from '../side-scroller/SideScroller';
import SideScrollerItem from '../side-scroller/SideScrollerItem';
import ProductTile from '../product-tile/ProductTile';

export type DynamicProductGridProps = {
  header: string;
  category: string;
  limit: number;
};

const DynamicProductGrid = ({
  header,
  category,
  limit = 10,
}: DynamicProductGridProps) => {
  const fetcher = useFetcher();
  const [collection, setCollection] = useState<Collection>();
  const [isLoading, setIsLoading] = useState(true);

  const hasProducts = (products?: Product[]) => products && products.length > 0;

  useEffect(() => {
    // set the hydrated products when the fetcher data changes
    if (fetcher.data) {
      setCollection(fetcher.data as Collection);
      setIsLoading(false);
    }
  }, [fetcher.data]);

  useEffect(() => {
    // load shopify product data when the products list changes
    if (category) {
      fetcher.load(`/api/collection?id=${category}&limit=${limit}`);
    }
  }, [category, limit]);
  return (
    <>
      <div className="pt-8">
        {header && (
          <h2 className="text-center mt-4 mt-6 text-2xl md:text-4xl">
            {header}
          </h2>
        )}
        {isLoading && (
          <div className="skeleton-placeholder h-80 w-[150px] m-auto"></div>
        )}

        {!isLoading && hasProducts(collection?.products?.nodes) && (
          <SideScroller>
            {collection?.products?.nodes.map(
              ({id, title, featuredImage, handle, variants}) => (
                <SideScrollerItem key={id}>
                  <Link to={`/products/${handle}`}>
                    <ProductTile
                      title={title}
                      image={featuredImage}
                      price={variants?.nodes[0]?.price}
                    />
                  </Link>
                </SideScrollerItem>
              ),
            )}
          </SideScroller>
        )}
      </div>
    </>
  );
};

export default DynamicProductGrid;
