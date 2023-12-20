import {Link, useFetcher} from '@remix-run/react';
import {useEffect, useState} from 'react';

import SideScroller from '../side-scroller/SideScroller';
import SideScrollerItem from '../side-scroller/SideScrollerItem';
import ProductTile from '../product-tile/ProductTile';
import {type Product} from '@shopify/hydrogen/storefront-api-types';

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
    fetcher.load(`/api/products?ids=${products.join(',')}`);
  }, [products]);

  return (
    <div className="pt-8">
      {header && (
        <h2 className="text-center mt-4 mt-6 text-2xl md:text-4xl">{header}</h2>
      )}
      {isLoading && (
        <div className="skeleton-placeholder h-80 w-[150px] m-auto"></div>
      )}
      {!isLoading && (
        <SideScroller>
          {hydratedProducts &&
            hydratedProducts.map(
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
  );
};

export default CuratedProductGrid;
