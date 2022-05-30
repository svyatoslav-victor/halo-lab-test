import React from "react";
import { Product } from "../../types";
import { CardTemplate } from "../CardTemplate/CardTemplate";

import './Card.scss';

type Props = {
  product: Product,
  buyProduct: (event: React.MouseEvent<HTMLElement>) => void,
};

export const Card: React.FC<Props> = ({ product, buyProduct }) => {
  return (
    <div className='card'>
      <CardTemplate product={product}/>

      <div className='card__purchase'>
        <button
          id={product.name}
          className='card__purchase_button'
          onClick={buyProduct}
        >
          BUY
        </button>
      </div>
    </div>
  )
};
