import React from 'react';

const Cart = ({ cartItems }) => {
  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length > 0 ? (
        <ul className='flex content-evenly'>
          {cartItems.map((item) => (
            <li key={item.code} className='max-w-sm rounded overflow-hidden shadow-xl bg-slate-400 w-[20%] m-5'>
              <div className='font-normal text-center'>product : {item.name}</div>
              <div className='font-normal text-center'>quanity:  {item.quantity}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the cart</p>
      )}
    </div>
  );
};

export default Cart;
