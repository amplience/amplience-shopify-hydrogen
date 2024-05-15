import Card from '../card/Card';
import type {DefaultContentBody} from 'dc-delivery-sdk-js';

type CardListProps = {
  header?: string;
  cards?: DefaultContentBody[];
};

const CardList = ({header, cards}: CardListProps) => {
  return (
    <div data-testid="CardList">
      {header && <h2>{header}</h2>}
      {cards && (
        <div className="flex flex-col md:flex-row">
          {cards.map((card: DefaultContentBody) => {
            return <Card key={card?._meta?.deliveryId} {...card} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CardList;
