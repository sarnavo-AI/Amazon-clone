import React, { createContext, useContext, useReducer } from "react";

// Prepares the Store
export const StateContext = createContext();

// Wrap our App
export const StateProvider = ({ reducer, initialState, children }) => {
    return (
        <StateContext.Provider value={ useReducer(reducer, initialState) }>
            {children}
        </StateContext.Provider>
    );
};

// fetching data from store
export const useStateValue = () => useContext(StateContext);