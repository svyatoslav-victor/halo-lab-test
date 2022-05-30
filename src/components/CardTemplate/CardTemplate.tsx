import React from "react";
import { Product } from "../../types";

import './CardTemplate.scss';

type Props = {
  product: Product,
};

export const CardTemplate: React.FC<Props> = ({ product }) => {
  const {category, name, price} = product;

  return (
    <div className='card__description'>
      <div
        className='card__description_category'
      >
        {category.toUpperCase()}
      </div>

      <div
        className='card__description_name'
      >
        {name.split(" ").map((word: string) => (
          word[0].toUpperCase() + word.substring(1)
        )).join(" ")}
      </div>

      <div className='card__description_price'>
        <span className='currency'>$</span>
        {price.toFixed(2)}
      </div>
    </div>
  )
}
