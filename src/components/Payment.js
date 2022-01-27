import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import '../assets/css/Payment.css';
import { getCartTotal } from '../contextAPI/reducer';
import { useStateValue } from '../contextAPI/StateProvider';
import CheckoutProduct from './CheckoutProduct';
import instance from '../axios';

var userName;

function Payment() {
    const [{ cart, user }, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const history = useHistory();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await instance({
                method: 'post',
                url: `/payments/create?total=${getCartTotal(cart) * 100}` // stripe expects the total in a currencies subunits
            });
            setClientSecret(response.data.clientSecret)

            // instance.post(`/payments/create?total=${getCartTotal(cart) * 100}`)
            // .then((res) => {
            //     setClientSecret(res.data.clientSecret);
            // })
            // .catch((err) => {
            //     console.log(err.message);
            // })
        }

        getClientSecret()
    }, [cart])

    console.log("User request", clientSecret);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

    
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })
        .then(({ paymentIntent }) => {
            // payment Intent --> payment confirmation

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            history.replace('/orders');
        })
    }

    const handleChange = e => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    if(user) {
        let userEmail = user.user._delegate.email;
        var index = userEmail.indexOf("@");
        userName = userEmail.slice(0, index);
    }
    else {
        userName = "Guest";
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout ({ <Link to="/checkout">{ cart.length } items</Link> })
                </h1>
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>Hello, { userName }</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className='payment__items'>
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

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment_details'>
                        <form onSubmit={handleSubmit}>
                            <CardElement 
                                onChange={handleChange}
                            />

                            <div className='payment__priceContainer'>
                            <CurrencyFormat 
                                renderText={(value) => (
                                    <h3>
                                        Order Total: { value }
                                    </h3>
                                )}

                                decimalScale={2}
                                value={getCartTotal(cart)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{ processing ? <p>Processing</p> : "Buy Now" }</span>
                            </button>
                            </div>

                            { error && <div>{error}</div> }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
