import React from 'react';

const ProductCard = ({product}) => {
  const {id,name,price}=product;
  const handleAddToCart = () => {
    addToCart(product);
  };

  const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  cart[product.id] = quantity;
  };


  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base mb-2">price: {price}</p>
      </div>
      <div className="px-6 pb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
        onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
