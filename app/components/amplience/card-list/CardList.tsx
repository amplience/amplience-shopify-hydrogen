import React from 'react';
import {type CmsContent} from '~/amplience/getImageURL';
import Card from '../card/Card';

type CardListProps = {
  header?: string;
  cards?: CmsContent[];
};

/**
 * CardList component
 * @param header card list header
 * @param cards list of cards
 * @returns CardList component
 */
const CardList: React.FC<CardListProps> = ({header, cards}) => {
  return (
    <div data-testid="CardList">
      {header && <h2>{header}</h2>}
      {cards && (
        <div style={{display: 'flex'}}>
          {cards.map((card: any, index: number) => {
            return <Card key={index} {...card} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CardList;
