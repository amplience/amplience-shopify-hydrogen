import {type CmsContent} from '~/amplience/getImageURL';
import AmplienceWrapper from '../wrapper/AmplienceWrapper';

type CardProps = {
  className?: string;
  image?: CmsContent;
  cardName?: string;
  description?: string;
  links: any[];
};

/**
 * Card component
 * @param image image content item
 * @param cardName title of the card
 * @param description description
 * @returns Card component
 */
const Card: React.FC<CardProps> = ({image, cardName, description, links}) => {
  return (
    <div className="amp-card" style={{width: '100%', margin: 4}}>
      <div>
        <AmplienceWrapper content={image as CmsContent} />
      </div>
      <h3>{cardName}</h3>
      <p>{description}</p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
        }}
      >
        {links &&
          links.map((link: any, i: number) => {
            if (link.label) {
              return (
                <a className="amp-button" href={link.value} key={i}>
                  {link.label}
                </a>
              );
            } else {
              return null;
            }
          })}
      </div>
    </div>
  );
};

export default Card;
