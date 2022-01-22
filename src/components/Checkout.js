import React from 'react';
import '../assets/css/Checkout.css';
import { useStateValue } from '../contextAPI/StateProvider';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';

function Checkout() {
    const [{ cart }, dispatch] = useStateValue();

    return (
        <div className='checkout'>
            <div className='checkout__left'>
                <img 
                    className='checkout__ad'
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt=""
                />

                <div>
                    <h2 className='checkout__title'>
                        Your Shopping Cart
                    </h2>

                    {cart.map(item => {
                        return (
                            <CheckoutProduct
                                primaryKey={item.primaryKey} 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        );
                    })}

                </div>
            </div>
            
            <div className='checkout__right'>
                <Subtotal />
            </div>
        </div>
  );
}

export default Checkout;
