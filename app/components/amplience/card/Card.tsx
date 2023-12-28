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
    <div className="w-full m-[4px]">
      <div>
        <AmplienceContent content={image as AmplienceContentItem} />
      </div>
      <h3>{cardName}</h3>
      <p>{description}</p>
      <div className="flex flex-row gap-[8px]">
        {links &&
          links.map((link: any, i: number) => {
            if (link.label) {
              return (
                <a
                  className="mt-4 font-bold font text-xs no-underline hover:no-underline bg-[#333] hover:bg-[#eee] text-[#eee] hover:text-[#333] py-2.5 px-3.5 rounded"
                  href={link.value}
                  key={i}
                >
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
