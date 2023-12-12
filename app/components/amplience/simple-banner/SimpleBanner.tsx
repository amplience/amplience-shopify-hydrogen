import {
  type CmsImage,
  ImageScaleFit,
  ImageScaleMode,
  type ImageTransformations,
} from '~/amplience/getImageURL';
import {useEffect, useRef, useState} from 'react';
import DefaultAdaptiveImageRef from '../adaptive-image/DefaultAdaptiveImage';
import DefaultAdaptiveImageSkeleton from '../adaptive-image/DefaultAdaptiveImageSkeleton';
import clsx from 'clsx';

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

  // Checks if there is any text provided
  const isOverlayVisible =
    bannerText?.header ||
    bannerText?.subheader ||
    bannerText?.description ||
    ctaSettings?.buttonText;

  return (
    <div className="simple-banner" style={{position: 'relative'}}>
      {imageLoading ? <DefaultAdaptiveImageSkeleton /> : null}
      <div
        className="simple-banner-image"
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
      <div
        style={{
          backgroundColor: `rgba(255, 255, 255, ${opacity})`,
          textAlign: textPositioning.textPositionHorizontal,
        }}
        className={clsx('simple-banner-text', {
          floatingLeft: textPositioning.textPositionHorizontal === 'left',
          floatingCenter:
            textPositioning.textPositionHorizontal === 'center' &&
            !(textPositioning.textPositionVertical === 'middle'),
          floatingRight: textPositioning.textPositionHorizontal === 'right',
          floatingTop: textPositioning.textPositionVertical === 'top',
          floatingMiddle:
            textPositioning.textPositionVertical === 'middle' &&
            !(textPositioning.textPositionHorizontal === 'center'),
          floatingBottom: textPositioning.textPositionVertical === 'bottom',
          floatingCenterMiddle:
            textPositioning.textPositionHorizontal === 'center' &&
            textPositioning.textPositionVertical === 'middle',
        })}
      >
        <h1>{bannerText?.header}</h1>
        <h2>{bannerText?.subheader}</h2>
        <p style={{marginBottom: '20px'}}>{bannerText?.description}</p>
        <a className="button" href={ctaSettings?.linkUrl}>
          {ctaSettings?.buttonText}
        </a>
      </div>
    </div>
  );
};

export default SimpleBanner;
