import { FC } from 'react'
import { CmsContent } from '~/amplience/getImageURL';
import { ImageTransformations, getImageURL } from "~/amplience/getImageURL";
import { ContentItem } from '~/clients/amplience/create-dc-content-client.types';

type ImageProps = {
    image: any;
    query?: any;
    format?: string;
    imageAltText?: string;
    di?: string;
} & CmsContent;

const Image: React.FC<ImageProps> = ({
    display,
    image,
    imageAltText,
    seoText,
    di = "",
    query,
    roundel
}) => {

    if (!image) {
        return null;
    }
    
    const getRoundelConfig = (roundel: any) => {
        if (roundel &&
            roundel[0] &&
            roundel[0].roundel &&
            roundel[0].roundel.name) {
            const roundelParams = [];
            let imageRoundelIndex;
            for (let x = 0; x < roundel.length; x++) {
                let roundelParam = '';
                switch (roundel[x].roundelPosition) {
                    case 'Bottom Right':
                        roundelParam = 'p1_img=';
                        imageRoundelIndex = 1;
                        break;
                    case 'Bottom Left':
                        roundelParam = 'p2_img=';
                        imageRoundelIndex = 2;
                        break;
                    case 'Top Left':
                        roundelParam = 'p3_img=';
                        imageRoundelIndex = 3;
                        break;
                    case 'Top Right':
                        roundelParam = 'p4_img=';
                        imageRoundelIndex = 4;
                        break;
                }

                const roundelRatio = roundel[x].roundelRatio;
                roundelParam +=
                    roundel[x].roundel.name +
                    (roundelRatio
                        ? '&roundelRatio' + imageRoundelIndex + '=' + roundelRatio
                        : '');
                roundelParams.push(roundelParam);
            }

            return roundelParams.join('&');
        } else {
            return '';
        }
    }

    const buildSrcUrl = ({ width, poiAspect, format }: any) => {
        let baseUrl = `https://${image.defaultHost}/i/${image.endpoint}/${encodeURIComponent(image.name)}`;
        const transformations: ImageTransformations = {};

        if (seoText) {
            baseUrl += `/${encodeURIComponent(seoText)}`
        };

        transformations.width = width;
        transformations.upscale = false;
        transformations.strip = true;
        let queryString = '';

        if (display == 'Point of Interest' && poiAspect) {
            transformations.aspectRatio = poiAspect;
            queryString += `&{($root.layer0.metadata.pointOfInterest.w==0)?0.5:$root.layer0.metadata.pointOfInterest.x},{($root.layer0.metadata.pointOfInterest.w==0)?0.5:$root.layer0.metadata.pointOfInterest.y},{$root.layer0.metadata.pointOfInterest.w},{$root.layer0.metadata.pointOfInterest.h}&scaleFit=poi&sm=aspect`
        }
        if (query) {
            queryString += `&${query}`;
        }
        if (roundel && roundel[0] && roundel[0].roundel && roundel[0].roundelPosition && roundel[0].roundelRatio) {
            queryString += `&$roundel$&${getRoundelConfig(roundel)}`
        }
        return getImageURL(`${baseUrl}?${queryString}`, transformations, false, di);
    };

    const source = ({ minWidth, maxWidth, width, highDensityWidth, format, poiAspect }: any) => {
        return <source srcSet={`${buildSrcUrl({ width, format, poiAspect })} 1x, ${buildSrcUrl({ width: highDensityWidth, format, poiAspect })}`}
            media={minWidth ? `(min-width: ${minWidth}px)` : (maxWidth ? `(max-width: ${maxWidth}px)` : undefined)}
            type={format ? `image/${format}` : undefined} />;
    };

    const imageTag = display == 'Static' ? (
        <picture>
            <img loading="lazy" src={`//${image.endpoint}.a.bigcontent.io/v1/static/${image.name}`} className="amp-dc-image-pic" alt={imageAltText} title={seoText}/>
        </picture>
    ) : (
        <picture>
            <img loading="lazy" src={buildSrcUrl({})} alt={imageAltText} title={seoText} width="100%"/>
        </picture>
    );

    return <div style={{position: 'relative', width: 'auto'}}>
        {imageTag}
    </div>
}

export default Image;