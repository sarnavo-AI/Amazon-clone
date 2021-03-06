import React from 'react';
import '../assets/css/Subtotal.css';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from '../contextAPI/StateProvider';
import { getCartTotal } from '../contextAPI/reducer';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Subtotal() {
    const history = useHistory();
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
            <button
                onClick={e => history.push('/payment')} 
            >Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal;
