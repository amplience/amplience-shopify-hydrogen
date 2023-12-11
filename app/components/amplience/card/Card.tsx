import {type CmsContent} from '~/amplience/getImageURL';
import AmplienceWrapper from '../wrapper/AmplienceWrapper';

/**
 * TODO
 */
type CardProps = {
  className?: string;
  image?: CmsContent;
  cardName?: string;
  description?: string;
};

/**
 * Card component
 * @param image image content item
 * @param cardName title of the card
 * @param description description
 * @returns Card component
 */
const Card: React.FC<CardProps> = ({image, cardName, description}) => {
  return (
    <div style={{width: '100%', margin: 4}}>
      <div>
        <AmplienceWrapper content={image as CmsContent} />
      </div>
      <h3>{cardName}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;
