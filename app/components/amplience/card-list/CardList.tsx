import {type AmplienceContentItem} from '~/clients/amplience/fetch-content';
import Card from '../card/Card';

type CardListProps = {
  header?: string;
  cards?: AmplienceContentItem[];
};

const CardList = ({header, cards}: CardListProps) => {
  return (
    <div data-testid="CardList">
      {header && <h2>{header}</h2>}
      {cards && (
        <div className="flex flex-col md:flex-row">
          {cards.map((card: AmplienceContentItem, index: number) => {
            return <Card key={index} {...card} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CardList;
