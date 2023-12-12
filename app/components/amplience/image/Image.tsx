import {
  type ImageTransformations,
  type CmsContent,
  getImageURL,
} from '~/amplience/getImageURL';

type ImageProps = {
  image: any;
  query?: any;
  format?: string;
  imageAltText?: string;
  di?: string;
} & CmsContent;

/**
 * Image component
 * @param display display type for instance Point of Interest
 * @param image object containinng all image information
 * @param imageAltText
 * @param seoText
 * @param di
 * @param query
 * @returns 
 */
const Image: React.FC<ImageProps> = ({
  display,
  image,
  imageAltText,
  seoText,
  di = '',
  query,
}) => {
  if (!image) {
    return null;
  }

  /**
   * Build the complete image source using transformations
   * @param width image witdh
   * @param poiAspect Point of interest aspect 
   * @returns 
   */
  const buildSrcUrl = ({width, poiAspect, format}: any) => {
    let baseUrl = `https://${image.defaultHost}/i/${
      image.endpoint
    }/${encodeURIComponent(image.name)}`;
    const transformations: ImageTransformations = {};

    if (seoText) {
      baseUrl += `/${encodeURIComponent(seoText)}`;
    }

    transformations.width = width;
    transformations.upscale = false;
    transformations.strip = true;
    let queryString = '';

    if (display == 'Point of Interest' && poiAspect) {
      transformations.aspectRatio = poiAspect;
      queryString += `&{($root.layer0.metadata.pointOfInterest.w==0)?0.5:$root.layer0.metadata.pointOfInterest.x},{($root.layer0.metadata.pointOfInterest.w==0)?0.5:$root.layer0.metadata.pointOfInterest.y},{$root.layer0.metadata.pointOfInterest.w},{$root.layer0.metadata.pointOfInterest.h}&scaleFit=poi&sm=aspect`;
    }
    if (query) {
      queryString += `&${query}`;
    }
    return getImageURL(`${baseUrl}?${queryString}`, transformations, false, di);
  };

  /**
   * Source component
   * @param param0 
   * @returns Source tag with all source set information
   */
  const source = ({
    minWidth,
    maxWidth,
    width,
    highDensityWidth,
    format,
    poiAspect,
  }: any) => {
    return (
      <source
        srcSet={`${buildSrcUrl({width, format, poiAspect})} 1x, ${buildSrcUrl({
          width: highDensityWidth,
          format,
          poiAspect,
        })}`}
        media={
          minWidth
            ? `(min-width: ${minWidth}px)`
            : maxWidth
            ? `(max-width: ${maxWidth}px)`
            : undefined
        }
        type={format ? `image/${format}` : undefined}
      />
    );
  };

  const imageTag =
    display == 'Static' ? (
      <picture className="amp-dc-image">
        <img
          loading="lazy"
          src={`//${image.endpoint}.a.bigcontent.io/v1/static/${image.name}`}
          className="amp-dc-image-pic"
          width='100%'
          alt={imageAltText}
          title={seoText}
        />
      </picture>
    ) : (
      <picture className="amp-dc-image">
        {/* High density widths selected to be below max avif image size at aspect ratio. (2.5mil pixels) */}
        {source({
          minWidth: '1280',
          width: '1500',
          highDensityWidth: '2234',
          poiAspect: '2:1',
        })}
        {source({
          minWidth: '1024',
          width: '1280',
          highDensityWidth: '2234',
          poiAspect: '2:1',
        })}
        {source({
          minWidth: '768',
          width: '1024',
          highDensityWidth: '1920',
          poiAspect: '1.5:1',
        })}
        {source({
          maxWidth: '768',
          width: '768',
          highDensityWidth: '1536',
          poiAspect: '1:1',
        })}

        <img
          loading="lazy"
          src={buildSrcUrl({})}
          className="amp-dc-image-pic"
          alt={imageAltText}
          title={seoText}
          width="100%"
        />
      </picture>
    );

  return <div style={{position: 'relative', width: 'auto'}}>{imageTag}</div>;
};

export default Image;
