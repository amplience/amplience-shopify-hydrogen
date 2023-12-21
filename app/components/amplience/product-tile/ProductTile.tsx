import {Image, Money} from '@shopify/hydrogen';
import {
  type Maybe,
  type Image as ImageType,
  type MoneyV2,
} from '@shopify/hydrogen/storefront-api-types';

export type ProductTileProps = {
  title: string;
  image?: Maybe<ImageType>;
  price?: MoneyV2;
};

const ProductTile = ({title, image, price}: ProductTileProps) => {
  return (
    <div className="relative">
      {image && (
        <Image
          alt={image.altText || 'Product Image'}
          aspectRatio="1/1"
          data={image}
          key={image.id}
        />
      )}
      <div className="absolute bottom-0 w-full">
        <div className="m-2 p-2 bg-white/70 hover:bg-white/80 rounded whitespace-normal">
          <h3 className="text-base font-[600]">{title}</h3>
          {price && <Money data={price} />}
        </div>
      </div>
    </div>
  );
};

export default ProductTile;
