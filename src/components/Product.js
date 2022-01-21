import React from 'react';
import '../assets/css/Product.css'

function Product({ title, price, image, rating }) {
  return (
    <div className='product'>
        <div className='product__info'>
            <p>{title}</p>
            <p className='product__price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className='product__ratings'>
                {Array(rating)
                    .fill(<p>⭐</p>)
                }
            </div>
        </div>

        <img
            src={image} 
            alt="Product image"
        />

        <button>Add to Cart</button>
    </div>
  );
}

export default Product;
