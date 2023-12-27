import {type AmplienceContentItem} from '~/clients/amplience/fetch-content';
import Card from '../card/Card';

type CardListProps = {
  header?: string;
  cards?: AmplienceContentItem[];
};

const CardList = ({header, cards}: CardListProps) => {
  return (
    <div className="amp-card-list" data-testid="CardList">
      {header && <h2>{header}</h2>}
      {cards && (
        <div className="amp-card-list-container">
          {cards.map((card: AmplienceContentItem, index: number) => {
            return <Card key={index} {...card} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CardList;
