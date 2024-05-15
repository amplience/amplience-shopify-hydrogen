import {type AmplienceContentItem} from '~/clients/amplience/fetch-content';
import AmplienceContent from '../wrapper/AmplienceContent';
import {
  AmplienceImage,
  ImageScaleFit,
  ImageScaleMode,
  ImageTransformations,
} from '../image/Image.types';
import {useEffect, useRef, useState} from 'react';
import DefaultAdaptiveImageSkeleton from '../adaptive-image/DefaultAdaptiveImageSkeleton';
import DefaultAdaptiveImageRef from '../adaptive-image/DefaultAdaptiveImage';

export type CardProps = {
  className?: string;
  image: {
    img: {
      image: ImageTransformations & {
        image: AmplienceImage;
      };
    };
    disablePoiAspectRatio: boolean;
    imageAltText: string;
    di: string;
  };
  cardName?: string;
  description?: string;
  links?: any[];
};

const Card = ({image, cardName, description, links}: CardProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const imageRef = useRef<any>();

  /**
   * Method called with the image is loaded
   */
  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  /**
   * Checking that the image is loaded
   */
  useEffect(() => {
    if (imageRef?.current?.complete && imageLoading) {
      setImageLoading(false);
    }
  }, [imageRef?.current?.complete, imageLoading]);

  const {img} = image || {};

  const transformations: ImageTransformations = {
    ...img?.image,
    upscale: false,
    strip: true,
    quality: 80,
    scaleMode: !image?.disablePoiAspectRatio
      ? ImageScaleMode.ASPECT_RATIO
      : undefined,
    scaleFit:
      !image?.disablePoiAspectRatio &&
      img?.image?.poi &&
      img?.image?.poi.x != -1 &&
      img?.image?.poi.y != -1
        ? ImageScaleFit.POINT_OF_INTEREST
        : undefined,
  };

  return (
    <div className="w-full m-[4px]">
      {imageLoading ? <DefaultAdaptiveImageSkeleton /> : null}
      <div
        className="bg-[#ccc]"
        style={{
          display: `${imageLoading ? 'none' : 'block'}`,
        }}
      >
        <DefaultAdaptiveImageRef
          ref={imageRef}
          onLoad={() => handleImageLoaded()}
          image={img?.image.image}
          imageAltText={image?.imageAltText}
          transformations={transformations}
          diParams={image?.di}
        />
      </div>
      <h3>{cardName}</h3>
      <p>{description}</p>
      <div className="flex flex-row gap-[8px]">
        {links &&
          links.map((link: any, i: number) => {
            if (link.label) {
              return (
                <a
                  className="mt-4 font-bold font text-xs no-underline hover:no-underline bg-[#333] hover:bg-[#eee] text-[#eee] hover:text-[#333] py-2.5 px-3.5 rounded"
                  href={link.value}
                  key={i}
                >
                  {link.label}
                </a>
              );
            } else {
              return null;
            }
          })}
      </div>
    </div>
  );
};

export default Card;
