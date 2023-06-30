import React from 'react'
import './cart.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';

function Cart({
  visibility,
  products,
  onProductRemove,
  onClose,
  onQuantityChange
}){
  return(
    <div className='modal' style={{ display: visibility? 'block' : NodeNextRequest,}}>
      <div className='header'>
        <h2>Shopping Bag</h2>
        <button className='btn close-btn' onClick={onClose}>
          <AiFillCloseCircle size={30}/>
        </button>
      </div>
      <div className='cart-products'>
        {products.length === 0 && <span className='empty-text'>You shopping bag is empty </span>}
        {products.map(product => (
          <div className='cart-product' key={product.id}>
            <img src={product.image} alt={product.name}/>
            <div className='product-info'>
              <h3>
                {product.name}
              </h3>
              <span className='product-price'>
                Ksh{" "}{product.price * product.count}
              </span>
            </div>
            <select 
              className='count' 
              value={product.count} 
              onChange={(event) => {
                onQuantityChange(product.id, event.target.value);
              }}
            >
              {[
                ...Array(
                  10
                ).keys(),
              ].map(number => {
                const num = number + 1;
                return <option value={num} key={num}>{num}</option>
              })
              }
            </select>
            <button 
              className='btn remove-btn'
              onClick={() => 
                onProductRemove(product)
              }
            >
              <RiDeleteBin6Line size={20}/>
            </button>
          </div>
        ))}
        {product.length > 0 && (
          <button className='btn checkout-btn'>Proceed to pay</button>
        )}
      </div>
    </div>
  )
}

export default Cart();