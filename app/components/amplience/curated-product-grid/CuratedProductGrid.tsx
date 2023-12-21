import {useFetcher} from '@remix-run/react';
import {useEffect, useState} from 'react';

import {type Product} from '@shopify/hydrogen/storefront-api-types';
import ProductGrid from '../product-grid/ProductGrid';

type CuratedProductGridProps = {
  header: string;
  products: Product[];
};

const CuratedProductGrid = ({header, products}: CuratedProductGridProps) => {
  const fetcher = useFetcher();
  const [hydratedProducts, setHydratedProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // set the hydrated products when the fetcher data changes
    if (fetcher.data) {
      setHydratedProducts(fetcher.data as Product[]);
      setIsLoading(false);
    }
  }, [fetcher.data]);

  useEffect(() => {
    // load shopify product data when the products list changes
    if (products?.length) {
      fetcher.load(`/api/products?ids=${products.join(',')}`);
    }
  }, [products]);

  return (
    <>
      {isLoading && (
        <div className="pt-8">
          <div className="skeleton-placeholder h-80 w-[150px] m-auto"></div>
        </div>
      )}
      {!isLoading && hydratedProducts && (
        <ProductGrid header={header} products={hydratedProducts} />
      )}
    </>
  );
};

export default CuratedProductGrid;
