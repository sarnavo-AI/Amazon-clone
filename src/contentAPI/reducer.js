export const initialState = {
    cart: [],
};

//Selectors
export const getCartTotal = (cart) => {
    return (
        cart.reduce((amount, item) => item.price + amount, 0)
    );
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state, 
                cart: [...state.cart, action.item]
            }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter((item) => item.primaryKey !== action.primaryKey)
            }
        default:
            return state;
    }
}

export default reducer;
