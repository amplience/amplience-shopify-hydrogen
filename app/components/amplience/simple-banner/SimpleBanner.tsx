import {
  type CmsImage,
  ImageScaleFit,
  ImageScaleMode,
  type ImageTransformations,
} from '~/amplience/getImageURL';
import { useEffect, useRef, useState } from 'react';
import DefaultAdaptiveImageRef from '../adaptive-image/DefaultAdaptiveImage';
import DefaultAdaptiveImageSkeleton from '../adaptive-image/DefaultAdaptiveImageSkeleton';
import clsx from 'clsx';

/**
 * TODO
 */
type SimpleBannerProps = {
  image: {
    img: {
      image: ImageTransformations & {
        image: CmsImage;
      };
    };
    disablePoiAspectRatio: boolean;
    imageAltText: string;
    di: string;
  };
  bannerText: {
    header: string;
    subheader?: string;
    description: string;
  };
  opacity?: number;
  ctaSettings: {
    linkUrl: string;
    buttonText: string;
  };
  textPositioning: {
    textPositionHorizontal: 'left' | 'center' | 'right';
    textPositionVertical: 'top' | 'middle' | 'bottom';
  };
};

/**
 * Simple Banner component
 * @param image image content item
 * @param bannerText all banner texts
 * @param ctaSettings call to action settinds
 * @param opacity panel opacity
 * @param textPositioning text position configuration
 * @returns Simple Banner component
 */
const SimpleBanner: React.FC<SimpleBannerProps> = ({
  image,
  bannerText,
  ctaSettings,
  opacity = 0.9,
  textPositioning = {
    textPositionHorizontal: 'center',
    textPositionVertical: 'middle',
  },
  ...other
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const imageRef = useRef<any>();

  /**
   * TODO
   */
  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  useEffect(() => {
    if (imageRef?.current?.complete && imageLoading) {
      setImageLoading(false);
    }
  }, [imageRef?.current?.complete, imageLoading]);

  const { img } = image || {};

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

  const isOverlayVisible =
    bannerText?.header ||
    bannerText?.subheader ||
    bannerText?.description ||
    ctaSettings?.buttonText;

  return (
    <div style={{ position: 'relative' }}>
      {imageLoading ? <DefaultAdaptiveImageSkeleton /> : null}
      <div
        style={{
          display: `${imageLoading ? 'none' : 'block'}`,
          backgroundColor: '#ccc',
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
      <div
        style={{
          padding: '40px 60px 40px 60px',
          position: 'absolute',
          textAlign: 'center',
          backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        }}
        className={clsx({
          floatingLeft: textPositioning.textPositionHorizontal === 'left',
          floatingCenter: textPositioning.textPositionHorizontal === 'center',
          floatingRight: textPositioning.textPositionHorizontal === 'right',
          floatingTop: textPositioning.textPositionVertical === 'top',
          floatingMiddle: textPositioning.textPositionVertical === 'middle',
          floatingBottom: textPositioning.textPositionVertical === 'bottom',
        })}
      >
        <h1>{bannerText?.header}</h1>
        <h2>{bannerText?.subheader}</h2>
        <p>{bannerText?.description}</p>
        <a href={ctaSettings?.linkUrl}>{ctaSettings?.buttonText}</a>
      </div>
    </div>
  );
};

export default SimpleBanner;
