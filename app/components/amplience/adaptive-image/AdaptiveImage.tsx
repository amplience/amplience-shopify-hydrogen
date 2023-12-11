import React, { createContext, forwardRef } from 'react';
import {
  type CmsImage,
  type ImageTransformations,
  getImageURL,
} from '~/amplience/getImageURL';

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
 * TODO
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
 * TODO
 */
export const AdaptiveImageContext = createContext<ContextState | null>(null);

/**
 * TODO
 * @param props 
 * @returns 
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
 * TODO
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