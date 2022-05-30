import React, { useState, useEffect } from 'react';
import { getProducts } from './products';
import { Product } from './types';
import { Card } from './components/Card/Card';
import { Modal } from './components/Modal/Modal';
import classNames from 'classnames';

import './App.scss';

export const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [modalProduct, setModalProduct] = useState<Product>(
    {
      name: '',
      category: '',
      price: 0
    }
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  const body = document.querySelector('body');  

  const fetchProducts = async () => {
    setLoading(true);
    const productList = await getProducts();

    setProducts(productList);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const buyCheapest = () => {
    setShowModal(true);
    const productsCopy = [...products];
    setModalProduct(productsCopy.sort((a, b) => a.price - b.price)[0]);

    if (body) {
      body.style.overflow = 'hidden';
    }
  }

  const buyProduct = (event: React.MouseEvent<HTMLElement>) => {    
    setShowModal(true);
    setModalProduct(products.find(product => (
      product.name === event.currentTarget.id
    ))!);

    if (body) {
      body.style.overflow = 'hidden';
    }
  }

  const closeModal = () => {
    setShowModal(false);

    if (body) {
      if (navigator.userAgent.indexOf("Firefox")) {
        body.style.overflow = 'auto';
      }

      body.style.overflow = 'overlay';
    }
  }
  
  return (
    <>
      {loading ? (
        <div className='loader'></div>
      ) : (
        <div className='wrapper'>
        <div
          className={classNames({
            'overlay-visible': showModal,
            'overlay-hidden': !showModal,
          })}
          onClick={closeModal}
        >
        </div>
  
        <div className='content'>
          <div className='products'>
            {products.map((product: Product) => (
              <Card
                key={product.name}
                product={product}
                buyProduct={buyProduct}
              />
            ))}
          </div>
  
          {showModal && (
            <Modal
              product={modalProduct}
              closeModal={closeModal}
            />
          )}
  
          <button
            className='buy_cheapest'
            onClick={buyCheapest}
          >
            Buy cheapest
          </button>
        </div>
      </div>
      )}
    </>
  );
}
