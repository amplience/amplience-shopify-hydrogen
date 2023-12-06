// Generated with util/create-component.js
import React from "react";
import { CmsContent } from '~/amplience/getImageURL';
import Card from "../card/Card";


type CardListProps = {

    /**
     * Card List Header
     */
    header?: string;
    
    /**
     * List of Cards
     */
    cards?: CmsContent[];
}

const CardList: React.FC<CardListProps> = ({ 
  header,
  cards,
}) => {
  return (
      <div data-testid="CardList">
      {
          header && ( 
            <h2>{header}</h2>
          )
      }
      {
          cards && (
              <div style={{display: "flex"}}>
                  {
                      cards.map((card: any, index: number) => {
                          return <Card key={ Math.random().toString(36).substr(2, 9) } {...card} />
                      })
                  }
              </div>
          )
      }
      </div>
  )
};

export default CardList;