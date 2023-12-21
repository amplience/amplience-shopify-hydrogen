import React, {createContext, forwardRef} from 'react';
import {
  type CmsImage,
  type ImageTransformations,
  getImageURL,
} from '~/utils/amplience/getImageURL';

export interface AdaptiveImageProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  image: CmsImage;
  transformations?: ImageTransformations;
  imageRef?: any;
  children?: React.ReactElement[];
  imageAltText?: string;
  diParams?: string;
}

/**
 * Content State with image, transformations and additional parameters
 */
type ContextState = {
  image: CmsImage;
  transformations?: ImageTransformations;
  diParams?: string;
  srcset?: {
    [factor: string]: ImageTransformations;
  };
};

/**
 * React context with image, transformations and additional information
 */
export const AdaptiveImageContext = createContext<ContextState | null>(null);

/**
 * Adaptive Image component
 * @param image object containint image information
 * @param imageAltText image alternative text
 * @param transformations all image transformations
 * @param diParams additional dynamic image parameters
 * @param children children components
 * @param imageRef image reference
 * @returns adaptive image with all transformations
 */
const AdaptiveImage: React.FC<AdaptiveImageProps> = (props) => {
  const {
    image,
    imageAltText = '',
    transformations,
    diParams = '',
    children,
    imageRef,
    ...other
  } = props;

  if (!image) {
    return null;
  }

  const defaultImageUrl = getImageURL(image, transformations, false, diParams);

  return (
    <AdaptiveImageContext.Provider
      value={{
        image,
        transformations,
        diParams,
      }}
    >
      <picture>
        {children}
        <img
          alt={imageAltText}
          ref={imageRef}
          src={defaultImageUrl}
          {...other}
          width="100%"
        />
      </picture>
    </AdaptiveImageContext.Provider>
  );
};

/**
 * AdaptiveImage component with forward reference
 */
const AdaptiveImageRef = forwardRef((props: AdaptiveImageProps, ref) => (
  <AdaptiveImage
    {...props}
    imageRef={ref as React.MutableRefObject<HTMLImageElement>}
  >
    {props.children}
  </AdaptiveImage>
));

export default AdaptiveImageRef;
