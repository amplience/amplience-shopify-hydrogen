import {type Product} from '@shopify/hydrogen/storefront-api-types';
import SideScroller from '../side-scroller/SideScroller';
import SideScrollerItem from '../side-scroller/SideScrollerItem';
import {Link} from '@remix-run/react';
import ProductTile from '../product-tile/ProductTile';

export type ProductGridProps = {
  header: string;
  products: Product[];
};

const ProductGrid = ({header, products}: ProductGridProps) => {
  const hasProducts = (products?: Product[]) => products && products.length > 0;
  return (
    <div className="pt-8">
      {header && (
        <h2 className="text-center mt-4 mt-6 text-2xl md:text-4xl">{header}</h2>
      )}
      {hasProducts(products) && (
        <SideScroller>
          {products &&
            products.map(({id, title, featuredImage, handle, variants}) => (
              <SideScrollerItem key={id}>
                <Link to={`/products/${handle}`}>
                  <ProductTile
                    title={title}
                    image={featuredImage}
                    price={variants?.nodes[0]?.price}
                  />
                </Link>
              </SideScrollerItem>
            ))}
        </SideScroller>
      )}
    </div>
  );
};

export default ProductGrid;
