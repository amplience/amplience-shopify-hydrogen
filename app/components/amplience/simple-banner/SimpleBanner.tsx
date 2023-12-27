import {useEffect, useRef, useState} from 'react';
import DefaultAdaptiveImageRef from '../adaptive-image/DefaultAdaptiveImage';
import DefaultAdaptiveImageSkeleton from '../adaptive-image/DefaultAdaptiveImageSkeleton';
import clsx from 'clsx';
import {
  ImageScaleMode,
  type AmplienceImage,
  ImageScaleFit,
  type ImageTransformations,
} from '../image/Image.types';

type SimpleBannerProps = {
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

const SimpleBanner = ({
  image,
  bannerText,
  ctaSettings,
  opacity = 0.9,
  textPositioning = {
    textPositionHorizontal: 'center',
    textPositionVertical: 'middle',
  },
}: SimpleBannerProps) => {
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
    <div className="amp-simple-banner" style={{position: 'relative'}}>
      {imageLoading ? <DefaultAdaptiveImageSkeleton /> : null}
      <div
        className="amp-simple-banner-image"
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
      {isOverlayVisible && (
        <div
          style={{
            backgroundColor: `rgba(255, 255, 255, ${opacity})`,
            textAlign: textPositioning.textPositionHorizontal,
          }}
          className={clsx('amp-simple-banner-text', {
            ampfloatingLeft: textPositioning.textPositionHorizontal === 'left',
            ampfloatingCenter:
              textPositioning.textPositionHorizontal === 'center' &&
              !(textPositioning.textPositionVertical === 'middle'),
            ampfloatingRight:
              textPositioning.textPositionHorizontal === 'right',
            ampfloatingTop: textPositioning.textPositionVertical === 'top',
            ampfloatingMiddle:
              textPositioning.textPositionVertical === 'middle' &&
              !(textPositioning.textPositionHorizontal === 'center'),
            ampfloatingBottom:
              textPositioning.textPositionVertical === 'bottom',
            ampfloatingCenterMiddle:
              textPositioning.textPositionHorizontal === 'center' &&
              textPositioning.textPositionVertical === 'middle',
          })}
        >
          <h1>{bannerText?.header}</h1>
          <h2>{bannerText?.subheader}</h2>
          <p style={{marginBottom: '20px'}}>{bannerText?.description}</p>
          {ctaSettings && ctaSettings.buttonText && (
            <a className="amp-button" href={ctaSettings?.linkUrl}>
              {ctaSettings?.buttonText}
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleBanner;
