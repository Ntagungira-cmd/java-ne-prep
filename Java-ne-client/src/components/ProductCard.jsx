import React,{useEffect} from 'react';

const ProductCard = ({ product, onAddToCart}) => {

  const removeFromCart = (product) => {
    // Retrieve existing cart items from local storage
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let remaining = existingCartItems.filter(item=>item.code !== product.code)
    localStorage.setItem('cartItems', JSON.stringify(remaining));
    window.location.reload();
  }


  return (
    <div className="max-w-sm rounded overflow-hidden shadow-xl bg-slate-50">
      <div className="px-4 py-4"> 
        <img src={product.image} alt={"product"} className="w-full" />
        <div className="text-sm mb-1">{product.name}</div>
        <p className="text-gray-700 text-base mb-1">price: {product.price}</p>
        <p className="text-gray-700 text-base mb-1">quantity: {product.quantity.quantity}</p>
      </div>
      <div className="px-6 pb-4 flex justify-evenly">
        <button
          className="bg-[#10B981] text-white font-bold py-2 px-4 rounded"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
        <button
          className="bg-[#b91010] text-white font-bold py-2 px-4 rounded"
          onClick={() => removeFromCart(product)}
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
