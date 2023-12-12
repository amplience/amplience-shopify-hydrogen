import React from 'react';
import clsx from 'clsx';
import {getImageURL} from '~/amplience/getImageURL';

const styles = () => ({
  root: {},
  imageContainer: {
    position: 'relative' as 'relative',
  },
  image: {
    top: 0,
    bottom: 0,
    width: '100%',
  },
  details: {
    marginTop: 30,
    marginBottom: 60,
  },
  name: {
    wordWrap: 'break-word' as 'break-word',
    whiteSpace: 'normal' as 'normal',
  },
  overview: {
    marginTop: 20,
  },
  price: {},
  button: {
    marginTop: 30,
  },
});

interface Props {
  data?: any;
}

const CuratedProductGridCard: React.FC<Props> = (props) => {
  const {data: result, ...other} = props;

  const {variants, name, slug, id} = result;

  const {prices, listPrice, images} = variants[0];

  // Retrieve locale/country code from context
  let imageUrl = result.overrides?.image
    ? getImageURL(result.overrides.image, {width: 540, height: 810})
    : getImageURL(result.variants[0].images[0].url, {width: 540, height: 810});

  return (
    <a href={`/product/${result.id}/${result.slug}`}>
      <div {...other}>
        <div className="imageContainer">
          {result.variants[0] && (
            <img src={imageUrl} className="image" alt={result.name} />
          )}
        </div>
        <div className="details">
          <h4 className="name">{result.name}</h4>
          <div className="overview">{result.description}</div>
          <div className="price">{listPrice}</div>
        </div>
      </div>
    </a>
  );
};

export default CuratedProductGridCard;
