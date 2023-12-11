import React, { forwardRef } from 'react';
import AdaptiveImage, { type AdaptiveImageProps } from './AdaptiveImage';
import AdaptiveImageSource from './AdaptiveImageSource';

/**
 * Default Adaptive Image component
 * @param props component properties
 * @returns Adaptive Image component with various sources
 */
const DefaultAdaptiveImage: React.FC<Omit<AdaptiveImageProps, 'children'>> = (
  props,
) => {
  const { imageRef } = props;
  return (
    <AdaptiveImage ref={imageRef} {...props}>
      <AdaptiveImageSource
        media="(min-width: 1280px)"
        transformations={{
          width: 1500,
          aspectRatio: '2:1',
        }}
      />
      <AdaptiveImageSource
        media="(min-width: 1024px)"
        transformations={{
          width: 1280,
          aspectRatio: '2:1',
        }}
      />
      <AdaptiveImageSource
        media="(min-width: 768px)"
        transformations={{
          width: 1024,
          aspectRatio: '1.5:1',
        }}
      />
      <AdaptiveImageSource
        media="(max-width: 768px)"
        transformations={{
          width: 768,
          aspectRatio: '1:1',
        }}
      />
    </AdaptiveImage>
  );
};

/**
 * DefaultAdaptiveImage with a forward reference
 */
const DefaultAdaptiveImageRef = forwardRef(
  (props: AdaptiveImageProps, ref: any) => (
    <DefaultAdaptiveImage imageRef={ref} {...props} />
  ),
);

export default DefaultAdaptiveImageRef;