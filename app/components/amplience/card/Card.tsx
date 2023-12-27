import {type AmplienceContentItem} from '~/clients/amplience/fetch-content';
import AmplienceContent from '../wrapper/AmplienceContent';

export type CardProps = {
  className?: string;
  image?: AmplienceContentItem;
  cardName?: string;
  description?: string;
  links?: any[];
};

const Card = ({image, cardName, description, links}: CardProps) => {
  return (
    <div className="amp-card" style={{width: '100%', margin: 4}}>
      <div>
        <AmplienceContent content={image as AmplienceContentItem} />
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
