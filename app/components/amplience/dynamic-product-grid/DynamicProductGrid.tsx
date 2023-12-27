import {useFetcher} from '@remix-run/react';
import {type Collection} from '@shopify/hydrogen/storefront-api-types';
import {useEffect, useState} from 'react';
import ProductGrid from '../product-grid/ProductGrid';

type DynamicProductGridProps = {
  header: string;
  category: string;
  limit: number;
};

const DynamicProductGrid = ({
  header,
  category,
  limit,
}: DynamicProductGridProps) => {
  const {load, ...fetcher} = useFetcher();
  const [collection, setCollection] = useState<Collection>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // set the hydrated products when the fetcher data changes
    if (fetcher.data) {
      setCollection(fetcher.data as Collection);
      setIsLoading(false);
    }
  }, [fetcher.data]);

  useEffect(() => {
    // load shopify product data when the products list changes
    if (category && limit) {
      load(`/api/collection?id=${category}&limit=${limit}`);
    }
  }, [category, limit, load]);
  return (
    <>
      {isLoading && (
        <div className="pt-8">
          <div className="skeleton-placeholder h-80 w-[150px] m-auto"></div>
        </div>
      )}

      {!isLoading && collection?.products?.nodes && (
        <ProductGrid header={header} products={collection?.products?.nodes} />
      )}
    </>
  );
};

export default DynamicProductGrid;
