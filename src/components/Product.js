import React from 'react';
import '../assets/css/Product.css'
import { useStateValue } from '../contentAPI/StateProvider';

let idGenerate = 0;

function Product({ id, title, price, image, rating }) {
    const [state, dispatch] = useStateValue();

    const addToBasket = () => {
        idGenerate++;
        dispatch ({
            type: "ADD_TO_CART",
            item: {
                primaryKey: idGenerate, 
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            }
        })
    }

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
            alt="" 
        />

        <button onClick={addToBasket}>Add to Cart</button>
    </div>
  );
}

export default Product;
