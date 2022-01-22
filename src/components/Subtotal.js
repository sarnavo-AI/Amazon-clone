import React from 'react';
import '../assets/css/Subtotal.css';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from '../contextAPI/StateProvider';
import { getCartTotal } from '../contextAPI/reducer';

function Subtotal() {
    const [state, dispatch] = useStateValue();

    return (
        <div className='subtotal'>
            <CurrencyFormat 
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({state.cart.length} items) : <strong>{ value }</strong>
                        </p>
                        <small className='subtotal__gift'>
                            <input type="checkbox" />
                            This order contains a gift
                        </small>
                    </>
                )}

                decimalScale={2}
                value={getCartTotal(state.cart)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal;
